/* eslint-disable arrow-body-style */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { User } from 'firebase/auth';
import { render, fireEvent, screen, waitFor } from '../../src/tests/react-testing-library-config';
import DeleteAccount from './DeleteAccount';
import useUserModule from '../../utils/auth/useUser';

jest.mock('axios');
jest.mock('../../utils/auth/useUser');

test('Show Spinner until user data is loaded', async () => {
  jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
    user: null,
    logout: null,
  }));
  const { getByTestId } = render(<DeleteAccount />, {});
  getByTestId("no-user-spinner");
});

test('Happy path account deletion', async () => {
  const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve());
  const email = 'test@user.com';
  const token = "some-auth-token";
  jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
    user: {
      email,
      uid: "irrelevant",
    } as User,
    logout: null,
  }));
  render(<DeleteAccount />, {});
  fireEvent.click(screen.getByText('Delete Account'));
  await waitFor(() => screen.getByPlaceholderText(email));
  expect(screen.getByText('Delete Account')).toHaveAttribute('disabled');
  expect(screen.queryByText('All your Coindrops will be deleted. This cannot be undone!')).not.toBeInTheDocument();
  const input = screen.getByPlaceholderText(email);
  fireEvent.change(input, { target: { value: email }});
  expect(screen.getByText('Delete Account')).not.toHaveAttribute('disabled');
  expect(screen.getByText('All your Coindrops will be deleted. This cannot be undone!')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Delete Account'));
  expect(axiosSpy).toHaveBeenCalledWith('/api/user/delete', { headers: { token }});
  screen.getByText("Deleting");
  await waitFor(() => screen.getByText("✔️ Account deleted. Redirecting to homepage..."));
});

test('Error in API call', async () => {
  const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
  const email = 'test@user.com';
  const token = "some-auth-token";
  jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
    user: {
      email,
      uid: "irrelevant",
    } as User,
    logout: null,
  }));
  render(<DeleteAccount />, {});
  fireEvent.click(screen.getByText('Delete Account'));
  await waitFor(() => screen.getByPlaceholderText(email));
  const input = screen.getByPlaceholderText(email);
  fireEvent.change(input, { target: { value: email }});
  fireEvent.click(screen.getByText('Delete Account'));
  expect(axiosSpy).toHaveBeenCalledWith('/api/user/delete', { headers: { token }});
  screen.getByText("Deleting");
  await waitFor(() => screen.getByText("⚠️ Error deleting account. Please try again and contact support if you continue to receive this error."));
});
