import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import UserRegistration from "./pages/UserRegistration";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/" element={<Home/>}/>
          <Route  path="/shop" element={<Shop/>} />
          <Route path="/registration" element={<UserRegistration/>}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
          {/* <Route path="/404" component={NotFound} />
          <Redirect to="/404" /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
