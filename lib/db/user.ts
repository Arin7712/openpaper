"use server";

import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../prisma";

type EnsureUserProps = {
    clerkId: string,
    name: string | null,
    email: string,
    role: "USER" | "ADMIN"
}


export async function ensureUser({
  clerkId,
  name,
  email,
  role
}: EnsureUserProps) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        name,
        email,
        role
      },
    });

    // ✅ FIX: await clerkClient()
    const clerk = await clerkClient();

    await clerk.users.updateUser(clerkId, {
      publicMetadata: {
        role: user.role,
      },
    });


    console.log("User successfully created & role synced.");
    return user;
  } catch (error) {
    console.error("Error ensuring user:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    return user;
  } catch (error) {
    console.error("Error getting user by clerkId:", error);
    throw error;
  }
}