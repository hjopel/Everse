import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Sidebar from './components/Sidebar'
import React, {useState} from 'react'
import ContactPage from "./pages/contact";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
}
  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggleIsOpen} />
      <Navbar toggle={toggleIsOpen} />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/contact' component={ContactPage} exact />
      </Switch>
      <Footer />

    </Router>      
  );
}

export default App;
