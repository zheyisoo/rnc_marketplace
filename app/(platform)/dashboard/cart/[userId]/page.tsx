import React from 'react';
import CheckOutCart from '../_components/CheckOutCart';
import { db } from '@/lib/db';
import { CartItemswithItemsType } from '@/lib/type';

const CartPage = async ({ params }: { params: any }) => {
  // const user = await currentUser()
  let cart: CartItemswithItemsType[] = []
  const itemList = await db.item.findMany()

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
      },
      include: {
        item: true
      }
    })
    cart = carts || []
  }

  console.log("cart server", cart)


  return (
    <div>
      <CheckOutCart cart={cart} itemList={itemList} userId={params.userId}/>
    </div>
  );
};

export default CartPage;
