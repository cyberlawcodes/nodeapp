const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs =require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`;

    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (filePath === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.StatusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStreat(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});