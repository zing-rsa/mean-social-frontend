import AxiosResponseInterceptor from './components/axios-response/axios-response';
import { AuthProvider } from './providers/auth.provider'
import { Navbar, Footer } from './components'
import RouteHandler from "./routes";
import './App.css';


function App() {

  return (
      <AuthProvider>
        <AxiosResponseInterceptor />

        <Navbar />

        <div className="router">
          <RouteHandler />
        </div>

        {/* <Footer /> */}

      </AuthProvider>
  );
}



export default App;
