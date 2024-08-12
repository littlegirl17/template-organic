        
let tinh;
let  selectProvince;
fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
.then(response => response.json())
.then(data => {
    // Làm bất cứ điều gì bạn muốn với dữ liệu ở đây
        console.log(data);

    tinh = Array.from(data); //gán dữ liệu dưới dạng mảng cho "tinh"
    tinh.map(value => document.getElementById('tinh').innerHTML += `<option value='${value.Id}' >${value.Name}</option>`)
})
.catch(error => {
    console.error('Error data:', error);
});

// bắt sự kiện thay đổi cho thẻ  select  của tỉnh/thành phố
document.getElementById('tinh').addEventListener('change', function(){
    // Lấy giá trị của tỉnh/thành phố được chọn
    let valueTinhID = this.value; //value này chính là cái Id

    //Tìm tỉnh thành đc chọn trong danh sách tỉnh thành đã fetch ra
    selectProvince = tinh.find(tinhthanh => tinhthanh.Id === valueTinhID);
    
    //nếu tỉnh được chọn tồn tại
    if(selectProvince){
        let quanHuyenSelect = document.getElementById('quanHuyen');
        let phuongXaSelect = document.getElementById('phuongXa');

        //xóa tất cả tùy chọn hiện có trong thẻ select : nghĩa là khi chưa chọn thì show Quận/Huyện lên, chọn rồi thì xóa nó đi
        quanHuyenSelect.innerHTML = '<option selected disabled>Quận/Huyện</option>';
        phuongXaSelect.innerHTML = '<option selected disabled>Phường/Xã</option>';

        //Duyệt qua danh sách các quận huyện của tỉnh/city
        selectProvince.Districts.forEach(district => {
            // Thêm tùy chọn mới cho mỗi quận/huyện
            quanHuyenSelect.innerHTML += `<option value='${district.Id}' >${district.Name}</option>`;
        });
    }

})

//bắt sự kiện thay đổi cho thẻ select của quận huyện
document.getElementById('quanHuyen').addEventListener('change', function(){
    let valueQuanHuyenId = this.value;

    let selectDistrict = selectProvince.Districts.find(district =>district.Id === valueQuanHuyenId);
    console.log(selectDistrict);

    if(selectDistrict){
        let PhuongXaSelect = document.getElementById('phuongXa');

    //xóa tất cả tùy chọn hiện có trong thẻ select : nghĩa là khi chưa chọn thì show Quận/Huyện lên, chọn rồi thì xóa nó đi
    PhuongXaSelect.innerHTML  = '<option selected disabled>Phường/Xã</option>';

    selectDistrict.Wards.forEach(ward => {
        PhuongXaSelect.innerHTML += `<option value='${ward.Id}' >${ward.Name}</option>`;
    })
}
})