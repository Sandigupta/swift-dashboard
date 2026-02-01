import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../../common/services/api';
import type { User } from '../../../common/types';

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only use first record
        api.getUsers()
            .then(users => setUser(users[0]))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-gray-500">Loading profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-[50vh]">
                <div className="text-red-500">Failed to load user profile.</div>
            </div>
        );
    }

    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="container mx-auto py-8 px-6 max-w-[1200px]">

            {/* Header with Back Link & Hover Effect */}
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-3 text-[#212529] hover:text-[#10b981] transition-colors duration-200 group"
                >
                    <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-[#10b981] transition-colors" />
                    <h1 className="text-xl font-bold tracking-tight">Welcome, {user.name}</h1>
                </Link>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px] overflow-hidden">

                {/* Avatar Section - White Header with Border */}
                <div className="bg-white px-8 py-8 border-b border-gray-100 flex items-center gap-6">
                    <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-medium text-gray-500">
                        {initials}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                        <p className="text-gray-500 font-medium">{user.email}</p>
                    </div>
                </div>

                {/* Fields Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                    {/* User ID */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-xs">User ID</label>
                        <div className="bg-gray-50 px-4 py-3.5 rounded-lg text-gray-900 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">
                            {user.id}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-xs">Name</label>
                        <div className="bg-gray-50 px-4 py-3.5 rounded-lg text-gray-900 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">
                            {user.name}
                        </div>
                    </div>

                    {/* Email ID */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-xs">Email ID</label>
                        <div className="bg-gray-50 px-4 py-3.5 rounded-lg text-gray-900 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">
                            {user.email}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-xs">Address</label>
                        <div className="bg-gray-50 px-4 py-3.5 rounded-lg text-gray-900 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors truncate" title={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}>
                            {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2.5">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-xs">Phone</label>
                        <div className="bg-gray-50 px-4 py-3.5 rounded-lg text-gray-900 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">
                            {user.phone.split(' ')[0]}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
