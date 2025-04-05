const NEWS_API_KEY = "pub_78246c1f5b0628ce538d54a9b83b9360e99c3";
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=pub_78246c1f5b0628ce538d54a9b83b9360e99c3&q=crypto&category=business`;

export async function fetchCryptoNews() {
    try {
        console.log("Fetching Crypto News from:", NEWS_API_URL);

        const response = await fetch(NEWS_API_URL);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from API");
        }

        const data = await response.json();

        if (data && Array.isArray(data.results)) {
            return data.results.slice(0, 5); // Return top 5 news articles
        } else {
            console.error("Unexpected API response format:", data);
            return []; // Return empty array to prevent errors
        }
    } catch (error) {
        console.error("Error fetching crypto news:", error);
        return []; // Handle errors gracefully
    }
}
