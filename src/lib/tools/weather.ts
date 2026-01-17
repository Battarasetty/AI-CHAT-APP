export async function getWeather(city: string) {
    try {
        // Get coordinates
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude } = geoData.results[0];

        // Get current weather
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        return {
            temp: weatherData.current_weather?.temperature ?? "N/A",
            condition: "Clear",
        };
    } catch (err) {
        console.error("Weather API error:", err);
        return { temp: "N/A", condition: "N/A" };
    }
}
