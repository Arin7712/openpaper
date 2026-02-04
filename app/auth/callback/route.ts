import { ensureUser } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`);
  }

    const email = user.emailAddresses[0]?.emailAddress ?? "";

  // ✅ Admin logic
  const role = ADMIN_EMAIL === email ? "ADMIN" : "USER";

  // Create the user if they don't exist
  const dbUser = await ensureUser({
    clerkId: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    name: user.firstName,
    role
  });

  // Get base URL from .env
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_APP_URL is not defined");

  //   if (!dbUser.isOnboarded) {
  //     return NextResponse.redirect(`${baseUrl}/onboarding`);
  //   }

  // return NextResponse.redirect(`${baseUrl}/dashboard`);
  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL!),
  );
}
