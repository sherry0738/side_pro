export const getQuiz = id_token => {
  let url = 'http://localhost:3001';
  fetch (url, {
    method: 'get',
    headers: new Headers ({Authorization: 'bearer ' + id_token}),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
    .then (res => res.json ())
    .then (res => res.quizzes);
};
