import { render } from '../../../../src/tests/react-testing-library-config';
import DeleteAccount from '../DeleteAccount';

jest.mock('axios');
jest.mock<typeof import('../../../../utils/auth/useUser')>('../../../../utils/auth/useUser', () => ({
    useUser: () => ({ logout: () => undefined, user: null }),
    default: {
      useUser: () => ({ logout: () => undefined, user: null }),
    },
  }));

test('Show Spinner until user data is loaded', async () => {
  const { getByTestId } = render(<DeleteAccount />, {});
  getByTestId("no-user-spinner");
});
