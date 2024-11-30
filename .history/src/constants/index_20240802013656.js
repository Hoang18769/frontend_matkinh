import "./style.css";

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Trang chủ",
    link: "/",
  },
  {
    _id: 1002,
    title: "Sản phẩm",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "Về chúng tôi",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Liên hệ",
    link: "contact",
  },
];
export const ProfileList =[
  {id:1,
  title: "Thông tin chung",
  link:"general"
},
{
  id:2,
  title:"Thông tin cá nhân",
  link:"information"
},
{
  id:3,
  title:"Lịch sử đơn hàng",
  link:"purchase_history"
}
];
export const list=["Mã đơn hàng", "Thời gian", "Tổng đơn hàng", "Trạng thái đơn hàng"]

export const status_order_List=[
  {
    id:0,
    desc:"Đã hủy"
  },
  {
    id:1,
    desc:"Chờ xác nhận"
  },
  {
    id:2,
    desc:"Đã xác nhận"
  },{
    id:3,
    desc:"Đang giao hàng"
  },
  {
    id:4,
    desc:"Giao hàng thành công"
  },{
    id:5,
    desc:"Hoàn trả"
  },
]



