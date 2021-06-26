/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */
var fs = require('fs');
var readlineSync = require('readline-sync');
var idNguoi = 0;
var idSach = 0;
var idMuon = 0;
var GiaSach = [{id : 1},{id : 2},{id : 3},{id : 4}];
var sach = [];
var nguoi = [];
var muon = [];
var tra = [];
function loadNguoi(){
  var doc = fs.readFileSync('./nguoi.json');
  nguoi = JSON.parse(doc);
  if(nguoi.length !== 0){
    var i = nguoi.length - 1;
    idNguoi = nguoi[i].id;
  }
}
function loadSach(){
  var doc = fs.readFileSync('./sach.json');
  sach = JSON.parse(doc);
  if(sach.length !== 0){
    var i = sach.length - 1;
    idSach = sach[i].id;
  }
}
function loadMuon(){
  var doc = fs.readFileSync('./ngaymuon.json');
  muon = JSON.parse(doc);
  if(muon.length !== 0){
    var i = muon.length - 1;
    idMuon = muon[i].id;
  }
}
function loadSach(){
  var doc = fs.readFileSync('./sach.json');
  sach = JSON.parse(doc);
  if(sach.length !== 0){
    var i = sach.length - 1;
    idSach = sach[i].id;
  }
} 
function dangKy(){
  var id = ++idNguoi;
  var ten = readlineSync.question('nhap ten nguoi dung: ');
  var tuoi = readlineSync.question('nhap tuoi nguoi dung: ');
  var them = {
    id : id,
    ten : ten,
    tuoi : tuoi
  }
  nguoi.push(them);
  var ghi = JSON.stringify(nguoi);
  fs.writeFileSync('./nguoi.json',ghi);
}
function themSach(){
  var id = ++idSach;
  var ten = readlineSync.question('nhap ten sach: ');
  var tacGia = readlineSync.question('nhap ten tac gia: ');
  var giaSach = readlineSync.question('nhap gia sach: ');
  var them = {
    id : id,
    ten : ten,
    tacGia : tacGia,
    giaSach : giaSach
  }
  sach.push(them);
  var ghi = JSON.stringify(sach);
  fs.writeFileSync('./sach.json',ghi);
}
function htNguoi(){
  console.log('danh sach nguoi dang ki');
  for(var i of nguoi){
    console.log('id ',i.id,' ten ',i.ten,' tuoi ', i.tuoi );
  }
}
function htSach(){
  console.log('list sach');
  for(var i of sach){
    console.log('id ',i.id,' ten ',i.ten,' tac gia ', i.tacGia,' gia sach ',i.giaSach );
  }
}
function NM(idNM){
  for(var i of nguoi){
    if(i.id === idNM) return true;
  }
  console.log('khong tim thay nguoi dung');
  console.log('=============================================');
  return false;
}
function MS(idMS){
  for(var i of sach){
    if(i.id === idMS) return true;
  }
  console.log('khong tim thay sach');
  console.log('=============================================');
  return false;
}
function nguoiMuon(idNM){
  for(var i of nguoi){
    if(i.id === idNM) return i;
  }
}
function muonSach1(idMS){
  for(var i of sach){
    if(i.id === idMS) return i;
  }
}
function date(){
  var x = new Date;
  var ngay = x.getDate();
  var thang = x.getMonth()+1;
  var nam = x.getFullYear();
  var gio = x.getHours();
  var phut = x.getMinutes();
  var tg = gio +':'+ phut + ' ' + ngay+'/'+thang+'/'+nam;
  return tg;
}
function muonSach(){
  do{
    var idNM = parseInt(readlineSync.question('nhap id nguoi muon sach: '));
    var idMS = parseInt(readlineSync.question('nhap id sach  muon muon: '));
  }while(!NM(idNM)||!MS(idMS));
  var n = nguoiMuon(idNM);
  var s = muonSach1(idMS);
  var id = ++idMuon;
  var ngayMuon = date();
  var them = {
    id : id,
    idNM : idNM,
    idMS : idMS,
    tenNM : n.ten,
    tenMS : s.ten,
    giaSach : s.giaSach,
    ngayMuon : ngayMuon
  }
  muon.push(them);
  var ghi = JSON.stringify(muon);
  fs.writeFileSync('./ngaymuon.json',ghi);
  console.log('muon sach thanh cong');
}
function dsMuon(){
  console.log('danh sach nguoi nguoi muon sach');
  for(var i of muon){
    console.log('id ',i.id,' idNM ',i.idNM,' idMS ', i.idMS,' tenNM ', i.tenNM,' tenSach ',i.tenMS,' giaSach ',i.giaSach,' ngayMuon ',i.ngayMuon );
  }
}
function Menu(){
  console.log('1.dang ky nguoi dung: ');
  console.log('2.them sach: ');
  console.log('3.hien thi nguoi dung: ');
  console.log('4.hien thi sach: ');
  console.log('5.muon sach: ');
  console.log('6.tra sach: ');
  console.log('7.hien thi danh sach muon: ');
  console.log('0.thoat ')
  var lc = readlineSync.question('> ');
  switch(lc){
    case '1':{
      dangKy();
      Menu();
      break;
    }
    case '2':{
      themSach();
      Menu();
      break;
    }
    case '3':{
      htNguoi();
      Menu();
      break;
    }
    case '4':{
      htSach();
      Menu();
      break;
    }
    case '5':{
      muonSach();
      Menu();
      break;
    }
    case '6':{
      Menu();
      break;
    }
    case '7':{
      dsMuon();
      Menu();
      break;
    }
    case '0':{
      break;
    }
    default:
      console.log('nhap sai nhap lai')
  }
}
function main(){
  loadSach();
  loadNguoi();
  loadMuon();
  Menu();
}
main();



