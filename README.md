# NextJS Assessment

Applying App Router method for this project:

```
zurich-nextjs
├── public
│ └── favicon.ico
├── src
│ ├── app
│ │ ├── api
│ │ │ └── auth
│ │ │ └── [...nextauth]
│ │ │ └── route.ts
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── users
│ │ │ └── page.tsx
│ ├── components
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── UserList.tsx
│ ├── redux
│ │ ├── store.ts
│ │ └── slices
│ │ └── userSlice.ts
│ ├── styles
│ │ ├── Home.module.css
│ │ └── globals.css
│ └── utils
│ └── api.ts
├── eslint.config.mjs
├── .env.local
├── next-env.d.ts
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Google OAuth2 Authentication

Pre-requisite:

1. Setup Google OAuth2.0 Client (reference: [Setting up OAuth 2.0](https://support.google.com/googleapi/answer/6158849))
2. Store Client-Id and Client-Secret into environment (.env\*)
3. Generate NEXT_AUTH_SECRET with command:
   `openssl rand -base64 32`

Steps:

1. Create [...nextauth].ts or /[...nextauth]/route.ts under src/app/auth/api
2. Implement NextAuth Config as per shown below:

   ```typescript
   import NextAuth from "next-auth";
   import GoogleProvider from "next-auth/providers/google";

   const authOptions = {
     providers: [
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
       }),
     ],
     secret: process.env.NEXTAUTH_SECRET,
     debug: true,
   };

   const authHandler = NextAuth(authOptions);

   export { authHandler as GET, authHandler as POST };
   ```

3)  Apply signIn, signOut and useSession into page.tsx
    ```typescript
    'use client';

    import { signIn, signOut, useSession }  from 'next-auth/react';

    export default function Home() {
        const { data: session } = useSession();

        const handleSignOut = async () => {
            await signOut({ callbackUrl: "/" });
        }

        if (session) {
            return (
            <>
                <p>Welcome, {session.user?.name} </p>
                <button onClick={handleSignOut}>Sign out</button>
            </>
            )
        }

        return (
            <>
                <p className="text-xl mb-4">You are not signed in</p>
                <button onClick={() => signIn("google")}>
                    Sign in with Google
                </button>
            </>
        )
    }

    ```
