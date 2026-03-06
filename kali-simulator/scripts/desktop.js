// Kali Linux Simulator - 桌面JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    console.log('桌面系统已初始化');
    
    // 初始化桌面系统
    initDesktopSystem();
    
    // 绑定桌面事件
    bindDesktopEvents();
    
    // 初始化桌面小部件
    initDesktopWidgets();
});

// 初始化桌面系统
function initDesktopSystem() {
    // 设置桌面背景
    setDesktopBackground();
    
    // 绑定桌面图标事件
    bindDesktopIcons();
    
    // 绑定右键菜单
    bindContextMenu();
    
    // 初始化桌面搜索
    initDesktopSearch();
    
    // 初始化桌面通知
    initDesktopNotifications();
    
    // 初始化桌面快捷键
    initDesktopShortcuts();
}

// 设置桌面背景
function setDesktopBackground() {
    const desktop = document.getElementById('desktop');
    
    // 可以在这里添加背景图片或动态背景
    // desktop.style.backgroundImage = 'url("assets/images/kali-desktop-bg.jpg")';
    
    // 添加背景模糊效果
    desktop.style.backdropFilter = 'blur(10px)';
}

// 绑定桌面图标事件
function bindDesktopIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        // 点击事件
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            if (appName) {
                openApplication(appName);
            }
        });
        
        // 双击事件
        icon.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            if (appName) {
                openApplication(appName);
            }
        });
        
        // 拖拽开始事件
        icon.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-app'));
            this.classList.add('dragging');
        });
        
        // 拖拽结束事件
        icon.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
        
        // 右键菜单
        icon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showContextMenu(e, 'desktop-icon', this);
        });
    });
    
    // 绑定拖拽到桌面事件
    const desktop = document.getElementById('desktop');
    desktop.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    desktop.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    desktop.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const appName = e.dataTransfer.getData('text/plain');
        if (appName) {
            openApplication(appName);
        }
    });
}

// 绑定桌面事件
function bindDesktopEvents() {
    // 点击桌面其他地方关闭开始菜单
    document.getElementById('desktop').addEventListener('click', function() {
        const startMenu = document.getElementById('start-menu');
        if (startMenu && !startMenu.classList.contains('hidden')) {
            startMenu.classList.remove('show');
            startMenu.classList.add('hide');
            
            setTimeout(() => {
                startMenu.classList.add('hidden');
            }, 300);
        }
    });
    
    // 桌面右键菜单
    document.getElementById('desktop').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showContextMenu(e, 'desktop', null);
    });
    
    // 桌面快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl + N - 打开新窗口
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            openNewWindow();
        }
        
        // Ctrl + R - 刷新桌面
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            refreshDesktop();
        }
        
        // F5 - 刷新桌面
        if (e.key === 'F5') {
            e.preventDefault();
            refreshDesktop();
        }
        
        // Ctrl + F - 搜索
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            focusDesktopSearch();
        }
        
        // Ctrl + Shift + N - 打开应用启动器
        if (e.ctrlKey && e.shiftKey && e.key === 'n') {
            e.preventDefault();
            showAppLauncher();
        }
    });
}

// 初始化桌面小部件
function initDesktopWidgets() {
    // 创建天气小部件
    createWeatherWidget();
    
    // 创建时钟小部件
    createTimeWidget();
    
    // 创建CPU小部件
    createCPUWidget();
    
    // 创建内存小部件
    createMemoryWidget();
}

// 创建天气小部件
function createWeatherWidget() {
    const widget = document.createElement('div');
    widget.className = 'desktop-widget weather';
    widget.innerHTML = `
        <div class="desktop-widget-header">
            <div class="desktop-widget-title">天气</div>
            <button class="desktop-widget-close">&times;</button>
        </div>
        <div class="desktop-widget-content">
            <div class="metric">
                <span class="metric-label">温度:</span>
                <span class="metric-value">25°C</span>
            </div>
            <div class="metric">
                <span class="metric-label">湿度:</span>
                <span class="metric-value">60%</span>
            </div>
            <div class="metric">
                <span class="metric-label">风速:</span>
                <span class="metric-value">15 km/h</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // 绑定关闭按钮
    widget.querySelector('.desktop-widget-close').addEventListener('click', function() {
        widget.classList.add('slide-out');
        setTimeout(() => {
            widget.remove();
        }, 300);
    });
}

// 创建时钟小部件
function createTimeWidget() {
    const widget = document.createElement('div');
    widget.className = 'desktop-widget clock';
    widget.innerHTML = `
        <div class="desktop-widget-header">
            <div class="desktop-widget-title">时钟</div>
            <button class="desktop-widget-close">&times;</button>
        </div>
        <div class="desktop-widget-content">
            <div class="metric">
                <span class="metric-label">时间:</span>
                <span class="metric-value" id="widget-clock">00:00:00</span>
            </div>
            <div class="metric">
                <span class="metric-label">日期:</span>
                <span class="metric-value" id="widget-date">2023-01-01</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // 更新时钟
    updateWidgetClock();
    setInterval(updateWidgetClock, 1000);
    
    // 绑定关闭按钮
    widget.querySelector('.desktop-widget-close').addEventListener('click', function() {
        widget.classList.add('slide-out');
        setTimeout(() => {
            widget.remove();
        }, 300);
    });
}

// 更新小部件时钟
function updateWidgetClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    document.getElementById('widget-clock').textContent = timeString;
    document.getElementById('widget-date').textContent = dateString;
}

// 创建CPU小部件
function createCPUWidget() {
    const widget = document.createElement('div');
    widget.className = 'desktop-widget cpu';
    widget.innerHTML = `
        <div class="desktop-widget-header">
            <div class="desktop-widget-title">CPU</div>
            <button class="desktop-widget-close">&times;</button>
        </div>
        <div class="desktop-widget-content">
            <div class="metric">
                <span class="metric-label">使用率:</span>
                <span class="metric-value" id="cpu-usage">0%</span>
            </div>
            <div class="metric">
                <span class="metric-label">温度:</span>
                <span class="metric-value" id="cpu-temp">35°C</span>
            </div>
            <div class="metric">
                <span class="metric-label">频率:</span>
                <span class="metric-value" id="cpu-frequency">2.4 GHz</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // 更新CPU信息
    updateCPUInfo();
    setInterval(updateCPUInfo, 2000);
    
    // 绑定关闭按钮
    widget.querySelector('.desktop-widget-close').addEventListener('click', function() {
        widget.classList.add('slide-out');
        setTimeout(() => {
            widget.remove();
        }, 300);
    });
}

// 更新CPU信息
function updateCPUInfo() {
    // 模拟CPU使用率
    const cpuUsage = Math.floor(Math.random() * 100);
    document.getElementById('cpu-usage').textContent = cpuUsage + '%';
    
    // 模拟CPU温度
    const cpuTemp = Math.floor(Math.random() * 30) + 40;
    document.getElementById('cpu-temp').textContent = cpuTemp + '°C';
    
    // 模拟CPU频率
    const cpuFrequency = (Math.random() * 2 + 2).toFixed(1) + ' GHz';
    document.getElementById('cpu-frequency').textContent = cpuFrequency;
}

// 创建内存小部件
function createMemoryWidget() {
    const widget = document.createElement('div');
    widget.className = 'desktop-widget memory';
    widget.innerHTML = `
        <div class="desktop-widget-header">
            <div class="desktop-widget-title">内存</div>
            <button class="desktop-widget-close">&times;</button>
        </div>
        <div class="desktop-widget-content">
            <div class="metric">
                <span class="metric-label">已使用:</span>
                <span class="metric-value" id="memory-used">2.1 GB</span>
            </div>
            <div class="metric">
                <span class="metric-label">总容量:</span>
                <span class="metric-value" id="memory-total">8.0 GB</span>
            </div>
            <div class="metric">
                <span class="metric-label">使用率:</span>
                <span class="metric-value" id="memory-usage">26%</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // 更新内存信息
    updateMemoryInfo();
    setInterval(updateMemoryInfo, 2000);
    
    // 绑定关闭按钮
    widget.querySelector('.desktop-widget-close').addEventListener('click', function() {
        widget.classList.add('slide-out');
        setTimeout(() => {
            widget.remove();
        }, 300);
    });
}

// 更新内存信息
function updateMemoryInfo() {
    // 模拟内存使用情况
    const memoryUsed = (Math.random() * 6 + 2).toFixed(1) + ' GB';
    document.getElementById('memory-used').textContent = memoryUsed;
    
    const memoryTotal = '8.0 GB';
    document.getElementById('memory-total').textContent = memoryTotal;
    
    const memoryUsage = Math.floor((parseFloat(memoryUsed) / 8) * 100);
    document.getElementById('memory-usage').textContent = memoryUsage + '%';
}

// 初始化桌面搜索
function initDesktopSearch() {
    // 创建搜索框
    const search = document.createElement('div');
    search.className = 'desktop-search';
    search.innerHTML = `
        <input type="text" placeholder="搜索桌面..." id="desktop-search-input">
    `;
    
    document.body.appendChild(search);
    
    // 绑定搜索输入
    const searchInput = document.getElementById('desktop-search-input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterDesktopIcons(query);
    });
    
    // 绑定搜索框焦点
    searchInput.addEventListener('focus', function() {
        this.select();
    });
}

// 过滤桌面图标
function filterDesktopIcons(query) {
    const icons = document.querySelectorAll('.desktop-icon');
    
    icons.forEach(icon => {
        const appName = icon.getAttribute('data-app');
        const appTitle = icon.querySelector('span').textContent.toLowerCase();
        
        if (appName.includes(query) || appTitle.includes(query)) {
            icon.style.display = 'flex';
        } else {
            icon.style.display = 'none';
        }
    });
}

// 初始化桌面通知
function initDesktopNotifications() {
    // 创建通知容器
    const notificationQueue = document.createElement('div');
    notificationQueue.className = 'desktop-notification-queue';
    document.body.appendChild(notificationQueue);
    
    // 绑定通知关闭按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.desktop-notification-close')) {
            const notification = e.target.closest('.desktop-notification');
            if (notification) {
                notification.classList.add('slide-out');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }
    });
}

// 显示桌面通知
function showDesktopNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `desktop-notification ${type}`;
    notification.innerHTML = `
        <div class="desktop-notification-header">
            <div class="desktop-notification-title">${title}</div>
            <button class="desktop-notification-close">&times;</button>
        </div>
        <div class="desktop-notification-message">${message}</div>
    `;
    
    document.querySelector('.desktop-notification-queue').appendChild(notification);
    
    // 自动移除通知
    setTimeout(() => {
        notification.classList.add('slide-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// 初始化桌面快捷键
function initDesktopShortcuts() {
    // 创建快捷键提示
    const shortcuts = document.createElement('div');
    shortcuts.className = 'desktop-shortcuts hidden';
    shortcuts.innerHTML = `
        <h3>桌面快捷键</h3>
        <div class="desktop-shortcuts-grid">
            <div class="desktop-shortcut-item">
                <span class="desktop-shortcut-key">Ctrl+N</span>
                <span>打开新窗口</span>
            </div>
            <div class="desktop-shortcut-item">
                <span class="desktop-shortcut-key">Ctrl+R</span>
                <span>刷新桌面</span>
            </div>
            <div class="desktop-shortcut-item">
                <span class="desktop-shortcut-key">F5</span>
                <span>刷新桌面</span>
            </div>
            <div class="desktop-shortcut-item">
                <span class="desktop-shortcut-key">Ctrl+F</span>
                <span>搜索</span>
            </div>
            <div class="desktop-shortcut-item">
                <span class="desktop-shortcut-key">Ctrl+Shift+N</span>
                <span>打开应用启动器</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(shortcuts);
    
    // 绑定快捷键提示显示
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            toggleShortcuts();
        }
    });
    
    // 绑定快捷键提示关闭
    const closeBtn = shortcuts.querySelector('.desktop-shortcut-item');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            shortcuts.classList.add('slide-out');
            setTimeout(() => {
                shortcuts.remove();
            }, 300);
        });
    }
}

// 切换快捷键提示
function toggleShortcuts() {
    const shortcuts = document.querySelector('.desktop-shortcuts');
    if (shortcuts) {
        if (shortcuts.classList.contains('hidden')) {
            shortcuts.classList.remove('hidden');
            shortcuts.classList.add('show');
        } else {
            shortcuts.classList.remove('show');
            shortcuts.classList.add('hide');
            
            setTimeout(() => {
                shortcuts.classList.add('hidden');
            }, 300);
        }
    }
}

// 打开新窗口
function openNewWindow() {
    // 这里可以实现打开新窗口的逻辑
    console.log('打开新窗口');
}

// 刷新桌面
function refreshDesktop() {
    // 这里可以实现刷新桌面的逻辑
    console.log('刷新桌面');
}

// 聚焦桌面搜索
function focusDesktopSearch() {
    const searchInput = document.getElementById('desktop-search-input');
    if (searchInput) {
        searchInput.focus();
    }
}

// 显示应用启动器
function showAppLauncher() {
    // 这里可以实现显示应用启动器的逻辑
    console.log('显示应用启动器');
}

// 显示右键菜单
function showContextMenu(event, contextType, element) {
    // 移除现有的右键菜单
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // 创建新的右键菜单
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = generateContextMenuHTML(contextType, element);
    
    // 设置位置
    menu.style.left = event.clientX + 'px';
    menu.style.top = event.clientY + 'px';
    
    // 防止菜单超出屏幕
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        menu.style.left = (event.clientX - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
        menu.style.top = (event.clientY - rect.height) + 'px';
    }
    
    document.body.appendChild(menu);
    
    // 绑定菜单项事件
    bindContextMenuItems(menu, contextType, element);
    
    // 绑定关闭菜单事件
    function closeMenu() {
        menu.classList.add('hidden');
        setTimeout(() => {
            menu.remove();
        }, 300);
    }
    
    // 点击其他地方关闭菜单
    document.addEventListener('click', closeMenu, { once: true });
}

// 生成右键菜单HTML
function generateContextMenuHTML(contextType, element) {
    const items = [];
    
    switch(contextType) {
        case 'desktop':
            items.push({ icon: 'fas fa-refresh', text: '刷新', action: 'refresh' });
            items.push({ icon: 'fas fa-cog', text: '桌面设置', action: 'settings' });
            items.push({ icon: 'fas fa-lock', text: '锁定屏幕', action: 'lock' });
            break;
            
        case 'desktop-icon':
            items.push({ icon: 'fas fa-folder-open', text: '打开', action: 'open' });
            items.push({ icon: 'fas fa-copy', text: '复制', action: 'copy' });
            items.push({ icon: 'fas fa-cut', text: '剪切', action: 'cut' });
            items.push({ icon: 'fas fa-trash', text: '删除', action: 'delete' });
            items.push({ icon: 'fas fa-cog', text: '属性', action: 'properties' });
            break;
            
        case 'window':
            items.push({ icon: 'fas fa-window-minimize', text: '最小化', action: 'minimize' });
            items.push({ icon: 'fas fa-window-maximize', text: '最大化', action: 'maximize' });
            items.push({ icon: 'fas fa-times', text: '关闭', action: 'close' });
            break;
            
        case 'file':
            items.push({ icon: 'fas fa-folder-open', text: '打开', action: 'open' });
            items.push({ icon: 'fas fa-rename', text: '重命名', action: 'rename' });
            items.push({ icon: 'fas fa-copy', text: '复制', action: 'copy' });
            items.push({ icon: 'fas fa-cut', text: '剪切', action: 'cut' });
            items.push({ icon: 'fas fa-trash', text: '删除', action: 'delete' });
            break;
    }
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="context-menu-item" data-action="${item.action}">
                <i class="${item.icon}"></i>
                <span>${item.text}</span>
            </div>
        `;
    });
    
    return html;
}

// 绑定右键菜单项事件
function bindContextMenuItems(menu, contextType, element) {
    const menuItems = menu.querySelectorAll('.context-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleContextMenuAction(action, contextType, element);
        });
    });
}

// 处理右键菜单操作
function handleContextMenuAction(action, contextType, element) {
    switch(action) {
        case 'refresh':
            refreshDesktop();
            break;
            
        case 'settings':
            openApplication('settings');
            break;
            
        case 'lock':
            lockScreen();
            break;
            
        case 'open':
            if (contextType === 'desktop-icon') {
                const appName = element.getAttribute('data-app');
                if (appName) {
                    openApplication(appName);
                }
            }
            break;
            
        case 'minimize':
            if (contextType === 'window') {
                const window = element.closest('.window');
                if (window) {
                    minimizeWindow(window);
                }
            }
            break;
            
        case 'maximize':
            if (contextType === 'window') {
                const window = element.closest('.window');
                if (window) {
                    maximizeWindow(window);
                }
            }
            break;
            
        case 'close':
            if (contextType === 'window') {
                const window = element.closest('.window');
                if (window) {
                    closeWindow(window);
                }
            }
            break;
    }
}

// 锁定屏幕
function lockScreen() {
    const lockScreen = document.createElement('div');
    lockScreen.className = 'desktop-lock-screen';
    lockScreen.innerHTML = `
        <div class="desktop-lock-screen-content">
            <div class="desktop-lock-screen-time" id="lock-screen-time">00:00:00</div>
            <div class="desktop-lock-screen-date" id="lock-screen-date">2023-01-01</div>
            <button class="desktop-lock-screen-unlock" id="unlock-screen">解锁</button>
        </div>
    `;
    
    document.body.appendChild(lockScreen);
    
    // 更新锁定屏幕时钟
    updateLockScreenTime();
    setInterval(updateLockScreenTime, 1000);
    
    // 绑定解锁按钮
    document.getElementById('unlock-screen').addEventListener('click', function() {
        lockScreen.classList.add('slide-out');
        setTimeout(() => {
            lockScreen.remove();
        }, 300);
    });
    
    // 绑定键盘解锁
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            lockScreen.classList.add('slide-out');
            setTimeout(() => {
                lockScreen.remove();
            }, 300);
        }
    });
}

// 更新锁定屏幕时钟
function updateLockScreenTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    document.getElementById('lock-screen-time').textContent = timeString;
    document.getElementById('lock-screen-date').textContent = dateString;
}

// 打开应用程序
function openApplication(appName) {
    const windowId = appName + '-window';
    const existingWindow = document.getElementById(windowId);
    
    if (existingWindow) {
        // 如果窗口已存在，激活它
        existingWindow.classList.remove('minimized');
        existingWindow.style.zIndex = '1002';
        existingWindow.classList.add('focused');
        updateTaskbarIcons();
        return;
    }
    
    // 创建新窗口
    const window = document.getElementById(windowId);
    if (window) {
        window.classList.remove('hidden');
        window.classList.add('focused');
        window.style.zIndex = '1002';
        
        // 更新任务栏图标
        updateTaskbarIcons();
        
        // 显示窗口动画
        setTimeout(() => {
            window.classList.remove('hide');
        }, 10);
    }
}

// 更新任务栏图标
function updateTaskbarIcons() {
    const taskbarApps = document.getElementById('taskbar-apps');
    taskbarApps.innerHTML = '';
    
    const windows = document.querySelectorAll('.window:not(.hidden)');
    
    windows.forEach(window => {
        const appName = window.getAttribute('data-app');
        if (!appName) return;
        
        const taskbarApp = document.createElement('div');
        taskbarApp.className = 'taskbar-app';
        taskbarApp.setAttribute('data-app', appName);
        
        // 添加图标
        const icon = document.createElement('i');
        icon.className = getApplicationIcon(appName);
        taskbarApp.appendChild(icon);
        
        // 添加标题
        const title = document.createElement('span');
        title.textContent = getApplicationTitle(appName);
        taskbarApp.appendChild(title);
        
        // 添加关闭按钮
        const closeBtn = document.createElement('div');
        closeBtn.className = 'taskbar-app-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWindow(window);
        });
        taskbarApp.appendChild(closeBtn);
        
        // 点击事件
        taskbarApp.addEventListener('click', function() {
            if (window.classList.contains('minimized')) {
                window.classList.remove('minimized');
            }
            window.style.zIndex = '1002';
            window.classList.add('focused');
            updateTaskbarIcons();
        });
        
        taskbarApps.appendChild(taskbarApp);
    });
}

// 获取应用程序图标
function getApplicationIcon(appName) {
    const icons = {
        'terminal': 'fas fa-terminal',
        'browser': 'fas fa-globe',
        'files': 'fas fa-folder',
        'settings': 'fas fa-cog',
        'nmap': 'fas fa-network-wired',
        'metasploit': 'fas fa-bug',
        'wireshark': 'fas fa-eye'
    };
    return icons[appName] || 'fas fa-window-restore';
}

// 获取应用程序标题
function getApplicationTitle(appName) {
    const titles = {
        'terminal': '终端',
        'browser': '浏览器',
        'files': '文件管理器',
        'settings': '设置',
        'nmap': 'Nmap',
        'metasploit': 'Metasploit',
        'wireshark': 'Wireshark'
    };
    return titles[appName] || appName;
}

// 最小化窗口
function minimizeWindow(window) {
    window.classList.add('minimized');
    window.classList.remove('focused');
    
    // 更新任务栏图标状态
    updateTaskbarIcons();
    
    // 显示窗口动画
    setTimeout(() => {
        window.classList.remove('minimized');
    }, 300);
}

// 最大化窗口
function maximizeWindow(window) {
    if (window.classList.contains('maximized')) {
        // 恢复窗口
        window.classList.remove('maximized');
        window.style.left = window.dataset.originalLeft || '100px';
        window.style.top = window.dataset.originalTop || '100px';
        window.style.width = window.dataset.originalWidth || '600px';
        window.style.height = window.dataset.originalHeight || '400px';
    } else {
        // 保存原始位置和大小
        window.dataset.originalLeft = window.style.left;
        window.dataset.originalTop = window.style.top;
        window.dataset.originalWidth = window.style.width;
        window.dataset.originalHeight = window.style.height;
        
        // 最大化窗口
        window.classList.add('maximized');
        window.style.left = '0px';
        window.style.top = '0px';
        window.style.width = '100%';
        window.style.height = 'calc(100% - 40px)';
    }
}

// 关闭窗口
function closeWindow(window) {
    window.classList.add('hide');
    
    setTimeout(() => {
        window.remove();
        
        // 更新任务栏图标状态
        updateTaskbarIcons();
        
        // 如果没有窗口，隐藏任务栏
        const remainingWindows = document.querySelectorAll('.window');
        if (remainingWindows.length === 0) {
            document.getElementById('taskbar').classList.add('hidden');
        }
    }, 300);
}