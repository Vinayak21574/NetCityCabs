import './App.css';

import Login from './Login';
import { Routes,Route } from 'react-router-dom';

// import Home_Passg from './Passg/Home_Passg';
import Page from './Page';
import Test from './Test';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="Home" element={<Page/>} />
            {/* <Route path="Test" element={<Test/>} /> */}
        </Routes>
    </div>
  );
}

export default App;
