/* eslint-disable arrow-body-style */
import '@testing-library/jest-dom/extend-expect';
// import { mocked } from 'ts-jest/utils';
import useSWR from 'swr';
import { render, fireEvent, screen, waitFor } from '../../src/tests/react-testing-library-config';
import { UserSettingsPage } from './index';
import useUserModule from '../../utils/auth/useUser';
import getUserDataModule from '../../src/db/queries/user/get-user-data';
import updateUserDataModule from '../../src/db/mutations/user/update-user';
import { getDefaultUserData } from '../../src/db/schema/user';

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

const mockedUpdateUserData = jest.fn();
jest.mock('../../src/db/mutations/user/update-user', () => {
    return jest.fn().mockImplementation(() => {
        return {
            updateUserData: mockedUpdateUserData,
        };
    });
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

test('Spinner is displayed if getUserData fails', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: undefined, error: true }));
    render(<UserSettingsPage />, {});
    screen.getByTestId("no-user-data-spinner");
});

test('Spinner is not displayed if getUserData passes', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { someDataExists: true, error: false } }));
    render(<UserSettingsPage />, {});
    expect(screen.queryByTestId("no-user-data-spinner")).not.toBeInTheDocument();
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

test('Save button is disabled until form is dirty', () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: [] } }));
    render(<UserSettingsPage />, {});
    let input = screen.getByLabelText('Coindrop Newsletter');
    expect(input).not.toHaveAttribute("checked");
    expect(screen.getByText('Save')).toHaveAttribute('disabled');
    fireEvent.change(input, { target: { checked: true }});
    input = screen.getByLabelText('Coindrop Newsletter');
    expect(screen.getByText('Save')).not.toHaveAttribute('disabled');
});

test.only('Successful save', async () => {
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { email: "test@user.com", email_lists: [] } }));
    render(<UserSettingsPage />, {});
    const checkbox = screen.getByLabelText('Coindrop Newsletter');
    fireEvent.change(checkbox, { target: { checked: true }});
    let saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    // screen.getByText("Saving");
    await waitFor(() => screen.getByText("Account updated"));
    // screen.getByText("Saving");
    // screen.getByText("Account updated.");
    saveButton = await waitFor(() => screen.getByText("Save"));
    expect(saveButton).toHaveAttribute('disabled');
});
