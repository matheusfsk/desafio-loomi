/*
  Warnings:

  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;
