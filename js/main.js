var passwordTag = document.querySelector("#password");
var tableDanhSach = document.querySelector("#tableDanhSach");
var form = document.querySelector("#form");
var searchName = document.querySelector("#searchName");

var eyeClose = document.querySelector("#eye-close");
var eyeOpen = document.querySelector("#eye-open");

var staffList = new StaffList();
var editID = "";

getLocalStorage();
var data = getLocalStorage();

staffList.list = [];
data.map((arr) => {
  var staff = new Staffs(
    arr.id,
    arr.taikhoan,
    arr.hoten,
    arr.email,
    arr.matkhau,
    arr.ngaylam,
    arr.luongcoban,
    arr.chucvu,
    arr.giolam
  );
  return staffList.addStaffMethod(staff);
});
showStaffList();
// ****** local storage **********
function setLocalStorage(arr) {
  localStorage.setItem("StaffList", JSON.stringify(arr));
}

function getLocalStorage() {
  staffList.list = localStorage.getItem("StaffList")
    ? JSON.parse(localStorage.getItem("StaffList"))
    : [];
  return staffList.list;
}

function addStaff() {
  var staff = getInfo();
  var isValid =
    validateStaffProps(staff) & validateTaiKhoan(staff.taikhoan, staffList);

  if (!isValid) return;

  staffList.addStaffMethod(staff);
  setLocalStorage(staffList.list);
  showStaffList();
  resetForm();
}

function showStaffList() {
  var content = "";
  var data = staffList.list;
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

function deleteStaff(staffId) {
  staffList.deleteStaffMethod(staffId);
  setLocalStorage(staffList.list);
  showStaffList();
}

function getStaff(staffId) {
  let item = staffList.getStaffMethod(staffId);

  document.querySelector("#tknv").value = item.taikhoan;
  document.querySelector("#name").value = item.hoten;
  document.querySelector("#email").value = item.email;
  document.querySelector("#password").value = item.matkhau;
  document.querySelector("#datepicker").value = item.ngaylam;
  document.querySelector("#luongCB").value = item.luongcoban;
  document.querySelector("#chucvu").value = item.chucvu;
  document.querySelector("#gioLam").value = item.giolam;
  editID = item.id;

  document.querySelector("#tknv").setAttribute("readonly", true);

  // Chọn phần tử body và form
  var body = document.querySelector("body");
  var form = document.querySelector(".modal-dialog");
  // Thay thế bằng selector phù hợp với form của bạn
  var listen = function (event) {
    // Kiểm tra nếu body có class "modal-open"
    if (body.classList.contains("modal-open")) {
      // Kiểm tra nếu click nằm ngoài phần tử form
      console.log('event :>> ', event);
      if (!form.contains(event.target)) {
        // window.location.reload();
      }
    }
  };
  // Gắn sự kiện click cho document
  body.addEventListener("click", listen);
}

function editStaff() {
  var staffEditInfo = getInfo();

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
  window.location.reload();
  body.removeEventListener("click", listen);
}

function searchStaff() {
  let searchValue = searchName.value.trim().toLowerCase();
  let data = staffList.list;

  let resultSearch = data.filter(({ loainhanvien, ...rest }) => {
    if (typeof loainhanvien === "string") {
      return loainhanvien.trim().toLowerCase() === searchValue;
    }
    return false;
  });

  showStaffList(resultSearch);
}

eyeClose.addEventListener("click", function () {
  eyeOpen.classList.remove("hidden");
  eyeClose.classList.add("hidden");
  passwordTag.setAttribute("type", "text");
});

eyeOpen.addEventListener("click", function () {
  eyeOpen.classList.add("hidden");
  eyeClose.classList.remove("hidden");
  passwordTag.setAttribute("type", "password");
});
