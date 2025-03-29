import React, { useState, useEffect } from 'react';
import './App.css';

const BudgetCalculator = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [incomeName, setIncomeName] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const storedIncome = JSON.parse(localStorage.getItem('incomeList')) || [];
        setExpenses(storedExpenses);
        setIncomeList(storedIncome);
    }, []);

    const addExpense = () => {
        if (expenseName && expenseAmount) {
            setExpenses([...expenses, { name: expenseName, amount: parseFloat(expenseAmount) }]);
            setExpenseName('');
            setExpenseAmount('');
        }
    };

    const addIncome = () => {
        if (incomeName && incomeAmount) {
            setIncomeList([...incomeList, { name: incomeName, amount: parseFloat(incomeAmount) }]);
            setIncomeName('');
            setIncomeAmount('');
        }
    };

    const deleteExpense = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);
    };

    const deleteIncome = (index) => {
        const newIncomeList = incomeList.filter((_, i) => i !== index);
        setIncomeList(newIncomeList);
    };

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalIncome = incomeList.reduce((total, income) => total + income.amount, 0);
    const remainingBalance = totalIncome - totalExpenses;

    const saveData = () => {
        try {
            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('incomeList', JSON.stringify(incomeList));
            alert('Data saved!');
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };

    return (
        <div className="container">
            <h1>BudgetApp</h1>
            <div className="flex-container">
                <div className="flex-column income-column">
                    <h2>Income</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Income name"
                            value={incomeName}
                            maxLength={26}
                            onChange={(e) => setIncomeName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Income amount"
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                        />
                    </div>
                    <ul className="income-list">
                        {incomeList.map((income, index) => (
                            <li key={index} className="task">
                                <div>
                                    <strong>{income.name}</strong>: ${income.amount.toFixed(2)}
                                </div>
                                <button className="delete-button" onClick={() => deleteIncome(index)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total">Total income: </h3>
                    <h3 className="total">${totalIncome.toFixed(2)}</h3>
                    <button onClick={addIncome}>Add the income</button>
                </div>

                <div className="flex-column expense-column">
                    <h2>Expenses</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Expense name"
                            value={expenseName}
                            maxLength={26}
                            onChange={(e) => setExpenseName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Expense amount"
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                        />
                    </div>

                    <ul className="expense-list">
                        {expenses.map((expense, index) => (
                            <li key={index} className="task">
                                <div>
                                    <strong>{expense.name}</strong>: ${expense.amount.toFixed(2)}
                                </div>
                                <button className="delete-button" onClick={() => deleteExpense(index)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h3 className="total">Total expenses: </h3>
                    <h3 className="total">${totalExpenses.toFixed(2)}</h3>
                    <button onClick={addExpense}>Add the expense</button>
                </div>
            </div>
            <h3 className="total">Balance after expenses: ${remainingBalance.toFixed(2)}</h3>
            <button onClick={saveData}>Save </button>
        </div>
    );
};

export default BudgetCalculator;