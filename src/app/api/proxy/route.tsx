import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const API_URL = process.env.API_URL;
	const AUTH_TOKEN = process.env.AUTHORIZATION_TOKEN;

	if (!API_URL || !AUTH_TOKEN) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}

	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q");
	const state = searchParams.get("state");

	try {
		const response = await fetch(`${API_URL}?q=${q}&state=${state}`, {
			headers: {
				Authorization: `Bearer ${AUTH_TOKEN}`,
			}
		});
		return NextResponse.json(await response.json());
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch data " + error }, { status: 500 });
	}
}