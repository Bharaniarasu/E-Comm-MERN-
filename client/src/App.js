import "./App.css";
import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { useEffect, useState } from "react";
import store from "./components/redux/store/store";
import { loadUser } from "./components/redux/actions/userActions";
import Routers from "./routers/routers";
import axios from "axios";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);
    (async () => {
      const { data } = await axios.get("/api/v1/stripe-api");
      setStripeApiKey(data.stripeApiKey);
    })();
  });
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark" position="bottom-center" />
          <div className="container container-fluid">
            <Routers stripeApiKey={stripeApiKey} />
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
