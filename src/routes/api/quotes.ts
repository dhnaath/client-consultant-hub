import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import yahooFinance from "yahoo-finance2";

export const APIRoute = createAPIFileRoute("/api/quotes")({
  GET: async () => {
    try {
      const quotes = await yahooFinance.quote(["IDR=X", "^JKSE", "GC=F", "SI=F"]);

      const getQuote = (symbol: string) => quotes.find((q) => q.symbol === symbol);

      const usdidr = getQuote("IDR=X")?.regularMarketPrice || 16000;

      const ihsgQuote = getQuote("^JKSE");
      const ihsg = {
        price: ihsgQuote?.regularMarketPrice || 7300,
        change: ihsgQuote?.regularMarketChange || 0,
        changePercent: ihsgQuote?.regularMarketChangePercent || 0,
      };

      const goldUsdOz = getQuote("GC=F")?.regularMarketPrice || 2400;
      const silverUsdOz = getQuote("SI=F")?.regularMarketPrice || 30;

      // Convert Oz to Gram (1 Troy Ounce = 31.1034768 grams)
      const troyOunce = 31.1034768;
      const goldIdrGram = (goldUsdOz / troyOunce) * usdidr;
      const silverIdrGram = (silverUsdOz / troyOunce) * usdidr;

      return json({
        usdidr: { price: usdidr },
        ihsg,
        emas: { price: goldIdrGram },
        perak: { price: silverIdrGram },
        dinar: { price: goldIdrGram * 4.25 },
        dirham: { price: silverIdrGram * 2.975 },
      });
    } catch (e) {
      console.error(e);
      // Fallback
      return json({
        usdidr: { price: 16000 },
        ihsg: { price: 7300, change: 0, changePercent: 0 },
        emas: { price: 1350000 },
        perak: { price: 16000 },
        dinar: { price: 1350000 * 4.25 },
        dirham: { price: 16000 * 2.975 },
      });
    }
  },
});
