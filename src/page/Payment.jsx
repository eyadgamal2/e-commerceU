import { useState, useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';
import { baseUrl } from "../compontents/constant";

const Payment = () => {
  const { cartId, setNumOfItems, setProducts, setTotalPrice } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");

  async function CashOrder() {
    if (!phone || !city || !details) {
      console.error("All fields are required");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/orders/${cartId}`,
        { shippingAddress: { details, phone, city } },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      
      setNumOfItems(0);
      setTotalPrice(0);
      setProducts([]);
      console.log("Order placed successfully:", data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
    setLoading(false);
  }

  async function OnlineOrder() {
    if (!phone || !city || !details) {
      console.error("All fields are required");
      return;
    }
    
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: { details, phone, city } },
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { url: window.location.origin },
        }
      );
      
      if (data.session?.url) {
        window.location.href = data.session.url;
      } else {
        console.error("Invalid session URL:", data);
      }
    } catch (error) {
      console.error("Error placing online order:", error);
    }
  }

  return (
    <div className="py-10 md:w-[60%] mx-auto px-5">
      {["details", "phone", "city"].map((field) => (
        <div key={field} className="relative z-0 w-full mb-7 group">
          <input
            onChange={(e) => {
              if (field === "details") setDetails(e.target.value);
              else if (field === "phone") setPhone(e.target.value);
              else if (field === "city") setCity(e.target.value);
            }}
            type={field === "phone" ? "tel" : "text"}
            name={field}
            id={field}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-700"
          />
          <label htmlFor={field} className="peer-focus:font-medium capitalize">
            {field}
          </label>
        </div>
      ))}

      <button
        onClick={CashOrder}
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        disabled={loading}
      >
        {loading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : "Cash Payment"}
      </button>

      <button
        onClick={OnlineOrder}
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 ml-2"
      >
        Online Payment
      </button>
    </div>
  );
};

export default Payment;
