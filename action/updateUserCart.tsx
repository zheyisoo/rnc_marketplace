"use server";

import { db } from '@/lib/db';
import { Clerk } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { Item } from '@prisma/client';
import { Transaction } from '@prisma/client';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { User } from '@prisma/client';
import { CartItem } from '@prisma/client';

const updateUserCart = async (item:Item, quantity:number,userId:string) => {
    try {
        // const user = await currentUser();
        if (!userId) {
            throw new Error('Not authorized');
        }else{
            const dbUser = await db.user.findUnique({
                where: {
                    externalUSerId : userId,
                },
                include: {
                    cart: true,
                }
            })

            if(!dbUser){
                throw new Error('Not authorized');
            }else{
                console.log("run here?")
                const currCart = dbUser.cart;
                const existingCartItemIndex = currCart.findIndex((cartItem) => cartItem.itemId === item.id);
                if(existingCartItemIndex !== -1){
                    const existingCartItem = currCart[existingCartItemIndex];
                    const updatedCartItem = await db.cartItem.update({
                        where: {
                            id: existingCartItem.id
                        },
                        data: {
                            quantity: existingCartItem.quantity + quantity,
                        }
                    })
                    console.log("updatedCartItem", updatedCartItem)
                    revalidatePath('/dashboard/cart')
                    return updatedCartItem;
                }else{
                    const newCartItem = await db.cartItem.create({
                        data: {
                            itemId: item.id,
                            quantity: quantity,
                            userId: dbUser.id,
                        }
                    })
                    console.log("newCartItem", newCartItem)
                    revalidatePath('/dashboard/cart')
                    return newCartItem;
                }
        }
    }
    } catch (error) {
        console.error('Error update cart item:',item.id, error);
        throw error;
    }
};

export default updateUserCart;
