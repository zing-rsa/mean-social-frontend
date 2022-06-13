const mock_auth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(
      {
        "_id": "628f8ebbd644b7d4a928e2ca",
        "name": "John",
        "surname": "Guy",
        "username": "John.Guy",
        "email": "test1@test.com",
        "bio": "Hi, I'm John, and I like cheese",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzMjMzNmU4MWZkMGNiOTZhNWViMjIiLCJpYXQiOjE2NTUxNTMyNTYsImV4cCI6MTY1NTE1NTA1Nn0.7sVr39YiqWBB3KEOgJp3lAW3sBgWjJtkzsENWMrADhI"
    }
    ), 250);
  });

export { mock_auth };