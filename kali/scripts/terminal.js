// Terminal Emulator for Kali Linux Simulator
class Terminal {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            prompt: '${USER}@${HOSTNAME}:${PWD} $ ',
            history: [],
            maxHistory: 1000,
            welcomeMessage: true,
            ...options
        };
        
        this.fs = options.filesystem || new VirtualFileSystem();
        this.history = [];
        this.historyIndex = -1;
        this.currentCommand = '';
        this.processing = false;
        
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        
        if (this.options.welcomeMessage) {
            this.printWelcome();
        }
        
        this.focus();
    }

    render() {
        this.container.innerHTML = `
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="terminal-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#557">
                            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#557" stroke-width="2" fill="none"/>
                            <polyline points="6 8 10 12 6 16" stroke="#557" stroke-width="2" fill="none"/>
                            <line x1="12" y1="16" x2="18" y2="16" stroke="#557" stroke-width="2"/>
                        </svg>
                        <span>Terminal - Kali Linux</span>
                    </div>
                    <div class="terminal-controls">
                        <div class="terminal-control close"></div>
                        <div class="terminal-control minimize"></div>
                        <div class="terminal-control maximize"></div>
                    </div>
                </div>
                <div class="terminal-body" tabindex="0">
                    <div class="terminal-output"></div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt"></span>
                        <input type="text" class="terminal-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    </div>
                </div>
            </div>
        `;
        
        this.outputElement = this.container.querySelector('.terminal-output');
        this.inputElement = this.container.querySelector('.terminal-input');
        this.promptElement = this.container.querySelector('.terminal-prompt');
        this.bodyElement = this.container.querySelector('.terminal-body');
        
        this.updatePrompt();
    }

    bindEvents() {
        this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.inputElement.addEventListener('input', (e) => this.handleInput(e));
        
        this.bodyElement.addEventListener('click', () => {
            this.focus();
        });
        
        // Terminal controls
        const closeBtn = this.container.querySelector('.terminal-control.close');
        closeBtn.addEventListener('click', () => this.close());
    }

    handleKeyDown(e) {
        if (this.processing) return;
        
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand(this.inputElement.value);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
                
            case 'Tab':
                e.preventDefault();
                this.tabComplete();
                break;
                
            case 'Ctrl':
            case 'Alt':
            case 'Shift':
                // Don't prevent default for modifier keys
                break;
                
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.print('^C', 'terminal-text');
                    this.inputElement.value = '';
                    this.historyIndex = -1;
                }
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.clear();
                }
                break;
        }
    }

    handleInput(e) {
        this.currentCommand = e.target.value;
        this.historyIndex = -1;
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.inputElement.value = '';
            return;
        }
        
        this.inputElement.value = this.history[this.historyIndex];
        this.inputElement.setSelectionRange(this.inputElement.value.length, this.inputElement.value.length);
    }

    tabComplete() {
        const input = this.inputElement.value;
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1];
        
        if (!lastPart) return;
        
        const currentDir = this.fs.getCurrentPath();
        const dir = this.fs.navigate(currentDir);
        
        if (!dir || dir.type !== 'directory') return;
        
        const matches = Object.keys(dir.children)
            .filter(name => name.startsWith(lastPart))
            .sort();
        
        if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            this.inputElement.value = parts.join(' ');
        } else if (matches.length > 1) {
            this.print(matches.join('  '), 'terminal-info');
        }
    }

    executeCommand(command) {
        if (!command.trim()) {
            this.printCommand(command);
            return;
        }
        
        this.history.push(command);
        if (this.history.length > this.options.maxHistory) {
            this.history.shift();
        }
        
        this.printCommand(command);
        this.processing = true;
        
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Execute command
        const result = this.commands[cmd] ? 
            this.commands[cmd].call(this, args) : 
            this.unknownCommand(cmd);
        
        this.processing = false;
        this.inputElement.value = '';
        this.historyIndex = -1;
        
        if (result) {
            this.print(result);
        }
        
        this.scrollToBottom();
    }

    printCommand(command) {
        const prompt = this.getPrompt();
        const line = document.createElement('div');
        line.className = 'terminal-output-line';
        line.innerHTML = `<span class="terminal-prompt">${prompt}</span><span class="terminal-text">${command}</span>`;
        this.outputElement.appendChild(line);
    }

    print(text, className = 'terminal-text') {
        if (!text) return;
        
        const line = document.createElement('div');
        line.className = `terminal-output-line ${className}`;
        line.textContent = text;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    printHTML(html, className = 'terminal-text') {
        const line = document.createElement('div');
        line.className = `terminal-output-line ${className}`;
        line.innerHTML = html;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    clear() {
        this.outputElement.innerHTML = '';
    }

    focus() {
        this.inputElement.focus();
    }

    scrollToBottom() {
        this.bodyElement.scrollTop = this.bodyElement.scrollHeight;
    }

    close() {
        this.container.closest('.app-window')?.remove();
    }

    getPrompt() {
        return this.options.prompt
            .replace('${USER}', this.fs.currentUser)
            .replace('${HOSTNAME}', this.fs.hostname)
            .replace('${PWD}', this.fs.getCurrentPath());
    }

    updatePrompt() {
        this.promptElement.textContent = this.getPrompt();
    }

    printWelcome() {
        const welcome = `
<span class="ascii-art">
   ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
   ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
   ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
   ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
</span>

<span class="terminal-info">Welcome to Kali Linux Simulator</span>
<span class="terminal-dim">Version 2024.4 (kali-rolling)</span>

<span class="terminal-success">System ready. Type 'help' for available commands.</span>

`;
        this.printHTML(welcome);
    }

    unknownCommand(cmd) {
        return `<span class="terminal-error">bash: ${cmd}: command not found</span>`;
    }

    // Terminal Commands
    commands = {
        help: function(args) {
            const helpText = `
<span class="help-section-title">Available Commands:</span>

<span class="help-section-title">File Operations</span>
<span class="help-command">ls</span> <span class="help-description">List directory contents</span>
<span class="help-command">cd [dir]</span> <span class="help-description">Change directory</span>
<span class="help-command">pwd</span> <span class="help-description">Print working directory</span>
<span class="help-command">cat [file]</span> <span class="help-description">Display file contents</span>
<span class="help-command">touch [file]</span> <span class="help-description">Create empty file</span>
<span class="help-command">mkdir [dir]</span> <span class="help-description">Create directory</span>
<span class="help-command">rm [file]</span> <span class="help-description">Remove file or directory</span>
<span class="help-command">cp [src] [dst]</span> <span class="help-description">Copy file or directory</span>
<span class="help-command">mv [src] [dst]</span> <span class="help-description">Move or rename file</span>

<span class="help-section-title">System Information</span>
<span class="help-command">uname [-a]</span> <span class="help-description">Print system information</span>
<span class="help-command">whoami</span> <span class="help-description">Print current username</span>
<span class="help-command">hostname</span> <span class="help-description">Print system hostname</span>
<span class="help-command">date</span> <span class="help-description">Print current date and time</span>
<span class="help-command">df [-h]</span> <span class="help-description">Display disk space usage</span>
<span class="help-command">free [-h]</span> <span class="help-description">Display memory usage</span>
<span class="help-command">ps</span> <span class="help-description">Display running processes</span>
<span class="help-command">top</span> <span class="help-description">Display system processes</span>

<span class="help-section-title">Network Tools</span>
<span class="help-command">ifconfig</span> <span class="help-description">Display network interfaces</span>
<span class="help-command">ping [host]</span> <span class="help-description">Ping a host</span>
<span class="help-command">netstat</span> <span class="help-description">Network statistics</span>
<span class="help-command">nslookup [host]</span> <span class="help-description">DNS lookup</span>

<span class="help-section-title">Security Tools</span>
<span class="help-command">nmap [target]</span> <span class="help-description">Network mapper and scanner</span>
<span class="help-command">whois [domain]</span> <span class="help-description">Domain information lookup</span>
<span class="help-command">dig [domain]</span> <span class="help-description">DNS lookup utility</span>

<span class="help-section-title">Other</span>
<span class="help-command">clear</span> <span class="help-description">Clear terminal screen</span>
<span class="help-command">history</span> <span class="help-description">Display command history</span>
<span class="help-command">echo [text]</span> <span class="help-description">Display text</span>
<span class="help-command">exit</span> <span class="help-description">Close terminal</span>

<span class="terminal-dim">Type 'man [command]' for more information about a specific command.</span>
`;
            return helpText;
        },

        ls: function(args) {
            const path = args[0] || '.';
            const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
            const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
            
            const dir = this.fs.navigate(path);
            if (!dir) {
                return `<span class="terminal-error">ls: cannot access '${path}': No such file or directory</span>`;
            }
            
            if (dir.type !== 'directory') {
                return path;
            }
            
            let items = Object.keys(dir.children);
            
            if (!showAll) {
                items = items.filter(name => !name.startsWith('.'));
            }
            
            if (longFormat) {
                let output = `total ${items.length}\n`;
                items.forEach(name => {
                    const item = dir.children[name];
                    const perms = this.fs.formatPermissions(item.permissions);
                    const owner = item.owner.padEnd(8);
                    const group = item.group.padEnd(8);
                    const size = item.size.toString().padStart(8);
                    const date = item.modified.toISOString().split('T')[0];
                    const time = item.modified.toTimeString().split(' ')[0].substring(0, 5);
                    const color = this.fs.getColorForType(item);
                    output += `<span class="terminal-text">${perms} ${owner} ${group} ${size} ${date} ${time} <span style="color: ${color}">${name}</span></span>\n`;
                });
                return output;
            } else {
                return items.map(name => {
                    const item = dir.children[name];
                    const color = this.fs.getColorForType(item);
                    return `<span style="color: ${color}">${name}</span>`;
                }).join('  ');
            }
        },

        cd: function(args) {
            const path = args[0] || '/home/kali';
            
            if (path === '~') {
                this.fs.changeDirectory('/home/kali');
                this.updatePrompt();
                return;
            }
            
            if (path === '-') {
                // Go to previous directory (not implemented for simplicity)
                return;
            }
            
            if (!this.fs.changeDirectory(path)) {
                return `<span class="terminal-error">cd: ${path}: No such file or directory</span>`;
            }
            
            this.updatePrompt();
        },

        pwd: function() {
            return this.fs.getCurrentPath();
        },

        cat: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">cat: missing file operand</span>';
            }
            
            const path = args[0];
            const content = this.fs.readFile(path);
            
            if (content === null) {
                return `<span class="terminal-error">cat: ${path}: No such file or directory</span>`;
            }
            
            return content;
        },

        touch: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">touch: missing file operand</span>';
            }
            
            const path = args[0];
            
            if (this.fs.writeFile(path, '')) {
                return '';
            }
            
            return `<span class="terminal-error">touch: cannot touch '${path}': No such file or directory</span>`;
        },

        mkdir: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">mkdir: missing operand</span>';
            }
            
            const path = args[0];
            
            if (this.fs.createDirectory(path)) {
                return '';
            }
            
            return `<span class="terminal-error">mkdir: cannot create directory '${path}': No such file or directory</span>`;
        },

        rm: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">rm: missing operand</span>';
            }
            
            const path = args[0];
            
            if (this.fs.delete(path)) {
                return '';
            }
            
            return `<span class="terminal-error">rm: cannot remove '${path}': No such file or directory</span>`;
        },

        cp: function(args) {
            if (args.length < 2) {
                return '<span class="terminal-error">cp: missing operand</span>';
            }
            
            const source = args[0];
            const dest = args[1];
            
            if (this.fs.copy(source, dest)) {
                return '';
            }
            
            return `<span class="terminal-error">cp: cannot copy '${source}' to '${dest}'</span>`;
        },

        mv: function(args) {
            if (args.length < 2) {
                return '<span class="terminal-error">mv: missing operand</span>';
            }
            
            const source = args[0];
            const dest = args[1];
            
            if (this.fs.move(source, dest)) {
                return '';
            }
            
            return `<span class="terminal-error">mv: cannot move '${source}' to '${dest}'</span>`;
        },

        uname: function(args) {
            if (args.includes('-a')) {
                return 'Linux kali 6.6.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.0-kali7-amd64 (2024-03-01) x86_64 GNU/Linux';
            }
            return 'Linux';
        },

        whoami: function() {
            return this.fs.currentUser;
        },

        hostname: function() {
            return this.fs.hostname;
        },

        date: function() {
            return new Date().toString();
        },

        df: function(args) {
            const humanReadable = args.includes('-h');
            
            if (humanReadable) {
                return `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        47G   12G   33G  27% /
tmpfs           7.8G  124K  7.8G   1% /dev/shm
tmpfs           3.2G  1.2M  3.2G   1% /run
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sdb1       917G  345G  572G  38% /home`;
            }
            
            return `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1       49242624 12458240 34567890  27% /
tmpfs           8192000     124   8189876   1% /dev/shm
tmpfs           3276800     1200   3275600   1% /run
tmpfs             5120        0      5120   0% /run/lock
/dev/sdb1      958746628 354678900 599567728  38% /home`;
        },

        free: function(args) {
            const humanReadable = args.includes('-h');
            
            if (humanReadable) {
                return `              total        used        free      shared  buff/cache   available
Mem:           15.9Gi       4.5Gi       8.1Gi       234Mi       3.3Gi       10.8Gi
Swap:          8.0Gi          0B       8.0Gi`;
            }
            
            return `              total        used        free      shared  buff/cache   available
Mem:        16383792     4732160     8456789      234567     3194843    11234567
Swap:        8388608           0     8388608`;
        },

        ps: function(args) {
            return `  PID TTY          TIME CMD
    1 ?        00:00:01 systemd
  123 ?        00:00:00 sshd
  456 pts/0    00:00:00 bash
  789 pts/0    00:00:00 ps`;
        },

        top: function(args) {
            this.print(`
<span class="terminal-info">top - ${new Date().toLocaleTimeString()} up 1 day,  2:34,  1 user,  load average: 0.15, 0.08, 0.05</span>
Tasks: 156 total,   1 running, 155 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.2 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem:   15999.6 total,    8456.8 free,    4732.2 free,    2810.6 used
MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  13107.4 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    1 root      20   0   16856   8456   6234 S   0.0   0.1   0:01.23 systemd
  123 root      20   0   12345   4567   3456 S   0.0   0.0   0:00.45 sshd
  456 kali      20   0   23456   7890   5678 S   0.0   0.0   0:00.12 bash
  789 kali      20   0   34567   9012   6789 R   0.0   0.1   0:00.01 ps
`, 'terminal-dim');
            
            this.print('<span class="terminal-warning">Press Ctrl+C to exit</span>');
            return;
        },

        ifconfig: function(args) {
            return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 12345  bytes 1234567 (1.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 6789  bytes 567890 (554.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 1234  bytes 123456 (120.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1234  bytes 123456 (120.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`;
        },

        ping: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">ping: missing host operand</span>';
            }
            
            const host = args[0];
            this.print(`<span class="terminal-info">PING ${host} (192.168.1.1) 56(84) bytes of data.</span>`);
            
            const responses = [
                `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.123 ms`,
                `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.089 ms`,
                `64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.156 ms`,
                `64 bytes from ${host}: icmp_seq=4 ttl=64 time=0.102 ms`
            ];
            
            let i = 0;
            const interval = setInterval(() => {
                if (i < responses.length) {
                    this.print(responses[i], 'terminal-success');
                    i++;
                } else {
                    clearInterval(interval);
                    this.print(`
--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3002ms
rtt min/avg/max/mdev = 0.089/0.117/0.156/0.025 ms`, 'terminal-info');
                }
            }, 500);
            
            return;
        },

        netstat: function(args) {
            return `Active Internet connections (w/o servers):
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 192.168.1.100:22        192.168.1.1:54321       ESTABLISHED
tcp        0      0 192.168.1.100:22        192.168.1.1:54322       ESTABLISHED
tcp        0      0 192.168.1.100:443       192.168.1.1:54323       ESTABLISHED

Active UNIX domain sockets (w/o servers):
Proto RefCnt Flags       Type       State         I-Node   Path
unix  3      [ ]         DGRAM                    12345    /run/systemd/notify
unix  2      [ ]         DGRAM                    12346    /run/systemd/journal/socket`;
        },

        nslookup: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">nslookup: missing host operand</span>';
            }
            
            const host = args[0];
            return `Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
Name:   ${host}
Address: 192.168.1.100`;
        },

        dig: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">dig: missing host operand</span>';
            }
            
            const host = args[0];
            return `
; <<>> DiG 9.18.18-1-Debian <<>> ${host}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;${host}.\t\t\tIN\tA

;; ANSWER SECTION:
${host}.\t\t300\tIN\tA\t192.168.1.100

;; Query time: 12 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: ${new Date().toISOString()}
;; MSG SIZE  rcvd: 54`;
        },

        nmap: function(args) {
            if (args.length === 0) {
                return `<span class="terminal-error">nmap: missing target operand</span>
<span class="terminal-dim">Usage: nmap [Options] {Target Specification}</span>`;
            }
            
            const target = args[0];
            this.print(`<span class="terminal-info">Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}</span>`);
            this.print(`<span class="terminal-info">Scanning ${target}...</span>`);
            
            setTimeout(() => {
                this.print(`
<span class="terminal-success">Nmap scan report for ${target} (192.168.1.100)</span>
Host is up (0.012s latency).
Not shown: 995 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
8080/tcp open  http-proxy

<span class="terminal-info">Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .</span>
<span class="terminal-info">Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds</span>`, 'terminal-success');
            }, 1500);
            
            return;
        },

        whois: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">whois: missing domain operand</span>';
            }
            
            const domain = args[0];
            return `
% IANA WHOIS server
% for more information on IANA, visit http://www.iana.org
% This query returned 1 object

refer:        whois.verisign-grs.com

domain:       ${domain}
registry:      VeriSign
registrar:    Example Registrar
updated:      2024-03-01
creation:     2020-01-01
expiration:   2025-01-01

name servers:
    NS1.EXAMPLE.COM
    NS2.EXAMPLE.COM`;
        },

        clear: function() {
            this.clear();
            return;
        },

        history: function() {
            return this.history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
        },

        echo: function(args) {
            return args.join(' ');
        },

        exit: function() {
            this.close();
            return;
        },

        man: function(args) {
            if (args.length === 0) {
                return '<span class="terminal-error">What manual page do you want?</span>';
            }
            
            const cmd = args[0];
            return `
<span class="terminal-info">${cmd}(1)                General Commands Manual               ${cmd}(1)</span>

<span class="terminal-bold">NAME</span>
       ${cmd} - ${this.commands[cmd] ? 'command description' : 'command not found'}

<span class="terminal-bold">SYNOPSIS</span>
       ${cmd} [options]

<span class="terminal-bold">DESCRIPTION</span>
       ${this.commands[cmd] ? 'This command is available in the Kali Linux simulator.' : 'No manual entry for ' + cmd}

<span class="terminal-bold">SEE ALSO</span>
       help(1)

<span class="terminal-info">Kali Linux                    March 2024                       ${cmd}(1)</span>`;
        }
    };
}

// Export the Terminal class
window.Terminal = Terminal;