export const getQuiz = id_token => {
  fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
    method: 'get',
    headers: new Headers ({Authorization: 'bearer ' + id_token}),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
    .then (res => res.json ())
    .then (res => res.quizzes);
};
