import { createConnection } from "@/../lib/connectDB"
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const db = await createConnection();
    const [result] = await db.query("SELECT * FROM log");
    return NextResponse.json({result});
  } catch (error) {
    console.log(`error: ${error}`);
    return NextResponse.json({message: error.message});
  }
}