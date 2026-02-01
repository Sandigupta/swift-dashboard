import { useState, useRef, useEffect } from 'react';
import { Button } from '../../../common/components/ui/Button';
import { ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import type { PageSize } from '../../../common/types';
import { cn } from '../../../common/utils/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: PageSize;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: PageSize) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
}) => {
    const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
    const pageSizeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pageSizeRef.current && !pageSizeRef.current.contains(event.target as Node)) {
                setIsPageSizeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers to display using a simple window (Current +/- 1) to match design.

    const getPageNumbers = () => {
        const pages = [];
        // Simplistic view strictly following "1 2" design.

        // Let's just show a small range around current.
        const range = 1;
        for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 py-6 fade-in duration-500 text-sm">

            {/* 1-10 of 100 items */}
            <div className="text-gray-500 font-medium">
                {totalItems === 0 ? '0 items' : `${startItem}-${endItem} of ${totalItems} items`}
            </div>

            <div className="flex items-center gap-1.5">
                {/* Prev */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {getPageNumbers().map(p => (
                    <Button
                        key={p}
                        variant="ghost"
                        size="sm"
                        onClick={() => onPageChange(p)}
                        className={cn(
                            "min-w-[2.25rem] h-9 font-medium text-sm rounded-md transition-all",
                            p === currentPage
                                ? "bg-[#10b981] text-white hover:bg-[#059669] hover:text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                        )}
                    >
                        {p}
                    </Button>
                ))}

                {/* Next */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Page Size */}
            <div className="relative" ref={pageSizeRef}>
                <button
                    onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
                    className={cn(
                        "flex items-center justify-between gap-2 h-9 rounded-md border bg-white px-3 py-1 text-sm font-medium transition-all min-w-[110px]",
                        isPageSizeOpen
                            ? "border-[#10b981] ring-1 ring-[#10b981] text-[#10b981]"
                            : "border-gray-200 text-gray-700 hover:border-[#10b981] hover:text-[#10b981]"
                    )}
                >
                    <span>{pageSize} / Page</span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isPageSizeOpen ? "transform rotate-180 text-[#10b981]" : "text-gray-400")} />
                </button>

                {isPageSizeOpen && (
                    <div className="absolute bottom-full right-0 mb-2 w-[140px] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                        {[10, 50, 100].map((size) => (
                            <div
                                key={size}
                                onClick={() => {
                                    onPageSizeChange(size as PageSize);
                                    setIsPageSizeOpen(false);
                                }}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-all mx-1.5 rounded-lg my-0.5",
                                    pageSize === size
                                        ? "bg-[#ecfdf5] text-[#10b981] font-medium"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                {pageSize === size ? (
                                    <Check className="h-4 w-4 text-[#10b981]" />
                                ) : (
                                    <div className="w-4" /> // Spacer
                                )}
                                <span>{size} / Page</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
