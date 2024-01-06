"use server";

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache'
import { CartItem } from '@prisma/client';

const CheckOutCart = async (cartItems:CartItem[],userId:string) => {
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
                        quantity: true,
                        itemId: true,
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
                const items = await db.item.findMany({
                    where: {
                        id: {
                            in: cartItems.map(cartItem => cartItem.itemId),
                        },
                    },
                });
                for (const cartItem of userCartItems) {
                    console.log("cartItem", cartItem.itemId)
                    const item = items.find(item => item.id === cartItem.itemId);
                    if (!item) {
                        throw new Error('Item not found');
                    }else if(item.quantity < cartItem.quantity){
                        throw new Error('Item quantity not enough');
                    }else{
                        const updatedItem = await db.item.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                quantity: item.quantity - cartItem.quantity,
                            }
                        })
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
        }
    }
    } catch (error) {
        console.error('Error check out cart item:',error);
        throw error;
    }
};

export default CheckOutCart;
