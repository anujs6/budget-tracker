import React from "react";
import axios from "axios";
import { Button, TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { API_URL } from "../utils";

export const Expense = ({ expense, fetchExpenses }) => {
  const { id, amount, category, description } = expense;

  const handleDeleteExpense = async () => {
    try {
      await axios.delete(`${API_URL}/${expense.id}`);

      await fetchExpenses();
    } catch (e) {
      console.log(e);
    }
  };

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <StyledTableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableCell align="center">{amount}</StyledTableCell>
      <StyledTableCell align="center">{category}</StyledTableCell>
      <StyledTableCell align="center">{description}</StyledTableCell>
      <StyledTableCell align="center">
        <Button color="error" variant="contained" onClick={handleDeleteExpense}>
          <DeleteIcon />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};
