import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = 3003;

import { connectDatabase } from "./config/database";
connectDatabase();

import Article from "./models/article.model";

// Rest API
app.get("/articles", async (req: Request, res: Response) => {
    const articles = await Article.find({
        deleted: false
    });

    res.json({
        articles: articles
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});