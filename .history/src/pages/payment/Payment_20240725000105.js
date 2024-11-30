import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import swal from "sweetalert";
import axios from "axios";
const Payment = () => {
  const dispatch = useDispatch();
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
      console.log(response);
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
      setShippingCharge(30000);
    } else if (totalAmt <= 400000) {
      setShippingCharge(25000);
    } else if (totalAmt > 500000) {
      setShippingCharge(20000);
    }
  }, [totalAmt]);
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/signin')
  //   }
  // })
  // const publishableKey="pk_test_51PTS77Rr99apr0O9c6fAE8N8I321lpgcJ2xceyjNPjp6af6AB3IDd4NHJgMDMV9qNNDGc5Q1AbkE4pqnYYwTBl7200UrmBNEaM"
  // const onToken=(token)=>{
  //   console.log(token);
  //   dispatch(resetCart());
  // };
  const [id_customer, setId] = useState("");
  const [id_payment, setPay] = useState("");
  const [name_order, setName] = useState("");
  const [phone_order, setPhone] = useState("");
  const [email_order, setemail] = useState("");
  const [address_order, setAddress] = useState("");
  const [province_order, setProvi] = useState("");
  const [district_order, setDis] = useState("");
  const [commune_order, setCommu] = useState("");
  const [note, setNote] = useState("");
  const [total_order, setTotal] = useState("");
  const [shippingfee, setShip] = useState("");
  const [id_discount, setDiscount] = useState("");
  const [checked, setChecked] = useState(false);

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
    setDiscount(e.target.value);
    console.log(id_discount);
    setErrDiscount("");
  }
  const submitOrder = (e) => {
    e.preventDefault();
    // products.map((item)=>(
    //   delete item.price_product
    // ))
    // console.log({  id_customer: 11,
    //   id_payment:1,
    //   name_order: '',
    //   phone_order: '',
    //   email_order: '',
    //   address_order: '',
    //   total_order:600000,
    //   shippingfee: 20000,
    //   province_order: '',
    //   district_order:'',
    //   id_discount:5,
    //   commune_order:'',
    //   note: '',});
    axios
      .post("https://matkinhcaolo.io.vn/api/orders", {
        name_order: name_order,
        email_order: email_order,
        phone_order: phone_order,
        address_order: address_order,
        commune_order: commune_order,
        province_order: province_order,
        district_order: district_order,
        note: note,
        total_order: totalAmt,
        shippingfee: shippingCharge,
        id_discount: 5,
        id_payment: 1,
        order_list: products,
        id_customer: id_account,
      })
      .then((result) => {
        dispatch(resetCart());
        console.log(result.data);
        alert("success");
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
    e.preventDefault();
    if (checked) {
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
        setAddress("Enter your address");
      }
      if (!province_order) {
        setErrProvi("Enter your name custom");
      }
      if (!commune_order) {
        setCommu("Enter the email_account Cus");
      }
      if (!note) {
        setNote("Enter the email_account Cus");
      }
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
                  type="number"
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
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
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
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Nhập tỉnh thành
                </label>
                <div class="relative">
                  <input
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    id="grid-first-name"
                    name="province_order"
                    placeholder="TPHCM"
                    onChange={handleProvi}
                    value={province_order}
                  />
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">
                      {" "}
                      {Errprovince_order}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="-mx-3 md:flex mb-6"></div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-city"
                >
                  Nhập quận huyện
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  name="district_order"
                  placeholder="quận 5"
                  onChange={handleDistrict}
                  value={district_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Errdistrict_order}
                  </span>
                </p>
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Nhập phường xã
                </label>
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  name="commune_order"
                  placeholder="phường 5"
                  onChange={handleCommu}
                  value={commune_order}
                />
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">
                    {" "}
                    {Errcommune_order}
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

          {/* <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link> */}
          {/* { <StripeCheckout
                    token={onToken}
                    stripeKey={publishableKey}
                    amount={1 * totalAmt}
                    name="MD"
                    currency="VND"
                    label="Proceed Checkout"
                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  /> } */}
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
                        {item.price_product}VND
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
                <span className="font-medium tracking-wide font-titleFont">
                  - {shippingCharge} VND
                </span>
              </p>
              <p className="text-lg appearance-none flex items-center justify-between w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3">
                Tổng cộng
                <span className="font-bold tracking-wide font-titleFont">
                  {totalAmt + shippingCharge} VND
                </span>
              </p>
              <div class="-mx-2 flex items-end justify-end">
                <div class="flex-grow px-2 lg:max-w-xs">
                  <label for="discount" class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Discount code
                  </label>
                  <div>
                    <input
                      id="discount"
                      class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="XXXXXX"
                      type="text"
                      onChange={handleDiscount}
                    />
                  </div>
                </div>
                <div class="px-2">
                  <button class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-black text-white rounded-md px-5 py-2 font-semibold">
                    APPLY
                  </button>
                </div>
                
              </div>
              <span className="flex font-bold italic mr-1"> {}</span>

              <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                Mã giảm giá
              </label>
              <div className="flex flex-wrap items-center justify-start">
              {voucher.map((item) => (
                <div class="flex text-gray-800 border border-gray-300 bg-gray-100 font-mono text-sm py-2 px-3 mx-2 my-2  rounded-lg">
                  <div class="flex gap-1 pr-3">
                    <span onClick={(e) => {
                      navigator.clipboard.writeText("wtf");
                    }} value={item.code}>{item.code}

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
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
