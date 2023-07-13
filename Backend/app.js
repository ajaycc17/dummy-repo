const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.headers, req.url, req.method);
    // process.exit();
    // res.setHeader("Content-Type", "text/html");
    const url = req.url;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Hello World</h1></body>");
        res.write("</head>");
        return res.end();
    } else if (url === "/home") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome home</h1></body>");
        res.write("</head>");
        return res.end();
    } else if (url === "/about") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome to About Us page</h1></body>");
        res.write("</head>");
        return res.end();
    } else if (url === "/node") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome to my Node Js project</h1></body>");
        res.write("</head>");
        return res.end();
    }
});

server.listen(4000);
