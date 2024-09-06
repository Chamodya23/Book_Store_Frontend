import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCategory() {
  const [category, setCategory] = useState({
    categoryName: "",
  });

  const { id } = useParams();
  console.log("Category Id is here", id);

  useEffect(() => {
    loadCategory();
  }, [id]); 

  
  const loadCategory = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/category/searchCategory/${id}`);
      setCategory(result.data); 
      console.log(category);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Category Details</h2>

          <div className="card">
            <div className="card-header">
              Details of category id: {id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name: </b>
                {category.categoryName}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to="/category">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
