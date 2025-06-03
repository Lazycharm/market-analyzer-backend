import { Router } from "express";

const router = Router();

// POST /api/ai-predict
// Body: { symbol }
router.post("/", (req, res) => {
  const { symbol } = req.body;
  // Dummy logic: random percent change between -5% and +5%
  const predictedChange = (Math.random() * 10 - 5).toFixed(2);
  const result = {
    symbol: symbol || "UNKNOWN",
    predictedChange: parseFloat(predictedChange),
    timestamp: new Date().toISOString()
  };
  res.json(result);
});

export default router;
