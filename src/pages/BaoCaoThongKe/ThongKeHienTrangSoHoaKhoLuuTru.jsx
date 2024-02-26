import React, { useState, useEffect } from "react";
import "./style.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axiosHttpService from "src/utils/httpService";

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;

ChartJS.register(ArcElement, Tooltip, Legend);

const ThongKeHienTrangSoHoaKhoLuuTru = () => {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        axiosHttpService
            .get(API_GOV_FILE_GET_ALL)
            .then((response) => {
                setFileData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label;
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        layout: {
            padding: {
                left: 50, // Thêm padding bên trái để dịch biểu đồ sang phải
            },
        },
    };

    const countByStatus = {
        '1': 0, //Hồ sơ mở
        '2': 0, //Hồ sơ đóng
        '4': 0, //Kho lưu trữ cơ quan
        '7': 0, //Nộp lưu cơ quan bị trả về
        '6': 0, //Kho lưu trữ lịch sử
        '8': 0, //Nộp lưu lịch sử bị trả về
    };

    if (fileData) {
        fileData.forEach((file) => {
            const status = file.state;
            if (countByStatus[status]) {
                countByStatus[status]++;
            } else {
                countByStatus[status] = 1;
            }
        });
    }

    const data = {
        labels: [
            "Hồ sơ mở",
            "Hồ sơ đóng",
            "Kho lưu trữ cơ quan",
            "Nộp lưu cơ quan bị trả về",
            "Kho lưu trữ lịch sử",
            "Nộp lưu lịch sử bị trả về",
        ],
        datasets: [
            {
                label: "Số lượng hồ sơ",
                data: [
                    countByStatus['1'] || 0,
                    countByStatus['2'] || 0,
                    countByStatus['4'] || 0,
                    countByStatus['7'] || 0,
                    countByStatus['6'] || 0,
                    countByStatus['8'] || 0,
                ],
                backgroundColor: [
                    "rgba(0, 0, 255, 0.5)", //mở
                    "RGBA( 255, 0, 0, 0.6)", //đóng
                    "rgba(255,255,0,0.5)",
                    "rgba(0, 255, 0, 0.5)",
                    "RGBA( 255, 140, 0, 0.5 )",
                    "rgba(128, 0, 128, 0.5)",
                ],
                borderColor: [
                    "rgba(0, 0, 255, 0.8)",
                    "RGBA( 255, 0, 0, 0.8)",
                    "rgba(255,255,0,0.8)",
                    "rgba(0, 255, 0, 0.8)",
                    "RGBA( 255, 140, 0, 0.8 )",
                    "rgba(128, 0, 128, 0.8)",
                ],
                hoverBackgroundColor: [
                    "rgba(0, 0, 255, 1)",
                    "RGBA( 255, 0, 0, 1)",
                    "rgba(255,255,0,1)",
                    "rgba(0, 255, 0, 1)",
                    "RGBA( 255, 69, 0, 1 )",
                    "rgba(128, 0, 128, 1)",
                ],
                borderWidth: 1.5,
            },
        ],
    };
    const Print = () => {
        window.print();
    }
    
    return (
        <div className="flex">
            <div className="w-full  ml-[1em] mr-[1em] h-[600px] flex justify-top items-center flex-col ">
                <div className="text-[23px] font-bold text-center mt-[5px] text-blue-500">
                    Thống kê hiện trạng số hoá kho lưu trữ
                </div>
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="w-[45%]">
                            <Pie data={data} options={options} />
                        </div>
                        <div className="statistics-container">
                            <ul className="statistics-list">
                                <li> Hồ sơ mở: {countByStatus['1'] || 0}</li>
                                <li>Hồ sơ đóng: {countByStatus['2'] || 0}</li>
                                <li>Kho lưu trữ cơ quan: {countByStatus['4'] || 0}</li>
                                <li>Nộp lưu cơ quan bị trả về: {countByStatus['7'] || 0}</li>
                                <li>Kho lưu trữ lịch sử: {countByStatus['6'] || 0}</li>
                                <li>Nộp lưu lịch sử bị trả về: {countByStatus['8'] || 0}</li>
                            </ul>
                            <button className="print-button" onClick={Print}>In thống kê</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongKeHienTrangSoHoaKhoLuuTru;
