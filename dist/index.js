import express from 'express';
import dotenv from 'dotenv';
import path from "path";
dotenv.config();
const PORT = process.env.PORT || '3000';
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
// REPLACE WITH ROUTERS LATER
app.use('/main', (req, res) => {
    res.render('main', {
        testValue: "HelloWorld"
    });
});
app.use("/product", (req, res) => { });
app.use("/*", (req, res) => {
    res.redirect("/main");
});
app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`);
});
