import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendMail from "./pages/Account/SendMail";
import ResetPass from "./pages/Account/ResetPass";
import General from "./pages/Profile/General";
import Purchase_history from "./pages/Profile/Purchase_histotry";
import Information from "./pages/Profile/Information";
import Feedback from "./pages/Profile/Feedback";
import GoogleCallback from "./pages/Account/GoogleCallBack";
const Layout = () => {
  return (
    <div className="bg-[F5F5F3]">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  
  createRoutesFromElements(
    
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/signin2" element={<SignIn />}></Route>
        <Route path="/auth/google" element={<GoogleCallback />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:id" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="profile/purchase_history/feedback" element={<Feedback/>}></Route>
        {/* <Route path="/Profile" element={<Profile />}></Route>
        <Route path="profile/general" element={<General />}></Route> */}
        <Route path="/profile/general" element={<General />}></Route>
        <Route path="/profile/purchase_history" element={<Purchase_history />}></Route>
        {/* <Route path="/profile/order_detail" element={<Order_detail/>}></Route> */}
        <Route path="/profile/information" element={<Information />}></Route>
      </Route>
      {/* layout2 */}
      {/* <Route path="/profile" element={<Layout2/>}>
        <Route path="general" element={<General />}></Route>
      </Route>
       */}
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/sendmail" element={<SendMail />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/reset" element={<ResetPass />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
