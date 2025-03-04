import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { baseUrl } from "../compontents/constant";

export default function Brands() {
  const [Loading, setLoading] = useState(false);
  const [allBrands, setAllBrands] = useState([]);

  const getAllBrand = async () => {
    const loadingToaster = toast.loading("Processing...");
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/brands`);
      setAllBrands(data.data);
      toast.success(data.message || "Successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      toast.dismiss(loadingToaster);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  return (
    <div className="container mx-auto my-5">
      <Toaster position="top-right" />


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {allBrands.map((brand) => (
          <div
            key={brand._id}
            className="border border-green-500 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition duration-300"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-56 object-cover"
            />

            <h3 className="text-green-700 text-center font-bold py-3 text-lg">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
