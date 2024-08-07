import styles from './App.module.scss';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Categories } from './pages/Categories/Categories.js';
import { Transactions } from './pages/Transactions/Transactions.js';
import { TransactionsList } from './pages/TransactionsList/TransactionsList.js';
import { HelloPage } from './pages/HelloPage/HelloPage.js';

import { Navbar } from './components/Navbar/Navbar.js';

import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <div className={styles.App}>
          <Navbar className={styles.Navbar}/>
          <main className={styles.MainContent}>
            <Routes>
              <Route path='/' element={<HelloPage/>}></Route>
              <Route path='/transactions' element={<Transactions/>}></Route>
              <Route path='/transactions-list' element={<TransactionsList/>}></Route>
              <Route path='/categories' element={<Categories/>}></Route>
            </Routes>
        </main>
        <SpeedInsights/>
      </div>
    </Router>
  );
}

export default App;
