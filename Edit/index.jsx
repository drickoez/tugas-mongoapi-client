import { useState, useEffect } from "react";
import Input from "../../components/Input";
import axios from "axios";

const Edit = ({ value, match }) => {
  const [name, setName] = useState(value?.data?.name);
  const [price, setPrice] = useState(value?.data?.price);
  const [stocks, setStocks] = useState(value?.data?.stocks);
  const [status, setStatus] = useState(value?.data?.status);

  // const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    getProductDetail();
  }, {});

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/product/${match.params.id}`
      );
      if (response.data.data) {
        setName(response.data.data.name);
        setPrice(response.data.data.price);
        setStocks(response.data.data.stocks);
        setStatus(response.data.data.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = { name, price, stocks, status };
    console.log(updateProduct);
    try {
      const response = await axios.put(
        `http://localhost:9000/api/v1/products/${match.params.id}`,
        updateProduct
      );
      console.log(response.data);
      window.alert("Product updated succesfully.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
