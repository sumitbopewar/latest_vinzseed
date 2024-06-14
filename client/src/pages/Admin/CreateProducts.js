import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productName, setproductName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldprice, setoldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [catImg, setCatImg] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [weight, setWeight] = useState([]);

  const [weightInput, setWeightInput] = useState('');
  const [productImagesInput, setProductImagesInput] = useState('');



  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleAddWeight = () => {
    setWeight([...weight, weightInput]
    );
    setWeightInput('');
  };

  const handleRemoveWeight = (index) => {
    const newWeight = weight.filter((_, i) => i !== index);
    setWeight(
       [newWeight]
    );
  };

  const handleAddProductImage = () => {
    setProductImages([
      ...productImages, productImagesInput
    ]);
    setProductImagesInput('');
  };

  const handleRemoveProductImage = (index) => {
    const newProductImages = productImages.filter((_, i) => i !== index);
    setProductImages([
      newProductImages
    ]);
  };

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("productName", productName);
      productData.append("brand", brand);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("oldprice", oldprice);
      productData.append("discount", discount);
      productData.append("rating", rating);
      productData.append("catImg", catImg);
      productData.append("category", category);
      productData.append("weight", weight);
      productData.append("productImages", productImages);

      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
        } else {
          toast.error(data?.message);
        }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Add Product</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              required
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="mb-3">
              <input
                type="text"
                value={productName}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setproductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={brand}
                placeholder="write brand name"
                className="form-control"
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="enter price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={oldprice}
                placeholder="enter old price"
                className="form-control"
                onChange={(e) => setoldPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={discount}
                placeholder="enter discount"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={rating}
                placeholder="enter ratings"
                className="form-control"
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={catImg}
                placeholder=" category image"
                className="form-control"
                onChange={(e) => setCatImg(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={productImagesInput}
                className="form-control"
                onChange={(e) => setProductImagesInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-success m-2"
                onClick={handleAddProductImage}
              >
                Add Product Image
              </button>
              <ul>
                {productImages.map((image, index) => (
                  <li key={index}>
                    {image}{" "}
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveProductImage(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              
              <input
                type="text"
                className="form-control"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
              />
              <button type="button" className="btn btn-success m-3" onClick={handleAddWeight}>
                Add Weight
              </button>
              <ul>
                {weight.map((weight, index) => (
                  <li key={index}>
                    {weight}{" "}
                    <button
                      type="button"
                      className="btn btn-danger ms-3"
                      onClick={() => handleRemoveWeight(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  

export default CreateProduct;
