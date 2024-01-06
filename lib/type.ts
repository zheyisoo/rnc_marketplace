import { CartItem, Item, Prisma, Status } from '@prisma/client';

export type OrderWithCartItemsAndItemsType = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        item: true;
      };
    };
  };
}>;

export type CartItemswithItemsType = Prisma.CartItemGetPayload<{
    include: {
        item: true;
    };
    }>;


export type OrderWithFullDetails = Prisma.OrderGetPayload<{
    include: {
        items: {
            include: {
                item: true,
            },
        },
        user: true,
    },
}>;

export type TransactionWithFullDetails = Prisma.TransactionGetPayload<{
    include: {
        item: true,
    },
}>;


export type OrdersTable = {
    id: number
    orderedBy: string
    items : CartItem[]
    status: Status
  }
