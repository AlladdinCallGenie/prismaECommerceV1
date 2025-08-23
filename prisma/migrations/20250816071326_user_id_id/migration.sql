/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order_table" DROP CONSTRAINT "Order_table_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Shopping_cart" DROP CONSTRAINT "Shopping_cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User_address" DROP CONSTRAINT "User_address_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User_role" DROP CONSTRAINT "User_role_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."User_role" ADD CONSTRAINT "User_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_address" ADD CONSTRAINT "User_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_table" ADD CONSTRAINT "Order_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shopping_cart" ADD CONSTRAINT "Shopping_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
