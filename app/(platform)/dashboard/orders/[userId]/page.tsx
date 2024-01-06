"use server"

import React, { useEffect } from 'react';
import { db } from '@/lib/db';
import OrderDataTable from '../_components/orderDataTable';
import {OrderWithFullDetails,OrdersTable} from "@/lib/type"

import {getOrdersWithCartItemsAndItems} from "@/lib/orderService"

  
const ItemsPage = async ({ params }: { params: any }) => {

    const dbUser = await db.user.findUnique({
      where: {
        externalUSerId : params.userId,
      },
    })
    const orderWithCartItemsAndItemsRaw:OrderWithFullDetails[] = await getOrdersWithCartItemsAndItems(dbUser?.id)
    
    // Map the array of OrderWithFullDetails to an array of ItemsTable
    const itemsTables: OrdersTable[] = orderWithCartItemsAndItemsRaw.map((order) => {
      const itemsTable: OrdersTable = {
        id: order.id,
        orderedBy: order.user.username,
        items: order.items,
        status: order.status
          };
          return itemsTable;
    })

    return (
      <div className='flex-col'>
        <div className="flex">
          <div className="flex-grow">
          </div>
        </div>
        <div className='px-20 py-8'>
          <OrderDataTable itemList={itemsTables}/>
        </div>
      </div>
    );
  };
  
export default ItemsPage;