import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const postcode = searchParams.get("postcode");
	const suburb = searchParams.get("suburb");
	const state = searchParams.get("state");

	const res = await fetch(`${process.env.API_URL}?q=${suburb}&state=${state}`, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer '+process.env.AUTHORIZATION_TOKEN,
		},
	});
	const data = await res.json();

	return NextResponse.json(data);
}