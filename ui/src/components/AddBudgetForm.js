import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Typography, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import axios from 'axios';
import {API_URL} from '../utils';
import { ViewExpenses } from './ViewExpenses';



export const AddBudgetForm = ({fetchExpenses, expenses}) => {
    const [newAmount, setNewAmount] = useState(0);
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addNewExpense = async () => {
        try {
            await axios.post(API_URL, {
                amount: newAmount,
                category: newCategory,
                description: newDescription,
            });

            await fetchExpenses();

            setNewAmount(0);
            setNewCategory("");
            setNewDescription("");

        } catch (e) {
            console.log(e);
        }
    }

  return (
    <div className="expenses">
        <div className="form-container">
            <Typography align="center" variant="h4" paddingTop={2} paddingBottom={2}>
                Expense Tracker
            </Typography> <br />

            <TextField
            required
            fullWidth
            size="normal"
            label="Amount in Dollars"
            variant="outlined"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            />
            <br />
            <br />
            <FormControl required sx={{ m: 0, minWidth: 400}}>
                <InputLabel id="Category">Category</InputLabel>
                <Select
                value={newCategory}
                label="Category *"
                onChange={(e)=> setNewCategory(e.target.value)}
                >
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Fun"}>Fun</MenuItem>
                <MenuItem value={"Necessities"}>Necessities</MenuItem>
                <MenuItem value={"ExtraCurriculars"}>Extra Curriculars</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />

            <TextField
            label="Description"
            fullWidth
            multiline
            placeholder="Describe your purchase"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={4}
            />
            <br />
            <br />

            <Button variant="contained" onClick={addNewExpense}>Add Expense</Button>
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>View Expenses</Button>
        </div>
        <ViewExpenses isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} expenses={expenses}></ViewExpenses>
    </div>
  )
}
