import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import Agents from './pages/agents/Agents';
import Teachings from './pages/teachings/Teachings';
import Qna from './pages/qna/Qna';
import Contact from './pages/contact/Contact';
import ViewAgent from './pages/agents/ViewAgent';
import Register from './pages/register/Register';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>    
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/agents' element={<Agents/>}/>
            <Route path='/agents/:id' element={<ViewAgent/>}/>
            <Route path='/teachings' element={<Teachings/>}/>
            <Route path='/qna' element={<Qna/>}/>
            <Route path='/contact' element={<Contact/>}/>
        </Routes>
    </BrowserRouter>
    
   {/* {RenderPage()} */}
</div>
  );
}

export default App;
