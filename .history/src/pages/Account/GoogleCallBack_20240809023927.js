
import React, {useState, useEffect} from 'react';
import {Link, useLocation,useNavigate} from "react-router-dom";

function GoogleCallback() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Hook navigate để chuyển hướng
    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {

        fetch(`https://matkinhcaolo.io.vn/api/login-google${location.search}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setData(data);
                 // Nếu đăng nhập thành công
                 if (data.token) {
                    // Hiển thị thông báo thành công
                    localStorage.setItem("id_account", data.user.id_account);
                    localStorage.setItem("id_customer",data.user.id_customer);
                    alert('Đăng nhập thành công');
                    localStorage.setItem("currentToken", data.token);

                    console.log(data)
                    // Chuyển hướng về trang chủ
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error('Đăng nhập thất bại', error);
                setLoading(false);
        });
    }, []);
   
    // Phương thức trợ giúp để tìm nạp dữ liệu Người dùng cho người dùng được xác thực
    // Chú ý tiêu đề "Ủy quyền" được thêm vào lệnh gọi này
    function fetchUserData() {
        fetch(`https://matkinhcaolo.io.vn/api/customer`, {
            // headers : {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //     'Authorization': 'Bearer ' + data.access_token,
            // }
        })
            .then((response) => {
                console.log(response)
                return response;   
            })
            .then((data) => {
                console.log(data)
                setUser(data);
            }).catch((error)=>(
                console.log(error)
            ))
    }

    if (loading) {
        return <DisplayLoading/>
    } else {
        if (user != null) {
            // console.log(data)
            return <DisplayData data={user}/>
        } else {
            // navigate(-1)
            // console.log(data)
            return (
                <div>
                    <DisplayData data={data}/>
                    <div style={{marginTop:10}}>
                        {/* <button onClick={fetchUserData}>Fetch User</button> */}
                        <Link to="/signin">
                       
                            <button >
                            chọn tài khoản khác</button>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}
function DisplayData(data) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}

export default GoogleCallback;