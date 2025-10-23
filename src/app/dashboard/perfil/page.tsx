'use client'
import MinhasQuadras from "@/app/dashboard/perfil/minhasQuadras";
import MyProfile from "@/app/dashboard/perfil/myProfile";

export default function Perfil() {
    return (
        <div className="space-y-6">
            <MyProfile />
            <MinhasQuadras />
        </div>
    )
}