import { useState } from "react";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

const UserList = ({ users }: { users: User[] }) => {
    const [visibleEmails, setVisibleEmails] = useState<{ [key: number]: boolean }>({});

    const toggleEmailVisibility = (id: number) => {
        setVisibleEmails((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">User List</h2>
            <table className="min-w-full bg-white table-fixed">
            <thead>
                <tr>
                <th className="py-2 px-4 w-1/4 text-left">First Name</th>
                <th className="py-2 px-4 w-1/4 text-left">Last Name</th>
                <th className="py-2 px-4 w-1/4 text-left">Email</th>
                <th className="py-2 px-4 w-1/4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id} className="border-t">
                    <td className="py-2 px-4 w-1/4">{user.first_name}</td>
                    <td className="py-2 px-4 w-1/4">{user.last_name}</td>
                    <td className="py-2 px-4 w-1/4">{visibleEmails[user.id] ? user.email : "*****"}</td>
                    <td className="py-2 px-4 w-1/4">
                    <button
                        onClick={() => toggleEmailVisibility(user.id)}
                        className="text-white"
                    >
                        {visibleEmails[user.id] ? "Hide Email" : "Show Email"}
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default UserList;