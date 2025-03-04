import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { baseUrl } from "../compontents/constant";

export default function CategorySlider() {
  async function getAllCategory() {
    return await axios.get(`${baseUrl}/api/v1/categories`);
  }

  const { data } = useQuery("categories", getAllCategory);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000, 
  };

  return (
    <div className="py-6">
      <Slider {...settings}>
        {data?.data?.data?.map((item, idx) => (
          <div key={idx} className="max-h-{100px}">
            <img src={item.image} className="w-full h-full" alt={item.name} />
            <h3 className="text-green-700 text-center font-bold">{item.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}