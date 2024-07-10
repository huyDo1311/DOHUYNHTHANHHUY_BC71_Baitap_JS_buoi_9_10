var tknvTag = document.querySelector("#tknv");
var nameTag = document.querySelector("#name");
var emailTag = document.querySelector("#email");
var passwordTag = document.querySelector("#password");
var datepickerTag = document.querySelector("#datepicker");
var luongCBTag = document.querySelector("#luongCB");
var chucvuTag = document.querySelector("#chucvu");
var gioLamTag = document.querySelector("#gioLam");
var tableDanhSach = document.querySelector("#tableDanhSach");
var form = document.querySelector("#form");
var searchName = document.querySelector("#searchName");

var eyeClose = document.querySelector("#eye-close");
var eyeOpen = document.querySelector("#eye-open")

var staffList = new StaffList();
var editID = "";

getLocalStorage();
// ****** local storage **********
function setLocalStorage(arr) {
  localStorage.setItem("StaffList", JSON.stringify(arr));
}

function getLocalStorage() {
  staffList.list = localStorage.getItem("StaffList")
    ? JSON.parse(localStorage.getItem("StaffList"))
    : [];
  let dataList = staffList.list;
  showStaffList(dataList);
}

function addStaff() {
  var tknv = tknvTag.value;
  var name = nameTag.value;
  var email = emailTag.value;
  var password = passwordTag.value;
  var datepicker = datepickerTag.value;
  var luongCB = luongCBTag.value;
  var chucvu = chucvuTag.value;
  var giolam = gioLamTag.value;
  var id = new Date().getTime().toString();

  // const staffProps = {
  //   id: id,
  //   taikhoan: "0001",
  //   hoten: "Nguyen Van A",
  //   email: "nguyenvana@example.com",
  //   matkhau: "Abc123!",
  //   ngaylam: "07/09/2024",
  //   luongcoban: 15000000,
  //   chucvu: "Nhân viên",
  //   giolam: 160,
  // };

  // // Thêm dữ liệu nhân viên mẫu vào danh sách
  //   const staffData = [
  //     {
  //       id: id,
  //       taikhoan: "0001",
  //       hoten: "Nguyen Van A",
  //       email: "nguyenvana@example.com",
  //       matkhau: "Abc123!",
  //       ngaylam: "07/09/2024",
  //       luongcoban: 15000000,
  //       chucvu: "Nhân viên",
  //       giolam: 160,
  //       tongluong: 15000000,
  //       loainhanvien: "Trung bình",
  //     },
  //     {
  //       id: id,
  //       taikhoan: "0002",
  //       hoten: "Nguyen Van B",
  //       email: "nguyenvanb@example.com",
  //       matkhau: "Def456!",
  //       ngaylam: "07/10/2024",
  //       luongcoban: 17000000,
  //       chucvu: "Trưởng Phòng",
  //       giolam: 180,
  //       tongluong: 34000000,
  //       loainhanvien: 0,
  //     },
  //     {
  //       id: id,
  //       taikhoan: "0003",
  //       hoten: "Nguyen Van C",
  //       email: "nguyenvanc@example.com",
  //       matkhau: "Ghi789!",
  //       ngaylam: "07/11/2024",
  //       luongcoban: 18000000,
  //       chucvu: "Sếp",
  //       giolam: 200,
  //       tongluong: 54000000,
  //       loainhanvien: 0,
  //     },
  //     {
  //       id: id,
  //       taikhoan: "0004",
  //       hoten: "Nguyen Van D",
  //       email: "nguyenvand@example.com",
  //       matkhau: "Jkl012!",
  //       ngaylam: "07/12/2024",
  //       luongcoban: 19000000,
  //       chucvu: "Nhân viên",
  //       giolam: 150,
  //       tongluong: 38000000,
  //       loainhanvien: "Trung bình",
  //     },
  //   ];

  // // Thêm dữ liệu nhân viên vào danh sách và lưu trữ vào localStorage
  //   staffData.forEach((staff) => {
  //     const newStaff = new Staffs(staff);
  //     staffList.addStaffMethod(newStaff);
  //     setLocalStorage(staffList.list);
  //   });

  var tongLuong = tinhTongLuong(chucvu, luongCB);
  var xepLoaiNhanVien = xepLoai(chucvu, giolam);

  const staffProps = {
    id: id,
    taikhoan: tknv,
    hoten: name,
    email: email,
    matkhau: password,
    ngaylam: datepicker,
    luongcoban: luongCB,
    chucvu: chucvu,
    giolam: giolam,
    tongluong: tongLuong,
    loainhanvien: xepLoaiNhanVien,
  };

  if (validateStaffProps(staffProps) && validateTaiKhoan(staffProps.taikhoan)) {
    var staff = new Staffs(staffProps);
    staffList.addStaffMethod(staff);
    setLocalStorage(staffList.list);
    showStaffList();
    resetForm();
  }
}

function showStaffList(data) {
  var content = "";
  data.map(function (item) {
    content += `
        <tr>
            <td>${item.taikhoan}</td>
            <td>${item.hoten}</td>
            <td>${item.email}</td>
            <td>${item.ngaylam}</td>
            <td>${item.chucvu}</td>
            <td>${item.tongluong}</td>
            <td>${item.loainhanvien}</td>
            <td>
                <div class="btn-container">
                    <!-- edit btn -->
                    <button onclick="getStaff('${item.id}')" type="button" class="edit-btn"  class="delete-btn" data-toggle="modal"
                    data-target="#myModal">
                        <i class="fas fa-edit"></i>
                    </button>
                    <!-- delete btn -->
                    <button onclick="deleteStaff('${item.id}')" type="button"  class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;
  });
  tableDanhSach.innerHTML = content;
}

function validateStaffProps(staffProps) {
  //Destructuring Assignment
  const {
    taikhoan,
    hoten,
    email,
    matkhau,
    ngaylam,
    luongcoban,
    chucvu,
    giolam,
  } = staffProps;

  let isValid = true;

  // Các quy tắc validate
  const validations = [
    {
      value: hoten,
      validator: validateHoTen,
      selector: "#tbTen",
      message: "Tên nhân viên phải là chữ, không để trống",
    },
    {
      value: email,
      validator: validateEmail,
      selector: "#tbEmail",
      message: "Email không hợp lệ",
    },
    {
      value: matkhau,
      validator: validateMatKhau,
      selector: "#tbMatKhau",
      message:
        "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống",
    },
    {
      value: ngaylam,
      validator: validateNgayLam,
      selector: "#tbNgay",
      message: "Ngày làm không để trống, định dạng mm/dd/yyyy",
    },
    {
      value: luongcoban,
      validator: validateLuongCoBan,
      selector: "#tbLuongCB",
      message: "Lương cơ bản 1 000 000 - 20 000 000, không để trống",
    },
    {
      value: chucvu,
      validator: validateChucVu,
      selector: "#tbChucVu",
      message:
        "Chức vụ phải chọn chức vụ hợp lệ (Sếp, Trưởng Phòng, Nhân Viên)",
    },
    {
      value: giolam,
      validator: validateGioLam,
      selector: "#tbGiolam",
      message: "Số giờ làm trong tháng 80 - 200 giờ, không để trống",
    },
  ];

  // Kiểm tra từng thuộc tính
  validations.forEach(({ value, validator, selector, message }) => {
    const valid = validator(value);
    // console.log("valid :>> ", valid);
    if (!valid) {
      showError(selector, message);
      isValid = false;
    }
  });
  //   if (!validateTaiKhoan(taikhoan)) {
  //     let tbTKNV = document.getElementById('tbTKNV');
  //     tbTKNV.style.display = 'block';
  //     tbTKNV.innerHTML = `Tài khoản tối đa 4 - 6 ký số, không để trống`;
  //     isValid = false;
  //   }else {
  //     isValid = true;
  //   }

  //   if (!validateHoTen(hoten)) {
  //     let tbTen = document.getElementById("tbTen");
  //     tbTen.style.display = 'block';
  //     tbTen.innerHTML = `Tên nhân viên phải là chữ, không để trống`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateEmail(email)) {
  //     let tbEmail = document.getElementById("tbEmail");
  //     tbEmail.style.display = 'block';
  //     tbEmail.innerHTML = `Email không hợp lệ`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateMatKhau(matkhau)) {
  //     let tbMatKhau = document.getElementById("tbMatKhau");
  //     tbMatKhau.style.display = 'block';
  //     tbMatKhau.innerHTML = `Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
  //     để trống`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateNgayLam(ngaylam)) {
  //     let tbNgay = document.getElementById("tbNgay");
  //     tbNgay.style.display = 'block';
  //     tbNgay.innerHTML = `Ngày làm không để trống, định dạng mm/dd/yyyy`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateLuongCoBan(luongcoban)) {
  //    let tbLuongCB = document.getElementById("tbLuongCB");
  //    tbLuongCB.style.display = 'block';
  //    tbLuongCB.innerHTML = `Lương cơ bản 1 000 000 - 20 000 000, không để trống`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateChucVu(chucvu)) {
  //     let tbChucVu = document.getElementById("tbChucVu");
  //     tbChucVu.style.display = 'block';
  //     tbChucVu.innerHTML = `Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }

  //   if (!validateGioLam(giolam)) {
  //     let tbGiolam = document.getElementById("tbGiolam");
  //     tbGiolam.style.display = 'block';
  //     tbGiolam.innerHTML = `Số giờ làm trong tháng 80 - 200 giờ, không để trốngệ`;
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }
  return isValid;
}

function showError(selector, message) {
  const element = document.querySelector(selector);
  element.style.display = "block";
  element.innerHTML = message;
}

// function validateTaiKhoan(taikhoan) {
//   const regex = /^\d{4,6}$/;
//   return regex.test(taikhoan);
// }

function validateTaiKhoan(taikhoan) {
  const element = document.querySelector("#tbTKNV");

  // Kiểm tra tài khoản theo regex
  const regex = /^\d{4,6}$/;
  const isValidFormat = regex.test(taikhoan);

  if (!isValidFormat) {
    element.style.display = "block";
    element.innerHTML =
      "Tài khoản tối đa 4 - 6 ký số, không để trống, từ 0001-999999";
    return false;
  } else {
    // Lấy danh sách nhân viên từ localStorage
    const staffList = JSON.parse(localStorage.getItem("StaffList"));
    // Kiểm tra xem tài khoản đã tồn tại hay chưa
    const isExistingAccount = staffList.some(function (staff, index, array) {
      return staff.taikhoan === taikhoan;
    });
    if (isExistingAccount) {
      element.style.display = "block";
      element.innerHTML = "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác";
      return false;
    }
    return true;
  }
}

function validateHoTen(hoten) {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(hoten);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateMatKhau(matkhau) {
  const regex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  return regex.test(matkhau);
}

function validateNgayLam(ngaylam) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return regex.test(ngaylam);
}

function validateLuongCoBan(luongcoban) {
  return luongcoban >= 1000000 && luongcoban <= 20000000;
}

function validateChucVu(chucvu) {
  if (chucvu === "Sếp" || chucvu === "Trưởng phòng" || chucvu === "Nhân viên") {
    return true;
  }
  return false;
}

function validateGioLam(giolam) {
  return giolam >= 80 && giolam <= 200;
}

function tinhTongLuong(vitri, luong) {
  if (vitri === "Sếp") {
    return luong * 3;
  } else if (vitri === "Trưởng phòng") {
    return luong * 2;
  } else {
    return luong;
  }
}

function xepLoai(lever, time) {
  if (lever === "Nhân viên") {
    if (time < 160) {
      return "Trung bình";
    } else if (160 <= time && time < 176) {
      return "Khá";
    } else if (176 <= time && time < 192) {
      return "Giỏi";
    } else {
      return "Xuất sắc";
    }
  }
  return "";
}

function deleteStaff(staffId) {
  staffList.deleteStaffMethod(staffId);
  setLocalStorage(staffList.list);
  showStaffList();
}

function getStaff(staffId) {
  let item = staffList.getStaffMethod(staffId);
  console.log("item :>> ", item);
  tknvTag.value = item.taikhoan;
  nameTag.value = item.hoten;
  emailTag.value = item.email;
  passwordTag.value = item.matkhau;
  datepickerTag.value = item.ngaylam;
  luongCBTag.value = item.luongcoban;
  chucvuTag.value = item.chucvu;
  gioLamTag.value = item.giolam;
  editID = item.id;
}

function editStaff() {
  var name = nameTag.value;
  var email = emailTag.value;
  var password = passwordTag.value;
  var datepicker = datepickerTag.value;
  var luongCB = luongCBTag.value;
  var chucvu = chucvuTag.value;
  var giolam = gioLamTag.value;

  var tongLuong = tinhTongLuong(chucvu, luongCB);
  var xepLoaiNhanVien = xepLoai(chucvu, giolam);

  const staffEditInfo = {
    hoten: name,
    email: email,
    matkhau: password,
    ngaylam: datepicker,
    luongcoban: luongCB,
    chucvu: chucvu,
    giolam: giolam,
    tongluong: tongLuong,
    loainhanvien: xepLoaiNhanVien,
  };

  if (validateStaffProps(staffEditInfo)) {
    staffList.editStaffMethod(editID, staffEditInfo);
    setLocalStorage(staffList.list);
    showStaffList();
    resetForm();
  }
}

function resetForm() {
  form.reset();
  editID = "";
}

function searchStaff() {
  let searchValue = searchName.value.trim().toLowerCase();
  let data = staffList.list;

  let resultSearch = data.filter(({ loainhanvien, ...rest }) => {
    if (typeof loainhanvien === 'string') {
      return loainhanvien.trim().toLowerCase() === searchValue;
    }
    return false;
  });

  showStaffList(resultSearch);
}

eyeClose.addEventListener("click", function() {
  eyeOpen.classList.remove("hidden");
  eyeClose.classList.add("hidden");
  passwordTag.setAttribute('type', 'text');
})

eyeOpen.addEventListener("click", function() {
  eyeOpen.classList.add("hidden");
  eyeClose.classList.remove("hidden");
  passwordTag.setAttribute('type', 'password');
})
