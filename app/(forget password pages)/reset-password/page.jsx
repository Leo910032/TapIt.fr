"use client"
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/useTranslation";

export default function ResetPasswordPage() {
    const { t } = useTranslation();
    const router = useRouter();
    router.push("/login");
    
    return (
        <div>page</div>
    )
}