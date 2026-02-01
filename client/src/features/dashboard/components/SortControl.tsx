import { Button } from '../../../common/components/ui/Button';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { SortState, SortColumn } from '../../../common/types';
import { cn } from '../../../common/utils/utils';

interface SortControlProps {
    column: SortColumn;
    label: string;
    sortState: SortState;
    onSort: (column: SortColumn) => void;
}

export const SortControl: React.FC<SortControlProps> = ({
    column,
    label,
    sortState,
    onSort
}) => {
    const isActive = sortState.column === column;

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => onSort(column)}
            className={cn(
                "group h-9 gap-2 px-4 border-gray-200 bg-white text-gray-700 hover:bg-[#10b981] hover:text-white hover:border-[#10b981] font-medium text-sm shadow-sm transition-all",
                isActive && "bg-[#10b981] border-[#10b981] text-white ring-1 ring-[#10b981]"
            )}
        >
            Sort {label}
            {isActive ? (
                sortState.direction === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-white" /> : <ArrowDown className="h-3.5 w-3.5 text-white" />
            ) : (
                <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-white" />
            )}
        </Button>
    );
};
