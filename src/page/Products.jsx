import ProductCard from "./ProductCard";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { baseUrl } from "../compontents/constant";

export default function Products() {
  const [allProductData, setAllProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Loading, setLoading] = useState(false);

  const getAllProduct = async () => {
    const loadingToaster = toast.loading("Processing...");
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/products`);
      setAllProductData(data.data);
      setFilteredProducts(data.data); // حفظ المنتجات الأصلية والمفلترة
      toast.success(data.message || "successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      toast.dismiss(loadingToaster);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // 🟢 فلترة المنتجات عند تغيير قيمة البحث
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(
      allProductData.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
    );
  };

  return (
    <main className="container mx-auto">
      <Toaster position="top-right" />

      {/* 🔍 Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))
        ) : (
          <p className="text-center w-full">No products found.</p>
        )}
      </div>
    </main>
  );
}
