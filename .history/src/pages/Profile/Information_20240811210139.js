import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Profile from "./Profile";

const Information = () => {
  const [customer, setCustomer] = useState({});
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  let id = localStorage.getItem("id_customer");
  let defaultInfo={
    name:customer.name_customer,
    phone:customer.phone_customer,
    address:customer.address_customer
  };
  let viewInfo=()=>{
    console.log(name,phone,address)
    let editfield = document.getElementsByClassName("editfield");
    Array.from(editfield).forEach((item)=>(console.log(item.value)))
    swal({ title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
       
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
  })

  }
  let handleEditable = () => {
    setEdit(!edit);
    const editfield = document.getElementsByClassName("editfield");
    setName(customer.name_customer);
    setPhone(customer.phone_customer);
    setAddress(customer.address_customer);
    document.getElementById("name").value = defaultInfo.name;
    document.getElementById("phone").value = defaultInfo.phone;
    document.getElementById("address").value = defaultInfo.address;
   
    if (!edit) {
      Array.from(editfield).forEach(
        (editfield) => (editfield.readOnly = false)
      )
;
    } else  {  
      Array.from(editfield).forEach((editfield) => (editfield.readOnly = true));
    }
  };
  let handleEdit=()=>{
    try {
      axios.put(
        `https://matkinhcaolo.io.vn/api/customers/${id}`,{
          name_customer:name,
          phone_customer:phone,
          address_customer:address,
        }
      ).then((result)=>{
        console.log(result);
        swal("Thành công",result.data?.message,"success")
        window.location.reload();
      })
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/customer/${id}`
      );
      //console.log(response);
      setCustomer(response.data);
      setName(response.data.name_customer);
      setPhone(response.data.phone_customer);
      setAddress(response.data.address_customer);
      console.log(customer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex px-8 py-8 gap-5">
      {/* <div className="w-1/5 ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className=" py-5 font-bold text-xl hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title}
              </li>
            </NavLink>
          ))}
        </ul>
      </div> */}
      <Profile />

      <div className="w-4/5 text-lg bg-[#F5F5F3] px-8 ">
        <form>
          <label>{edit ? "true" : "false"}</label>
          <label
            class=" block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Tên khách hàng
          </label>
          <input
            id="name"
            class="editfield appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-4 px-4 mb-3"
            defaultValue={customer.name_customer}
            onChange={(e)=>{setName(e.target.value);}}
            readOnly="true"
          />
          <label
            class=" block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Số điện thoại
          </label>
          <input
            id="phone"
            class=" editfield appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-4 px-4 mb-3"
            defaultValue={customer.phone_customer}
            onChange={(e)=>{setPhone(e.target.value);}}

            readOnly="true"
          />

          <label
            class=" block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Email đăng ký
          </label>
          <input
            id="email"
            class=" appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-4 px-4 mb-3"
            defaultValue={customer.email_customer}
            readOnly="true"
          />

          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Địa chỉ
          </label>
          <input
            id="address"
            class="editfield appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-4 px-4 mb-3"
            defaultValue={customer.address_customer}
            onChange={(e)=>{setAddress(e.target.value);}}

            readOnly="true"
          />

          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Ngày tạo tài khoản
          </label>
          <input
            id="date"
            className="font-mono text-xl px-8 tracking-wide"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-4 px-4 mb-3"
            value={customer.created_at}
            readOnly="true"

          />
        </form>

        {
          <button
            type="submit"
            onClick={handleEditable}
            class="group relative h-10 w-44 my-4 overflow-hidden rounded-md bg-indigo-500 text-lg font-bold text-white mx-4"
          >
            {edit ? "Hủy" : "Sửa"}
          </button>
        }
        {edit && (
          <button
            type="submit"
            onClick={handleEdit}
            class="group relative h-10 w-44 my-4 overflow-hidden rounded-md bg-indigo-500 text-lg font-bold text-white"
          >
            Lưu
          </button>
        )}
        { (
          <button
            type="submit"
            onClick={viewInfo}
            class="group relative h-10 w-44 mx-2 my-4 overflow-hidden rounded-md bg-indigo-500 text-lg font-bold text-white"
          >
            Xem
          </button>
        )}
      </div>
    </div>
  );
};
export default Information;
