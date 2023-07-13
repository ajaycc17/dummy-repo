const fs = require("fs");

const reqHandler = (req, res) => {
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
            const message = parsedBody.split("=")[0];
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
};
// way 1
// module.exports = reqHandler;

// way 2
// module.exports = { handler: reqHandler, someText: "Hardcoded text" };

// way 3
// module.exports.handler = reqHandler;
// module.exports.someText = "Hardcoded text";

// way 4
exports.handler = reqHandler;
exports.someText = "Some random hardcoded text";
