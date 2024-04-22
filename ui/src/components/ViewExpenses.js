import React, {useState, useEffect} from 'react';
import {Button, Dialog, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {styled} from '@mui/material/styles';
import axios from "axios";
import { API_URL } from '../utils';


export const ViewExpenses = ({isDialogOpen, setIsDialogOpen, fetchExpenses, expenses}) => {
    const [deletingExpenseId, setDeletingExpenseId] = useState();
    const [editingExpenseId, setEditingExpenseId] = useState();
//    const [expenses, setExpenses] = useState([]);

    const handleDeleteExpense = async (expenseId) => {
        try {
            await axios.delete(`${API_URL}/${expenseId}`);

            await fetchExpenses();
        } catch (e) {
            console.log(e);
        }
    }

    

    // const fetchExpenses = async () => {
    //   try {
    //     const {data} = await axios.get(API_URL);
  
    //     setExpenses(data);
    //     console.log("Expenses updated:", data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchExpenses();
    // }, []);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

  return (
    <Dialog open={isDialogOpen} maxWidth="lg">
        <DialogTitle>Expenses</DialogTitle>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <StyledTableRow>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Edit/Delete</StyledTableCell>
            </StyledTableRow>
            </TableHead>
            <TableBody>
                {expenses.map((expense) => (
                    <StyledTableRow
                        key={expense.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell align="center">{expense.amount}</StyledTableCell>
                        <StyledTableCell align="center">{expense.category}</StyledTableCell>
                        <StyledTableCell align="center">{expense.description}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Button disabled={editingExpenseId === expense.id} variant="contained" /*onClick={handleEditExpense(expense.id)}*/>
                                <EditIcon />
                            </Button>
                            <Button disabled={deletingExpenseId === expense.id} variant="contained" onClick={handleDeleteExpense(expense.id)}>
                                <DeleteIcon />
                            </Button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Button varaint="contained" onClick={async () => {
            setIsDialogOpen(false);
        }}>Close</Button>
    </Dialog>
  )
}
