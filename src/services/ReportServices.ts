// src/services/relatoriosService.ts
import { PrismaClient } from "@prisma/client";
import { createObjectCsvWriter } from "csv-writer";

const prisma = new PrismaClient();

export const generateSalesReport = async (
  startPeriod: Date,
  endPeriod: Date,
  filteredCategoryIds: number
) => {
  try {
    const salesData = await prisma.$queryRaw`
  SELECT
    p.name as product_name,
    CAST(SUM(oi.amount) AS INTEGER) as amount,
    AVG(p.price) as unit_price,
    SUM(oi.subtotal)  as subtotal
  FROM
    "order_items" oi
  LEFT JOIN "products" p ON oi.product_id = p.id
  LEFT JOIN "orders" o ON oi.order_id = o.id
  WHERE 1 = 1
  AND CAST (o.created_at as DATE) >= ${startPeriod}
  AND CAST (o.created_at as DATE) <=${endPeriod}
  AND (p.category_id = ${Number(filteredCategoryIds)} OR 9999999999 = ${Number(
      filteredCategoryIds
    )})
    GROUP BY
    product_name
`;

    const csvWriter = createObjectCsvWriter({
      path: "path/to/report.csv",
      header: [
        { id: "product_name", title: "Product" },
        { id: "amount", title: "Quantity" },
        { id: "unit_price", title: "Unit Price" },
        { id: "subtotal", title: "Total" },
      ],
    });

    /* const records = salesData.map((item) => ({
      product_name: item.product_name,
      amount: item.amount,
      subtotal: item.subtotal,
    }));

    await csvWriter.writeRecords(records);

    const reportPath = 'path/to/report.csv'; // Substitua isso pelo caminho real
    await prisma.salesReport.create({
      data: {
        period: period,
        sales_amount: salesData.reduce((total, item) => total + item.subtotal, 0),
        products_sold: salesData.length,
        csv_file: reportPath,
      },
    });
*/
    return salesData;
    /* return reportPath;  */
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar o relatório");
  }
};
