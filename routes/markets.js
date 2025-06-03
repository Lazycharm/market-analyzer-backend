import { Router } from "express";
import axios from "axios";

const router = Router();

// GET /api/markets/:category
// :category can be "crypto", "stocks", or "forex"
router.get("/:category", async (req, res) => {
  const category = req.params.category.toLowerCase();

  try {
    if (category === "crypto") {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1
          }
        }
      );
      const data = response.data.map((coin) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change: coin.price_change_percentage_24h
      }));
      return res.json(data);

    } else if (category === "stocks") {
      // Static sample stock data
      const STOCKS_SAMPLE = [
        { symbol: "AAPL", name: "Apple Inc.", price: 174.26, change: +0.85 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 2915.21, change: -12.48 },
        { symbol: "MSFT", name: "Microsoft Corp.", price: 319.45, change: -1.15 }
      ];
      return res.json(STOCKS_SAMPLE);

    } else if (category === "forex") {
      // Static sample forex data
      const FOREX_SAMPLE = [
        { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.0923, change: -0.0012 },
        { symbol: "GBP/USD", name: "British Pound / USD", price: 1.2567, change: +0.0008 },
        { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: 154.62, change: -0.05 }
      ];
      return res.json(FOREX_SAMPLE);

    } else {
      return res.status(400).json({ message: "Invalid category" });
    }
  } catch (err) {
    console.error("Error in /api/markets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
