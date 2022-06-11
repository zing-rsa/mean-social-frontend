const mock_user = (token) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(
      {
        "_id": "628f8ebbd644b7d4a928e2ca",
        "name": "John",
        "surname": "Guy",
        "username": "John.Guy",
        "email": "test1@test.com",
        "bio": "Hi, I'm John, and I like cheese"
      }
    ), 250);
  });

export { mock_user };