import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Expense } from "./Expense";

export const ViewExpenses = ({
  isDialogOpen,
  setIsDialogOpen,
  fetchExpenses,
  expenses,
}) => {
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
    <Dialog open={isDialogOpen} maxWidth="lg">
      <DialogTitle>Expenses</DialogTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Delete Expense</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <Expense
                expense={expense}
                key={expense.id}
                fetchExpenses={fetchExpenses}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        varaint="contained"
        onClick={async () => {
          setIsDialogOpen(false);
        }}
      >
        Close
      </Button>
    </Dialog>
  );
};
