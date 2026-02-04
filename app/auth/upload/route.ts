import { getUserByClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {

    const user = await currentUser();
    if(!user)
        redirect('/sign-in');

    const dbuser = await getUserByClerkId(user?.id || "");
    if(!dbuser)
        redirect('/sign-up');

    if(dbuser.role == "ADMIN")
    {
        console.log("Upload route accessed by ADMIN");
        redirect('/upload')
    }
    else
        redirect('/');

}