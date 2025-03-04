import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { Products, TotalPrice, loading, updatecount,  removeItem,  ClearCart} =
    useContext(CartContext);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-green-700">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto md:w-[90%] mt-5 bg-slate-100 p-5">
    {Products?.length==0 ?<h1 className="text-center text-4xl text-green-700 py-5 ">NO DATA TO DISPLAY IT</h1> :
    <>
    
      <h1 className="font-bold text-3xl mb-3">Shop Cart</h1>
      <h3 className="font-mono text-green-600">Total Price: {TotalPrice} EGP</h3>
      <button onClick={ ClearCart}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
                >
                  Clear Cart
                </button>

                <Link to="/Payment" className="text-white mx-4 bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2" >
                Payment
                </Link>
      <div className="mt-3">
        {Products?.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4 border border-gray-300 relative"
          >
            {/* الخط الفاصل */}
            <div className="absolute top-1/2 left-0 w-full border-b border-gray-300 -z-10"></div>
            {/* صورة المنتج */}
            <div className="flex items-center gap-4">
              <img
                src={item.product.imageCover}
                className="w-24 h-24 object-cover rounded-lg"
                alt="Product"
              />
              {/* بيانات المنتج */}
              <div>
                <h2 className="text-lg font-bold">{item.product.title}</h2>
                <h3 className="text-green-600 font-semibold">{item.price} EGP</h3>
                <h2>{item.product._id}</h2>
                <button onClick={() =>  removeItem(item.product._id)}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* أزرار التحكم في العدد */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => updatecount(item.product._id, item.count + 1)}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                +
              </button>
              <h3 className="text-lg font-bold my-2">{item.count}</h3>
              <button
                onClick={() => updatecount(item.product._id, item.count - 1)}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                disabled={item.count <= 1} // تعطيل الزر إذا كانت الكمية 1
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    
    
    </>
    }
    </div>
  );
};

export default Cart;