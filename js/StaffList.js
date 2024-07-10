class StaffList  {
    constructor() {
        this.list = [];
    }
    addStaffMethod(staffObject) {
        this.list.push(staffObject);
    }
    findIndexMethod(id) {
        var indexItem = -1;
        this.list.map(function(item, index) {
            if(item.id === id){
                indexItem = index;
            }
        })
        return indexItem;
    }
    deleteStaffMethod(id) {
        var indexItem = this.findIndexMethod(id)

        if(indexItem > -1){
            this.list.splice(indexItem,1);
        } else {
            alert("Can't delete item");
        }
    }
    getStaffMethod(id) {
        var indexItem = this.findIndexMethod(id);

        if(indexItem > -1){
            return this.list[indexItem];
        }else {
            alert("Can't get item");
        }
    }
    editStaffMethod(id, updateInfo) {
        var indexItem = this.findIndexMethod(id);
        
        if(indexItem > -1) {
            const staff = this.list[indexItem];
            for (const key in updateInfo){
                if(staff.hasOwnProperty(key)){
                    staff[key] = updateInfo[key];
                }
            }
        } else {
            alert("Can't edit item");
        }
    }
}

// // Khởi tạo StaffList
// const staffList = new StaffList();

// // Thêm dữ liệu nhân viên mẫu vào danh sách
// const staffData = [
//     {
//         id: 1,
//         taikhoan: '0001',
//         hoten: 'Nguyen Van A',
//         email: 'nguyenvana@example.com',
//         matkhau: 'Abc123!',
//         ngaylam: '07/09/2024',
//         luongcoban: 15000000,
//         chucvu: 'Nhân Viên',
//         giolam: 160,
//         tongluong: 0,
//         loainhanvien: 0
//     },
//     {
//         id: 2,
//         taikhoan: '0002',
//         hoten: 'Nguyen Van B',
//         email: 'nguyenvanb@example.com',
//         matkhau: 'Def456!',
//         ngaylam: '07/10/2024',
//         luongcoban: 17000000,
//         chucvu: 'Trưởng Phòng',
//         giolam: 180,
//         tongluong: 0,
//         loainhanvien: 0
//     },
//     {
//         id: 3,
//         taikhoan: '0003',
//         hoten: 'Nguyen Van C',
//         email: 'nguyenvanc@example.com',
//         matkhau: 'Ghi789!',
//         ngaylam: '07/11/2024',
//         luongcoban: 18000000,
//         chucvu: 'Giám Đốc',
//         giolam: 200,
//         tongluong: 0,
//         loainhanvien: 0
//     },
//     {
//         id: 4,
//         taikhoan: '0004',
//         hoten: 'Nguyen Van D',
//         email: 'nguyenvand@example.com',
//         matkhau: 'Jkl012!',
//         ngaylam: '07/12/2024',
//         luongcoban: 19000000,
//         chucvu: 'Nhân Viên',
//         giolam: 150,
//         tongluong: 0,
//         loainhanvien: 0
//     }
// ];

// // Thêm dữ liệu nhân viên vào danh sách và lưu trữ vào localStorage
// staffData.forEach(staff => {
//     const newStaff = new Staffs(staff);
//     staffList.addStaffMethod(newStaff);
// });

// // Kiểm tra danh sách nhân viên
// console.log("Danh sách nhân viên ban đầu:");
// console.log(staffList.list);

// // Kiểm tra phương thức findIndexMethod
// const index = staffList.findIndexMethod(2);
// console.log("Chỉ số của nhân viên với id 2:", index);

// // Kiểm tra phương thức getStaffMethod
// const staff = staffList.getStaffMethod(2);
// console.log("Thông tin nhân viên với id 2:", staff);

// // Kiểm tra phương thức editStaffMethod
// staffList.editStaffMethod(2, { hoten: "Nguyen Van B Updated", email: "newemail@example.com" });
// const updatedStaff = staffList.getStaffMethod(2);
// console.log("Thông tin nhân viên sau khi cập nhật với id 2:", updatedStaff);

// // Kiểm tra phương thức deleteStaffMethod
// staffList.deleteStaffMethod(2);
// console.log("Danh sách nhân viên sau khi xóa nhân viên với id 2:");
// console.log(staffList.list);


