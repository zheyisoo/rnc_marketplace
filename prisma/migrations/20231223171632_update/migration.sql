-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_updatedById_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "updatedBy" TEXT NOT NULL DEFAULT 'system';
