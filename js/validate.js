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
  return isValid;
}

function validateTaiKhoan(taikhoan, staffList) {
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
    // Kiểm tra xem tài khoản đã tồn tại hay chưa
    const isExistingAccount = staffList.list.some(function (staff) {
      return staff.taikhoan === taikhoan;
    });
    if (isExistingAccount) {
      element.style.display = "block";
      element.innerHTML = "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác";
      return false;
    }
  }
  return true;
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

function showError(selector, message) {
    const element = document.querySelector(selector);
    element.style.display = "block";
    element.innerHTML = message;
  }
