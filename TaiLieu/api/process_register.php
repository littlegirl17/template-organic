<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form
    $email = $_POST["email"];
    $fullname = $_POST["fullname"];
    $phone = $_POST["phone"];
    $tinh = $_POST["tinh"];
    $quanHuyen = $_POST["quanHuyen"];
    $phuongXa = $_POST["phuongXa"];
    $password = $_POST["password"];

    // Sử dụng hàm file_get_contents để đọc nội dung của tập tin JSON
    $jsonData = file_get_contents('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    //Hàm này chuyển chuỗi JSON thành một mảng 
    //Tham số thứ hai là true, cho biết rằng chúng ta muốn kết quả trả về dưới dạng mảng kết hợp (associative array). 
    $data = json_decode($jsonData, true);

    $tinhName = "";
    $quanHuyenName = "";
    $phuongXaName = "";

    // for mảng data để lấy ra tỉnh 
    foreach($data as $item){
        if($item['Id'] == $tinh){
            $tinhName = $item['Name'];
            // for cái mảng Districts của tỉnh/thành phố để lấy ra quận/huyện
            foreach($item['Districts'] as $district){
                if($district['Id'] == $quanHuyen){
                    $quanHuyenName = $district['Name'];
                    // for cái mảng Wards của quận/huyện để lấy ra phường xã
                    foreach($district['Wards'] as $ward){
                        if($ward['Id'] == $phuongXa){
                            $phuongXaName = $ward['Name'];
                            break; // Đã tìm thấy phường/xã, thoát vòng lặp
                        }
                    }
                    break; // Đã tìm thấy phường/xã, thoát vòng lặp
                }
            }
            break; // Đã tìm thấy phường/xã, thoát vòng lặp
        }
    }


    // In ra thông tin đã nhận được
    echo "Email: " . $email . "<br>";
    echo "Họ tên: " . $fullname . "<br>";
    echo "Điện thoại: " . $phone . "<br>";
    echo "Tỉnh/Thành phố: " . $tinhName . "<br>";
    echo "Quận/Huyện: " . $quanHuyenName . "<br>";
    echo "Phường/Xã: " . $phuongXaName . "<br>";
}
?>
