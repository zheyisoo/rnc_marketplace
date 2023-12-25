"use server";

import { db } from '@/lib/db';
import { Clerk } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { Item } from '@prisma/client';
import { Transaction } from '@prisma/client';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const updateItemDetail = async (item:Item) => {
    try {
        const user = await currentUser();
        const curItem = await db.item.findUnique({
            where: {
                id: item.id
            }
        })
        let quantityDiff = 0
        if(curItem?.quantity){
            quantityDiff = item.quantity - curItem.quantity
        }
        const newItem = await db.item.update({
            where: {
                id: item.id
            },
            data: {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                imageUrls: item.imageUrls,
            },
        });
        if(quantityDiff !== 0){
            const newTransaction = await db.transaction.create({
                data: {
                    itemId: item.id,
                    quantity: quantityDiff,
                    updatedBy: user?.username || "unknown",
                    updatedById: 1,
                },
            });
        }
        revalidatePath('/dashboard/transactions')
        revalidatePath('/dashboard/items')
        return newItem;
    } catch (error) {
        console.error('Error update item:',item.id, error);
        throw error;
    }
};

export default updateItemDetail;
