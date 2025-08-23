/*
  Warnings:

  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_category_id_fkey";

-- AlterTable
ALTER TABLE "public"."Products" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
