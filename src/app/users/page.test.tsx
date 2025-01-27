import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useSession } from '../../utils/auth';
import Users from './page';
import { SessionProvider } from 'next-auth/react';

jest.mock('../../utils/auth', () => ({
    useSession: jest.fn(),
}));

describe('Users component', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })
    it('renders loading message when users are being fetched', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        const { getByText } = render(<Users />);
        expect(getByText('Loading users...')).toBeInTheDocument();
    });

    it('renders users list when users are fetched', async () => {
        const users = [
            { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
            { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' },
        ];
        (useSession as jest.Mock).mockReturnValue({ data: users });
        const { getByText } = render(<SessionProvider><Users /></SessionProvider>);
        await waitFor(() => expect(getByText('John Doe')).toBeInTheDocument());
        expect(getByText('Jane Doe')).toBeInTheDocument();
    });

    it('renders error message when users fetch fails', async () => {
        (useSession as jest.Mock).mockImplementation(() => {
            throw new Error('Failed to fetch users');
        });
        const { getByText } = render(<SessionProvider><Users /></SessionProvider>);
        await waitFor(() => expect(getByText('Error fetching users')).toBeInTheDocument());
    });

    it('renders sign in button when user is not signed in', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        const { getByText } = render(<SessionProvider><Users /></SessionProvider>);
        expect(getByText('Sign in with Google')).toBeInTheDocument();
    });
});