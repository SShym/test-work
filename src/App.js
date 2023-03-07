import './App.css';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Error from './Components/Error/Error';

function App() { 
  const error = useSelector(state => state.appReducer.error); 

  return (
    <div className="app">
      <div className="app-wrap">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:id/:name' element={<Profile />} />
        </Routes>
        {error && <Error />}
      </div>
    </div>
  );
}

export default App;
