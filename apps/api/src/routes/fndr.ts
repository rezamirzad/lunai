import { Router } from "express";
import { fndrService } from "../services/fndr";

const router = Router();

// POST /api/fndr/search
router.post("/search", async (req, res) => {
  if (!(req as any).user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { keyword, platform } = req.body;
  const userId = (req as any).user.id;

  if (!keyword || !platform) {
    return res.status(400).json({ message: "Keyword and platform are required." });
  }

  try {
    const result = await fndrService.search(keyword, platform, userId);
    res.json(result);
  } catch (error) {
    console.error("Error in FNDR search:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// GET /api/fndr/status/:jobId
router.get("/status/:jobId", async (req, res) => {
  if (!(req as any).user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { jobId } = req.params;

  try {
    const status = await fndrService.getJobStatus(jobId);
    if (!status) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.json(status);
  } catch (error) {
    console.error("Error fetching job status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
