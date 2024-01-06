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
  import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
  import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"  
  import { User } from '@prisma/client';
  import { CartItem } from '@prisma/client';
import React from 'react';
  
  type OrderWithCartItems = {
    id: number;
    items: CartItem[];
    user: User; // Make sure to define the User type if it's not already defined
    userId: number;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  
  type ItemsPageProps = {
    itemList: OrderWithCartItems[];
  };
  
  const CartItemList: React.FC<ItemsPageProps> = ({ itemList }) => {
 
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null); // Track selected item


//   useEffect(() => {
//     console.log("itemList", itemList)
//     const sortedItems = itemList.slice().sort((a, b) => a.id - b.id);
//     setItems(sortedItems);
//   }, [itemList]);


  const handleCloseDialog = () => {
    setSelectedItem(null);
  };


  return (
  <Table>
      <TableCaption>Items List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Item ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Ordered By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemList.map(order => (
          <React.Fragment key={order.id}>
            {order.items.map(cartItem => (
              <TableRow key={cartItem.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{cartItem.itemId}</TableCell>
                <TableCell>{cartItem.quantity}</TableCell>
                <TableCell className="text-right">{order.userId}</TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
//   (
//     <div>
//     <Table>
//         <TableCaption>Items List</TableCaption>
//         <TableHeader>
//         <TableRow>
//             <TableHead className="w-[100px]">ID</TableHead>
//             <TableHead>Item Id</TableHead>
//             <TableHead>Quantity</TableHead>
//             <TableHead>Order Id</TableHead>
//             <TableHead className="text-right">Ordered By</TableHead>
//         </TableRow>
//         </TableHeader>
//         <TableBody>
//         {itemList.map((item) => (
//             <TableRow key={item.id}>
//             <TableCell className="font-medium">{item.id}</TableCell>
//             <TableCell>{item.items}</TableCell>
//             <TableCell>{item.id}</TableCell>
//             <TableCell>{item.id}</TableCell>
//             <TableCell>{item.userId}</TableCell>
//             </TableRow>
//         ))}
//         </TableBody>
//     </Table>
//     </div>
//   );
};

export default CartItemList;

