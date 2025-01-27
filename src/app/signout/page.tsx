"use client";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
    useEffect(() => {
        const handleSignOut = async () => {
            await signOut({ callbackUrl: '/' });
        };

        handleSignOut();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-xl mb-4">Signing out...</p>
        </div>
    );
}