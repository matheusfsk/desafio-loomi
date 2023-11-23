// src/services/relatoriosService.ts
import { PrismaClient } from "@prisma/client";
import { createObjectCsvWriter } from "csv-writer";
import * as path from "path";
const prisma = new PrismaClient();
import * as fs from "fs/promises";

type SalesDataRow = [string, number, number, number];

export const generateSalesReport = async (
  startPeriod: Date,
  endPeriod: Date,
  filteredCategoryIds: number
) => {
  try {
    const salesData: SalesDataRow[] = await prisma.$queryRaw`
      SELECT
        p.name as product_name,
        CAST(COUNT(DISTINCT oi.order_id) as INTEGER) as sales_amount,
        CAST(SUM(oi.amount) AS INTEGER) as products_sold,
        AVG(p.price) as unit_price,
        SUM(oi.subtotal)  as subtotal
      FROM
        "order_items" oi
      LEFT JOIN "products" p ON oi.product_id = p.id
      LEFT JOIN "orders" o ON oi.order_id = o.id
      WHERE 1 = 1
      AND CAST (o.created_at as DATE) >= ${startPeriod}
      AND CAST (o.created_at as DATE) <= ${endPeriod}
      AND (p.category_id = ${Number(
        filteredCategoryIds
      )} OR 9999999999 = ${Number(filteredCategoryIds)})
      GROUP BY
        product_name
    `;

    const [salesTotal]: { sales_amount: number; products_sold: number }[] =
      await prisma.$queryRaw`
SELECT
  CAST(COUNT(DISTINCT oi.order_id) as INTEGER) as sales_amount,
  CAST(SUM(oi.amount) AS INTEGER) as products_sold
FROM
  "order_items" oi
LEFT JOIN "products" p ON oi.product_id = p.id
LEFT JOIN "orders" o ON oi.order_id = o.id
WHERE 1 = 1
AND CAST (o.created_at as DATE) >= ${startPeriod}
AND CAST (o.created_at as DATE) <= ${endPeriod}
AND (p.category_id = ${Number(filteredCategoryIds)} OR 9999999999 = ${Number(
        filteredCategoryIds
      )})
`;
    const csvFilePath = path.join(__dirname, "csv", "report.csv");

    const csvDirectory = path.dirname(csvFilePath);
    await fs.mkdir(csvDirectory, { recursive: true });

    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "product_name", title: "Product" },
        { id: "products_sold", title: "Quantity" },
        { id: "unit_price", title: "Unit Price" },
        { id: "subtotal", title: "Total" },
      ],
    });

    const records = salesData.map((item: any) => ({
      product_name: item.product_name,
      sales_amount: item.sales_amount,
      products_sold: item.products_sold,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
    }));

    await csvWriter.writeRecords(records);

    const reportPath = csvFilePath;

    const { sales_amount, products_sold } = salesTotal;

    await prisma.salesReport.create({
      data: {
        period: new Date(),
        sales_amount: sales_amount,
        products_sold: products_sold,
        csv_file: reportPath,
      },
    });

    return reportPath;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating the report on report");
  }
};
