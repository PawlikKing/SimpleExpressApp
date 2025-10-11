import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || '3000';

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.json());

// REPLACE WITH ROUTERS LATER
app.use('/main', (req: Request, res: Response) => {
    res.render('main', {
        testValue: "HelloWorld"
    });
});

app.use("/product", (req: Request, res: Response) => {});

app.use("/*", (req: Request, res: Response) => {
    res.redirect("/main");
})

app.listen(PORT, () => {
  console.log(`App started on port: ${PORT}`);
})