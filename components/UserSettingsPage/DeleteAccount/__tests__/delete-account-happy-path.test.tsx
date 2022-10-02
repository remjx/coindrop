/* eslint-disable arrow-body-style */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { User } from 'firebase/auth';
import {expect, jest, test} from '@jest/globals';
import { render, fireEvent, screen, waitFor } from '../../../../src/tests/react-testing-library-config';
import DeleteAccount from '../DeleteAccount';
import useUserModule from '../../../../utils/auth/useUser';

jest.mock('axios');
jest.mock<typeof import('../../../../utils/auth/useUser')>('../../../../utils/auth/useUser', () => {
  const email = 'test@user.com';
  return {
    useUser: () => ({ logout: () => undefined,
      user: {
        email,
        uid: "irrelevant",
      } as User,
    }),
    default: {
      useUser: () => ({ logout: () => undefined,
        user: {
        email,
        uid: "irrelevant",
      } as User }),
    },
  };
});

test.skip('Happy path account deletion', async () => {
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
  expect(screen.getByText('Delete Account'));
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
