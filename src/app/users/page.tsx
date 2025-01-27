"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserList from "@/components/UserList";
import { axiosCall } from "@/utils/api";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Users = () => {
    interface User {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    }
    interface UserResponse {
        data: User[];
        total_pages: number;
    }
    const { data: session } = useSession();

    const [users, setUsers] = useState<User[]>([]);
    const [userUrl] = useState(process.env.NEXT_PUBLIC_USERS_URL);

    useEffect(() => {
        if (session) {
            const fetchUsers = async () => {
                let allUsers: User[] = [];
                let page: number = 1;
                let response: UserResponse;

                do {
                    try {
                        response = await axiosCall("GET", `${userUrl}?page=${page}`);
                        if (response && Array.isArray(response.data)) {
                            allUsers = [...allUsers, ...response.data];
                        }
                        page++;
                    } catch (error) {
                        console.error("Error fetching users:", error);
                        break;
                    }
                } while (response && response.data && response.total_pages >= page);

                const filteredUsers: User[] =
                    allUsers.filter((user: User) =>
                        user.first_name.toUpperCase().startsWith("G") ||
                        user.last_name.toUpperCase().startsWith("W")
                    );

                setUsers(filteredUsers);
            };
            fetchUsers();
        }
    }, [session]);

    if (!session) {
        return (
            <div className="text-center mt-4">
                <p className="text-center mt-4">Please sign in to view this page.</p>
                <GoogleSignInButton />
            </div>)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <UserList users={users} />
            </main>
            <Footer />
        </div>
    );
};

export default Users;