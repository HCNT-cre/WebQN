import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DanhSachHoso from "../../assets/img/DanhSachHoSo.png";
import TimKiemToanVan  from "../../assets/img/TimKiemToanVan.png";
import PhanQuyenHeThong  from "../../assets/img/PhanQuyenHeThong.png";
import DenHanNopLuu from "../../assets/img/HoSoDenHanNopLuu.png"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const data = {
    labels: ['Kho lưu trữ cơ quan', 'Đến hạn nộp lưu cơ quan', 'Nộp lưu cơ quan bị trả về', 'Kho lưu trữ lịch sử', 'Đến hạn nộp lưu lịch sử', 'Nộp lưu lịch sử bị trả về'],
  datasets: [
    {
      label: 'Số lượng hồ sơ',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'RGBA( 255, 0, 0, 0.6)',
        'rgba(255,255,0,0.5)',
        'RGBA( 255, 140, 0, 0.5 )',
        'rgba(0, 0, 255, 0.5)',
        'rgba(0, 255, 0, 0.5)',
        'rgba(128, 0, 128, 0.5)',
      ],
      borderColor: [
        'RGBA( 255, 0, 0, 0.8)',
        'rgba(255,255,0,0.8)',
        'RGBA( 255, 140, 0, 0.8 )',
        'rgba(0, 0, 255, 0.8)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(128, 0, 128, 0.8)',
      ],
      hoverBackgroundColor : [
        'RGBA( 255, 0, 0, 1)',
        'rgba(255,255,0,1)',
        'RGBA( 255, 69, 0, 1 )',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(128, 0, 128, 1)'
        
      ],
      borderWidth: 1.5,
    },
  ],
  
  };
  
  

  return (
    <div className="flex">
      <div className="w-2/4 border-[2px] border-yellow-400 bg-gray-200 ml-[1em] mr-[1em] h-[600px] rounded-[8px]">
        <div className="flex items-center mt-[10px]">
          <h1 className="text-[20px] text-blue-500  font-bold ml-[10px] mr-2">
            Hồ sơ
          </h1>
          <hr className="border-blue-500 border-[1px] h-0 w-[85%] " />
        </div>
        <div className="container">
          <Link
            to="/ho-so/ho-so-den-han-nop-luu"
            className="box hover:bg-blue-200"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Hồ Sơ cần nộp lưu cơ quan"
                src={DenHanNopLuu}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Hồ sơ cần nộp lưu</h3>
            </div>
          </Link>
          <Link
            to="/luu-tru-co-quan/kho-luu-tru-co-quan"
            className="box hover:bg-blue-200 "
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Kho lưu trữ cơ quan"
                src={DanhSachHoso}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Kho lưu trữ cơ quan</h3>
            </div>
          </Link>
        </div>

        <div className="container">
          
          <Link
            to="/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su"
            className="box hover:bg-blue-200 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Hồ sơ đến hạn nộp lưu lịch sử"
                src={DenHanNopLuu}
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
          <hr className="border-blue-500 border-[1px] h-0 w-[69%] " />
        </div>
        <div className="container">
        <Link to="/tra-cuu-va-tim-kiem" className="box hover:bg-blue-200">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={TimKiemToanVan}
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
                src={PhanQuyenHeThong}
              />
            </div>
            <div className="text font-bold">
              <h3>Phân quyền hệ thống</h3>
            </div>
          </Link>
         
        </div>
      </div>
      <div className="w-2/4  border-[2px] border-yellow-400 mr-[1em] h-[600px] rounded-[8px] flex justify-top items-center flex-col bg-gray-200">
        <div className="text-[23px] font-bold text-center mt-[10px] text-blue-500">Thống kê</div>
        <div className="w-[550px] h-[550px] ">
        <Pie data={data} />
        </div>

      </div>
    </div>
  );
};

export default Home;
