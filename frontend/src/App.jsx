import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import FormReport from './Pages/ReportIssue';
import ViewIssues from './Pages/OpenIssues';
import About from './Pages/About';
import Profile from './Pages/Profile';

function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route 
        path='/' 
        element={
        <PrivateRoute>
        <Navbar/>
        <Home/> 
        </PrivateRoute>
      }/>
      
      <Route path='/report-issue' element={
        <PrivateRoute>
          <Navbar/>
          <FormReport />
        </PrivateRoute>
      } />

      <Route path='/get-all-issues' element={
        <PrivateRoute>
          <Navbar/>
          <ViewIssues />
        </PrivateRoute>
      } />
      <Route path='/about'
        element={
          <PrivateRoute>
            <Navbar/>
            <About />
          </PrivateRoute>
        }
      />
      <Route path='/profile' element={<Profile/>}/>



        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
