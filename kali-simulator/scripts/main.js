// Main Application Entry Point for Kali Linux Simulator
class KaliSimulator {
    constructor() {
        this.booted = false;
        this.loggedIn = false;
        this.filesystem = null;
        this.windowManager = null;
        this.applications = null;
        
        this.init();
    }

    init() {
        // Initialize components
        this.filesystem = new VirtualFileSystem();
        this.windowManager = new WindowManager();
        this.applications = new Applications(this.windowManager, this.filesystem);
        
        // Start boot sequence
        this.startBootSequence();
    }

    startBootSequence() {
        const bootScreen = document.getElementById('boot-screen');
        const bootLines = document.querySelectorAll('.boot-line');
        
        // Simulate boot process
        setTimeout(() => {
            this.showLoginScreen();
        }, 4000);
    }

    showLoginScreen() {
        const bootScreen = document.getElementById('boot-screen');
        const loginScreen = document.getElementById('login-screen');
        
        bootScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
        
        this.bindLoginEvents();
    }

    bindLoginEvents() {
        const loginForm = document.getElementById('login-form');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const guestLogin = document.getElementById('guest-login');
        const terminalLogin = document.getElementById('terminal-login');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim() || 'kali';
            const password = passwordInput.value;

            // 密码必须是 kali
            if (password === 'kali') {
                this.login('normal', username);
            } else {
                this.showLoginError();
            }
        });

        guestLogin.addEventListener('click', () => {
            this.login('guest', 'guest');
        });

        terminalLogin.addEventListener('click', () => {
            this.login('terminal', 'kali');
        });
    }

    showLoginError() {
        const passwordInput = document.getElementById('password');
        passwordInput.style.borderColor = '#aa5555';
        passwordInput.classList.add('shake');
        
        setTimeout(() => {
            passwordInput.style.borderColor = '';
            passwordInput.classList.remove('shake');
            passwordInput.value = '';
        }, 500);
    }

    login(mode = 'normal', username = 'kali') {
        this.loggedIn = true;
        this.username = username;

        // Update filesystem with the username
        this.filesystem.currentUser = username;
        this.filesystem.updateUser(username);

        // Update terminal user
        if (this.terminal) {
            this.terminal.updateUser(username);
        }

        if (mode === 'terminal') {
            // Launch terminal only mode
            this.launchTerminalOnly();
        } else {
            // Launch full desktop
            this.launchDesktop();
        }
    }

    launchTerminalOnly() {
        const loginScreen = document.getElementById('login-screen');
        loginScreen.style.display = 'none';
        
        // Create fullscreen terminal
        const terminal = this.applications.launch('terminal');
        terminal.style.position = 'fixed';
        terminal.style.top = '0';
        terminal.style.left = '0';
        terminal.style.width = '100%';
        terminal.style.height = '100%';
        terminal.style.borderRadius = '0';
        terminal.style.zIndex = '10000';
    }

    launchDesktop() {
        const loginScreen = document.getElementById('login-screen');
        const desktop = document.getElementById('desktop');
        
        loginScreen.style.display = 'none';
        desktop.style.display = 'block';
        
        this.booted = true;
        
        // Initialize desktop
        this.updateClock();
        this.bindDesktopEvents();
        
        // Show welcome notification
        setTimeout(() => {
            this.showNotification('Welcome', 'Welcome to Kali Linux Simulator! Type "help" in the terminal for available commands.');
        }, 1000);
    }

    bindDesktopEvents() {
        // Menu button
        const menuButton = document.getElementById('menu-button');
        const appMenu = document.getElementById('app-menu');
        
        menuButton.addEventListener('click', () => {
            appMenu.style.display = appMenu.style.display === 'none' ? 'flex' : 'none';
        });
        
        // App items
        const appItems = document.querySelectorAll('.app-item');
        appItems.forEach(item => {
            item.addEventListener('click', () => {
                const appId = item.dataset.app;
                if (appId) {
                    this.applications.launch(appId);
                    appMenu.style.display = 'none';
                }
            });
        });
        
        // Desktop shortcuts
        const desktopShortcuts = document.querySelectorAll('.desktop-shortcut');
        desktopShortcuts.forEach(shortcut => {
            shortcut.addEventListener('dblclick', () => {
                const appId = shortcut.dataset.app;
                if (appId) {
                    this.applications.launch(appId);
                }
            });
            
            shortcut.addEventListener('click', (e) => {
                // Remove active class from all shortcuts
                desktopShortcuts.forEach(s => s.classList.remove('active'));
                shortcut.classList.add('active');
            });
        });
        
        // Panel icons
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        desktopIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const appId = icon.dataset.app;
                if (appId) {
                    this.applications.launch(appId);
                }
            });
        });
        
        // Dock items
        const dockItems = document.querySelectorAll('.dock-item');
        dockItems.forEach(item => {
            item.addEventListener('click', () => {
                const appId = item.dataset.app;
                if (appId) {
                    this.applications.launch(appId);
                }
            });
        });
        
        // Show desktop button
        const showDesktop = document.getElementById('show-desktop');
        showDesktop.addEventListener('click', () => {
            this.windowManager.minimizeAllWindows();
        });
        
        // Power icon
        const powerIcon = document.getElementById('power-icon');
        powerIcon.addEventListener('click', () => {
            this.showPowerMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#app-menu') && !e.target.closest('#menu-button')) {
                appMenu.style.display = 'none';
            }
        });
        
        // App search
        const appSearch = document.getElementById('app-search');
        appSearch.addEventListener('input', (e) => {
            this.filterApps(e.target.value);
        });
        
        // Clock update
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    filterApps(searchTerm) {
        const appItems = document.querySelectorAll('.app-item');
        const term = searchTerm.toLowerCase();
        
        appItems.forEach(item => {
            const name = item.querySelector('.app-name').textContent.toLowerCase();
            if (name.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateClock() {
        const clock = document.getElementById('clock');
        const date = document.getElementById('date');
        
        const now = new Date();
        
        clock.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        date.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">${title}</span>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-body">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showPowerMenu() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal" style="width: 300px;">
                <div class="modal-header">
                    <span class="modal-title">Power Menu</span>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <button class="form-button" style="width: 100%; margin-bottom: 10px;" data-action="shutdown">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
                            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                        </svg>
                        Shutdown
                    </button>
                    <button class="form-button secondary" style="width: 100%;" data-action="restart">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                        Restart
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const closeBtn = overlay.querySelector('.modal-close');
        const shutdownBtn = overlay.querySelector('[data-action="shutdown"]');
        const restartBtn = overlay.querySelector('[data-action="restart"]');
        
        closeBtn.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        
        shutdownBtn.addEventListener('click', () => {
            overlay.remove();
            this.shutdown();
        });
        
        restartBtn.addEventListener('click', () => {
            overlay.remove();
            this.restart();
        });
    }

    shutdown() {
        this.showNotification('Shutdown', 'Shutting down Kali Linux Simulator...');
        
        setTimeout(() => {
            // Close all windows
            this.windowManager.closeAllWindows();
            
            // Show shutdown screen
            const desktop = document.getElementById('desktop');
            desktop.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="#557799" style="margin-bottom: 20px;">
                        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                    </svg>
                    <p style="color: #557799; font-size: 18px;">System Halted</p>
                    <p style="color: #888; font-size: 14px; margin-top: 10px;">You can now close this tab.</p>
                </div>
            `;
        }, 1000);
    }

    restart() {
        this.showNotification('Restart', 'Restarting Kali Linux Simulator...');
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    getFileSystem() {
        return this.filesystem;
    }

    getWindowManager() {
        return this.windowManager;
    }

    getApplications() {
        return this.applications;
    }
}

// Initialize the simulator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.kaliSimulator = new KaliSimulator();
});

// Export the simulator class
window.KaliSimulator = KaliSimulator;