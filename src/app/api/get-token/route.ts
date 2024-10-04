import { env } from "@/env";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function GET() {
  try {
    const user = await currentUser();

    console.log("Calling get-token for user", user?.id);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const streamClient = StreamChat.getInstance(
      env.NEXT_PUBLIC_STREAM_KEY,
      env.STREAM_SECRET
    );

    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

    const issuedAt = Math.floor(Date.now() / 1000) - 60; // current time in seconds

    const token = streamClient.createToken(user.id, expirationTime, issuedAt);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
