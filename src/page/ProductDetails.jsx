import { useParams } from "react-router-dom";
import slider2 from "../assets/img/slider-image-2.jpeg";
import { useQuery } from "react-query";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { useContext, useState } from 'react';
import { CartContext } from "../Context/CartContext";
import { toast } from 'react-hot-toast';
import { baseUrl } from "../compontents/constant";

const ProductDetails = () => {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext)

  const [Loading, setLoading] = useState(false)

  async function AddToCart() {
    setLoading(true)

    const data = await addProductToCart(id)

    if (data.status == "success") {

      toast.success(data.message)


      setLoading(false)
    } else {
      toast.error(error)
      setLoading(false)
    }
  }


  const getProductDetails = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/products/${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery(["ProductDetails", id], getProductDetails);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap bg-green-700 justify-center items-center">
        <FallingLines color="#fff" width="100" visible={true} ariaLabel="falling-circles-loading" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error fetching data</div>;
  }


  const product = data?.data;


  if (!product) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  return (
    <div className="md:w-[80%] mx-auto mt-10">
      <div className="flex flex-wrap items-center">

        <div className="md:w-1/3 p-5">
          <img src={product?.imageCover || slider2} alt={product?.title || "No title"} className="w-full rounded-lg shadow-md" />
        </div>

        <div className="md:w-2/3 p-5">
          <h1 className="text-3xl font-bold mb-3">{product?.title || "No title"}</h1>
          <p className="mb-3 text-gray-600">{product?.description || "No description available"}</p>
          <h3 className="mb-3 text-green-700 font-semibold">{product?.Category || "No category"}</h3>

          <div className="mt-3 mb-3 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              {product?.price ? `${product.price} $` : "Price not available"}
            </h3>
            <div className="flex items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span className="ml-1 text-gray-700">{product?.ratingsAverage ?? "No ratings"}</span>
            </div>
          </div>

          <button onClick={AddToCart}
            type="button"
            className="w-96 mx-52 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            {Loading ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;