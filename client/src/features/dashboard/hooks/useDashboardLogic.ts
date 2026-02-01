import { useMemo, useCallback } from 'react';
import type { Comment, SortState, PaginationState, SortColumn, PageSize } from '../../../common/types';
import { useLocalStorage } from '../../../common/hooks/useLocalStorage';

export function useDashboardLogic(comments: Comment[]) {
    // --- Persistent State ---
    const [searchQuery, setSearchQuery] = useLocalStorage<string>('dashboard_search', '');
    const [sortState, setSortState] = useLocalStorage<SortState>('dashboard_sort', { column: null, direction: null });
    const [pagination, setPagination] = useLocalStorage<PaginationState>('dashboard_page', { currentPage: 1, pageSize: 10 });

    // --- Handlers ---

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    }, [setSearchQuery, setPagination]);

    const handleSort = useCallback((column: SortColumn) => {
        if (!column) return;

        setSortState(prev => {
            // Cycle: No Sort -> Asc -> Desc -> No Sort; if different col -> Asc.

            if (prev.column !== column) {
                return { column, direction: 'asc' };
            }

            if (prev.direction === 'asc') {
                return { column, direction: 'desc' };
            }

            if (prev.direction === 'desc') {
                return { column: null, direction: null };
            }

            return { column, direction: 'asc' };
        });
    }, [setSortState]);

    const handlePageChange = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    }, [setPagination]);

    const handlePageSizeChange = useCallback((size: PageSize) => {
        setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
    }, [setPagination]);

    // --- Derived State ---

    const filteredComments = useMemo(() => {
        if (!searchQuery.trim()) return comments;
        const lowerQuery = searchQuery.toLowerCase();

        // Search in Name and Email (Phone not in Comment type).
        return comments.filter(c =>
            c.name.toLowerCase().includes(lowerQuery) ||
            c.email.toLowerCase().includes(lowerQuery)
        );
    }, [comments, searchQuery]);

    const sortedComments = useMemo(() => {
        const { column, direction } = sortState;
        if (!column || !direction) return filteredComments;

        return [...filteredComments].sort((a, b) => {
            const valA = a[column];
            const valB = b[column];

            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredComments, sortState]);

    const totalItems = sortedComments.length;
    const totalPages = Math.ceil(totalItems / pagination.pageSize) || 1; // Ensure at least 1 page

    // Safe slice computation handling potential page bounds issues (e.g. filtered results < current page).

    const visibleComments = useMemo(() => {
        // Safety check: ensure current page doesn't exceed total pages for correct slicing.
        const safePage = Math.min(pagination.currentPage, totalPages);
        const start = (Math.max(1, safePage) - 1) * pagination.pageSize;
        return sortedComments.slice(start, start + pagination.pageSize);
    }, [sortedComments, pagination, totalPages]);

    return {
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
    };
}
