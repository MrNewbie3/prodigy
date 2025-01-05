import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const data =  req.body
  res.status(200).json({"data":"any"})
});

export default app;
