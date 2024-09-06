import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/Category";
import AddCategory from "./Category/AddCategory";  
import ViewCategory from "./Category/ViewCategory";
import EditCategory from "./Category/EditCategory";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/category" element={<Category/>}/>

            <Route path="/addcategory" element={<AddCategory />} />
            <Route exact path="/viewcategory/:id" element={<ViewCategory />} />
            <Route exact path="/editcategory/:id" element={<EditCategory/>} />
            
        

            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
