import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  let navigate = useNavigate();
  const { categoryId } = useParams(); // Extract CustomerID from URL parameters

  const [category, setCategory] = useState({
    categoryName: "",
  });

  const { categoryName } = category;

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the new endpoint with query parameter for updating customer
      await axios.put(`http://localhost:8080/api/v1/category/updateCategory`, category, {
        params: { id: categoryId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const loadCategory = async () => {
    try {
      // Use the new endpoint with query parameter for fetching customer details
      const result = await axios.get(`http://localhost:8080/api/v1/category/searchCategory`, {
        params: { id: categoryId }
      });
      setCategory(result.data); // Update state with the fetched customer data
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Category</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter category name"
                name="categoryrName"
                value={categoryName}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
