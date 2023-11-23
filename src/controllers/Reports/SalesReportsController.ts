import { Request, Response } from "express";
import { generateSalesReport } from "../../services/ReportServices";

type GenerateReportsParams = {
  startDate?: string;
  endDate?: string;
  category_id?: number;
};

export class GenerateReports {
  async handle(req: Request<{}, {}, {}, GenerateReportsParams>, res: Response) {
    try {
      let { startDate, endDate, category_id } = req.query;

      if (!startDate) {
        startDate = "2020-01-01";
      }
      if (!endDate) {
        endDate = "2100-01-01";
      }

      if (!category_id) {
        category_id = 9999999999;
      }

      const startPeriod = new Date(startDate as string);
      const endPeriod = new Date(endDate as string);
      const reportPath = await generateSalesReport(
        startPeriod,
        endPeriod,
        category_id
      );

      res.json({ pathCSV: reportPath });
    } catch (error) {
      res.status(500).json({ error: "Error generating the report" });
    }
  }
}

export default GenerateReports;
