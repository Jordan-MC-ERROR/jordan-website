// 俄罗斯方块游戏主逻辑
class TetrisGame {
    constructor() {
        // 游戏常量
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = 30;
        
        // 游戏状态
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.highScore = localStorage.getItem('tetrisHighScore') || 0;
        this.gameOver = false;
        this.isPaused = true;
        this.dropInterval = 1000; // 初始下落间隔（毫秒）
        this.dropCounter = 0;
        this.lastTime = 0;
        
        // 方块定义（七种经典俄罗斯方块）
        this.PIECES = [
            // I
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            // J
            [
                [2, 0, 0],
                [2, 2, 2],
                [0, 0, 0]
            ],
            // L
            [
                [0, 0, 3],
                [3, 3, 3],
                [0, 0, 0]
            ],
            // O
            [
                [4, 4],
                [4, 4]
            ],
            // S
            [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0]
            ],
            // T
            [
                [0, 6, 0],
                [6, 6, 6],
                [0, 0, 0]
            ],
            // Z
            [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0]
            ]
        ];
        
        // 方块颜色（对应上面的数字）
        this.COLORS = [
            '#000000', // 0: 空
            '#00FFFF', // 1: I - 青色
            '#0000FF', // 2: J - 蓝色
            '#FFA500', // 3: L - 橙色
            '#FFFF00', // 4: O - 黄色
            '#00FF00', // 5: S - 绿色
            '#800080', // 6: T - 紫色
            '#FF0000'  // 7: Z - 红色
        ];
        
        // DOM元素
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextPieceCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        // UI元素
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');
        this.highScoreElement = document.getElementById('highScore');
        this.gameOverlay = document.getElementById('gameOverlay');
        this.overlayTitle = document.getElementById('overlayTitle');
        this.overlayText = document.getElementById('overlayText');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.difficultySelect = document.getElementById('difficulty');
        this.soundToggle = document.getElementById('soundToggle');
        this.themeToggle = document.getElementById('themeToggle');
        
        // 音频上下文
        this.audioContext = null;
        this.initAudio();
        
        // 初始化
        this.init();
    }
    
    initAudio() {
        // 初始化Web Audio API
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API不支持');
        }
    }
    
    playMoveSound() {
        if (!this.soundToggle.checked || !this.audioContext) return;
        this.playTone(440, 0.1, 'sine');
    }
    
    playRotateSound() {
        if (!this.soundToggle.checked || !this.audioContext) return;
        this.playTone(330, 0.1, 'square');
    }
    
    playClearSound() {
        if (!this.soundToggle.checked || !this.audioContext) return;
        this.playMelody([523, 659, 784], [0.15, 0.15, 0.2], 'sine');
    }
    
    playGameOverSound() {
        if (!this.soundToggle.checked || !this.audioContext) return;
        this.playMelody([392, 349, 330, 294], [0.3, 0.3, 0.3, 0.5], 'sawtooth');
    }
    
    playDropSound() {
        if (!this.soundToggle.checked || !this.audioContext) return;
        this.playTone(220, 0.15, 'triangle');
    }
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playMelody(frequencies, durations, type = 'sine') {
        if (!this.audioContext) return;
        
        let startTime = this.audioContext.currentTime;
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = type;
            
            const duration = durations[index] || 0.2;
            
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
            
            startTime += duration;
        });
    }
    
    init() {
        // 初始化游戏板
        this.createBoard();
        
        // 生成第一个方块
        this.currentPiece = this.createPiece();
        this.nextPiece = this.createPiece();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 更新UI
        this.updateUI();
        
        // 开始游戏循环
        requestAnimationFrame((time) => this.gameLoop(time));
        
        // 显示开始界面
        this.showStartScreen();
    }
    
    createBoard() {
        this.board = Array.from({ length: this.BOARD_HEIGHT }, () => 
            Array(this.BOARD_WIDTH).fill(0)
        );
    }
    
    createPiece() {
        const pieceIndex = Math.floor(Math.random() * this.PIECES.length);
        const piece = this.PIECES[pieceIndex];
        
        return {
            shape: piece,
            color: this.COLORS[pieceIndex + 1],
            x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(piece[0].length / 2),
            y: 0
        };
    }
    
    setupEventListeners() {
        // 键盘控制
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // 按钮事件
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        // 设置变化
        this.difficultySelect.addEventListener('change', () => this.updateDifficulty());
        this.soundToggle.addEventListener('change', () => this.updateSound());
        this.themeToggle.addEventListener('change', () => this.updateTheme());
    }
    
    handleKeyDown(e) {
        if (this.gameOver || this.isPaused) {
            if (e.code === 'Space') {
                this.startGame();
            }
            return;
        }
        
        switch(e.code) {
            case 'ArrowLeft':
                this.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                this.movePiece(1, 0);
                break;
            case 'ArrowDown':
                this.movePiece(0, 1);
                break;
            case 'ArrowUp':
                this.rotatePiece();
                break;
            case 'Space':
                this.hardDrop();
                break;
            case 'KeyP':
                this.togglePause();
                break;
            case 'KeyR':
                this.restartGame();
                break;
        }
    }
    
    movePiece(dx, dy) {
        if (!this.currentPiece) return;
        
        this.currentPiece.x += dx;
        this.currentPiece.y += dy;
        
        if (this.checkCollision()) {
            this.currentPiece.x -= dx;
            this.currentPiece.y -= dy;
            
            if (dy > 0) {
                this.lockPiece();
                return;
            }
        } else {
            if (dx !== 0 || dy !== 0) {
                this.playMoveSound();
            }
        }
        
        this.draw();
    }
    
    rotatePiece() {
        if (!this.currentPiece) return;
        
        const originalShape = this.currentPiece.shape;
        const rows = originalShape.length;
        const cols = originalShape[0].length;
        
        // 创建旋转后的形状
        const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                rotated[x][rows - 1 - y] = originalShape[y][x];
            }
        }
        
        // 保存原始形状
        this.currentPiece.shape = rotated;
        
        // 检查碰撞
        if (this.checkCollision()) {
            // 如果碰撞，恢复原始形状
            this.currentPiece.shape = originalShape;
        } else {
            this.playRotateSound();
        }
        
        this.draw();
    }
    
    hardDrop() {
        if (!this.currentPiece) return;
        
        while (!this.checkCollision(0, 1)) {
            this.currentPiece.y++;
        }
        
        this.playDropSound();
        this.lockPiece();
    }
    
    checkCollision(dx = 0, dy = 0) {
        const piece = this.currentPiece;
        if (!piece) return true;
        
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x + dx;
                    const newY = piece.y + y + dy;
                    
                    // 检查边界
                    if (newX < 0 || newX >= this.BOARD_WIDTH || newY >= this.BOARD_HEIGHT) {
                        return true;
                    }
                    
                    // 检查与已锁定方块的碰撞
                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    lockPiece() {
        const piece = this.currentPiece;
        
        // 将方块锁定到游戏板
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardY = piece.y + y;
                    const boardX = piece.x + x;
                    
                    if (boardY >= 0) {
                        // 找到颜色索引
                        const colorIndex = this.COLORS.indexOf(piece.color);
                        this.board[boardY][boardX] = colorIndex;
                    }
                }
            }
        }
        
        // 检查并清除完整的行
        this.clearLines();
        
        // 生成新方块
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.createPiece();
        
        // 检查游戏是否结束
        if (this.checkCollision()) {
            this.gameOver = true;
            this.showGameOverScreen();
            this.playGameOverSound();
            
            // 更新最高分
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('tetrisHighScore', this.highScore);
            }
        }
        
        this.draw();
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                // 移除该行
                this.board.splice(y, 1);
                // 在顶部添加新行
                this.board.unshift(Array(this.BOARD_WIDTH).fill(0));
                linesCleared++;
                y++; // 重新检查同一位置（因为行已下移）
            }
        }
        
        if (linesCleared > 0) {
            // 更新分数
            const linePoints = [40, 100, 300, 1200]; // 1, 2, 3, 4行的分数
            this.score += linePoints[linesCleared - 1] * this.level;
            this.lines += linesCleared;
            
            // 更新等级
            this.level = Math.floor(this.lines / 10) + 1;
            
            // 更新下落速度
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
            
            // 播放音效
            this.playClearSound();
            
            // 更新UI
            this.updateUI();
        }
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格
        this.drawGrid();
        
        // 绘制已锁定的方块
        this.drawBoard();
        
        // 绘制当前方块
        this.drawPiece(this.currentPiece, this.ctx);
        
        // 绘制下一个方块预览
        this.drawNextPiece();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        // 垂直线
        for (let x = 0; x <= this.BOARD_WIDTH; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.BLOCK_SIZE, 0);
            this.ctx.lineTo(x * this.BLOCK_SIZE, this.canvas.height);
            this.ctx.stroke();
        }
        
        // 水平线
        for (let y = 0; y <= this.BOARD_HEIGHT; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.BLOCK_SIZE);
            this.ctx.lineTo(this.canvas.width, y * this.BLOCK_SIZE);
            this.ctx.stroke();
        }
    }
    
    drawBoard() {
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                if (this.board[y][x]) {
                    this.drawBlock(x, y, this.COLORS[this.board[y][x]], this.ctx);
                }
            }
        }
    }
    
    drawPiece(piece, ctx) {
        if (!piece) return;
        
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.drawBlock(piece.x + x, piece.y + y, piece.color, ctx);
                }
            }
        }
    }
    
    drawBlock(x, y, color, ctx) {
        const blockSize = this.BLOCK_SIZE;
        
        // 方块主体
        ctx.fillStyle = color;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        
        // 方块边框（3D效果）
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
        
        // 高光效果
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, 3);
        ctx.fillRect(x * blockSize, y * blockSize, 3, blockSize);
        
        // 阴影效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x * blockSize + blockSize - 3, y * blockSize, 3, blockSize);
        ctx.fillRect(x * blockSize, y * blockSize + blockSize - 3, blockSize, 3);
    }
    
    drawNextPiece() {
        // 清空下一个方块画布
        this.nextCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (this.nextPiece) {
            // 计算居中位置
            const pieceWidth = this.nextPiece.shape[0].length * 20;
            const pieceHeight = this.nextPiece.shape.length * 20;
            const offsetX = (this.nextCanvas.width - pieceWidth) / 2;
            const offsetY = (this.nextCanvas.height - pieceHeight) / 2;
            
            // 绘制下一个方块
            for (let y = 0; y < this.nextPiece.shape.length; y++) {
                for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
                    if (this.nextPiece.shape[y][x]) {
                        this.nextCtx.fillStyle = this.nextPiece.color;
                        this.nextCtx.fillRect(
                            offsetX + x * 20,
                            offsetY + y * 20,
                            18, 18
                        );
                        
                        // 边框
                        this.nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                        this.nextCtx.lineWidth = 1;
                        this.nextCtx.strokeRect(
                            offsetX + x * 20,
                            offsetY + y * 20,
                            18, 18
                        );
                    }
                }
            }
        }
    }
    
    gameLoop(time) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        
        if (!this.isPaused && !this.gameOver) {
            this.dropCounter += deltaTime;
            
            if (this.dropCounter > this.dropInterval) {
                this.movePiece(0, 1);
                this.dropCounter = 0;
            }
        }
        
        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    startGame() {
        if (this.gameOver) {
            this.restartGame();
            return;
        }
        
        // 恢复AudioContext（浏览器要求用户交互后才能播放声音）
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.isPaused = false;
        this.gameOverlay.style.display = 'none';
        this.updateUI();
    }
    
    togglePause() {
        if (this.gameOver) return;
        
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.showPauseScreen();
        } else {
            this.gameOverlay.style.display = 'none';
        }
    }
    
    restartGame() {
        this.createBoard();
        this.currentPiece = this.createPiece();
        this.nextPiece = this.createPiece();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropInterval = 1000;
        this.gameOver = false;
        this.isPaused = true;
        
        this.updateUI();
        this.showStartScreen();
        this.draw();
    }
    
    showStartScreen() {
        this.overlayTitle.textContent = '俄罗斯方块';
        this.overlayText.textContent = '按空格键开始游戏';
        this.gameOverlay.style.display = 'flex';
        this.isPaused = true;
    }
    
    showPauseScreen() {
        this.overlayTitle.textContent = '游戏暂停';
        this.overlayText.textContent = '按空格键继续游戏';
        this.gameOverlay.style.display = 'flex';
    }
    
    showGameOverScreen() {
        this.overlayTitle.textContent = '游戏结束';
        this.overlayText.textContent = `最终分数: ${this.score}`;
        this.gameOverlay.style.display = 'flex';
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.linesElement.textContent = this.lines;
        this.highScoreElement.textContent = this.highScore;
    }
    
    updateDifficulty() {
        const difficulty = parseInt(this.difficultySelect.value);
        const baseSpeed = 1000;
        this.dropInterval = baseSpeed / difficulty;
    }
    
    updateSound() {
        // 音效开关现在直接在各个音效方法中检查
    }
    
    updateTheme() {
        const isDark = this.themeToggle.checked;
        document.body.style.background = isDark 
            ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
            : 'linear-gradient(135deg, #8BC6EC, #9599E2)';
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    const game = new TetrisGame();
    
    // 全局键盘事件（防止箭头键滚动页面）
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });
});