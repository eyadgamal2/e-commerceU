
import Slider from "react-slick";
import slider3 from "../assets/img/slider-image-3.jpeg"
import slider2 from "../assets/img/slider-image-2.jpeg"
import img1 from "../assets/img/grocery-banner-2.jpeg"
import img2 from "../assets/img/grocery-banner.png"


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpped:1000,


  };
  return (
 <section className="py-7 mb-5">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-2/3">

        <Slider {...settings}>
      <div className="max-w-{100px} max-h-{100px}">
        <img src={slider3} className="w-full h-full" alt="slider" />
      </div>
      <div className="max-w-{100px} max-h-{100px}">
        <img src={slider2} className="w-full h-full" alt="slider" />
      </div>
    </Slider>
        </div>
        <div className="w-1/3">
        <img src={img1} className="w-full h-[150px]" alt="" />
        <img src={img2} className="w-full h-[150px]" alt="" />

        
        </div>
      </div>
 </section>
  );
}