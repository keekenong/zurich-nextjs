/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useSession } from '../utils/auth';
import Home from './page';

jest.mock('../utils/auth', () => ({
    useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Home page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })
    it('renders sign in button when user is not signed in', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });
        const { getByText, getAllByText } = render(<Home />);
        expect(getByText('You are not signed in')).toBeInTheDocument();
        expect(getAllByText('Sign in with Google')[0]).toBeInTheDocument();
    });

    it('renders user name and sign out button when user is signed in', () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test123' } } });
        const { getByText } = render(<Home />);
        expect(getByText('Logged in as Test123')).toBeInTheDocument();
        expect(getByText('Sign out')).toBeInTheDocument();
    });

    it('calls handleSignOut function when sign out button is clicked', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test123' } } });
        (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
        const { getByText } = render(<Home />);
        const signOutButton = getByText('Sign out');
        fireEvent.click(signOutButton);
        await waitFor(() => expect(useRouter().push).toHaveBeenCalledTimes(1));
        expect(useRouter().push).toHaveBeenCalledWith('/signout');
    });
});