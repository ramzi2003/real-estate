import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListingDetail from "./pages/ListingDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Listings from "./pages/LIstings";
import { NotFound } from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/listings" element={<Listings />} />
            <Route element={<PrivateRoute />}>
              <Route path="/listings/:id" element={<ListingDetail />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
