"use client";

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Item } from '@prisma/client';
  import { Transaction } from '@prisma/client';

interface TransactionListProps {
  transactionsList: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactionsList }) => {
 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Track selected item


  useEffect(() => {
    const sortedTransactions = transactionsList.slice().sort((a, b) => a.id - b.id);
    setTransactions(sortedTransactions);
    console.log("itemList", transactions)
  }, [transactionsList]);

//   const handleRowClick = (item: Item) => {
//     setSelectedItem(item); // Set the selected item when a row is clicked
//   };

//   const handleCloseDialog = () => {
//     setSelectedItem(null);
//   };


  return (
    <div>
    <Table>
        <TableCaption>Transactions List</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Item Id</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.itemId}</TableCell>
            <TableCell>{transaction.quantity}</TableCell>
            <TableCell>{transaction.updatedBy}</TableCell>
            <TableCell className="text-right">{transaction.updatedAt.toDateString()}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </div>
  );
};

export default TransactionList;

