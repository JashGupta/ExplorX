import http from "http"
import app from "./app.js";
const port = process.env.PORT || 3000
import connectToDb from "./DB/db.js";

connectToDb();
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})