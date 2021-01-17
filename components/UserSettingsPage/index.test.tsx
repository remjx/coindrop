/* eslint-disable arrow-body-style */
import '@testing-library/jest-dom/extend-expect';
import useSWR from 'swr';
import { render, fireEvent, screen, waitFor } from '../../src/tests/react-testing-library-config';
import { UserSettingsPage, UserDataForm } from './index';
import useUserModule from '../../utils/auth/useUser';
import { updateUserData } from '../../src/db/mutations/user/update-user';

jest.mock('../../utils/auth/useUser');
jest.mock('swr');

const mockedGetUserData = jest.fn();
jest.mock('../../src/db/queries/user/get-user-data', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getUserData: mockedGetUserData,
        };
    });
});

jest.mock('../../src/db/mutations/user/update-user', () => {
    return {
        updateUserData: jest.fn(() => Promise.resolve()),
    };
});

beforeEach(() => {
    jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
        user: {
            id: "some-uid",
            email: "test@user.com",
            token: "some-token",
        },
        logout: null,
    }));
});

test('Error is displayed if getUserData fails', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: undefined, error: true }));
    render(<UserSettingsPage />, {});
    screen.getByText("⚠️ Error fetching user data. Please refresh the page or contact support.");
    expect(screen.queryByTestId("no-user-data-spinner")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-form")).not.toBeInTheDocument();
});

test('Spinner is displayed while user data is being fetched', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: undefined, error: false }));
    render(<UserSettingsPage />, {});
    screen.getByTestId("no-user-data-spinner");
    expect(screen.queryByText("⚠️ Error fetching user data. Please refresh the page or contact support.")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-form")).not.toBeInTheDocument();
});

test('Form is displayed if getUserData succeeds', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { someDataExists: true }, error: false }));
    render(<UserSettingsPage />, {});
    expect(screen.queryByText("⚠️ Error fetching user data. Please refresh the page or contact support.")).not.toBeInTheDocument();
    expect(screen.queryByTestId("no-user-data-spinner")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-form")).toBeInTheDocument();
});

test('User data is populated on form on initial load (populated)', () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: ["newsletter"] } }));
    render(<UserSettingsPage />, {});
    expect(screen.getByLabelText('Email address')).toHaveValue("test@user.com");
    expect(screen.getByLabelText('Coindrop Newsletter')).toHaveAttribute("checked");
});

test('User data is populated on form on initial load (empty)', () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: [] } }));
    render(<UserSettingsPage />, {});
    expect(screen.getByLabelText('Coindrop Newsletter')).not.toHaveAttribute("checked");
});

test('Save button is disabled until form is dirty', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: [] } }));
    render(<UserSettingsPage />, {});
    expect(screen.getByText('Save')).toHaveAttribute('disabled');
    const input = screen.getByLabelText('Coindrop Newsletter');
    fireEvent.click(input);
    expect(screen.getByText('Save')).not.toHaveAttribute('disabled');
});

test('Clicking checkbox updates checked attribute', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: [] } }));
    render(<UserSettingsPage />, {});
    const input = screen.getByText('Coindrop Newsletter');
    expect(input).not.toHaveAttribute("data-checked");
    expect(screen.getByText('Save')).toHaveAttribute('disabled');
    fireEvent.click(input);
    expect(screen.getByText('Save')).not.toHaveAttribute('disabled');
    expect(screen.getByText('Coindrop Newsletter')).toHaveAttribute("data-checked");
});

test('Successful save', async () => {
    render(<UserDataForm
        userData={{ email: "test@user.com", email_lists: [] }}
        mutate={jest.fn()}
        userId='test'
    />, {});
    const checkbox = screen.getByLabelText('Coindrop Newsletter');
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => screen.getByText('Saving'));
    await waitFor(() => screen.getByText("Account updated"));
    await waitFor(() => screen.getByText("Save"));
    expect(screen.getByText("Save")).toHaveAttribute('disabled');
});
