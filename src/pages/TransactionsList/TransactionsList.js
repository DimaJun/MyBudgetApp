import { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import styles from './TransactionsList.module.scss';

import deleteIcon from '../../assets/icons/delete-transaction.svg';

const ITEMS_PER_PAGE = 5;

export const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadTransactions = () => {
      const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      setTransactions([...incomes, ...expenses]);
    }

    loadTransactions();
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

  const deleteTransaction = (date) => {
    let updatedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let updatedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    updatedIncomes = updatedIncomes.filter(transaction => transaction.date !== date);
    updatedExpenses = updatedExpenses.filter(transaction => transaction.date !== date);

    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setTransactions([...updatedIncomes, ...updatedExpenses]);
  }

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  return (
    <div className={`${styles.TransactionsList} wrapper`}>
      <h2 className={styles.TransactionsListTitle}>Transactions List</h2>
      <div className={styles.TransactionsListPagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? `${styles.ActivePage} ${styles.PaginationItem}` : styles.PaginationItem }
          >{index + 1}</button>
        ))}
      </div>
      <div className={styles.TransactionsListTableWrapper}>
        <table className={styles.TransactionsListTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentTransactions.length > 0 ?
                currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transactions.indexOf(transaction) + 1}</td>
                    <td title={transaction.title}>{transaction.title.length > 25 ? `${transaction.title.slice(0, 26)}..` : transaction.title}</td>
                    <td title={transaction.amount}>{transaction.amount.toLocaleString().length > 25 ? `${transaction.amount.toLocaleString().slice(0, 26)}..` : transaction.amount}</td>
                    <td title={transaction.category}>{transaction.category.length > 25 ? `${transaction.category.slice(0,26)}..` : transaction.category}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <button
                        className={styles.ListDeleteItem}
                        onClick={() => {
                          deleteTransaction(transaction.date);
                          notify(`The transaction ${transaction.title} was successfully deleted!`)
                        }}
                      >
                        <img className={styles.ListDeleteIcon} src={deleteIcon} alt="delete transaction" width={30} height={30}/>
                      </button>
                    </td>
                  </tr>
                ))
                :
                (
                  <tr>
                    <td colSpan={7}>
                      Transactions empty
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  )
};
