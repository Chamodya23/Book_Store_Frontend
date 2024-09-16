import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddCustomer from "./Customer/AddCustomer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from "./pages/Customer";
import EditCustomer from "./Customer/EditCustomer";
import ViewCustomer from "./Customer/ViewCustomer";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Customer />} />
            

            <Route exact path="/editcustomer/:id" element={<EditCustomer />} />
            <Route exact path="/viewcustomer/:id" element={<ViewCustomer />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route exact path="/viewcustomer" element={<ViewCustomer />} />
            
            
        

            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
