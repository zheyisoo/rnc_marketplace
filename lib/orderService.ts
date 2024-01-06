import { db } from "./db";
import {OrderWithFullDetails} from "./type"; 

export const getOrdersWithCartItemsAndItems = async (userId:number) => {
    try {
        const orders = await db.order.findMany({
            where: {
                userId:userId
            },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                user: true,
            },
        });
        return orders as OrderWithFullDetails[];
    }catch
    (error) {
        return []
    }
}
