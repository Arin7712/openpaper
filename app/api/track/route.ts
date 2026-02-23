import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const log = {
        source: body.source || "direct",
        userAgent:req.headers.get("user-agent"),
        time: new Date().toISOString()
    };

    console.log("VISIT:", log);
    return NextResponse.json({ success: true });
}