import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.APPLICATION_WEBHOOK_URL; // server-only env var
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "APPLICATION_WEBHOOK_URL is not set" },
        { status: 500 }
      );
    }

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await resp.text(); // Apps Script sometimes returns text
    let data: any = null;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!resp.ok) {
      return NextResponse.json(
        { success: false, error: "Webhook failed", details: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, details: data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
