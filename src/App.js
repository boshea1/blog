import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Apps from './pages/Apps';
import Login from './pages/Login';
// import { AuthContextProvider } from './AuthContext';

function App() {
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="apps" element={<Apps />} />
        <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
