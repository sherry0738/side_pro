export const getTokenObj = () => JSON.parse (localStorage.getItem ('auth'));

export const parseJwt = id_token => {
  let base64Url = id_token.split ('.')[1];
  let base64 = base64Url.replace ('-', '+').replace ('_', '/');
  return JSON.parse (window.atob (base64));
};

export const getDecodedToken = () => {
  const tokenObj = getTokenObj ();
  if (!tokenObj) {
    console.log ('no tokenObj, which mean login has not done!!');
  }

  if (tokenObj && tokenObj.id_token) {
    return parseJwt (tokenObj.id_token);
  }
};
