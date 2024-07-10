class Staffs {
    constructor({id, taikhoan, hoten, email, matkhau, ngaylam, luongcoban, chucvu, giolam, tongluong, loainhanvien}) {
        this.id = id;
        this.taikhoan = taikhoan;
        this.hoten = hoten;
        this.email = email;
        this.matkhau = matkhau;
        this.ngaylam = ngaylam;
        this.luongcoban = luongcoban;
        this.chucvu = chucvu;
        this.giolam = giolam;
        this.tongluong = tongluong;
        this.loainhanvien = loainhanvien;
    }
}

// const staffParams = {
//     taikhoan: 'nv001',
//     hoten: 'Nguyen Van A',
//     email: 'nguyenvana@example.com',
//     matkhau: '123456',
//     ngaylam: '2024-07-01',
//     luongcoban: 5000000,
//     chucvu: 'Nhan Vien',
//     giolam: 160,
//     tongluong: 8000000,
//     loainhanvien: 'Chinh Thuc'
// };

// const staff = new Staffs(staffParams);

// console.log(staff);