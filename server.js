#!/usr/bin/env node

/**
 * Simple HTTP Server for CodePath Academy
 * Usage: node server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv[2] || 8000;

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

// Создать сервер
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    
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
