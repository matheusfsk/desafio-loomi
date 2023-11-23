import { Router } from "express";
import { GenerateReports } from "../controllers/Reports/SalesReportsController";
import IsAdmin from "../middlewares/IsAdmin";
const isAdmin = new IsAdmin();

const reportRoutes = Router();

const generateReports = new GenerateReports();

reportRoutes.get("/salesreport", isAdmin.handle, generateReports.handle);

export { reportRoutes };
