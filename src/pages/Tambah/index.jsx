import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const createProduct = async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/products",
        productData
      );
      const newProduct = response.data;
      window.alert("Product created successfully.");
      history.push("/");
      return newProduct;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, stocks, status };
    const newProduct = await createProduct(productData);
    console.log(newProduct);
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
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

export default Tambah;
