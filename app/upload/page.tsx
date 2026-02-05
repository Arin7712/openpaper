import UploadForm from "@/components/forms/upload-form"
import { getUserByClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Upload = async () => {
      const user = await currentUser();
      if(!user)
          redirect('/sign-in');
  
      const dbuser = await getUserByClerkId(user?.id || "");
      if(!dbuser)
          redirect('/sign-up');
  
      if(dbuser.role != "ADMIN")
      {
          redirect('/')
      }

  return (
    <main>
      <UploadForm/>
    </main>
  )
}

export default Upload
