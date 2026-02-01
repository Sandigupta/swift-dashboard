import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { User } from '../../types';

export function Header() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        api.getUsers().then(users => {
            // Assuming layout needs first user name as "Ervin Howell"
            if (users.length > 0) setUser(users[0]);
        }).catch(console.error);
    }, []);

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'EH';

    return (
        <header className="w-full h-16 bg-[#212529] flex items-center justify-between px-6 shadow-md text-white sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#10b981] rounded flex items-center justify-center font-bold text-lg text-white">
                    S
                </div>
                <span className="text-xl font-bold tracking-wide">WIFT</span>
            </div>

            {/* User Profile */}
            <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center text-[#212529] font-medium text-sm">
                    {initials}
                </div>
                <span className="text-sm text-gray-200 hidden md:block">
                    {user ? user.name : 'Loading...'}
                </span>
            </Link>
        </header>
    );
}
