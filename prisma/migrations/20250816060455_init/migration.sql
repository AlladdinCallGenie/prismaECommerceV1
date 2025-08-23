-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."User_role" (
    "role_id" SERIAL NOT NULL,
    "role" "public"."Role" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "User_role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "public"."User_address" (
    "address_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "isShipping_address" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "public"."Products" (
    "product_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order_table" (
    "order_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shippingAddress_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Order_table_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."Shopping_cart" (
    "cart_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shopping_cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "public"."Cart_items" (
    "cart_item_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Cart_items_pkey" PRIMARY KEY ("cart_item_id")
);

-- CreateTable
CREATE TABLE "public"."Order_items" (
    "order_item_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_role_userId_key" ON "public"."User_role"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_table_shippingAddress_id_key" ON "public"."Order_table"("shippingAddress_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shopping_cart_userId_key" ON "public"."Shopping_cart"("userId");

-- AddForeignKey
ALTER TABLE "public"."User_role" ADD CONSTRAINT "User_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_address" ADD CONSTRAINT "User_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_table" ADD CONSTRAINT "Order_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_table" ADD CONSTRAINT "Order_table_shippingAddress_id_fkey" FOREIGN KEY ("shippingAddress_id") REFERENCES "public"."User_address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shopping_cart" ADD CONSTRAINT "Shopping_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Shopping_cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order_table"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_items" ADD CONSTRAINT "Order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
