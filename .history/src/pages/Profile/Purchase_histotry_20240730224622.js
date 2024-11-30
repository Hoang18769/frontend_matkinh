import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
const Purchase_history =()=>{
    const [history, setHistory] =useState([])
    const [productShop, setProduct] = useState([]);
    var total=0
    let id=localStorage.getItem("id_customer")
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
          );
          console.log(response);
          setHistory(response.data.orders);
        //   history.forEach((item)=>
        //     console.log(parseInt(item.total_order),
        //   total+=parseInt(item.total)

        // )
        //   )
          
        //   console.log(history)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }; 
      const fetchData2 = async () => {
        try {
          const response = await axios.get(
            "https://matkinhcaolo.io.vn/api/product"
          );
          console.log(response);
          setProduct(response.data.results);
          
          //console.log("product" + productShop)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(()=>{
        fetchData();
        //fetchData2();
        
      },[])
      return(
        <div className="w-full flex px-8 py-8 gap-5">
        <div className="w-1/5">
            <ul>
            {ProfileList.map(({id,title,link})=>(
                <NavLink
                key={id}
                to={`/profile/${link}`}
                //state={{ data: location.pathname.split("/")[1] }}
                >
                    <li className="px-3 py-5 border rounded-lg"
                        >{title} +{total}</li>
            </NavLink>
            ))}
            </ul>
        </div>
        <div className="w-4/5 border items-center">
                <div className="flex px-8 py-8 border justify-between">
                {list.map((item)=>(
                    <label className=" px-4 py-4">{item}</label>
                ))}

                </div>
            {history.map((item)=>(
              <>
                <div className="flex px-8 py-4 border justify-between">
                    <div className=" px-4 py-2">{item.id_order}</div>
                    <div className=" px-4 py-2">{item.date_order}</div>
                    <div className=" px-4 py-2">{item.total_order}</div>                    
                    <div className=" px-4 py-2">{item.status_order} </div>
                    <button data-dropdown-toggle="dropdown" className="border border-black px-4 py-2">
                    Xem chi tiết</button>

                </div>
                <button data-ripple-light="true" data-popover-target="menu-1" data-popover-nested="true"
  class="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
  Open Nested Menu
</button>
<ul role="menu" data-popover="menu-1" data-popover-placement="bottom"
  class="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 1
  </li>
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 2
  </li>
  <li role="menuitem" data-popover-target="nested-menu"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Nested Menu
  </li>
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 3
  </li>
</ul>
<ul role="menu" data-popover="nested-menu" data-popover-offset="20" data-popover-placement="right-start"
  class="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 1
  </li>
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 2
  </li>
  <li role="menuitem"
    class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
    Menu Item 3
  </li>
</ul>  
               
                <div id="dropdown" className=" px-8 py-4 border justify-between">
                {item.order_details?.map((item)=>(
                  <div className="flex justify-between border-b">

                  <img className="w-12 h-12" src={item.product.avt_product} alt="productImage" />
                  <div className="align-center px-2">{item.product.name_product}</div>
                  <div className="px-2">{item.colors?.map((item)=>item.desc_color)}</div>
                  <div className="px-2">{item.sizes?.map((item)=>item.desc_size)}</div>
                  <div className="px-2">{item.quantity}</div>
                  <div className="px-2">{item.totalprice}</div>

                  </div>

                ))}
                  </div>
                </>
               
            ))}
        </div>
        
    </div>
      )
}
export default Purchase_history