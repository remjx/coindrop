export type User = {
  readonly id: string
  readonly email: string
  readonly token: string
}

export type GoogleAuthTokenData = {
  readonly uid: string
  readonly email: string
  readonly xa?: string // TODO: this is actually required but not documented in firebase auth types
  readonly ya?: string // TODO: this is actually required but not documented in firebase auth types
}

export const mapUserData = (tokenData: GoogleAuthTokenData): User => {
  const { uid, email, xa, ya } = tokenData;
  return {
    id: uid,
    email,
    token: xa || ya, // This is not the proper way to do it https://github.com/vercel/next.js/issues/18256
  };
};
