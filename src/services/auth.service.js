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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmOGViYmQ2NDRiN2Q0YTkyOGUyY2EiLCJpYXQiOjE2NTQ1NDQyMzYsImV4cCI6MTY1NDU0NjAzNn0.lDn-tH5uVGh62ZnbDd5pzlC4qPY2AuZY3FRuN8a-Kfk"
    }
    ), 250);
  });

export { mock_auth };