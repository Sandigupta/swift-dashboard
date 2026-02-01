import React from 'react';
import { type Comment } from '../../../common/types';


interface CommentsTableProps {
    comments: Comment[];
}

export const CommentsTable: React.FC<CommentsTableProps> = ({ comments }) => {
    // Sorting is now handled externally, so table is purely presentational

    return (
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 w-24 text-xs font-bold text-gray-500 uppercase tracking-wider">Post ID</th>
                            <th className="px-6 py-4 w-1/4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 w-1/4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Comment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {comments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                                    No comments found matching your search.
                                </td>
                            </tr>
                        ) : (
                            comments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-gray-50 transition-colors bg-white group">
                                    <td className="px-6 py-5 text-sm font-medium text-gray-900 group-hover:text-black">{comment.postId}</td>
                                    <td className="px-6 py-5 text-sm text-gray-700 font-medium group-hover:text-gray-900">{comment.name}</td>
                                    <td className="px-6 py-5 text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer">{comment.email}</td>
                                    <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed max-w-xl">
                                        <p className="line-clamp-3 md:line-clamp-2" title={comment.body}>
                                            {comment.body}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
