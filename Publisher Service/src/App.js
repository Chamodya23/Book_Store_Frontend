import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddPublisher from "./Publisher/AddPublisher";
import EditPublisher from "./Publisher/EditPublisher";
import ViewPublisher from "./Publisher/ViewPublisher";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Publisher from "./pages/Publisher";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Publisher />} />
            

            <Route exact path="/editpublisher/:id" element={<EditPublisher />} />
            <Route exact path="/viewpublisher/:id" element={<ViewPublisher />} />
            <Route path="/addpublisher" element={<AddPublisher />} />
            
            
        

            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
