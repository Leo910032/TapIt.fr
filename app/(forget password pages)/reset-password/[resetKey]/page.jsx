import Link from "next/link";
import { verifyResetKey } from "@/lib/authentication/verifyResetKey";
import ResetPasswordForm from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "@/lib/useTranslation";

export default async function ResetPasswordPage({ params }) {
    const { t } = useTranslation();
    try {
        const [userId, timePassed] = await verifyResetKey(params.resetKey);
        return (
            <>
                <Toaster />
                <ResetPasswordForm user={userId} resetKey={params.resetKey} />
            </>
        );
    } catch (error) {
        if (error.known){
            return (
                <div className="p-8">
                    {error.known} <Link href={"/login"} className="font-semibold text-themeGreen">{t("reset_password.login")}</Link>
                </div>
            );
        }
        return (
            <div className="p-8">
            {t("reset_password.password_error")} <Link href={"/"} className="font-semibold text-themeGreen">{t("reset_password.homepage")}</Link>
            </div>
        );
    }
}