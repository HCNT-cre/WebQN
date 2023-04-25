import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DanhSachHoso from "../../assets/img/DanhSachHoSo.png";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-3/4 border-[2px] border-yellow-400 bg-gray-200 ml-[1em] mr-[1em] h-[600px] rounded-[8px]">
        <div className="flex items-center mt-[10px]">
          <h1 className="text-[20px] text-blue-500  font-bold ml-[10px] mr-2">
            Hồ sơ
          </h1>
          <hr className="border-blue-500 border-[1px] h-0 w-[90%] " />
        </div>
        <div className="container">
          <Link to="/ho-so/tao-ho-so-dien-tu" className="box hover:bg-blue-200">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>Danh sách hồ sơ</h3>
            </div>
          </Link>
          <Link
            to="/ho-so/ho-so-den-han-nop-luu"
            className="box hover:bg-blue-200"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Hồ sơ cần nộp lưu</h3>
            </div>
          </Link>
          <Link to="/ho-so/ho-so-bi-tra-ve" className="box hover:bg-blue-200">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Hồ sơ bị trả về</h3>
            </div>
          </Link>
        </div>

        <div className="container">
          <Link
            to="/luu-tru-co-quan/kho-luu-tru-co-quan"
            className="box hover:bg-blue-200 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Kho lưu trữ cơ quan</h3>
            </div>
          </Link>
          <Link
            to="/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su"
            className="box hover:bg-blue-200 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTLS] Hồ sơ cần nộp lưu</h3>
            </div>
          </Link>
          <Link
            to="/luu-tru-lich-su/kho-luu-tru-lich-su"
            className="box hover:bg-blue-200 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTLS] Kho lưu trữ lịch sử</h3>
            </div>
          </Link>
        </div>
        <div className="flex items-center mt-[15px]">
          <h1 className="text-[20px] text-blue-500  font-bold ml-[10px] mr-2">
            Dịch vụ hệ thống
          </h1>
          <hr className="border-blue-500 border-[1px] h-0 w-[79%] " />
        </div>
        <div className="container">
        <Link to="/tra-cuu-va-tim-kiem" className="box hover:bg-blue-200">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>Tìm kiếm toàn văn</h3>
            </div>
          </Link>
          <Link to="/quan-ly-he-thong/phan-quyen-he-thong" className="box hover:bg-blue-200">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>Phân quyền hệ thống</h3>
            </div>
          </Link>
          <div className="box hover:bg-blue-200">
          <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>Hỗ trợ kĩ thuật</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4  border-[2px] border-yellow-400 mr-[1em] h-[600px] rounded-[8px]">
        <div className="text-[23px] font-bold text-center mt-[10px] text-blue-500">Thống kê</div>
      </div>
    </div>
  );
};

export default Home;
