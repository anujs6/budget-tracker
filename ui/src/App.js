import React, { useState, useEffect } from "react";
import { AddBudgetForm } from "./components/AddBudgetForm";
import axios from "axios";
import { API_URL } from "./utils";

import {Auth, Amplify} from  'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react';

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setExpenses(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <AddBudgetForm fetchExpenses={fetchExpenses} expenses={expenses} />
    </div>
  );
}

export default withAuthenticator(App);
