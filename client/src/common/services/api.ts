import type { Comment, User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
    getComments: async (): Promise<Comment[]> => {
        const response = await fetch(`${BASE_URL}/comments`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return response.json();
    },

    getUsers: async (): Promise<User[]> => {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    },

    getUser: async (id: number = 1): Promise<User> => {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    }
};
