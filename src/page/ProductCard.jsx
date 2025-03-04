import { Badge, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { CartContext } from './../Context/CartContext';
import { useContext, useCallback } from "react";
import { toast } from 'react-hot-toast';

export default function ProductCard({ productData }) {
    const { addProductToCart } = useContext(CartContext);

    const AddToCart = useCallback(async (id) => {
        try {
            const data = await addProductToCart(id);
            if (data.status === "success") {
                toast.success(data.message);
            } else {
                toast.error("Failed to add product to cart");
            }
        } catch (e) {
            console.error("Error adding product to cart:", e);
            toast.error(e.message || "An unexpected error occurred");
        }
    }, [addProductToCart]);

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Card className="shadow-sm p-2 bg-white border-white hover:border-green-500 hover:shadow-green-400 hover:shadow-md dark:bg-gray-800 dark:border-gray-800 text-gray-800 dark:text-slate-400">
                <figure>
                    <img
                        className="h-full w-full object-cover"
                        src={productData?.imageCover}
                        alt={productData?.title || "Product image"}
                    />
                </figure>
                <div>
                    <div className="flex justify-between items-center">
                        <Link to={`/products/${productData.id}`}>
                            <h3 className="font-bold capitalize text-gray-800 dark:text-slate-200 line-clamp-1">
                                {productData?.title}
                            </h3>
                        </Link>
                        <Badge color="success" className="rounded-full min-w-[49px] flex items-center gap-1">
                            <span>{productData?.ratingsAverage}</span>
                            <i className="fa-solid fa-star text-yellow-300"></i>
                        </Badge>
                    </div>
                    <p className="my-2 text-xs text-gray-600 dark:text-slate-200 line-clamp-2">
                        {productData?.description}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <span className="px-1 font-medium">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(productData?.price)}
                            </span>
                        </div>
                        <Button
                            onClick={() => AddToCart(productData.id)}
                            size="xs"
                            className="capitalize bg-green-500 hover:bg-green-800"
                        >
                            add to cart
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
