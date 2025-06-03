import { Router } from "express";

const router = Router();

// GET /api/news
router.get("/", (req, res) => {
  const newsItems = [
    { title: "Bitcoin Surges to New Highs", source: "CoinDesk", url: "#" },
    { title: "Stock Market Rally Continues", source: "Bloomberg", url: "#" },
    { title: "Forex Trading Tips for Beginners", source: "Reuters", url: "#" },
    { title: "Ethereum 2.0 Launch Updates", source: "CoinTelegraph", url: "#" },
    { title: "Tesla Stock Splits 5-for-1", source: "CNBC", url: "#" },
    { title: "Gold Prices Rise Amid Inflation Fears", source: "Investopedia", url: "#" },
    { title: "New Regulations for Crypto Exchanges", source: "Forbes", url: "#" },
    { title: "US Dollar Weakens Against Euro", source: "Financial Times", url: "#" }
  ];
  res.json(newsItems);
});

export default router;
