import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://127.0.0.1:3001/prs", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend returned an error" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Backend connection error:", error);

    return NextResponse.json(
      { error: "Could not connect to backend" },
      { status: 500 }
    );
  }
}