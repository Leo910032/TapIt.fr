import Link from "next/link";
import { verifyResetKey } from "@/lib/authentication/verifyResetKey";
import ResetPasswordForm from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";

// Import a server-side translation solution if available
// Or create a ClientSideTranslation component for the error messages

export default async function ResetPasswordPage({ params }) {
    try {
        const [userId, timePassed] = await verifyResetKey(params.resetKey);
        return (
            <>
                <Toaster />
                <ResetPasswordForm user={userId} resetKey={params.resetKey} />
            </>
        );
    } catch (error) {
        // Using error components with client-side translation
        if (error.known) {
            return <ErrorWithLogin errorMessage={error.known} />;
        }
        return <GenericError />;
    }
}

