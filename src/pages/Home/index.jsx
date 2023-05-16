import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/products");
      setProductList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(typeof productList)}
          {productList.map((value) => (
            <tr key={value}>
              <td>{value._id}</td>
              <td>{value.name}</td>
              <td className="text-right">RP. {value.price}</td>
              <td className="text-center">
                <Link to="/detail" className="btn btn-sm btn-info">
                  Detail
                </Link>
                <Link to="/edit" className="btn btn-sm btn-warning">
                  Edit
                </Link>
                <Link to="#" className="btn btn-sm btn-danger">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
