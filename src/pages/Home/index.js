import React from "react";
import {
  FaRegAddressBook,
  FaRegEnvelope,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-3/4 border-[2px] border-blue-600 ml-[1em] mr-[1em] h-[600px] rounded-[8px]">
        <div className="flex items-center mt-[10px]">
          <h1 className="text-[20px] text-blue-600  font-bold ml-[10px] mr-2">
            Hồ sơ
          </h1>
          <hr className="border-blue-600 border-[1px] h-0 w-[90%] " />
        </div>
        <div className="container">
          <Link to="/ho-so/tao-ho-so-dien-tu" className="box">
            <div className="icon">
              <FaRegAddressBook />
            </div>
            <div className="text">
              <h3>Danh sách hồ sơ</h3>
            </div>
          </Link>
          <Link to="/ho-so/ho-so-den-han-nop-luu" className="box">
            <div className="icon">
              <FaRegEnvelope />
            </div>
            <div className="text">
              <h3>Hồ sơ đến hạn nộp lưu cơ quan</h3>
            </div>
          </Link>
          <Link to="/ho-so/ho-so-bi-tra-ve" className="box">
            <div className="icon">
              <FaRegCalendarAlt />
            </div>
            <div className="text">
              <h3>Hồ sơ nộp lưu cơ quan bị trả về</h3>
            </div>
          </Link>
          
        </div>
        <div className="container">
          <Link to="/ho-so/tao-ho-so-dien-tu" className="box mt-[20px]">
            <div className="icon">
              <FaRegAddressBook />
            </div>
            <div className="text">
              <h3>Danh sách hồ sơ</h3>
            </div>
          </Link>
          <Link to="/ho-so/ho-so-den-han-nop-luu" className="box mt-[20px]">
            <div className="icon">
              <FaRegEnvelope />
            </div>
            <div className="text">
              <h3>Hồ sơ đến hạn nộp lưu cơ quan</h3>
            </div>
          </Link>
          <Link to="/ho-so/ho-so-bi-tra-ve" className="box mt-[20px]">
            <div className="icon">
              <FaRegCalendarAlt />
            </div>
            <div className="text">
              <h3>Hồ sơ nộp lưu cơ quan bị trả về</h3>
            </div>
          </Link>
          
        </div>
        <div className="flex items-center mt-[15px]">
          <h1 className="text-[20px] text-blue-600  font-bold ml-[10px] mr-2">
            Dịch vụ hệ thống
          </h1>
          <hr className="border-blue-600 border-[1px] h-0 w-[79%] " />
        </div>
        <div className="container">
          <Link to="/tra-cuu-va-tim-kiem" className="box">
            <div className="icon">
              <FaRegAddressBook />
            </div>
            <div className="text">
              <h3>Tìm kiếm toàn văn</h3>
            </div>
          </Link>
          <Link to="/quan-ly-he-thong/phan-quyen-he-thong" className="box">
            <div className="icon">
              <FaRegEnvelope />
            </div>
            <div className="text">
              <h3>Phân quyền hệ thống</h3>
            </div>
          </Link>
          <Link to="/quan-ly-he-thong/nguoi-dung" className="box">
            <div className="icon">
              <FaRegCalendarAlt />
            </div>
            <div className="text">
              <h3>Quản lý người dùng</h3>
            </div>
          </Link>
          
        </div>
      </div>
      <div className="w-1/4  border-[2px] border-blue-600 mr-[1em] h-[600px] rounded-[8px]">
        <div className="text-2xl font-bold">Thống kê</div>
        <h1>Tổng số hồ sơ</h1>
        <h1>Tổng số văn bản</h1>
      </div>
    </div>
  );
};

export default Home;
