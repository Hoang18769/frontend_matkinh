import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import swal from "sweetalert";
import axios from "axios";
const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id_account = localStorage.getItem("id_account");
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [voucher, setVoucher] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/discount"
      );
      //onsole.log(response);
      setVoucher(response.data.results);
      console.log(voucher);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    let price_product = 0;
    products.map((item) => {
      price_product += item.sellprice_product * item.quantity;
      return price_product;
    });
    setTotalAmt(price_product);
    console.log(products);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200000) {
      setShippingCharge(25000);
    } else if (totalAmt <= 300000) {
      setShippingCharge(20000);
    } else if (totalAmt <= 400000) {
      setShippingCharge(15000);
    }else if(totalAmt >=500000){
      setShippingCharge(0)
    }
  }, [totalAmt]);

  const [name_order, setName] = useState("");
  const [phone_order, setPhone] = useState("");
  const [email_order, setemail] = useState("");
  const [address_order, setAddress] = useState("");
  const [province_order, setProvi] = useState("");
  const [district_order, setDis] = useState("");
  const [commune_order, setCommu] = useState("");
  const [note, setNote] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [id_Discount, setId_Discount] = useState(null);

  const [discount, setDiscount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [apply_voucher, setApplyVoucher] = useState(false);

  const [Errname_order, setErrName] = useState("");
  const [Errphone_order, setErrPhone] = useState("");
  const [Erremail_order, setErrRmail] = useState("");
  const [Erraddress_order, setErrAddress] = useState("");
  const [Errprovince_order, setErrProvi] = useState("");
  const [Errdistrict_order, setErrDis] = useState("");
  const [Errcommune_order, setErrCommu] = useState("");
  const [Errnote, setErrNote] = useState("");
  const [ErrDiscount, setErrDiscount] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handPhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handleEmail = (e) => {
    setemail(e.target.value);
    setErrPhone("");
  };
  const handlAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleProvi = (e) => {
    setProvi(e.target.value);
    setErrProvi("");
  };
  const handleDistrict = (e) => {
    setDis(e.target.value);
    setErrDis("");
  };
  const handleCommu = (e) => {
    setCommu(e.target.value);
    setErrCommu("");
  };
  const handleNote = (e) => {
    setNote(e.target.value);
    setErrNote("");
  };
  const handleDiscount=(e)=>{
    setDiscountCode(e.target.value);
    console.log(discountCode);
    setErrDiscount("");
  }
  let handleApplyDiscount=(e)=>{
    e.preventDefault();
    let dateVoucher , date
    let discountCodeValid=voucher?.find((item)=>(
      item.code===discountCode.toUpperCase()
    ));
    if(discountCodeValid){
       date=new Date();
      dateVoucher=new Date(discountCodeValid.expiration_date.toString());
      //console.log(dateVoucher)
      //let difdate=date-dateVoucher
    }
   

    if(!discountCodeValid){
      setErrDiscount("Mã giảm giá không hợp lệ")
      setApplyVoucher(false);
      setDiscount(0)
    }
    else if(discountCodeValid.payment_limit>totalAmt){
      setErrDiscount("Chưa đạt điều kiện sử dụng mã giảm giá")
      setApplyVoucher(false)
      setDiscount(0)

    }
    else if(date-dateVoucher>86400){
      setErrDiscount("Mã giảm giá đã hết hạn")
      setApplyVoucher(false)
      setDiscount(0)
    }
    else if(discountCodeValid){
      setErrDiscount("Mã giảm giá đã được áp dụng")
      setDiscount(discountCodeValid.discount)
      setId_Discount(discountCodeValid.id_discount)
      setApplyVoucher(true)
    }
  }

  const submitOrder = (e) => {
    e.preventDefault();   
      if (!name_order) {
        setErrName("Enter your name");
      }
      if (!email_order) {
        setErrRmail("Enter your email_account");
      }
      if (!phone_order) {
        setErrPhone("Enter your phone number");
      }
      if (!district_order) {
        setErrDis("Create a password");
      }
      if (!address_order) {
        setErrAddress("Enter your address");
      }
      if (!province_order) {
        setErrProvi("Enter your name custom");
      }
      if (!commune_order) {
        setErrCommu("Enter the email_account Cus");
      }
      if (!note) {
        setErrNote("Enter the email_account Cus");
      }
    else{
      axios
      .post("https://matkinhcaolo.io.vn/api/orders", {
        name_order: name_order,
        email_order: email_order,
        phone_order: phone_order,
        address_order: address_order,
        commune_order: "",
        province_order: "",
        district_order: "",
        note: note,
        total_order: price_product,
        shippingfee: shippingCharge,
        id_discount: id_Discount,
        id_payment: 1,
        order_list: products,
        id_customer: id_account,
      })
      .then((result) => {
        dispatch(resetCart());
        console.log(result.data);
        swal("Success", result.data.message, "success");
        navigate("/")
      })
      .catch((error) => {
        let failedProduct=''
        if(error.response.request.status===400){
          error.response.data.product_variant?.map((item)=>(
            failedProduct+=item.name_product +" "+ item.id_variant+" số lượng còn lại: "+item.quantity+"\n"
          ))
          swal(error.response.data.message, failedProduct, "error");
        }
        console.log(error);
      });
    e.preventDefault();
    }
    
  };

  return (
    <div className="max-w-container mx-auto mr-4 px-4">
      <Breadcrumbs title="Thanh toán" />
      
      <div className="flex">
        <div className="pb-10 px-4 w-3/5 ">
          <h1 className="text-2xl font-semibold ">Thông tin giao hàng</h1>
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Họ tên
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  name="name_order"
                  placeholder="Jane"
                  onChange={handleName}
                  value={name_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Errname_order}
                  </span>
                </p>
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Email
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-last-name"
                  type="text"
                  name="email_order"
                  placeholder="dung@gmail.com"
                  onChange={handleEmail}
                  value={email_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Erremail_order}
                  </span>
                </p>
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-full px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Số điện thoại
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-phone"
                  type="text"
                  name="phone_order"
                  placeholder="01299292929"
                  onChange={handPhone}
                  value={phone_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Errphone_order}
                  </span>
                </p>
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Địa chỉ
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  name="address_order"
                  placeholder="122 Trần Phú"
                  onChange={handlAddress}
                  value={address_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Erraddress_order}
                  </span>
                </p>
              </div>
             
            </div>

         
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-full px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-note"
                >
                  Ghi chú
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-note"
                  name="note"
                  onChange={handleNote}
                  value={note}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1"> {Errnote}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" gap-4 w-2/5">
          <div className="w-96 gap-3">
            <h1 className="text-2xl font-semibold text-right">Đơn hàng</h1>
            
              {products.map((item) => (
                <div class=" text-gray-800 font-light border-gray-200 mb-3">
                  <div class="w-full flex items-center">
                    <div class="overflow-hidden rounded-lg w-14 h-14 bg-gray-50 border border-gray-200">
                      <img src={item.avt_product} alt="" />
                    </div>
                    <div class="flex-grow pl-2">
                      <h6 class="font-semibold uppercase text-gray-700">
                        {item.name_product}
                      </h6>
                      <p class="text-gray-500">Phân loại: {item.id_variant.id_variant}; Số lượng: {item.quantity}</p>
                    </div>
                    <div>
                      <span class="font-semibold text-black text-md">
                        {item.sellprice_product}VND
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            
            <div className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4 my-2 ">
              <p className="text-lg appearance-none flex items-center justify-between w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3">
                Tạm tính
                <span className=" font-medium tracking-wide font-titleFont">
                  {totalAmt} VND
                </span>
              </p>
              <p className="text-lg appearance-none flex items-center justify-between w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3">
                Phí vận chuyển
                <span className="font-medium tracking-wide font-titleFont">
                  {shippingCharge} VND
                </span>
              </p>
              <p className="text-lg appearance-none flex items-center justify-between w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3">
                Khuyến mãi
                {({apply_voucher}.apply_voucher)?
                <span className="font-medium tracking-wide font-titleFont">
                  - {discount} VND
                </span>
                : <span className="font-medium tracking-wide font-titleFont">
                  0 VND
                </span>
                }
               
              </p>
              <p className="text-lg appearance-none flex items-center justify-between w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3">
                Tổng cộng
                <span className="font-bold tracking-wide font-titleFont">
                  {totalAmt + shippingCharge- {discount}.discount} VND
                </span>
              </p>
              <div class="-mx-2 flex items-end justify-end">
                <div class="flex-grow px-2 lg:max-w-xs">
                  <label for="discount" class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Nhập mã giảm giá
                  </label>
                  <div>
                    <input
                      id="discount"
                      class="w-full px-3 py-2 font-mono border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="XXXXXX"
                      type="text"
                      onChange={handleDiscount}
                    />
                  </div>
                </div>
                <div class="px-2">
                  <button onClick={handleApplyDiscount} class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-black text-white rounded-md px-5 py-2 font-semibold">
                    APPLY
                  </button>
                </div>
                
              </div>
              {
                
                apply_voucher?
                <><p className="text-sm text-blue-500 font-titleFont font-semibold px-2 py-2">
                  <span className="font-bold italic mr-1"> {ErrDiscount}</span>
                </p></>
                :<><p className="text-sm text-red-500 font-titleFont font-semibold px-2 py-2">
                  <span className="font-bold italic mr-1"> {ErrDiscount}</span>
                </p></>
    }
            

              <label class="text-gray-600 font-semibold text-sm my-2 ml-1">
                Mã giảm giá
              </label>
              <div className="flex flex-wrap items-center justify-start">
              {voucher?.map((item) => (
                <div onClick={(e) => {
                      navigator.clipboard.writeText(item.code);
                    }} class="flex text-gray-800 border border-gray-300 bg-gray-100 font-mono text-sm py-2 px-3 mx-2 my-2  rounded-lg">
                  <div  class="flex gap-1 pr-3">
                    <span value={item.code}>
                    {item.code}

                    </span>
                  </div>
                  <span
                    
                    class="flex text-white cursor-pointer w-4 h-4 hover:text-gray-400 duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
                    </svg>
                  </span>
                </div>
              ))}
              </div>
              
            </div>
            <div>
            <button
                onClick={submitOrder}
                class="relative group overflow-hidden px-10 h-12 rounded-lg flex space-x-2 items-center bg-gradient-to-r from-indigo-500 to-indigo-700"
              >
                <span class="relative text-lg font-semibold text-white">Thanh toán</span>
                <div class="flex items-center space-x-3 translate-x-3"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;