function getInfo() {
    var tknvTag = document.querySelector("#tknv").value;
    var nameTag = document.querySelector("#name").value;
    var emailTag = document.querySelector("#email").value;
    var passwordTag = document.querySelector("#password").value;
    var datepickerTag = document.querySelector("#datepicker").value;
    var luongCBTag = document.querySelector("#luongCB").value * 1;
    var chucvuTag = document.querySelector("#chucvu").value;
    var gioLamTag = document.querySelector("#gioLam").value * 1;
    var id = new Date().getTime().toString();

    var staff = new Staffs(id, tknvTag, nameTag, emailTag, passwordTag, datepickerTag, luongCBTag, chucvuTag, gioLamTag);

    return staff;
}