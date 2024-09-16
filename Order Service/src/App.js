import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddOrder from "./Order/AddOrder";
import EditOrder from "./Order/EditOrder";
import ViewOrder from "./Order/ViewOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./pages/Order";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/order" element={<Order />} />
            

            <Route exact path="/editorder/:id" element={<EditOrder />} />
            <Route exact path="/vieworder/:id" element={<ViewOrder />} />
            <Route path="/addorder" element={<AddOrder />} />
            
            
        

            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
