"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "@/utils/auth";
import Image from "next/image";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const handleSignOut = async () => {
        setIsOpen(false);
        await signOut("/");
    };

    return (
        <div className="relative">
            <button
                className="menu-button text-white px-4 py-2 rounded-lg focus:outline-none bg-transparent hover:bg-transparent"
                aria-expanded={isOpen}
                aria-controls="navbar-menu"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src="/navigation-bar.png"
                    alt="Open Nav bar"
                    style={{ filter: "brightness(0) invert(1)" }}
                    width={24}
                    height={24}
                />
            </button>
            <div
                id="navbar-menu"
                className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-width duration-300 ${isOpen ? "w-64" : "w-0"
                    }`}
                aria-hidden={!isOpen}
            >
                <button
                    className="close-menu absolute top-4 right-4 text-gray-800 focus:outline-none bg-transparent hover:bg-transparent"
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src="/collapse.png"
                        alt="Collapse nav bar"
                        className="hover:drop-shadow-lg"
                        width={24}
                        height={24}
                    />
                </button>
                <div
                    className={`menu-items mt-16 px-4 w-64 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"
                        }`}
                >
                    {session ? (
                        <>
                            <Link href="/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                                User List
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="block w-full text-left px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md shadow-sm"
                        >
                            Sign In with Google
                        </button>
                    )}
                </div>
            </div>
            {/* <div
                id="navbar-menu"
                className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 duration-300 ${isOpen ? "w-64" : "w-0"
                    }`}
                aria-hidden={!isOpen}
            >
                <button
                    className="close-menu absolute top-4 right-4 text-gray-800 focus:outline-none bg-transparent hover:bg-transparent"
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src="/collapse.png"
                        alt="Collapse nav bar"
                        className="hover:drop-shadow-lg"
                        width={24}
                        height={24}
                    />
                </button>
                <div className={`menu-items mt-16 px-4 duration-300 ${isOpen ? "block" : "hidden"}`}>
                    {session ? (
                        <>
                            <Link href="/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                                User List
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="block w-full text-left px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md shadow-sm"
                        >
                            Sign In with Google
                        </button>
                    )}
                </div>
            </div> */}
        </div >
    );
};

export default Navbar;