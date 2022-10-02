/* eslint-disable arrow-body-style */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { User } from 'firebase/auth';
import { render, fireEvent, screen, waitFor } from '../../../../src/tests/react-testing-library-config';
import DeleteAccount from '../DeleteAccount';

const email = 'test@user.com';

jest.mock('axios');
jest.mock<typeof import('../../../../utils/auth/useUser')>('../../../../utils/auth/useUser', () => {
  return {
    useUser: () => ({ logout: () => undefined,
      user: {
        email,
        uid: "irrelevant",
      } as User }),
    default: {
      useUser: () => ({ logout: () => undefined,
        user: {
          email,
          uid: "irrelevant",
        } as User,
      }),
    },
  };
});

test.skip('Error in API call', async () => {
  const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
  const token = "some-auth-token";
  render(<DeleteAccount />, {});
  fireEvent.click(screen.getByText('Delete Account'));
  await waitFor(() => screen.getByPlaceholderText(email));
  const input = screen.getByPlaceholderText(email);
  fireEvent.change(input, { target: { value: email }});
  screen.getByText('Delete Account').click();
  await waitFor(() => expect(axiosSpy).toHaveBeenCalledWith('/api/user/delete', { headers: { token } }));
  screen.getByText("Deleting");
  await waitFor(() => screen.getByText("⚠️ Error deleting account. Please try again and contact support if you continue to receive this error."));
});
