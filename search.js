
export default async function handler(req, res) {

  const query = req.query.q;

  if (!query) {
    res.status(400).json({ error: "missing query" });
    return;
  }

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&countrycodes=se&q=" +
    encodeURIComponent(query);

  const r = await fetch(url);
  const data = await r.json();

  res.status(200).json(data);
}
