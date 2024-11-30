import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
const Purchase_history =()=>{
    const [history, setHistory] =useState([])
    const [productShop, setProduct] = useState([]);
    let [total,setTotal]=useState(0)
    let id=localStorage.getItem("id_customer")
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
          );
          console.log(response);
          setHistory(response.data.orders);
          setTotal(history.map((item)=>
            console.log(item.total_order)
          ))
          console.log(total)
          
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
        fetchData2();
        
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
                    <Link to="/profile/order_detail">
                    <div className="border border-black px-4 py-2">Xem chi tiết</div>
                    </Link>

                </div>
                <div>
                {/* {item.order_details.map((item)=>(
                  detail= productShop.map((items)=>(
                    items.id_product===item.id_product
                  ))  
                  if(detail!==null){
                    
                  }
                 
                 
               
                   
                ))} */}
                 {/* productShop.find((items)=>(
                    
                    items.id_product?.id_product===item.id_product?.id_product? <>
                    <img className="w-30 h-30" src={items.avt_product} alt="productImage" />                  
                   </>:<p>aaa</p>
                  )) */}
                {/* {productShop.map((item)=>{
                  return <img className="w-32 h-32" src={item.avt_product} alt="productImage" />
                })} */}
                
                 
                </div>
                </>
               
            ))}
        </div>
        
    </div>
      )
}
export default Purchase_history