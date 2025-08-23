-- AlterEnum
ALTER TYPE "public"."Status" ADD VALUE 'CANCELLED';

-- DropIndex
DROP INDEX "public"."Order_table_shippingAddress_id_key";

-- AlterTable
ALTER TABLE "public"."Cart_items" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Order_items" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Products" ALTER COLUMN "product_price" SET DATA TYPE DOUBLE PRECISION;
