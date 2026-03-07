// Applications for Kali Linux Simulator
class Applications {
    constructor(windowManager, filesystem) {
        this.windowManager = windowManager;
        this.filesystem = filesystem;
        this.apps = {};
        
        this.init();
    }

    init() {
        this.registerApps();
    }

    registerApps() {
        // Terminal App
        this.apps.terminal = {
            name: 'Terminal',
            icon: 'terminal',
            create: (container) => {
                const terminal = new Terminal(container, {
                    filesystem: this.filesystem
                });
                return terminal;
            }
        };

        // File Manager App
        this.apps.files = {
            name: 'Files',
            icon: 'files',
            create: (container) => {
                this.createFileManager(container);
            }
        };

        // Firefox App
        this.apps.firefox = {
            name: 'Firefox',
            icon: 'firefox',
            create: (container) => {
                this.createFirefox(container);
            }
        };

        // Nmap App
        this.apps.nmap = {
            name: 'Nmap',
            icon: 'nmap',
            create: (container) => {
                this.createNmap(container);
            }
        };

        // Wireshark App
        this.apps.wireshark = {
            name: 'Wireshark',
            icon: 'wireshark',
            create: (container) => {
                this.createWireshark(container);
            }
        };

        // Metasploit App
        this.apps.metasploit = {
            name: 'Metasploit',
            icon: 'metasploit',
            create: (container) => {
                this.createMetasploit(container);
            }
        };

        // Burp Suite App
        this.apps.burpsuite = {
            name: 'Burp Suite',
            icon: 'burpsuite',
            create: (container) => {
                this.createBurpSuite(container);
            }
        };

        // John the Ripper App
        this.apps.john = {
            name: 'John the Ripper',
            icon: 'john',
            create: (container) => {
                this.createJohn(container);
            }
        };

        // Hydra App
        this.apps.hydra = {
            name: 'Hydra',
            icon: 'hydra',
            create: (container) => {
                this.createHydra(container);
            }
        };

        // Aircrack-ng App
        this.apps.aircrack = {
            name: 'Aircrack-ng',
            icon: 'aircrack',
            create: (container) => {
                this.createAircrack(container);
            }
        };

        // Gobuster App
        this.apps.gobuster = {
            name: 'Gobuster',
            icon: 'gobuster',
            create: (container) => {
                this.createGobuster(container);
            }
        };

        // SQLMap App
        this.apps.sqlmap = {
            name: 'SQLMap',
            icon: 'sqlmap',
            create: (container) => {
                this.createSQLMap(container);
            }
        };

        // Settings App
        this.apps.settings = {
            name: 'Settings',
            icon: 'settings',
            create: (container) => {
                this.createSettings(container);
            }
        };
    }

    launch(appId) {
        const app = this.apps[appId];
        if (!app) {
            console.error(`App ${appId} not found`);
            return;
        }

        const window = this.windowManager.createWindow({
            title: app.name,
            icon: app.icon,
            width: 800,
            height: 600,
            content: ''
        });

        const contentArea = window.querySelector('.app-content');
        app.create(contentArea);

        return window;
    }

    createFileManager(container) {
        container.innerHTML = `
            <div class="file-manager">
                <div class="file-manager-toolbar">
                    <button class="toolbar-button" data-action="back">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back
                    </button>
                    <button class="toolbar-button" data-action="forward">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                        Forward
                    </button>
                    <button class="toolbar-button" data-action="up">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"/>
                        </svg>
                        Up
                    </button>
                    <button class="toolbar-button" data-action="home">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        Home
                    </button>
                    <div class="toolbar-separator"></div>
                    <button class="toolbar-button" data-action="new-folder">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
                        </svg>
                        New Folder
                    </button>
                    <button class="toolbar-button" data-action="new-file">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        New File
                    </button>
                    <div class="toolbar-separator"></div>
                    <div class="path-bar">
                        <span class="path-segment">/</span>
                        <span class="path-segment">home</span>
                        <span class="path-separator">/</span>
                        <span class="path-segment">kali</span>
                    </div>
                </div>
                <div class="file-manager-body">
                    <div class="file-manager-sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-title">Places</div>
                            <div class="sidebar-item active">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                </svg>
                                Home
                            </div>
                            <div class="sidebar-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
                                </svg>
                                Desktop
                            </div>
                            <div class="sidebar-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
                                </svg>
                                Documents
                            </div>
                            <div class="sidebar-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
                                </svg>
                                Downloads
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <div class="sidebar-title">Devices</div>
                            <div class="sidebar-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                                </svg>
                                47 GB Volume
                            </div>
                        </div>
                    </div>
                    <div class="file-manager-content">
                        <div class="file-grid" id="file-grid"></div>
                    </div>
                </div>
            </div>
        `;

        this.loadDirectory('/home/kali');
        this.bindFileManagerEvents();
    }

    loadDirectory(path) {
        const dir = this.filesystem.navigate(path);
        if (!dir || dir.type !== 'directory') return;

        const grid = container.querySelector('#file-grid');
        grid.innerHTML = '';

        Object.values(dir.children).forEach(item => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon">
                    ${this.getFileIcon(item)}
                </div>
                <div class="file-name">${item.name}</div>
            `;
            grid.appendChild(fileItem);
        });
    }

    getFileIcon(item) {
        if (item.type === 'directory') {
            return `<svg width="48" height="48" viewBox="0 0 24 24" fill="var(--kali-blue)">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>`;
        } else {
            return `<svg width="48" height="48" viewBox="0 0 24 24" fill="var(--text-primary)">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>`;
        }
    }

    bindFileManagerEvents() {
        const toolbarButtons = container.querySelectorAll('.toolbar-button');
        toolbarButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.dataset.action;
                this.handleFileManagerAction(action);
            });
        });
    }

    handleFileManagerAction(action) {
        switch (action) {
            case 'back':
                // Implement back navigation
                break;
            case 'forward':
                // Implement forward navigation
                break;
            case 'up':
                // Implement up navigation
                break;
            case 'home':
                this.loadDirectory('/home/kali');
                break;
            case 'new-folder':
                // Implement new folder creation
                break;
            case 'new-file':
                // Implement new file creation
                break;
        }
    }

    createFirefox(container) {
        container.innerHTML = `
            <div class="firefox-window">
                <div class="firefox-toolbar">
                    <button class="toolbar-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                    </button>
                    <button class="toolbar-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                    </button>
                    <input type="text" class="url-bar" value="https://www.kali.org/" placeholder="Search or enter address">
                </div>
                <div class="firefox-content">
                    <div class="firefox-placeholder">
                        <h2>Welcome to Firefox</h2>
                        <p>This is a simulated Firefox browser for the Kali Linux Simulator.</p>
                        <button>Get Started</button>
                    </div>
                </div>
            </div>
        `;
    }

    createNmap(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 8.25V15.75L12 19.5L4.5 15.75V8.25L12 4.5Z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Nmap - Network Mapper
                    </div>
                    <span class="tool-version">v7.94</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Scan Configuration</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Target</label>
                                <input type="text" class="form-input" placeholder="192.168.1.1 or example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Scan Type</label>
                                <select class="form-select">
                                    <option value="tcp">TCP Connect Scan (-sT)</option>
                                    <option value="syn">SYN Stealth Scan (-sS)</option>
                                    <option value="udp">UDP Scan (-sU)</option>
                                    <option value="ping">Ping Scan (-sn)</option>
                                    <option value="version">Version Detection (-sV)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Port Range</label>
                                <input type="text" class="form-input" placeholder="1-1024 or --top-ports 100">
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="aggressive">
                                <label for="aggressive">Aggressive Scan (-A)</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="os">
                                <label for="os">OS Detection (-O)</label>
                            </div>
                            <button class="form-button" data-action="scan">Start Scan</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Scan Results</div>
                        <div class="tool-output" id="nmap-output">Ready to scan. Configure options above and click Start Scan.</div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="scan"]').addEventListener('click', () => {
            this.runNmapScan(container);
        });
    }

    runNmapScan(container) {
        const output = container.querySelector('#nmap-output');
        output.innerHTML = '<span class="terminal-info">Starting Nmap 7.94 scan...</span>';

        setTimeout(() => {
            output.innerHTML += `
<span class="terminal-info">Scanning target...</span>
<span class="terminal-success">Scan complete!</span>

<span class="terminal-info">Nmap scan report for 192.168.1.1</span>
Host is up (0.012s latency).
Not shown: 995 closed ports
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1
80/tcp   open  http    Apache 2.4.52
443/tcp  open  https   Apache 2.4.52
3306/tcp open  mysql   MySQL 8.0.32
8080/tcp open  http    Apache Tomcat 9.0

<span class="terminal-info">Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel</span>`;
        }, 2000);
    }

    createWireshark(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M3 3H21V5H3V3ZM3 7H21V9H3V7ZM3 11H21V13H3V11ZM3 15H21V17H3V15ZM3 19H21V21H3V19Z"/>
                        </svg>
                        Wireshark - Network Protocol Analyzer
                    </div>
                    <span class="tool-version">v4.0.8</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Capture Filter</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <input type="text" class="form-input" placeholder="tcp port 80 or host 192.168.1.1">
                            </div>
                            <button class="form-button" data-action="start">Start Capture</button>
                            <button class="form-button secondary" data-action="stop">Stop</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Captured Packets</div>
                        <div class="wireshark-packet-list" id="packet-list">
                            <div class="packet-row">
                                <span class="packet-number">1</span>
                                <span class="packet-time">12:00:00.000123</span>
                                <span class="packet-source">192.168.1.100</span>
                                <span class="packet-info">TCP 80 → 443 [SYN]</span>
                            </div>
                            <div class="packet-row">
                                <span class="packet-number">2</span>
                                <span class="packet-time">12:00:00.000234</span>
                                <span class="packet-source">192.168.1.1</span>
                                <span class="packet-info">TCP 443 → 80 [SYN, ACK]</span>
                            </div>
                            <div class="packet-row">
                                <span class="packet-number">3</span>
                                <span class="packet-time">12:00:00.000345</span>
                                <span class="packet-source">192.168.1.100</span>
                                <span class="packet-info">TCP 80 → 443 [ACK]</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createMetasploit(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17V7L12 12L2 7V17Z"/>
                        </svg>
                        Metasploit Framework
                    </div>
                    <span class="tool-version">v6.3.28</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Module Selection</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Search Module</label>
                                <input type="text" class="form-input" placeholder="exploit/windows/smb/ms17_010_eternalblue">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Module Type</label>
                                <select class="form-select">
                                    <option value="exploit">Exploits</option>
                                    <option value="auxiliary">Auxiliary</option>
                                    <option value="post">Post</option>
                                    <option value="payload">Payloads</option>
                                    <option value="encoder">Encoders</option>
                                    <option value="nop">Nops</option>
                                </select>
                            </div>
                            <button class="form-button" data-action="search">Search</button>
                            <button class="form-button secondary" data-action="use">Use Module</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Module Options</div>
                        <div class="tool-output">
msf6 > search type:exploit platform:windows

Matching Modules
================

   #  Name                                              Disclosure Date  Rank    Check  Description
   -  ----                                              ---------------  ----    -----  -----------
   0  exploit/windows/smb/ms17_010_eternalblue         2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   1  exploit/windows/http/tomcat_mgr_upload           2009-09-02       excellent Yes   Apache Tomcat Manager Application Upload Deployment

msf6 > use exploit/windows/smb/ms17_010_eternalblue
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(windows/smb/ms17_010_eternalblue) > options

Module options (exploit/windows/smb/ms17_010_eternalblue):

   Name          Current Setting  Required  Description
   ----          ---------------  --------  -----------
   RHOSTS                         yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT         445              yes       The SMB service port (TCP)
</div>
                    </div>
                </div>
            </div>
        `;
    }

    createBurpSuite(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <circle cx="12" cy="12" r="8"/>
                            <path d="M12 6V18M6 12H18" stroke="#fff" stroke-width="2"/>
                        </svg>
                        Burp Suite
                    </div>
                    <span class="tool-version">v2024.1</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Proxy Configuration</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Proxy Listener</label>
                                <div class="form-input">127.0.0.1:8080</div>
                            </div>
                            <button class="form-button">Intercept is on</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">HTTP History</div>
                        <div class="tool-output">
Request  GET http://example.com/  200 OK
Request  POST http://example.com/login  302 Found
Request  GET http://example.com/dashboard  200 OK
Request  GET http://example.com/api/users  200 OK
Request  POST http://example.com/api/users  201 Created
</div>
                    </div>
                </div>
            </div>
        `;
    }

    createJohn(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <rect x="4" y="4" width="16" height="16" rx="2"/>
                            <text x="12" y="16" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">JtR</text>
                        </svg>
                        John the Ripper
                    </div>
                    <span class="tool-version">v1.9.0</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Password Cracking</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Password File</label>
                                <input type="text" class="form-input" placeholder="/path/to/passwords.txt">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Wordlist</label>
                                <select class="form-select">
                                    <option value="rockyou">/usr/share/wordlists/rockyou.txt</option>
                                    <option value="custom">Custom wordlist</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mode</label>
                                <select class="form-select">
                                    <option value="wordlist">Wordlist Mode</option>
                                    <option value="single">Single Crack Mode</option>
                                    <option value="incremental">Incremental Mode</option>
                                </select>
                            </div>
                            <button class="form-button" data-action="crack">Start Cracking</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Results</div>
                        <div class="tool-output" id="john-output">
John the Ripper 1.9.0-jumbo-1 [linux-gnu 64-bit]
Copyright (c) 1996-2023 by Solar Designer

Ready to crack passwords.
</div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="crack"]').addEventListener('click', () => {
            this.runJohnCrack(container);
        });
    }

    runJohnCrack(container) {
        const output = container.querySelector('#john-output');
        output.innerHTML = '<span class="terminal-info">Starting password cracking...</span>';

        setTimeout(() => {
            output.innerHTML += `
<span class="terminal-warning">Warning: detected hash type "SHA256", but the string is also recognized as "sha256crypt"</span>
<span class="terminal-info">Use the "--format=sha256crypt" option to force loading these as that type instead</span>
<span class="terminal-info">Using default input encoding: UTF-8</span>
<span class="terminal-info">Loaded 5 password hashes with 5 different salts (SHA256crypt, crypt(3) $5$ [SHA256 256/256 AVX2 4x])</span>
<span class="terminal-info">Cost 1 (iteration count) is 5000 for all loaded hashes</span>
<span class="terminal-info">Will run 4 OpenMP threads</span>
<span class="terminal-info">Proceeding with wordlist:/usr/share/wordlists/rockyou.txt</span>
<span class="terminal-success">password123       (user1)</span>
<span class="terminal-success">admin            (user2)</span>
<span class="terminal-success">letmein          (user3)</span>
<span class="terminal-info">3 password hashes cracked, 2 left</span>`;
        }, 2000);
    }

    createHydra(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M12 2L4 8V20H20V8L12 2ZM12 4.5L18 9V18H6V9L12 4.5Z"/>
                            <circle cx="12" cy="14" r="2"/>
                        </svg>
                        Hydra - Password Cracker
                    </div>
                    <span class="tool-version">v9.5</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Attack Configuration</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Target</label>
                                <input type="text" class="form-input" placeholder="192.168.1.1 or ftp.example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Service</label>
                                <select class="form-select">
                                    <option value="ssh">SSH</option>
                                    <option value="ftp">FTP</option>
                                    <option value="http">HTTP Form</option>
                                    <option value="https-post">HTTPS POST</option>
                                    <option value="smb">SMB</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Username</label>
                                <input type="text" class="form-input" placeholder="admin or username list file">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password List</label>
                                <input type="text" class="form-input" value="/usr/share/wordlists/rockyou.txt">
                            </div>
                            <button class="form-button" data-action="attack">Start Attack</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Attack Progress</div>
                        <div class="tool-output" id="hydra-output">
Hydra v9.5 (c) 2023 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Ready to attack.
</div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="attack"]').addEventListener('click', () => {
            this.runHydraAttack(container);
        });
    }

    runHydraAttack(container) {
        const output = container.querySelector('#hydra-output');
        output.innerHTML = '<span class="terminal-info">Starting hydra attack...</span>';

        setTimeout(() => {
            output.innerHTML += `
<span class="terminal-info">Hydra v9.5 (c) 2023 by van Hauser/THC</span>
<span class="terminal-info">[DATA] max 16 tasks per 1 server, overall 16 tasks, 1 login try (l:1/p:1), ~16 tries per task</span>
<span class="terminal-info">[DATA] attacking ssh://192.168.1.1:22/</span>
<span class="terminal-warning">[22][ssh] host: 192.168.1.1   login: admin   password: password123</span>
<span class="terminal-success">1 of 1 target successfully completed, 1 valid password found</span>
<span class="terminal-info">Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-03-01 12:00:00</span>`;
        }, 2500);
    }

    createAircrack(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                            <path d="M12 6V12L16 14"/>
                        </svg>
                        Aircrack-ng - Wireless Security
                    </div>
                    <span class="tool-version">v1.7</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Wireless Attack</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Interface</label>
                                <select class="form-select">
                                    <option value="wlan0">wlan0</option>
                                    <option value="wlan1">wlan1</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Attack Mode</label>
                                <select class="form-select">
                                    <option value="monitor">Monitor Mode</option>
                                    <option value="deauth">Deauthentication</option>
                                    <option value="capture">Packet Capture</option>
                                    <option value="crack">WPA2 Cracking</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Target BSSID</label>
                                <input type="text" class="form-input" placeholder="AA:BB:CC:DD:EE:FF">
                            </div>
                            <button class="form-button" data-action="attack">Execute Attack</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Output</div>
                        <div class="tool-output" id="aircrack-output">
Aircrack-ng 1.7 

[!] Aircrack-ng requires root privileges
Ready to execute wireless attacks.
</div>
                    </div>
                </div>
            </div>
        `;
    }

    createGobuster(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M12 2L2 12H12V22L22 12H12V2Z"/>
                        </svg>
                        Gobuster - Directory Buster
                    </div>
                    <span class="tool-version">v3.6</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">Directory Enumeration</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Target URL</label>
                                <input type="text" class="form-input" placeholder="https://example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Wordlist</label>
                                <input type="text" class="form-input" value="/usr/share/wordlists/dirb/common.txt">
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="tls">
                                <label for="tls">Verify TLS</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="extended">
                                <label for="extended">Extended Mode</label>
                            </div>
                            <button class="form-button" data-action="scan">Start Scanning</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Discovered Directories</div>
                        <div class="tool-output" id="gobuster-output">
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)

==============================================================
Gobuster is a tool for directory/file enumeration.
Ready to scan.
</div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="scan"]').addEventListener('click', () => {
            this.runGobusterScan(container);
        });
    }

    runGobusterScan(container) {
        const output = container.querySelector('#gobuster-output');
        output.innerHTML = '<span class="terminal-info">Starting gobuster scan...</span>';

        setTimeout(() => {
            output.innerHTML += `
<span class="terminal-info">Gobuster v3.6</span>
<span class="terminal-info">by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)</span>
<span class="terminal-info">==============================================================</span>
<span class="terminal-info">[+] Url:                     https://example.com</span>
<span class="terminal-info">[+] Method:                  GET</span>
<span class="terminal-info">[+] Threads:                 10</span>
<span class="terminal-info">[+] Wordlist:                /usr/share/wordlists/dirb/common.txt</span>
<span class="terminal-info">[+] Negative Status codes:   404</span>
<span class="terminal-info">[+] User Agent:              gobuster/3.6</span>
<span class="terminal-info">[+] Timeout:                 10s</span>
<span class="terminal-info">==============================================================</span>
<span class="terminal-success">[200] /admin           (Status: 200) [Size: 1234]</span>
<span class="terminal-success">[200] /login           (Status: 200) [Size: 2345]</span>
<span class="terminal-success">[200] /api             (Status: 200) [Size: 456]</span>
<span class="terminal-success">[200] /uploads         (Status: 200) [Size: 789]</span>
<span class="terminal-success">[200] /config          (Status: 200) [Size: 567]</span>
<span class="terminal-info">==============================================================</span>
<span class="terminal-info">Finished</span>`;
        }, 2000);
    }

    createSQLMap(container) {
        container.innerHTML = `
            <div class="tool-window">
                <div class="tool-header">
                    <div class="tool-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--kali-blue)">
                            <path d="M4 4H20V20H4V4ZM6 6V18H18V6H6Z"/>
                            <text x="12" y="15" text-anchor="middle" fill="var(--kali-blue)" font-size="8" font-weight="bold">SQL</text>
                        </svg>
                        SQLMap - SQL Injection Tool
                    </div>
                    <span class="tool-version">v1.7.6</span>
                </div>
                <div class="tool-body">
                    <div class="tool-section">
                        <div class="tool-section-title">SQL Injection Configuration</div>
                        <div class="tool-form">
                            <div class="form-group">
                                <label class="form-label">Target URL</label>
                                <input type="text" class="form-input" placeholder="http://example.com/page?id=1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Request File</label>
                                <input type="text" class="form-input" placeholder="/path/to/request.txt">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Technique</label>
                                <select class="form-select">
                                    <option value="all">All Techniques</option>
                                    <option value="b">Boolean-based blind</option>
                                    <option value="e">Error-based</option>
                                    <option value="u">Union query-based</option>
                                    <option value="s">Stacked queries</option>
                                    <option value="t">Time-based blind</option>
                                </select>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="dbs">
                                <label for="dbs">Enumerate Databases</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="tables">
                                <label for="tables">Enumerate Tables</label>
                            </div>
                            <div class="form-checkbox">
                                <input type="checkbox" id="dump">
                                <label for="dump">Dump Data</label>
                            </div>
                            <button class="form-button" data-action="inject">Start Injection</button>
                        </div>
                    </div>
                    <div class="tool-section">
                        <div class="tool-section-title">Injection Results</div>
                        <div class="tool-output" id="sqlmap-output">
        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.6#stable}
|_ -| . [.]     | .'| . |
|___|_  [.]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

Usage: sqlmap [options]

Ready to perform SQL injection.
</div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="inject"]').addEventListener('click', () => {
            this.runSQLMap(container);
        });
    }

    runSQLMap(container) {
        const output = container.querySelector('#sqlmap-output');
        output.innerHTML = '<span class="terminal-info">Starting SQL injection...</span>';

        setTimeout(() => {
            output.innerHTML += `
<span class="terminal-info">sqlmap/1.7.6#stable</span>
<span class="terminal-info">http://example.com/page?id=1 (GET)</span>
<span class="terminal-info">Parameter: id (GET)</span>
<span class="terminal-info">    Type: boolean-based blind</span>
<span class="terminal-info">    Title: AND boolean-based blind - WHERE or HAVING clause</span>
<span class="terminal-info">    Payload: id=1' AND 5678=5678-- FxHq</span>
<span class="terminal-info">    Type: time-based blind</span>
<span class="terminal-info">    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)</span>
<span class="terminal-info">    Payload: id=1' AND SLEEP(5)-- FxHq</span>
<span class="terminal-success">[11:23:45] [INFO] the back-end DBMS is MySQL</span>
<span class="terminal-success">[11:23:45] [INFO] fetching database names</span>
<span class="terminal-success">available databases [2]:</span>
<span class="terminal-info">[*] information_schema</span>
<span class="terminal-info">[*] webapp</span>`;
        }, 2500);
    }

    createSettings(container) {
        container.innerHTML = `
            <div class="settings-panel">
                <div class="settings-sidebar">
                    <div class="settings-category active">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                        </svg>
                        Appearance
                    </div>
                    <div class="settings-category">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        Security
                    </div>
                    <div class="settings-category">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                        </svg>
                        Network
                    </div>
                    <div class="settings-category">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                        </svg>
                        System
                    </div>
                    <div class="settings-category">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        About
                    </div>
                </div>
                <div class="settings-content">
                    <div class="settings-section">
                        <div class="settings-section-title">Appearance Settings</div>
                        <div class="settings-item">
                            <div>
                                <div class="settings-item-label">Theme</div>
                                <div class="settings-item-description">Choose your preferred theme</div>
                            </div>
                            <select class="form-select">
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                        <div class="settings-item">
                            <div>
                                <div class="settings-item-label">Accent Color</div>
                                <div class="settings-item-description">Customize the accent color</div>
                            </div>
                            <select class="form-select">
                                <option value="blue">Kali Blue</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                                <option value="red">Red</option>
                            </select>
                        </div>
                        <div class="settings-item">
                            <div>
                                <div class="settings-item-label">Font Size</div>
                                <div class="settings-item-description">Adjust the font size</div>
                            </div>
                            <select class="form-select">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div class="settings-item">
                            <div>
                                <div class="settings-item-label">Enable Animations</div>
                                <div class="settings-item-description">Animate window movements</div>
                            </div>
                            <input type="checkbox" checked>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export the Applications class
window.Applications = Applications;