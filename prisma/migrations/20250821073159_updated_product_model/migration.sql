-- DropForeignKey
ALTER TABLE "public"."Cart_items" DROP CONSTRAINT "Cart_items_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Shopping_cart"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE;
