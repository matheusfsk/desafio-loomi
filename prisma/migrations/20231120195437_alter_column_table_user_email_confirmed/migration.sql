/*
  Warnings:

  - Made the column `email_confirmed` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email_confirmed" SET NOT NULL,
ALTER COLUMN "email_confirmed" SET DEFAULT false;
