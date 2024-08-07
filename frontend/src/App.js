import { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';

function App() {
  const pageSize = 10;
  const totalCount = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const siblingCount = 1;

  const props = {
    siblingCount,
    currentPage,
    totalCount,
    pageSize,
    onPageChange: (page) => setCurrentPage(page),
  };

  return (
    <div className="App">
      <h1>USERS LIST</h1>
      <Table currentPage={currentPage} />
      <Pagination props={props} />
    </div>
  );
}

export default App;
