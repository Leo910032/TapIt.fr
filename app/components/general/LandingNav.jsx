import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
    return (
        <div className="w-[96%] justify-between flex items-center rounded-[3rem] py-3 absolute sm:top-4 top-2 z-[9999999999] mdpx-12 sm:px-6 px-3 mx-auto bg-white bg-opacity-[0.1] border backdrop-blur-xl hover:glow-white">
            <Link href={"/"}>
                <Image src="/my-logo.png" alt="logo" height={125} width={125}  priority className="bg-white  rounded-[3rem] " />
            </Link>

            {/* Add this new section for navigation links */}
            <div className="hidden sm:flex items-center gap-4">
                <Link href="/store" className="text-white hover:text-themeGreen transition-colors font-medium">
                    Store
                </Link>
            </div>

            <Link href={'/login'} className="p-3 sm:px-6 px-3 bg-themeGreen flex items-center gap-2 rounded-3xl cursor-pointer hover:scale-105 hover:bg-gray-100 active:scale-90">
                Login
            </Link>
        </div>
    );
}