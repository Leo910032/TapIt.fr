"use client"
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import "../../styles/3d.css";
import { getSessionCookie } from '@/lib/authentication/session';
import { fetchUserData } from '@/lib/fetchData/fetchUserData';

export default function Preview() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);
    const containerRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const sessionUsername = getSessionCookie("adminLinker");
        if (sessionUsername === undefined) {
            return;
        }
        
        async function getUserData() {
            try {
                setIsLoading(true);
                const data = await fetchUserData(sessionUsername);
                setUsername(data?.username || '');
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        
        getUserData();
    }, []);

    useEffect(() => {
        if (!containerRef.current || !innerRef.current) return;

        const container = containerRef.current;
        const inner = innerRef.current;

        // Mouse
        const mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function (event) {
                const e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y) * -1;
            },
            setOrigin: function (e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
            },
            show: function () {
                return "(" + this.x + ", " + this.y + ")";
            },
        };

        // Track the mouse position relative to the center of the container.
        mouse.setOrigin(container);

        let counter = 0;
        const updateRate = 10;
        const isTimeToUpdate = function () {
            return counter++ % updateRate === 0;
        };

        const onMouseEnterHandler = function (event) {
            update(event);
        };

        const onMouseLeaveHandler = function () {
            inner.style = "";
        };

        const onMouseMoveHandler = function (event) {
            if (isTimeToUpdate()) {
                update(event);
            }
        };

        const update = function (event) {
            mouse.updatePosition(event);
            updateTransformStyle(
                (mouse.y / inner.offsetHeight / 2).toFixed(2),
                (mouse.x / inner.offsetWidth / 2).toFixed(2)
            );
        };

        const updateTransformStyle = function (x, y) {
            const style = `rotateX(${x}deg) rotateY(${y}deg) scale(0.8)`;
            inner.style.transform = style;
            inner.style.webkitTransform = style;
            inner.style.mozTransform = style;
            inner.style.msTransform = style;
            inner.style.oTransform = style;
        };

        container.onmouseenter = onMouseEnterHandler;
        container.onmouseleave = onMouseLeaveHandler;
        container.onmousemove = onMouseMoveHandler;

        // Cleanup
        return () => {
            container.onmouseenter = null;
            container.onmouseleave = null;
            container.onmousemove = null;
        };
    }, []);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
    };

    // Create a preview URL - use the actual domain where your app is deployed
    const previewUrl = username ? `${window.location.protocol}//${window.location.host}/${username}` : '';

    return (
        <div className="w-[35rem] md:grid hidden place-items-center border-l ml-4">
            <div className='w-fit h-fit' ref={containerRef} id='container'>
                <div className="h-[45rem] scale-[0.8] w-[23rem] bg-black rounded-[3rem] grid place-items-center" ref={innerRef} id="inner">
                    <div className="h-[97.5%] w-[95%] bg-white bg-opacity-[.1] grid place-items-center rounded-[2.5rem] overflow-hidden relative border">
                        <div className='absolute h-[20px] w-[20px] rounded-full top-2 bg-black'></div>
                        <div className='top-6 left-6 absolute pointer-events-none'>
                            {isLoading && (
                                <Image 
                                    src="https://linktree.sirv.com/Images/gif/loading.gif" 
                                    width={25} 
                                    height={25} 
                                    alt="loading" 
                                    className="mix-blend-screen" 
                                />
                            )}
                        </div>
                        <div className="h-full w-full">
                            {username ? (
                                <iframe 
                                    src={previewUrl}
                                    ref={iframeRef}
                                    onLoad={handleIframeLoad}
                                    onError={handleIframeError}
                                    frameBorder="0" 
                                    className='h-full bg-white w-full'
                                    sandbox="allow-same-origin allow-scripts"
                                    title="Profile Preview"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                    <div className="text-center p-4">
                                        <p className="text-gray-500 mb-2">Preview not available</p>
                                        <p className="text-sm text-gray-400">Log in to see your profile</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}