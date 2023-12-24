"use server";

import { db } from '@/lib/db';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache'

const addNewItem = async (item:Item) => {
    console.log("run here?")
    try {
        const newItem = await db.item.create({
            data: {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
            },
        });
        revalidatePath('/dashboard/items')
        return newItem;
    } catch (error) {
        console.error('Error adding new item:', error);
        throw error;
    }
};

export default addNewItem;
