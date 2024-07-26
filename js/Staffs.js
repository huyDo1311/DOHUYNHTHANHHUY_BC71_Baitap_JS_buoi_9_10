class Staffs {
    id;
    taikhoan;
    hoten;
    email
    matkhau;
    ngaylam;
    luongcoban;
    chucvu;
    giolam;
    tongluong;
    loainhanvien;

    constructor(id, taikhoan, hoten, email, matkhau, ngaylam, luongcoban, chucvu, giolam) {
        this.id = id;
        this.taikhoan = taikhoan;
        this.hoten = hoten;
        this.email = email;
        this.matkhau = matkhau;
        this.ngaylam = ngaylam;
        this.luongcoban = luongcoban;
        this.chucvu = chucvu;
        this.giolam = giolam;
        this.tongluong = this.tinhTongLuong();
        this.loainhanvien = this.xepLoai();
    }

    tinhTongLuong() {
        if (this.chucvu === "Sếp") {
          return this.luongcoban * 3;
        } else if (this.chucvu === "Trưởng phòng") {
          return this.luongcoban * 2;
        } else {
          return this.luongcoban;
        }
    };
      
    xepLoai() {
        if (this.chucvu === "Nhân viên") {
            if (this.giolam < 160) {
                return "Trung bình";
            } else if (160 <= this.giolam && this.giolam < 176) {
                return "Khá";
            } else if (176 <= this.giolam && this.giolam < 192) {
                return "Giỏi";
            } else {
                return "Xuất sắc";
            }
        }
        return "";
    };
}
