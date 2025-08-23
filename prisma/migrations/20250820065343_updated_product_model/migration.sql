/*
  Warnings:

  - A unique constraint covering the columns `[product_name]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_product_name_key" ON "public"."Products"("product_name");
