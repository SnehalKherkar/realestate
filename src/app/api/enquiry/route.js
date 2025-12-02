import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, mobile, email, message, propertyId } = body;

    if (!name || !mobile || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "enquiries.json");
    let enquiries = [];
    if (fs.existsSync(filePath)) {
      enquiries = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const newEnquiry = { id: Date.now(), name, mobile, email, message: message || "", propertyId: propertyId || null, createdAt: new Date() };
    enquiries.push(newEnquiry);
    fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2));

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }
}
