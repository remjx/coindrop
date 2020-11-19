export const mapUserData = (user) => {
  const { uid, email, xa, ya } = user;
  return {
    id: uid,
    email,
    token: xa || ya, // This is not the proper way to do it https://github.com/vercel/next.js/issues/18256
  };
};
