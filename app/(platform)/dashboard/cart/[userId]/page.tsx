import React from 'react';
import CheckOutCart from '../_components/CheckOutCart';
import { db } from '@/lib/db';
import {currentUser } from "@clerk/nextjs";
import { CartItem } from '@prisma/client';

const CartPage = async ({params}) => {
  // const user = await currentUser()
  let cart: CartItem[] = []
  const itemList = await db.item.findMany()
  console.log("user", params.userId)


  if (params.userId){
    const dbUsers = await db.user.findUnique({
      where: {
        externalUSerId: params.userId
      },
      include: {
        cart: true
      }
    })
    const carts = await db.cartItem.findMany({
      where: {
        userId: dbUsers?.id
      }
    })
    console.log("dbUsers", dbUsers)
    console.log("carts", carts) 
    cart = carts || []
  }


  return (
    <div>
      <CheckOutCart cart={cart} itemList={itemList} userId={params.userId}/>
    </div>
  );
};

export default CartPage;
