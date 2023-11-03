import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import Create from './Views/Create/Create';
import Details from './Views/Details/Details';
import Navbar from './Components/Navbar/Navbar';


function App() {
  
  
  return (
    <div className="App">
    <BrowserRouter>
   
    <Switch>
    <Route exact path={"/"} component={Landing}></Route>
    <Route  path={"/"} component={Navbar}></Route>
    </Switch>
   
    <Switch>    
    <Route path={"/home"} component={Home}></Route>
    <Route path={"/create"} component={Create}></Route>
    <Route path={"/details/:id"} component={Details}></Route>
    </Switch>
   
    </BrowserRouter>
    </div>
  );
}

export default App;
