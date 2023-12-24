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
  import { Item } from '@prisma/client';
  import ItemDetail from './itemDetail';

interface ItemListProps {
  itemList: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ itemList }) => {
 
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Track selected item


  useEffect(() => {
    console.log("itemList", itemList)
    const sortedItems = itemList.slice().sort((a, b) => a.id - b.id);
    setItems(sortedItems);
  }, [itemList]);

  const handleRowClick = (item: Item) => {
    setSelectedItem(item); // Set the selected item when a row is clicked
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };


  return (
    <div>
    <Table>
        <TableCaption>Items List</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Image</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {items.map((item) => (
            <TableRow key={item.id} onClick={() => handleRowClick(item)}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-right pt-3">
                    {item.imageUrls.slice(0, 20)} {/* Display the first 20 characters */}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                    <img
                        src={item.imageUrls}
                        alt="Item Image"
                        style={{ width: '150px', height: '150px' }}
                      />                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    {selectedItem && (
        <ItemDetail item={selectedItem}/>
      )}
    </div>
  );
};

export default ItemList;

