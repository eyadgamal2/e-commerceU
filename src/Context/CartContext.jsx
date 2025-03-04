import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { data } from "autoprefixer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [Products, setProducts] = useState([]);
  const [NumOfItems, setNumOfItems] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [loading, setloading] = useState(false);


  const [cartId, setCartId] = useState(null)

  async function addProductToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      getUserCart();
      return data;
    } catch (error) {
      console.error(error, "Error from add product to cart context");
    }
  }

  async function getUserCart() {
    setloading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
    } catch (error) {
      console.log(error, "Error getting cart data");
    }
    setloading(false);
    setCartId(data?.data?._id)
    
  }

 
  async function updatecount(id, count) {
    if (count < 1) return;

    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      console.log(data, "Count Updated Successfully");
      getUserCart();
    } catch (error) {
      console.log(error, "Error updating count in cart context");
    }
  }
//REMOVEITEM



  async function removeItem(id){
    try {
      const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token:localStorage.getItem("tkn")
        }
      })
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      
    } catch (error) {
      console.log(error,"error remove element context");
      
      
    }

   }


   //CLEARITEM
   async function ClearCart(){
    try {
      const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
          token:localStorage.getItem("tkn")
        }
      })
      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);
      
    } catch (error) {
      console.log(error,"error clear cart context");
      
    }
   }






  useEffect(() => {
    if (token !== null) {
      getUserCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        Products,
        NumOfItems,
        TotalPrice,
        loading,
        updatecount,
         removeItem,
         ClearCart,
         cartId,
         setNumOfItems,
         setProducts,
         setTotalPrice

         
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;