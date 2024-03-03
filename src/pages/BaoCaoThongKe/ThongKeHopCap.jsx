import React, { useState, useEffect } from "react";
import "./style.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axiosHttpService from "src/utils/httpService";

const API_GET_ALL_DRAWER = import.meta.env.VITE_API_STORAGE_GET_DRAWERS_ALL;
const API_GET_ALL_SHELF = import.meta.env.VITE_API_STORAGE_GET_SHELF_ALL;
const API_GET_ALL_WAREHOUSE = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE_ALL;
const API_GET_ALL_WAREHOUSEROOM = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSEROOM_ALL;

ChartJS.register(ArcElement, Tooltip, Legend);

const ThongKeHopCap = () => {
    const [drawer, setCountDrawer] = useState(0);
    const [shelf, setCountShelf] = useState(0);
    const [wareHouse, setCountWareHouse] = useState(0);
    const [wareHouseRoom, setCountWareHouseRoom] = useState(0);


    useEffect(() => {
        axiosHttpService
            .get(API_GET_ALL_DRAWER)
            .then((response) => {
                setCountDrawer(response.data.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axiosHttpService
            .get(API_GET_ALL_SHELF)
            .then((response) => {
                setCountShelf(response.data.length);
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );
    }, []);

    useEffect(() => {
        axiosHttpService
            .get(API_GET_ALL_WAREHOUSE)
            .then((response) => {
                setCountWareHouse(response.data.length);
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );
    }, []);

    useEffect(() => {
        axiosHttpService
            .get(API_GET_ALL_WAREHOUSEROOM)
            .then((response) => {
                setCountWareHouseRoom(response.data.length);
            }
            )
            .catch((error) => {
                console.error(error);
            }
            );
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




    const data = {
        labels: [
            "Hộp",
            "Kệ",
            "Phòng kho",
            "Kho",
        ],
        datasets: [
            {
                label: "Số lượng",
                data: [
                    drawer || 0,
                    shelf || 0,
                    wareHouseRoom || 0,
                    wareHouse || 0,
                ],
                backgroundColor: [
                    "rgba(0, 0, 255, 0.5)", //mở
                    "RGBA( 255, 0, 0, 0.6)", //đóng
                    "rgba(255,255,0,0.5)",
                    "rgba(0, 255, 0, 0.5)",
                ],
                borderColor: [
                    "rgba(0, 0, 255, 0.8)",
                    "RGBA( 255, 0, 0, 0.8)",
                    "rgba(255,255,0,0.8)",
                    "rgba(0, 255, 0, 0.8)",
                ],
                hoverBackgroundColor: [
                    "rgba(0, 0, 255, 1)",
                    "RGBA( 255, 0, 0, 1)",
                    "rgba(255,255,0,1)",
                    "rgba(0, 255, 0, 1)",
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
                <div className="text-[28px] font-bold text-center mb-[0.5em] mt-[5px] text-blue-500">
                    Thống kê hộp/cặp
                </div>
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="w-[45%]">
                            <Pie data={data} options={options} />
                        </div>
                        <div className="statistics-container">
                            <ul className="statistics-list">
                                <li>Số hộp: {drawer || 0}</li>
                                <li>Số kệ: {shelf || 0}</li>
                                <li>Số phòng kho: {wareHouseRoom || 0}</li>
                                <li>Số kho: {wareHouse || 0}</li>
                            </ul>
                            <button className="print-button" onClick={Print}>In thống kê</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongKeHopCap;