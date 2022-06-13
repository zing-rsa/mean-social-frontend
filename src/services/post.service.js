import { useAuth } from '../providers/auth.provider';
import { useState, useEffect } from 'react';
import config from '../config'
import axios from 'axios'

const useFeedPosts = () => {
  const { token } = useAuth();

  const [posts, setPosts ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchPosts = async () => {
      
      try {
        
        console.log('tried auth with: ', config.headers(token));
        const result = await axios({
          method: 'GET',
          url: config.api_url + 'posts',
          headers: config.headers(token)
        })
        console.log("got data", result.data)
  
        setPosts(result.data);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
      }
      
    };
    
    fetchPosts();
    
  }, []);

  return { posts, isLoading, isError };
}

const getFeedPosts = (token) => {
  console.log(config.api_url)
  return axios({
    method: 'GET',
    url: config.api_url + 'posts',
    headers: config.headers(token)
  })
  // console.log("posts: ", posts);
}

// const mock_posts = () => 
//   new Promise((resolve) => {
//     setTimeout(() => resolve(
//       [
//         {
//           "_id": "6293bd57d2e9927e633693aa",
//           "text": "I do like cheese",
//           "owner": "628f8ebbd644b7d4a928e2ca",
//           "timestamp": "2022-05-29T18:37:11.650Z",
//           "comments": [
//             {

//               "_id": "6293bd57d2efff7e633693a4",
//               "timestamp": "2022-06-02T12:24:28.884Z",
//               "owner": "628f8ebbd644b7d4a928e2ca",
//               "text": "this is a really great post"
//             }
//           ]
//         }
//         ,{
//           "_id": "sdf",
//           "text": "I do like cheese",
//           "owner": "628f8ebbd644b7d4a928e2ca",
//           "timestamp": "2022-05-29T18:37:11.650Z",
//           "comments": [
//             {

//               "_id": "6293bd57d2efff7e633693a4",
//               "timestamp": "2022-06-02T12:24:28.884Z",
//               "owner": "628f8ebbd644b7d4a928e2ca",
//               "text": "this is a really great post"
//             }
//           ]
//         },
//         {
//           "_id": "62967597daa0d9ed6586124d",
//           "text": "Cheese is cool",
//           "owner": "628f8ebbd644b7d4a928e2ca",
//           "timestamp": "2022-05-31T20:07:51.810Z",
//           "comments": []
//         },
//         {
//           "_id": "62975a7993bb814bdd55575e",
//           "text": "Cheese is the coolesssssssst",
//           "owner": "628f8ebbd644b7d4a928e2ca",
//           "timestamp": "2022-06-01T12:24:25.884Z",
//           "comments": [
//             {

//               "_id": "6293bd57d2e9927e633fd93a4",
//               "timestamp": "2022-06-02T12:24:28.884Z",
//               "owner": "628f8ebbd644b7d4a928e2ca",
//               "text": "this is a great post"
//             }
//           ]
//         }
//       ]
//     ), 250);
//   });

const mock_userPosts = (userId) =>
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
              "_id": "6293bd57d2e9927e633693a4",
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
          "comments": [
          ]
        },
        {
          "_id": "62975a7993bb814bdd55575e",
          "text": "Cheese is the coolesssssssst",
          "owner": "628f8ebbd644b7d4a928e2ca",
          "timestamp": "2022-06-01T12:24:25.884Z",
          "comments": [
            {
              "_id": "6293bd57d2e992df633693aa",
              "timestamp": "2022-06-02T12:24:28.884Z",
              "owner": "628f8ebbd644b7d4a928e2ca",
              "text": "this is a great post"
            }
          ]
        }
      ]
    ), 250);
  });

export { useFeedPosts, mock_userPosts };