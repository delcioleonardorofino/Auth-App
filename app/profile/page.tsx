import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileEdit from "./profile-client";
import UploadFile from "../components/UploadFile";


export default async function ProfileEditPage(){
    const session = await auth.api.getSession(
        {
            headers: await headers()
        })

    if (!session){
        redirect('/auth');
    }

    return (
        <div
        className="flex justify-center align-center items-center"
        >
            <ProfileEdit user={session.user}/>
            <UploadFile />
        </div>
        
    )
}