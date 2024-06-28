import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import UserRegistration from "./pages/UserRegistration";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import User from "./pages/User";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/registration" element={<UserRegistration />} />
            {/* <Route path="/forgot" element={<ForgotPassword />} /> */}
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/user" element={<User/>}/>
            {/* <Route path="/404" component={NotFound} />
            <Redirect to="/404" /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
