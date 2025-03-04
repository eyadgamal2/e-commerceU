import ProductCard from "./ProductCard";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { baseUrl } from "../compontents/constant";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSlider from './../compontents/HomeSlider';

export default function Home() {
  const [allProductData, setAllProductData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([])

  const settings = {
    dots: true,
    infinite: true,  // ✅ صحيح
    speed: 500,
    slidesToShow: 8,  // ✅ صحيح
    slidesToScroll: 6, // ✅ صحيح
    autoplay: true,  // تشغيل تلقائي
    autoplaySpeed: 3000,  // سرعة التبديل 3 ثواني
  };


  const getAllProduct = async (values) => {

    const loadingToaster = toast.loading("Processing...");
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/products`,
        values);
      setAllProductData(data.data);
      toast.success(data.message || "successful!");
      toast.dismiss(loadingToaster);
      setLoading(false);
    } catch (error) {
      toast.dismiss(loadingToaster);
      setLoading(false);
      if (error?.response.data.message) {
        toast.error(error?.response.data.message);
      } else {
        toast.error(error?.response.data.errors.msg);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };


  const getAllCategories = async (values) => {
    const loadingToaster = toast.loading("Processing...");
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/categories`,
        values);
      setAllCategories(data.data);
      toast.success(data.message || "successful!");
      toast.dismiss(loadingToaster);
      setLoading(false);
    } catch (error) {
      toast.dismiss(loadingToaster);
      setLoading(false);
      if (error?.response.data.message) {
        toast.error(error?.response.data.message);
      } else {
        toast.error(error?.response.data.errors.msg);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };




  useEffect(() => {
    getAllProduct();
    getAllCategories();
  },
    [])




  return (
    <main className="container mx-auto">
      <Toaster position="top-right" />
      <HomeSlider />
      <div className="my-5">
        <Slider {...settings}>
          {allCategories.map((category) =>
          (
            <div key={category._id} className="max-h-{80px}">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              <h3 className="text-green-700 text-center font-bold">{category.name}</h3>
            </div>
          )
          )}
        </Slider>
      </div>


      <div className="flex flex-wrap">
        {allProductData.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </main>
  );
};
