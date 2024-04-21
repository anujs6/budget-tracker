import express from "express";
import { createExpenses, deleteExpenses, fetchExpenses, updateExpenses } from "./expense.js";
import serverless from "serverless-http";
import cors from 'cors';


const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}


app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.get("/expense", async (req, res) => {
  try {
    const expenses = await fetchExpenses();
    res.send(expenses.Items)
  } catch (e) {
    res.status(400).send(`Error Fetching expenses: ${e}`)
  }
});

app.post("/expense", async (req, res) => {
  try {
    const expense = req.body;
    
    const response = await createExpenses(expense);

    res.send(response);
  } catch (e) {
    res.status(400).send(`Error Creating expenses: ${e}`)
  }
});

app.put("/expense", async (req, res) => {
  try {
    const expense = req.body;
    
    const response = await updateExpenses(expense);

    res.send(response);
  } catch (e) {
    res.status(400).send(`Error Updating expenses: ${e}`)
  }
});

app.delete("/expense/:id", async (req, res) => {
  try {
    const {id} = req.params;
    
    const response = await deleteExpenses(id);

    res.send(response);
  } catch (e) {
    res.status(400).send(`Error Deleting expenses: ${e}`)
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}


export const handler = serverless(app);