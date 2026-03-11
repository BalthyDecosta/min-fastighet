export default async function handler(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "missing query" });
    }

    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&countrycodes=se&q=" +
      encodeURIComponent(query);

    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "MinFastighet/0.5 (Vercel serverless)"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "upstream error",
        status: response.status,
        body: text
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "server error",
      message: err.message
    });
  }
}
