// Virtual File System for Kali Linux Simulator
class VirtualFileSystem {
    constructor() {
        this.root = this.createFileSystem();
        this.currentPath = '/home/kali';
        this.currentUser = 'kali';
        this.hostname = 'kali';
        this.clipboard = null;
        this.init();
    }

    createFileSystem() {
        return {
            name: '/',
            type: 'directory',
            permissions: 'drwxr-xr-x',
            owner: 'root',
            group: 'root',
            size: 4096,
            modified: new Date(),
            children: {
                'home': {
                    name: 'home',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {
                        'kali': {
                            name: 'kali',
                            type: 'directory',
                            permissions: 'drwxr-xr-x',
                            owner: 'kali',
                            group: 'kali',
                            size: 4096,
                            modified: new Date(),
                            children: {
                                'Desktop': {
                                    name: 'Desktop',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {
                                        'readme.txt': {
                                            name: 'readme.txt',
                                            type: 'file',
                                            permissions: '-rw-r--r--',
                                            owner: 'kali',
                                            group: 'kali',
                                            size: 245,
                                            modified: new Date(),
                                            content: 'Welcome to Kali Linux Simulator!\n\nThis is a web-based simulation of the Kali Linux operating system.\nYou can explore the file system, run commands, and use various security tools.\n\nType "help" to see available commands.\n\nEnjoy your hacking experience!'
                                        },
                                        'todo.txt': {
                                            name: 'todo.txt',
                                            type: 'file',
                                            permissions: '-rw-r--r--',
                                            owner: 'kali',
                                            group: 'kali',
                                            size: 156,
                                            modified: new Date(),
                                            content: 'Kali Linux Simulator Tasks:\n- Complete terminal implementation\n- Add more security tools\n- Implement network simulation\n- Add graphical applications\n- Improve performance'
                                        }
                                    }
                                },
                                'Documents': {
                                    name: 'Documents',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {
                                        'notes.txt': {
                                            name: 'notes.txt',
                                            type: 'file',
                                            permissions: '-rw-r--r--',
                                            owner: 'kali',
                                            group: 'kali',
                                            size: 189,
                                            modified: new Date(),
                                            content: 'Kali Linux Notes:\n\nKey Security Tools:\n- Nmap: Network scanning\n- Metasploit: Exploitation framework\n- Wireshark: Network protocol analyzer\n- John: Password cracking\n- Hydra: Brute force attacks\n- Aircrack-ng: Wireless security'
                                        }
                                    }
                                },
                                'Downloads': {
                                    name: 'Downloads',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {}
                                },
                                'Pictures': {
                                    name: 'Pictures',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {}
                                },
                                'Videos': {
                                    name: 'Videos',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {}
                                },
                                'Music': {
                                    name: 'Music',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {}
                                },
                                '.bashrc': {
                                    name: '.bashrc',
                                    type: 'file',
                                    permissions: '-rw-r--r--',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 3567,
                                    modified: new Date(),
                                    content: '# ~/.bashrc: executed by bash(1) for non-login shells.\n\n# If not running interactively, don\'t do anything\n[ -z "$PS1" ] && return\n\n# don\'t put duplicate lines in the history\nexport HISTCONTROL=ignoreboth\n\n# append to the history file, don\'t overwrite it\nshopt -s histappend\n\n# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)\nHISTSIZE=1000\nHISTFILESIZE=2000\n\n# check the window size after each command and, if necessary,\n# update the values of LINES and COLUMNS.\nshopt -s checkwinsize\n\n# some more ls aliases\nalias ll=\'ls -alF\'\nalias la=\'ls -A\'\nalias l=\'ls -CF\'\n\n# Add an "alert" alias for long running commands\nalias alert=\'notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e \'"\'"\'s/^\\s*[0-9]\\+\\s*//;s/[;&|]\\s*alert$//\'"\'"\'"\'\'\n'
                                },
                                '.bash_history': {
                                    name: '.bash_history',
                                    type: 'file',
                                    permissions: '-rw-------',
                                    owner: 'kali',
                                    group: 'kali',
                                    size: 0,
                                    modified: new Date(),
                                    content: ''
                                }
                            }
                        }
                    }
                },
                'etc': {
                    name: 'etc',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {
                        'passwd': {
                            name: 'passwd',
                            type: 'file',
                            permissions: '-rw-r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 1567,
                            modified: new Date(),
                            content: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\ngames:x:5:60:games:/usr/games:/usr/sbin/nologin\nman:x:6:12:man:/var/cache/man:/usr/sbin/nologin\nlp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin\nmail:x:8:8:mail:/var/mail:/usr/sbin/nologin\nnews:x:9:9:news:/var/spool/news:/usr/sbin/nologin\nuucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin\nproxy:x:13:13:proxy:/bin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nbackup:x:34:34:backup:/var/backups:/usr/sbin/nologin\nlist:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin\nirc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin\ngnats:x:41:41:Gnats Bug-Reporting System:/var/lib/gnats:/usr/sbin/nologin\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\n_apt:x:100:65534::/nonexistent:/usr/sbin/nologin\nkali:x:1000:1000:Kali User,,,:/home/kali:/bin/bash'
                        },
                        'hosts': {
                            name: 'hosts',
                            type: 'file',
                            permissions: '-rw-r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 245,
                            modified: new Date(),
                            content: '127.0.0.1 localhost\n127.0.1.1 kali\n\n# The following lines are desirable for IPv6 capable hosts\n::1     ip6-localhost ip6-loopback\nfe00::0 ip6-localnet\nff00::0 ip6-mcastprefix\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters'
                        },
                        'issue': {
                            name: 'issue',
                            type: 'file',
                            permissions: '-rw-r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 89,
                            modified: new Date(),
                            content: 'Kali GNU/Linux Rolling \\n \\l\n\nWelcome to Kali Linux Simulator\nType "help" for available commands'
                        },
                        'os-release': {
                            name: 'os-release',
                            type: 'file',
                            permissions: '-rw-r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 234,
                            modified: new Date(),
                            content: 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nID=kali\nVERSION_ID="2024.4"\nVERSION="2024.4"\nVERSION_CODENAME=kali-rolling\nID_LIKE=debian\nHOME_URL="https://www.kali.org/"\nSUPPORT_URL="https://forums.kali.org/"\nBUG_REPORT_URL="https://bugs.kali.org/"'
                        }
                    }
                },
                'usr': {
                    name: 'usr',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {
                        'bin': {
                            name: 'bin',
                            type: 'directory',
                            permissions: 'drwxr-xr-x',
                            owner: 'root',
                            group: 'root',
                            size: 4096,
                            modified: new Date(),
                            children: {}
                        },
                        'share': {
                            name: 'share',
                            type: 'directory',
                            permissions: 'drwxr-xr-x',
                            owner: 'root',
                            group: 'root',
                            size: 4096,
                            modified: new Date(),
                            children: {
                                'man': {
                                    name: 'man',
                                    type: 'directory',
                                    permissions: 'drwxr-xr-x',
                                    owner: 'root',
                                    group: 'root',
                                    size: 4096,
                                    modified: new Date(),
                                    children: {}
                                }
                            }
                        }
                    }
                },
                'bin': {
                    name: 'bin',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'sbin': {
                    name: 'sbin',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'var': {
                    name: 'var',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {
                        'log': {
                            name: 'log',
                            type: 'directory',
                            permissions: 'drwxr-xr-x',
                            owner: 'root',
                            group: 'root',
                            size: 4096,
                            modified: new Date(),
                            children: {
                                'syslog': {
                                    name: 'syslog',
                                    type: 'file',
                                    permissions: '-rw-r-----',
                                    owner: 'root',
                                    group: 'adm',
                                    size: 12345,
                                    modified: new Date(),
                                    content: 'Mar  1 12:00:00 kali kernel: [    0.000000] Linux version 6.6.0-kali7-amd64\nMar  1 12:00:01 kali systemd[1]: Starting Kali Linux Simulator...\nMar  1 12:00:02 kali network[1]: Network interface eth0 up\nMar  1 12:00:03 kali sshd[123]: Server listening on 0.0.0.0 port 22\nMar  1 12:00:04 kali cron[456]: (CRON) INFO (pid 456)\nMar  1 12:00:05 kali systemd[1]: Started Session 1 of user kali'
                                },
                                'auth.log': {
                                    name: 'auth.log',
                                    type: 'file',
                                    permissions: '-rw-r-----',
                                    owner: 'root',
                                    group: 'adm',
                                    size: 5678,
                                    modified: new Date(),
                                    content: 'Mar  1 12:00:00 kali login[123]: ROOT LOGIN on tty1\nMar  1 12:00:01 kali sshd[456]: Accepted password for kali from 192.168.1.100 port 54321 ssh2\nMar  1 12:00:02 kali sudo[789]: kali : TTY=pts/0 ; PWD=/home/kali ; USER=root ; COMMAND=/usr/bin/apt update\nMar  1 12:00:03 kali polkitd[1010]: Registered Authentication Agent for unix-process:1011:1234'
                                }
                            }
                        },
                        'tmp': {
                            name: 'tmp',
                            type: 'directory',
                            permissions: 'drwxrwxrwt',
                            owner: 'root',
                            group: 'root',
                            size: 4096,
                            modified: new Date(),
                            children: {}
                        }
                    }
                },
                'tmp': {
                    name: 'tmp',
                    type: 'directory',
                    permissions: 'drwxrwxrwt',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'opt': {
                    name: 'opt',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'root': {
                    name: 'root',
                    type: 'directory',
                    permissions: 'drwx------',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'boot': {
                    name: 'boot',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'dev': {
                    name: 'dev',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {
                        'null': {
                            name: 'null',
                            type: 'file',
                            permissions: 'crw-rw-rw-',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: ''
                        },
                        'zero': {
                            name: 'zero',
                            type: 'file',
                            permissions: 'crw-rw-rw-',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: ''
                        },
                        'random': {
                            name: 'random',
                            type: 'file',
                            permissions: 'crw-rw-rw-',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: ''
                        }
                    }
                },
                'proc': {
                    name: 'proc',
                    type: 'directory',
                    permissions: 'dr-xr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 0,
                    modified: new Date(),
                    children: {
                        'cpuinfo': {
                            name: 'cpuinfo',
                            type: 'file',
                            permissions: '-r--r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: 'processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\nmodel\t\t: 158\nmodel name\t: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz\nstepping\t: 10\nmicrocode\t: 0xf2\ncpu MHz\t\t: 3792.000\ncache size\t: 16384 KB\nphysical id\t: 0\nsiblings\t: 8\ncore id\t\t: 0\ncpu cores\t: 8\napicid\t\t: 0\ninitial apicid\t: 0\nfpu\t\t: yes\nfpu_exception\t: yes\ncpuid level\t: 22\nwp\t\t: yes\nflags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid dca sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb invpcid_single ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx avx512f avx512dq rdseed adx smap clflushopt clwb intel_pt avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d'
                        },
                        'meminfo': {
                            name: 'meminfo',
                            type: 'file',
                            permissions: '-r--r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: 'MemTotal:       16383792 kB\nMemFree:          8456789 kB\nMemAvailable:   12345678 kB\nBuffers:          456789 kB\nCached:          5678901 kB\nSwapCached:            0 kB\nActive:          3456789 kB\nInactive:        4567890 kB\nActive(anon):     2345678 kB\nInactive(anon):   1234567 kB\nActive(file):     1111111 kB\nInactive(file):   3333323 kB\nUnevictable:           0 kB\nMlocked:               0 kB\nSwapTotal:      8388608 kB\nSwapFree:       8388608 kB\nDirty:              12345 kB\nWriteback:             0 kB\nAnonPages:       2345678 kB\nMapped:           567890 kB\nShmem:            234567 kB\nSlab:             456789 kB\nSReclaimable:     345678 kB\nSUnreclaim:       111111 kB\nKernelStack:       56789 kB\nPageTables:        45678 kB\nNFS_Unstable:          0 kB\nBounce:                0 kB\nWritebackTmp:          0 kB\nCommitLimit:    16580604 kB\nCommitted_AS:    5678901 kB\nVmallocTotal:   34359738367 kB\nVmallocUsed:      567890 kB\nVmallocChunk:          0 kB\nPercpu:            56789 kB\nHardwareCorrupted:     0 kB\nAnonHugePages:         0 kB\nShmemHugePages:        0 kB\nShmemPmdMapped:        0 kB\nCmaTotal:              0 kB\nCmaFree:               0 kB\nHugePages_Total:       0\nHugePages_Free:        0\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nHugetlb:               0 kB\nDirectMap4k:      567890 kB\nDirectMap2M:     8456789 kB\nDirectMap1G:     8388608 kB'
                        },
                        'version': {
                            name: 'version',
                            type: 'file',
                            permissions: '-r--r--r--',
                            owner: 'root',
                            group: 'root',
                            size: 0,
                            modified: new Date(),
                            content: 'Linux version 6.6.0-kali7-amd64 (kali@kali) (gcc version 12.2.0 (Debian 12.2.0-14)) #1 SMP PREEMPT_DYNAMIC Kali 6.6.0-kali7-amd64 (2024-03-01)'
                        }
                    }
                },
                'sys': {
                    name: 'sys',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 0,
                    modified: new Date(),
                    children: {}
                },
                'run': {
                    name: 'run',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'mnt': {
                    name: 'mnt',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'media': {
                    name: 'media',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'srv': {
                    name: 'srv',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'lib': {
                    name: 'lib',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                },
                'lib64': {
                    name: 'lib64',
                    type: 'directory',
                    permissions: 'drwxr-xr-x',
                    owner: 'root',
                    group: 'root',
                    size: 4096,
                    modified: new Date(),
                    children: {}
                }
            }
        };
    }

    init() {
        // Initialize filesystem
    }

    updateUser(username) {
        this.currentUser = username;
        this.currentPath = `/home/${username}`;

        // Create home directory if it doesn't exist
        if (!this.root.children['home'].children[username]) {
            this.root.children['home'].children[username] = {
                name: username,
                type: 'directory',
                permissions: 'drwxr-xr-x',
                owner: username,
                group: username,
                size: 4096,
                modified: new Date(),
                children: {
                    'Desktop': {
                        name: 'Desktop',
                        type: 'directory',
                        permissions: 'drwxr-xr-x',
                        owner: username,
                        group: username,
                        size: 4096,
                        modified: new Date(),
                        children: {}
                    },
                    'Documents': {
                        name: 'Documents',
                        type: 'directory',
                        permissions: 'drwxr-xr-x',
                        owner: username,
                        group: username,
                        size: 4096,
                        modified: new Date(),
                        children: {}
                    },
                    'Downloads': {
                        name: 'Downloads',
                        type: 'directory',
                        permissions: 'drwxr-xr-x',
                        owner: username,
                        group: username,
                        size: 4096,
                        modified: new Date(),
                        children: {}
                    },
                    'welcome.txt': {
                        name: 'welcome.txt',
                        type: 'file',
                        permissions: '-rw-r--r--',
                        owner: username,
                        group: username,
                        size: 0,
                        modified: new Date(),
                        content: `Welcome to Kali Linux Simulator!\n\nHello, ${username}!\nThis is a web-based simulation of the Kali Linux operating system.\nYou can explore the file system, run commands, and use various security tools.\n\nType "help" to see available commands.\n\nEnjoy your hacking experience!`
                    }
                }
            };
        }
    }

    // Navigate to a path and return the directory
    navigate(path) {
        const normalizedPath = this.normalizePath(path);
        const parts = normalizedPath.split('/').filter(p => p);
        
        let current = this.root;
        
        for (const part of parts) {
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        
        return current;
    }

    // Get parent directory
    getParent(path) {
        const normalizedPath = this.normalizePath(path);
        const parts = normalizedPath.split('/').filter(p => p);
        
        if (parts.length === 0) {
            return null;
        }
        
        const parentPath = parts.slice(0, -1).join('/');
        return this.navigate('/' + parentPath);
    }

    // Get directory name from path
    getDirName(path) {
        const normalizedPath = this.normalizePath(path);
        const parts = normalizedPath.split('/').filter(p => p);
        return parts[parts.length - 1] || '/';
    }

    // Normalize path (resolve . and ..)
    normalizePath(path) {
        if (!path) return this.currentPath;
        
        // Handle absolute paths
        let normalized = path.startsWith('/') ? path : this.currentPath + '/' + path;
        
        // Split into parts
        const parts = normalized.split('/').filter(p => p);
        
        // Resolve . and ..
        const resolved = [];
        for (const part of parts) {
            if (part === '.') {
                continue;
            } else if (part === '..') {
                resolved.pop();
            } else {
                resolved.push(part);
            }
        }
        
        return '/' + resolved.join('/');
    }

    // Check if path exists
    exists(path) {
        return this.navigate(path) !== null;
    }

    // Check if path is a directory
    isDirectory(path) {
        const node = this.navigate(path);
        return node && node.type === 'directory';
    }

    // Check if path is a file
    isFile(path) {
        const node = this.navigate(path);
        return node && node.type === 'file';
    }

    // List directory contents
    list(path) {
        const dir = this.navigate(path);
        if (!dir || dir.type !== 'directory') {
            return null;
        }
        
        return Object.keys(dir.children).map(name => dir.children[name]);
    }

    // Read file content
    readFile(path) {
        const file = this.navigate(path);
        if (!file || file.type !== 'file') {
            return null;
        }
        
        return file.content;
    }

    // Write file content
    writeFile(path, content) {
        const dir = this.getParent(path);
        const name = this.getDirName(path);
        
        if (!dir) {
            return false;
        }
        
        dir.children[name] = {
            name: name,
            type: 'file',
            permissions: '-rw-r--r--',
            owner: this.currentUser,
            group: this.currentUser,
            size: content ? content.length : 0,
            modified: new Date(),
            content: content
        };
        
        return true;
    }

    // Create directory
    createDirectory(path) {
        const dir = this.getParent(path);
        const name = this.getDirName(path);
        
        if (!dir) {
            return false;
        }
        
        dir.children[name] = {
            name: name,
            type: 'directory',
            permissions: 'drwxr-xr-x',
            owner: this.currentUser,
            group: this.currentUser,
            size: 4096,
            modified: new Date(),
            children: {}
        };
        
        return true;
    }

    // Delete file or directory
    delete(path) {
        const dir = this.getParent(path);
        const name = this.getDirName(path);
        
        if (!dir || !dir.children[name]) {
            return false;
        }
        
        delete dir.children[name];
        return true;
    }

    // Copy file or directory
    copy(source, destination) {
        const sourceNode = this.navigate(source);
        if (!sourceNode) {
            return false;
        }
        
        const destDir = this.navigate(destination);
        if (!destDir || destDir.type !== 'directory') {
            return false;
        }
        
        destDir.children[sourceNode.name] = JSON.parse(JSON.stringify(sourceNode));
        return true;
    }

    // Move file or directory
    move(source, destination) {
        if (!this.copy(source, destination)) {
            return false;
        }
        
        return this.delete(source);
    }

    // Get file/directory info
    getFileInfo(path) {
        const node = this.navigate(path);
        if (!node) {
            return null;
        }
        
        return {
            name: node.name,
            type: node.type,
            permissions: node.permissions,
            owner: node.owner,
            group: node.group,
            size: node.size,
            modified: node.modified
        };
    }

    // Change current directory
    changeDirectory(path) {
        const normalizedPath = this.normalizePath(path);
        const dir = this.navigate(normalizedPath);
        
        if (dir && dir.type === 'directory') {
            this.currentPath = normalizedPath;
            return true;
        }
        
        return false;
    }

    // Get current working directory
    getCurrentPath() {
        return this.currentPath;
    }

    // Format file size
    formatSize(bytes) {
        if (bytes === 0) return '0';
        
        const k = 1024;
        const sizes = ['B', 'K', 'M', 'G', 'T'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + sizes[i];
    }

    // Format permissions
    formatPermissions(permissions) {
        const type = permissions.charAt(0);
        const user = permissions.substring(1, 4);
        const group = permissions.substring(4, 7);
        const other = permissions.substring(7, 10);
        
        return `${type} ${this.formatPermPart(user)} ${this.formatPermPart(group)} ${this.formatPermPart(other)}`;
    }

    formatPermPart(part) {
        let result = '';
        result += part.charAt(0) === 'r' ? 'r' : '-';
        result += part.charAt(1) === 'w' ? 'w' : '-';
        result += part.charAt(2) === 'x' ? 'x' : '-';
        return result;
    }

    // Get color for file type
    getColorForType(node) {
        if (node.type === 'directory') return 'var(--kali-blue)';
        if (node.permissions.includes('x')) return 'var(--kali-green)';
        if (node.name.startsWith('.')) return 'var(--text-secondary)';
        return 'var(--terminal-text)';
    }
}

// Export the filesystem
window.VirtualFileSystem = VirtualFileSystem;