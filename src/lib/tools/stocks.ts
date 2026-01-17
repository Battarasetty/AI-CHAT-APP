export async function getStockPrice(symbol: string) {
    try {
        const API_KEY = process.env.ALPHA_VANTAGE_KEY ?? ""; // optional
        const url = API_KEY
            ? `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
            : `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=demo`; // free demo fallback

        const res = await fetch(url);
        const data = await res.json();

        const price =
            data["Global Quote"]?.["05. price"] ?? data?.c ?? "N/A"; // supports AlphaV/Finnhub

        return { symbol, price };
    } catch (err) {
        console.error("Stocks API error:", err);
        return { symbol, price: "N/A" };
    }
}
