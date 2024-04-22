import React, {useState} from 'react'
import {Button, TableCell, TableRow } from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {styled} from '@mui/material/styles';

export const Expense = ({expense, fetchTasks}) => {
    const {id, amount, category, description} = expense;
    console.log("Expense:", expense);
    console.log("Amount:", amount);
    console.log("Category:", category);
    console.log("Description:", description);
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
    <StyledTableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <StyledTableCell align="center">{amount}</StyledTableCell>
        <StyledTableCell align="center">{category}</StyledTableCell>
        <StyledTableCell align="center">{description}</StyledTableCell>
        <StyledTableCell align="center">
            <Button /*disabled={editingExpenseId === id}*/ variant="contained" /*onClick={handleEditExpense(id)}*/>
                <EditIcon />
            </Button>
            <Button /*disabled={deletingExpenseId === id}*/ variant="contained" /*onClick={handleDeleteExpense(id)}*/>
                <DeleteIcon />
            </Button>
        </StyledTableCell>
    </StyledTableRow>
  )
}
