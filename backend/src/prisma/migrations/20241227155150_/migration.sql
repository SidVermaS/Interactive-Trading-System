-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "Currency";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "Trade";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "User";

-- CreateEnum
CREATE TYPE "Trade"."OrderType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "Trade"."OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'REJECTED', 'EXPIRED', 'CANCELED');

-- CreateTable
CREATE TABLE "User"."Client" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User"."AccountManager" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency"."TradingPair" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DECIMAL(18,8) NOT NULL,
    "minPrice" DECIMAL(18,8) NOT NULL,
    "maxPrice" DECIMAL(18,8) NOT NULL,
    "minQty" DECIMAL(18,8) NOT NULL,
    "maxQty" DECIMAL(18,8) NOT NULL,
    "baseAsset" TEXT NOT NULL,
    "quoteAsset" TEXT NOT NULL,
    "baseAssetPrecision" INTEGER NOT NULL,
    "quoteAssetPrecision" INTEGER NOT NULL,

    CONSTRAINT "TradingPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade"."Order" (
    "id" UUID NOT NULL,
    "price" DECIMAL(18,8) NOT NULL,
    "quantity" DECIMAL(18,8) NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "type" "Trade"."OrderType" NOT NULL,
    "status" "Trade"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "clientId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "tradingPairId" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade"."MatchedTrade" (
    "id" UUID NOT NULL,
    "buyOrderId" UUID NOT NULL,
    "sellOrderId" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "matchedAt" TIMESTAMP(3) NOT NULL,
    "accountManagerId" UUID NOT NULL,

    CONSTRAINT "MatchedTrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "User"."Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "User"."Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountManager_id_key" ON "User"."AccountManager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccountManager_email_key" ON "User"."AccountManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPair_id_key" ON "Currency"."TradingPair"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPair_symbol_key" ON "Currency"."TradingPair"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPair_baseAsset_quoteAsset_key" ON "Currency"."TradingPair"("baseAsset", "quoteAsset");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Trade"."Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchedTrade_id_key" ON "Trade"."MatchedTrade"("id");

-- AddForeignKey
ALTER TABLE "Trade"."Order" ADD CONSTRAINT "Order_tradingPairId_fkey" FOREIGN KEY ("tradingPairId") REFERENCES "Currency"."TradingPair"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade"."Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade"."MatchedTrade" ADD CONSTRAINT "MatchedTrade_buyOrderId_fkey" FOREIGN KEY ("buyOrderId") REFERENCES "Trade"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade"."MatchedTrade" ADD CONSTRAINT "MatchedTrade_sellOrderId_fkey" FOREIGN KEY ("sellOrderId") REFERENCES "Trade"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade"."MatchedTrade" ADD CONSTRAINT "MatchedTrade_accountManagerId_fkey" FOREIGN KEY ("accountManagerId") REFERENCES "User"."AccountManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
