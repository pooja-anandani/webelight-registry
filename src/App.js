import logo from './logo.svg';
import './App.css';
import UserDashboard from './Components/UserDashboard';
import Header from './Components/Header';
import AddUser from './Components/AddUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowUserServer from './Components/ShowUserServer';
import UserDetailsProvider from './utils/UserContext';





function App() {
  return (
    <div className="App">
    <UserDetailsProvider>
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/servers/:email" element={<ShowUserServer />} />
            <Route path="/add" element={<AddUser />} />
         
        </Routes>
      </div>
    </BrowserRouter>
    </UserDetailsProvider>
  </div>
  );
}

export default App;
