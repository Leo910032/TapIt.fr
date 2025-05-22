"use client"
import { fireApp } from "@/important/firebase";
import { testForActiveSession } from "@/lib/authentication/testForActiveSession";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../NavComponents/ProfileCard";
import { fetchUserData } from "@/lib/fetchData/fetchUserData";
import ShareCard from "../NavComponents/ShareCard";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "@/lib/useTranslation";

export const NavContext = React.createContext();

export default function NavBar() {
    const router = usePathname();
    const [activePage, setActivePage] = useState();
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState("");
    const [myLink, setMyLink] = useState("");
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showShareCard, setShowShareCard] = useState(false);
    const profileCardRef = useRef(null);
    const shareCardRef = useRef(null);
    const { t } = useTranslation();

    const handleShowProfileCard = () => {
        if (username === "") {
            return;
        }
        setShowProfileCard(!showProfileCard);
        setShowShareCard(false);
    }

    const handleShowShareCard = () => {
        if (username === "") {
            return;
        }
        setShowShareCard(!showShareCard);
        setShowProfileCard(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
                setShowProfileCard(false);
            }
        };

        if (showProfileCard) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfileCard, setShowProfileCard]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareCardRef.current && !shareCardRef.current.contains(event.target)) {
                setShowShareCard(false);
            }
        };

        if (showShareCard) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showShareCard, setShowShareCard]);

    useEffect(() => {
        async function fetchProfilePicture() {
            try {
                const currentUser = testForActiveSession();
                if (!currentUser) return;
                
                const collectionRef = collection(fireApp, "AccountData");
                const docRef = doc(collectionRef, `${currentUser}`);

                const myData = await fetchUserData(currentUser);
                if (!myData) return;
                
                const { username } = myData;
                setUsername(username || "");
                setMyLink(`https://www.tapit.fr/${username}`);

                onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const { profilePhoto, displayName } = docSnap.data();

                        if (profilePhoto !== '') {
                            setProfilePicture(
                                <Image
                                    src={`${profilePhoto}`}
                                    alt="profile"
                                    height={1000}
                                    width={1000}
                                    className="min-w-full h-full object-cover"
                                    priority
                                />
                            );
                        } else {
                            setProfilePicture(
                                <div className="h-[95%] aspect-square w-[95%] rounded-full bg-gray-300 border grid place-items-center">
                                    <span className="text-3xl font-semibold uppercase">
                                        {displayName && displayName.split('')[0]}
                                    </span>
                                </div>
                            );
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        }
        fetchProfilePicture();
    }, []);

    useEffect(() => {
        switch (router) {
            case "/dashboard":
                setActivePage(0);
                break;
            case "/dashboard/appearance":
                setActivePage(1);
                break;
            case "/dashboard/analytics":
                setActivePage(2);
                break;
            case "/dashboard/settings":
                setActivePage(3);
                break;
            default:
                setActivePage(0);
                break;
        }
    }, [router]);

    // Add CSS to body for mobile spacing
    useEffect(() => {
        // Add padding-bottom to body on mobile to account for fixed navbar
        const addMobileSpacing = () => {
            document.body.style.paddingBottom = window.innerWidth < 640 ? '100px' : '0px';
        };

        // Initial check
        addMobileSpacing();

        // Listen for window resize
        window.addEventListener('resize', addMobileSpacing);

        return () => {
            window.removeEventListener('resize', addMobileSpacing);
            document.body.style.paddingBottom = '0px';
        };
    }, []);
    
    return (
        <NavContext.Provider value={{ username, myLink, profilePicture, showProfileCard, setShowProfileCard, showShareCard, setShowShareCard }}>
            {/* Top navigation - remains the same */}
            <div className="w-full justify-between flex items-center rounded-[3rem] py-3 sticky top-0 z-[9999999999] px-3 mx-auto bg-white border backdrop-blur-lg">
                <div className="flex items-center gap-8">
                    <Link href={'/dashboard'} className="ml-3">
                        <Image src={"https://linktree.sirv.com/Images/logo-icon.svg"} alt="logo" height={23} width={23} className="" priority />
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href={'/dashboard'} className={`flex items-center gap-2 px-2 py-2 active:scale-90 active:opacity-40 hover:bg-black hover:bg-opacity-[0.075] rounded-lg text-sm font-semibold ${activePage === 0 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                            <Image src={"https://linktree.sirv.com/Images/icons/links.svg"} alt="links" height={16} width={16} />
                            {t('dashboard.links')}
                        </Link>
                        <Link href={'/dashboard/appearance'} className={`flex items-center gap-2 px-2 py-2 active:scale-90 active:opacity-40 hover:bg-black hover:bg-opacity-[0.075] rounded-lg text-sm font-semibold ${activePage === 1 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                            <Image src={"https://linktree.sirv.com/Images/icons/appearance.svg"} alt="links" height={16} width={16} />
                            {t('dashboard.appearance')}
                        </Link>
                        <Link href={'/dashboard/analytics'} className={`flex items-center gap-2 px-2 py-2 active:scale-90 active:opacity-40 hover:bg-black hover:bg-opacity-[0.075] rounded-lg text-sm font-semibold ${activePage === 2 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                            <Image src={"https://linktree.sirv.com/Images/icons/analytics.svg"} alt="links" height={16} width={16} />
                            {t('dashboard.analytics')}
                        </Link>
                        <Link href={'/dashboard/settings'} className={`flex items-center gap-2 px-2 py-2 active:scale-90 active:opacity-40 hover:bg-black hover:bg-opacity-[0.075] rounded-lg text-sm font-semibold ${activePage === 3 ? "opacity-100" : "opacity-50 hover:opacity-70"}`}>
                            <Image src={"https://linktree.sirv.com/Images/icons/setting.svg"} alt="links" height={16} width={16} />
                            {t('dashboard.settings')}
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <div className="p-3 flex items-center relative gap-2 rounded-3xl border cursor-pointer hover:bg-gray-100 active:scale-90 overflow-hidden" ref={shareCardRef} onClick={handleShowShareCard}>
                        <Image src={"https://linktree.sirv.com/Images/icons/share.svg"} alt="share" height={15} width={15} />
                    </div>
                    <div className="relative" ref={profileCardRef}>
                        <div className="grid place-items-center relative rounded-full border h-[2.5rem] w-[2.5rem] cursor-pointer hover:scale-110 active:scale-95 overflow-hidden" onClick={handleShowProfileCard}>
                            <div className="absolute z-10 w-full h-full sm:block hidden"></div>
                            {profilePicture}
                        </div>
                        <ProfileCard />
                        <ShareCard />
                    </div>
                </div>
            </div>
            
            {/* New improved mobile navigation bar */}
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 p-3 shadow-lg sm:hidden z-50">
                <div className="grid grid-cols-4 gap-1 max-w-lg mx-auto">
                    <Link 
                        href={'/dashboard'} 
                        className={`flex flex-col items-center p-2 rounded-xl ${activePage === 0 
                            ? "bg-purple-100 text-purple-700" 
                            : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="p-1.5 mb-1">
                            <Image 
                                src={"https://linktree.sirv.com/Images/icons/links.svg"} 
                                alt="Links" 
                                height={22} 
                                width={22} 
                            />
                        </div>
                        <span className="text-sm font-medium">{t('dashboard.links')}</span>
                    </Link>
                    
                    <Link 
                        href={'/dashboard/appearance'} 
                        className={`flex flex-col items-center p-2 rounded-xl ${activePage === 1 
                            ? "bg-purple-100 text-purple-700" 
                            : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="p-1.5 mb-1">
                            <Image 
                                src={"https://linktree.sirv.com/Images/icons/appearance.svg"} 
                                alt="Appearance" 
                                height={22} 
                                width={22} 
                            />
                        </div>
                        <span className="text-sm font-medium">{t('dashboard.appearance')}</span>
                    </Link>
                    
                    <Link 
                        href={'/dashboard/analytics'} 
                        className={`flex flex-col items-center p-2 rounded-xl ${activePage === 2 
                            ? "bg-purple-100 text-purple-700" 
                            : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="p-1.5 mb-1">
                            <Image 
                                src={"https://linktree.sirv.com/Images/icons/analytics.svg"} 
                                alt="Analytics" 
                                height={22} 
                                width={22} 
                            />
                        </div>
                        <span className="text-sm font-medium">{t('dashboard.analytics')}</span>
                    </Link>
                    
                    <Link 
                        href={'/dashboard/settings'} 
                        className={`flex flex-col items-center p-2 rounded-xl ${activePage === 3 
                            ? "bg-purple-100 text-purple-700" 
                            : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        <div className="p-1.5 mb-1">
                            <Image 
                                src={"https://linktree.sirv.com/Images/icons/setting.svg"} 
                                alt="Settings" 
                                height={22} 
                                width={22} 
                            />
                        </div>
                        <span className="text-sm font-medium">{t('dashboard.settings')}</span>
                    </Link>
                </div>
            </div>
        </NavContext.Provider>
    );
}