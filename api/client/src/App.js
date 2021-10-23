import Topbar from "./components/topbar/topbar";
import Home from './pages/home/home';
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import Setting from "./pages/setting/setting";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {
  HashRouter as Router,
  Switch,
  Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {

  const {user} = useContext(Context)
  return (
    <Router basename="/index.html">
      <Topbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/register">  {user ? <Home/>:<Register/>}   </Route>
        <Route path="/login">     {user ? <Home/>:<Login/>} </Route>
        <Route path="/setting">   {user ? <Setting/>:<Register/>} </Route>
        <Route path="/write">     {user ? <Write/>:<Register/>} </Route>
        <Route path="/post/:postId">
          <Single/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
