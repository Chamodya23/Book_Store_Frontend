import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddAuthor from "./Author/AddAuthor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Author from "./pages/Author";
import EditAuthor from "./Author/EditAuthor";
import ViewAuthor from "./Author/ViewAuthor";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Author />} />
            

            <Route exact path="/editAuthor/:id" element={<EditAuthor />} />
            <Route exact path="/viewAuthor/:id" element={<ViewAuthor />} />
            <Route path="/addAuthor" element={<AddAuthor />} />
            
            
        

            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
