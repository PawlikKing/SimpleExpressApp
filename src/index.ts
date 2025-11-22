import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import { employeeRouter, productRouter } from 'routers';

dotenv.config();

const PORT = process.env.PORT || '3000';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.json());

// REPLACE WITH ROUTERS LATER
app.use('/main', (req: Request, res: Response) => {
    res.render('main', {
        testValue: "HelloWorld"
    });
});

app.use("/product", productRouter);
app.use("/employee", employeeRouter);


/*app.use("/", (req: Request, res: Response) => {
    res.redirect("/main");
})*/

app.listen(PORT, () => {
  console.log(`App started on port: ${PORT}`);
})