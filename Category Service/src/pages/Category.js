import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/category/getAllCategory");
      console.log("API Response:", result.data); // Log the response data
      if (result.data && Array.isArray(result.data)) {
        setCategories(result.data); // Corrected: Set customers directly if the data is an array
      } else if (result.data && Array.isArray(result.data.content)) {
        setCategories(result.data.content); // Corrected: If it's nested under content
      } else {
        console.error("Unexpected response format:", result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  

  // const deleteCategory = async (categoryId) => {
  //   try {
  //     const response = await axios.delete("http://localhost:8080/api/v1/category/deleteCategory", {
  //       params: { id: categoryId }
  //     });
  //     console.log(response.data); // Log the response message
  //     if (response.data === "successfully deleted") {
  //       loadCategories(); // Reload customers after successful deletion
  //     } else {
  //       console.error("Unexpected delete response:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting category:", error);
  //   }
  // };
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/category/deleteCategory/${categoryId}`);
      if (response.status === 200) {
        alert("Category deleted successfully!");
        loadCategories(); // Reload categories after deletion
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category!");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Ensure customers is an array before filtering
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-4">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            className="form-control"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link className="btn btn-primary mx-5" to="/addcategory">
          Add New Category
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Category ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.categoryId}>
                <th scope="row">{category.categoryId}</th>
                <td>{category.categoryName}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewcategory/${category.categoryId}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editcategory/${category.categoryId}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCategory(category.categoryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
