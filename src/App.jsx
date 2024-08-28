import './index.css';
import Layout from './dashboard';
import Auth from './auth/index';
import { Route, Routes} from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import Homepage from './Home/homepage';
import NotFound from './NotFound/NotFound';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        } 
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
