import { Helmet } from 'react-helmet';

import AxiosResponseInterceptor from './components/axios-response/axios-response';
import { ErrorProvider } from './providers/error.provider';
import { AuthProvider } from './providers/auth.provider'
import useScript from './hooks/useScript';
import { Navbar } from './components';
import RouteHandler from "./routes";
import './App.css';


function App() {

  useScript('https://kit.fontawesome.com/e0795630b8.js');

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>
      <ErrorProvider>
        <AuthProvider>  
          <AxiosResponseInterceptor />

          <Navbar />

          <div className="router">
            <RouteHandler />
          </div>

        </AuthProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
