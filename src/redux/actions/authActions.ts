// authActions.js

export const login = (isLoggedIn: string) => {
  console.log('====================================');
  console.log(isLoggedIn);
  console.log('====================================');
  return {
    type: 'LOGIN', // Здесь изменено на 'LOGIN'
    payload: isLoggedIn,
  };
};
