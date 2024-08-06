import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import 'react-toastify/ReactToastify.css'
import styles from "./Transactions.module.scss";

export const Transactions = () => {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories);
  }, [])

  const notify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      notify("Title cannot be empty!");
      return;
    }

    if (!amount) {
      notify("Amount cannot be empty!");
      return;
    }

    if (!category) {
      notify("Category cannot be empty!");
      return;
    }

    if (!type) {
      notify("Please select a type!");
      return;
    }

    const transaction = {
      title: title,
      amount: amount,
      category: category,
      type: type,
      date: new Date().toLocaleString()
    }

    const key = type === 'income' ? 'incomes' : 'expenses';
    const savedTransactions = JSON.parse(localStorage.getItem(key)) || [];
    savedTransactions.push(transaction);
    localStorage.setItem(key, JSON.stringify(savedTransactions));

    notify(`The transaction '${title}' was successfully added!`)

    setTitle('');
    setAmount('');
    setCategory('');
    setType('');
  }

  const handleOptionChange = (e) => {
    setType(e.target.value);
  }
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(Number(value));
    }
  }

  const handleKeyDown = (e) => {
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter' ||
      (e.key >= '0' && e.key <= '9')
    ) {
      return;
    }
    e.preventDefault();
  }

  return (
    <div className={styles.Transactions}>
      <h2 className={styles.TransactionsTitle}>Add Transaction Form</h2>
      <div className={`${styles.TransactionsWrapper} wrapper`}>
        <form className={styles.TransactionsForm} onSubmit={handleFormSubmit}>
          <label htmlFor="transactionTitle">
            Title
            <input
              className={styles.TransactionsFormInput}
              type="text"
              id="transactionTitle"
              name="transaction-title"
              placeholder="Title.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="transactionAmount">
            Amount
            <input
              className={styles.TransactionsFormInput}
              type="number"
              min={1}
              id="transactionAmount"
              name="transaction-title"
              placeholder="Amount.."
              value={amount}
              onChange={handleAmountChange}
              onKeyDown={handleKeyDown}
            />
          </label>
          <label htmlFor="categorySelect">
            Category
            <select className={styles.TransactionsFormInput} name="transaction-category" id="categorySelect" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled></option>
              {
                categories.length > 0 ?
                  categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))
                  : (<option value="" disabled>No categories</option>)
              }
            </select>
          </label>
          <div className={styles.TransactionsFormRadios}>
            <label htmlFor="income">
              <input
                type="radio"
                id="income"
                value="income"
                name="transaction-type"
                checked={type === 'income'}
                onChange={handleOptionChange}
              />
              Income
            </label>
            <label htmlFor="expense">
              <input
                type="radio"
                value="expense"
                id="expense"
                name="transaction-type"
                checked={type === 'expense'}
                onChange={handleOptionChange}
              />
              Expense
            </label>
          </div>
          <button className={styles.TransactionsFormSubmit} type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};
