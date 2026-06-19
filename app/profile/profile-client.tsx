import Avatar from "../components/Avatar";
import { UserProfile } from "../dashboard/dashboard-client";
import {Upload} from 'lucide-react';


export default function ProfileEdit({user}:{user:UserProfile}){
    return(
        <div
        className="max-w-6xl m-2 p-4 rounded-md text-black border-amber-200"
        >
            <div className="flex flex-col justify-between gap-2">
                <div className="text-md md:text-lg font-semibold mb">
                    <h1>Editar Perfil</h1>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col justify-between gap-2">
                        
                        <div className="flex flex-col justify-center align-center gap-2">
                            <Avatar name={user.name} image={user.image}/>
                            <label htmlFor="profile-image-upload">
                                <div className='flex gap-1 cursor-pointer text-sm text-blue-500'>
                                    <Upload size={24} />
                                    <span>Editar Foto</span> 
                                </div>
                            </label>
                            <input type="file" name="" id="profile-image-upload" accept='image/*' className="hidden" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}