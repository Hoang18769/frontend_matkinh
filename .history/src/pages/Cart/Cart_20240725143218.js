import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";


const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    console.log(products)
    let price_product = 0;
    products?.map((item) => {
      price_product += item.sellprice_product * item.quantity;
      return price_product;
    });
    setTotalAmt(price_product);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200000) {
      setShippingCharge(30000);
    } else if (totalAmt <= 400000) {
      setShippingCharge(25000);
    } else if (totalAmt > 500000) {
      setShippingCharge(20000);
    }
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Giỏ hàng" />
      {products?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Sản phẩm</h2>
            <h2>Giá tiền</h2>
            <h2>Số lượng</h2>
            <h2>Tạm tính</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item.id_prodcut}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Xóa giỏ hàng
          </button>

          
           
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Tổng giỏ hàng</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Tạm tính
                  <span className="font-semibold tracking-wide font-titleFont">
                    {totalAmt}VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Phí vận chuyển
                  <span className="font-semibold tracking-wide font-titleFont">
                    {shippingCharge}VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Tổng cộng
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {totalAmt + shippingCharge}VND
                  </span>
                </p>
              </div>
              <div onClick={handleCart} className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
