#!/usr/bin/env node

/**
 * Simple HTTP Server for CodePath Academy
 * Usage: node server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const PORT = process.argv[2] || 8000;
const GALLERY_FILE = path.join(__dirname, 'data', 'gallery-selfies.json');
const DATA_DIR = path.join(__dirname, 'data');

// Создать папку data если её нет
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// MIME типы
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

// Загрузить селфи из файла
function loadSelfies() {
    try {
        if (fs.existsSync(GALLERY_FILE)) {
            return JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf8'));
        }
    } catch (err) {
        console.error('❌ Ошибка при чтении селфи:', err.message);
    }
    return [];
}

// Сохранить селфи в файл
function saveSelfies(selfies) {
    try {
        fs.writeFileSync(GALLERY_FILE, JSON.stringify(selfies, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('❌ Ошибка при сохранении селфи:', err.message);
        return false;
    }
}

// Обработчик API запросов
function handleApiRequest(pathname, method, req, res) {
    // GET /api/selfies - получить все селфи
    if (method === 'GET' && pathname === '/api/selfies') {
        const selfies = loadSelfies();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(selfies));
        return;
    }

    // POST /api/selfies - сохранить новое селфи
    if (method === 'POST' && pathname === '/api/selfies') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 5000000) { // Лимит 5MB для одного селфи
                res.statusCode = 413;
                res.end('Payload too large');
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const selfies = loadSelfies();

                const newSelfie = {
                    id: 'selfie-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                    photo: data.photo,
                    timestamp: new Date().toISOString(),
                    timeString: new Date().toLocaleString('ru-RU'),
                    device: data.device || 'Unknown'
                };

                selfies.push(newSelfie);

                // Лимит 100 последних селфи
                if (selfies.length > 100) {
                    selfies.splice(0, selfies.length - 100);
                }

                if (saveSelfies(selfies)) {
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(JSON.stringify({ success: true, id: newSelfie.id }));
                } else {
                    res.statusCode = 500;
                    res.end('Failed to save selfie');
                }
            } catch (err) {
                res.statusCode = 400;
                res.end('Invalid request data');
            }
        });
        return;
    }

    // DELETE /api/selfies/:id - удалить селфи
    if (method === 'DELETE' && pathname.startsWith('/api/selfies/')) {
        const id = decodeURIComponent(pathname.split('/').pop());
        console.log('🗑️ Удаляем селфи ID:', id);
        const selfies = loadSelfies();
        console.log('📊 Всего селфи до удаления:', selfies.length);
        
        const index = selfies.findIndex(s => s.id === id);
        console.log('🔍 Найден индекс для удаления:', index);

        if (index > -1) {
            const deleted = selfies.splice(index, 1);
            console.log('✓ Удалено:', deleted[0].id);
            console.log('📊 Осталось селфи:', selfies.length);
            
            if (saveSelfies(selfies)) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({ success: true, remaining: selfies.length }));
            } else {
                res.statusCode = 500;
                res.end('Failed to delete selfie');
            }
        } else {
            console.log('❌ Селфи не найдено с ID:', id);
            console.log('📋 Доступные ID:', selfies.map(s => s.id));
            res.statusCode = 404;
            res.end('Selfie not found');
        }
        return;
    }

    // OPTIONS для CORS
    if (method === 'OPTIONS' && pathname.startsWith('/api/')) {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.end();
        return;
    }

    return false; // Не API запрос
}

// Создать сервер
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    const method = req.method;
    
    // Обработка API запросов
    if (pathname.startsWith('/api/')) {
        handleApiRequest(pathname, method, req, res);
        return;
    }
    
    // Если корневой путь, подай index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Полный путь к файлу
    let filePath = path.join(__dirname, pathname);
    
    // Защита от directory traversal
    const resolvedPath = path.resolve(filePath);
    const dirPath = path.resolve(__dirname);
    
    if (!resolvedPath.startsWith(dirPath)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }
    
    // Читать файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                res.statusCode = 500;
                res.end('Server error');
            }
        } else {
            // Определить MIME тип
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(content);
        }
    });
});

// Запустить сервер
server.listen(PORT, () => {
    console.log(`🚀 CodePath Academy запущен на http://localhost:${PORT}`);
    console.log(`📚 Откройте браузер и перейдите на http://localhost:${PORT}`);
    console.log(`⏹  Для остановки сервера нажмите Ctrl+C`);
    console.log('');
    console.log('API эндпоинты:');
    console.log('  - GET  /api/selfies     : Получить все селфи');
    console.log('  - POST /api/selfies     : Сохранить новое селфи');
    console.log('  - DELETE /api/selfies/:id : Удалить селфи');
    console.log('');
    console.log('Горячие клавиши:');
    console.log('  - Ctrl+C : Остановить сервер');
    console.log('  - F5 : Обновить страницу');
    console.log('  - F12 : Открыть DevTools');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Порт ${PORT} уже используется`);
        console.error(`Попробуйте другой порт: node server.js 8001`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
