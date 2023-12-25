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

const checkOutCart = async (cartItems:CartItem[],userId:string) => {
    console.log("run her?")
    try {
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
                const userCartItems = await db.cartItem.findMany({
                    where: {
                        userId: dbUser.id,
                    },
                    select: {
                        id: true,
                    },
                });
                const cartItemIdsToDisconnect = userCartItems.map(cartItem => ({ id: cartItem.id }));

                const updatedUser = await db.user.update({
                    where: {
                        id: dbUser.id,
                    },
                    data: {
                        cart: {
                            disconnect: cartItemIdsToDisconnect, // Disconnect all cart items
                        },
                    },
                });
                console.log("cartItemIdsToDisconnect",cartItemIdsToDisconnect)
                const updatedCartItems = await db.cartItem.updateMany({
                    where: {
                        id: {
                            in: cartItemIdsToDisconnect.map(cartItem => cartItem.id),
                        },
                    },
                    data: {
                        userId: 0
                    },
                });
                const newOrder = await db.order.create({
                    data: {
                        userId: dbUser.id,
                        items: {
                            connect: cartItemIdsToDisconnect,
                        },
                    },
                })
                    revalidatePath('/dashboard/cart')
                    console.log("newOrder", newOrder)
                    return newOrder;
                }
        }
    } catch (error) {
        console.error('Error check out cart item:',error);
        throw error;
    }
};

export default checkOutCart;
