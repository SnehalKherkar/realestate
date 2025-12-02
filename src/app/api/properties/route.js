import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const file = path.join(process.cwd(), "data", "properties.json");
    const raw = fs.readFileSync(file, "utf8");
    let list = JSON.parse(raw || "[]");

    const url = new URL(request.url);
    const params = url.searchParams;

    let filtered = list;

    if (params.get("type")) filtered = filtered.filter(p => p.type === params.get("type"));
    if (params.get("saleMode")) filtered = filtered.filter(p => p.saleMode === params.get("saleMode"));
    if (params.get("usage")) filtered = filtered.filter(p => p.usage === params.get("usage"));

    const min = params.get("minPrice");
    const max = params.get("maxPrice");
    if (min) filtered = filtered.filter(p => Number(p.price) >= Number(min));
    if (max) filtered = filtered.filter(p => Number(p.price) <= Number(max));

    const q = params.get("q");
    if (q) {
      const re = new RegExp(q, "i");
      filtered = filtered.filter(p => re.test(p.title) || re.test(p.city) || re.test(p.locality));
    }

    return new Response(JSON.stringify(filtered), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
