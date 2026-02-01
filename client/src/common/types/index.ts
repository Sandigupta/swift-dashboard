export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

// Application State Types

export type PageSize = 10 | 50 | 100;

export interface PaginationState {
    currentPage: number;
    pageSize: PageSize;
}

export type SortDirection = 'asc' | 'desc' | null;

export type SortColumn = 'postId' | 'name' | 'email' | null;

export interface SortState {
    column: SortColumn;
    direction: SortDirection;
}
