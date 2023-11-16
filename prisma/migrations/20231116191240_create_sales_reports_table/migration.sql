-- CreateTable
CREATE TABLE "sales_reports" (
    "id" SERIAL NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "sales_amount" DECIMAL(65,30) NOT NULL,
    "products_sold" INTEGER NOT NULL,
    "csv_file" TEXT NOT NULL,

    CONSTRAINT "sales_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_reports_id_key" ON "sales_reports"("id");
