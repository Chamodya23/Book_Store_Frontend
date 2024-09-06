import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddBook from "./Book/AddBook";
import EditBook from "./Book/EditBook";
import ViewBook from "./Book/ViewBook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Book from "./pages/Book";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Book />} />
            <Route exact path="/editbook/:id" element={<EditBook />} />
            <Route exact path="/viewbook/:id" element={<ViewBook />} />
            <Route path="/addbook" element={<AddBook />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
