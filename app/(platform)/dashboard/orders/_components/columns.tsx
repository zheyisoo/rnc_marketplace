"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../../components/dataTableColumnHeader";
import { Order, CartItem, Item, User } from "@prisma/client";
import { OrdersTable } from "@/lib/type"
import {CartItemswithItemsType} from "@/lib/type"
import { Checkbox } from "@/components/ui/checkbox";
import { statuses } from "@/lib/data";

const columns: ColumnDef<OrdersTable>[] = 
[
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "orderedBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="OrderedBy" />
  //   ),
  //   cell: ({ row }) => <div className="w-[20px]">{row.getValue("orderedBy")}</div>,
  //   // // enableSorting: true,
  //   // // enableHiding: true,
  // },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
        <div className="w-[140px]">
        <ul>
        {(row.getValue("items") as CartItemswithItemsType[]).map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ textAlign: 'left' }}>{item.item.name}</span>
            <span style={{ textAlign: 'right' }}>{item.quantity}</span>
            </li>
        ))}
        </ul>
        </div>
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original.status
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
];

export default columns;
