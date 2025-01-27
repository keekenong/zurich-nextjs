import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="header bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <Navbar />
            <div className="logo-container flex items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="https://edge.sitecorecloud.io/zurichinsur6934-zwpcorp-prod-ae5e/media/project/zurich-headless/shared/corporate/zurich-logo-blue.svg"
                        alt="Zurich Logo"
                        width={120}
                        height={40}
                        className="logo-image object-contain"
                    />
                </Link>
            </div>
        </header>
    );
};

export default Header;
