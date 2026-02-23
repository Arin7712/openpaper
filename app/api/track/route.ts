import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const country =
        req.headers.get("x-vercel-ip-country") ||
        req.headers.get("x-forwarded-for-country") || // fallback if proxy used
        "unknown";

    const log = {
        source: body.source || "direct",
        country,
        userAgent: req.headers.get("user-agent"),
        time: new Date().toISOString()
    };

    console.log("VISIT:", log);

    return NextResponse.json({ success: true });
}