const mock_posts = (token) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(
      [
        {
            "_id": "6293bd57d2e9927e633693aa",
            "text": "I do like cheese",
            "owner": "628f8ebbd644b7d4a928e2ca",
            "timestamp": "2022-05-29T18:37:11.650Z",
            "comments": [
              {
                "timestamp": "2022-06-02T12:24:28.884Z",
                "owner": "628f8ebbd644b7d4a928e2ca",
                "text": "this is a really great post"
              }
            ]
        },
        {
            "_id": "62967597daa0d9ed6586124d",
            "text": "Cheese is cool",
            "owner": "628f8ebbd644b7d4a928e2ca",
            "timestamp": "2022-05-31T20:07:51.810Z",
            "comments": []
        },
        {
            "_id": "62975a7993bb814bdd55575e",
            "text": "Cheese is the coolesssssssst",
            "owner": "628f8ebbd644b7d4a928e2ca",
            "timestamp": "2022-06-01T12:24:25.884Z",
            "comments": [
              {
                "timestamp": "2022-06-02T12:24:28.884Z",
                "owner": "628f8ebbd644b7d4a928e2ca",
                "text": "this is a great post"
              }
            ]
        }
    ]
    ), 250);
  });

export { mock_posts };