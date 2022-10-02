import { User } from 'firebase/auth';

export type UseUser = {
  user: User | null,
  logout: () => void,
};
