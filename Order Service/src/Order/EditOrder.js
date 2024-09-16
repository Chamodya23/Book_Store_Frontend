import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrder() {
  let navigate = useNavigate();
  const { OrderId } = useParams();

  const [order, setOrder] = useState({
    OrderName: "",
    TotalAmount: "",
  });

  const { OrderName, TotalAmount } = order;

  // onChange handler to update state
  const onInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Function to submit the updated order
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update order using path variable for ID
      await axios.put(`http://localhost:8080/api/v1/order/UpdateOrder/${OrderId}`, order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Function to load order details when the component mounts
  const loadOrder = async () => {
    try {
      // Fetch order using path variable for ID
      const result = await axios.get(`http://localhost:8080/api/v1/order/SearchOrder/${OrderId}`);
      setOrder(result.data.content); // Assuming the content is returned in the 'content' field
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Call loadOrder when the component is first rendered
  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Order</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="OrderName" className="form-label">
                Order Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter order name"
                name="OrderName"  // Make sure name matches state key
                value={OrderName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TotalAmount" className="form-label">
                Total Amount
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter total amount"
                name="TotalAmount"  // Make sure name matches state key
                value={TotalAmount}
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
