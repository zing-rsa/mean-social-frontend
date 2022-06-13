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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmOGViYmQ2NDRiN2Q0YTkyOGUyY2EiLCJpYXQiOjE2NTUwNjM2NjAsImV4cCI6MTY1NTA2NTQ2MH0.YjsHB6jqof_LmEW9XReLRhryEDb9O9kKPHRyC15vxXM"
    }
    ), 250);
  });

export { mock_auth };