'use client';

import { useSession } from "@/utils/auth";
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/signout");
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {session ? (
          <>
            <p>Logged in as {session.user?.name} </p>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <p className="text-xl mb-4">You are not signed in</p>
            <GoogleSignInButton />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

