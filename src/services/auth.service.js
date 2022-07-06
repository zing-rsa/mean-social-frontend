import config from "../config";

const useAuthenticate = (token) => {

  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const tryAuth = async () => {
    try {
      setAuthLoading(true);

      const res = await axios({
        method: "POST",
        url: config.api_url + 'auth/',
        headers: config.headers(token)
      });

      if(res.status == 200) {
        setAuthenticated(true);
      }

    } catch (e) {
      console.log(e)
      setAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  }

  return { tryAuth, authLoading, authenticated, isAdmin };

}

export { mock_auth };