export const mapUserData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true)
  console.log('got token in mapUserData', token)
  return {
    id: uid,
    email,
    token,
  };
};
