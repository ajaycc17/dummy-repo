const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.headers, req.url, req.method);
    // process.exit();
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        return fs.readFile("message.txt", "utf8", (err, data) => {
            const message = data;
            res.write("<html>");
            res.write("<head><title>My First Page</title></head>");
            res.write(
                `<body><p>${message}</p><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>`
            );
            res.write("</head>");
            return res.end();
        });
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            // fs.writeFileSync("message.txt", message);
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello</h1></body>");
    res.write("</head>");
    return res.end();
});

server.listen(4000);
