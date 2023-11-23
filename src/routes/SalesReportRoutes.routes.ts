import { Router } from "express";
import { GenerateReports } from "../controllers/Reports/SalesReportsController";

const reportRoutes = Router();

const generateReports = new GenerateReports();

reportRoutes.get("/salesreport", generateReports.handle);

export { reportRoutes };
