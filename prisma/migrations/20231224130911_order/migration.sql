/*
  Warnings:

  - You are about to drop the column `fulfilled` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToUser" DROP CONSTRAINT "_ItemToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToUser" DROP CONSTRAINT "_ItemToUser_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "fulfilled",
DROP COLUMN "itemId",
DROP COLUMN "quantity",
DROP COLUMN "updatedBy",
DROP COLUMN "updatedById";

-- DropTable
DROP TABLE "_ItemToOrder";

-- DropTable
DROP TABLE "_ItemToUser";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "orderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
