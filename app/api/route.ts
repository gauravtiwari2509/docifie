import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export async function POST(request: Request) {
    const clerkUser=await currentUser();
    console.log(clerkUser)
    const {id,firstName,lastName,emailAddresses,imageUrl}=clerkUser;
    if(!clerkUser){
        redirect('/sign-in')
    }
    const user={
        id,
        info:{
            id,
            name:`${firstName} ${lastName}`,
            email:emailAddresses[0].emailAddress,
            avatar:imageUrl,
            color:getUserColor(id),
        }
    }
  // Get the current user from your database

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[] // Optional
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}