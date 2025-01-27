"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "@/utils/auth";
import Image from "next/image";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = async () => {
        setIsOpen(false);
        await signOut("/");
    };

    return (
        <div className="relative">
            <button
                className="menu-button text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none shadow-md"
                onClick={toggleMenu}
            >
                Menu
            </button>
            {isOpen && (
                <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
                    <button
                        className="close-menu absolute top-4 right-4 text-gray-800 focus:outline-none hover:text-gray-500"
                        onClick={toggleMenu}
                    >
                        Close
                    </button>
                    <div className="menu-items mt-16 px-4">
                        {session ? (
                            <>
                                <Link href="/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">User List
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
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
            )}
        </div>
    );
};

export default Navbar;