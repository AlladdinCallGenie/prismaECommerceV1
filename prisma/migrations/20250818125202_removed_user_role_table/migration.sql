/*
  Warnings:

  - You are about to drop the `User_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User_role" DROP CONSTRAINT "User_role_userId_fkey";

-- DropTable
DROP TABLE "public"."User_role";
