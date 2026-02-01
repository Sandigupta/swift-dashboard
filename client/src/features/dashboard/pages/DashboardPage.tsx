import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../../common/services/api';
import type { Comment } from '../../../common/types';
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import { CommentsTable } from '../components/CommentsTable';
import { Pagination } from '../components/Pagination';
import { SortControl } from '../components/SortControl';
import { Input } from '../../../common/components/ui/Input';

export default function Dashboard() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        searchQuery,
        handleSearch,
        sortState,
        handleSort,
        pagination,
        handlePageChange,
        handlePageSizeChange,
        visibleComments,
        totalItems,
        totalPages
    } = useDashboardLogic(comments);

    useEffect(() => {
        setLoading(true);
        api.getComments()
            .then(data => {
                setComments(data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load comments.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto py-8 px-6 max-w-[1400px]">

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

                {/* Sort Controls */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <SortControl
                        column="postId"
                        label="Post ID"
                        sortState={sortState}
                        onSort={handleSort}
                    />
                    <SortControl
                        column="name"
                        label="Name"
                        sortState={sortState}
                        onSort={handleSort}
                    />
                    <SortControl
                        column="email"
                        label="Email"
                        sortState={sortState}
                        onSort={handleSort}
                    />
                </div>

                {/* Search */}
                <div className="relative w-full md:w-[400px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search name, email, comment"
                        className="pl-10 h-11 w-full bg-white border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 rounded-md text-sm"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-red-200 text-red-500">
                        {error}
                    </div>
                ) : (
                    <>
                        <CommentsTable
                            comments={visibleComments}
                        />

                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={totalPages}
                            pageSize={pagination.pageSize}
                            totalItems={totalItems}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
