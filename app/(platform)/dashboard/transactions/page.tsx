import React from 'react';
import { db } from '@/lib/db';
import TransactionList from './_components/transactionList';

const TransactionsPage = async () => {
  const Transactions = await db.transaction.findMany()
  console.log("Transactions", Transactions)

  return (
    <div className='px-20 py-8'>
      <TransactionList transactionsList={Transactions}/>
    </div>
  );
};

export default TransactionsPage;
