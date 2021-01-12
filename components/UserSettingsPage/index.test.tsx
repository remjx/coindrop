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

test('Spinner is displayed if getUserData fails', async () => {
    jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
        user: {
            id: "irrelevant-uid",
            email: "irrelevant",
            token: "irrelevant",
        },
        logout: null,
    }));
    (useSWR as jest.Mock).mockImplementation(() => ({ data: undefined, error: true }));
    render(<UserSettingsPage />, {});
    screen.getByTestId("no-user-data-spinner");
});

test('Spinner is not displayed if getUserData passes', async () => {
    jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
        user: {
            id: "irrelevant-uid",
            email: "irrelevant",
            token: "irrelevant",
        },
        logout: null,
    }));
    (useSWR as jest.Mock).mockImplementation(() => ({ data: { someDataExists: true, error: false } }));
    render(<UserSettingsPage />, {});
    expect(screen.queryByTestId("no-user-data-spinner")).not.toBeInTheDocument();
});
