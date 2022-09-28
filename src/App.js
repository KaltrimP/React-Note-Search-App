import Home from "./components/Home";
import {Route, Routes} from 'react-router-dom';
import Popup from "./components/Popup";
import Update from "./components/Update";
import NavBar from "./components/NavBar";
import Create from "./components/Create";
import Search from "./components/Search";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/notes/:id' element={<Update/>} />
        <Route path='/notes/search/:name' element={<Search/>} />
        <Route path='/notes/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
