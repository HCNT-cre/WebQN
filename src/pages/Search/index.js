import React, { useState } from "react";
import { Input, Spin } from "antd";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";

const Searchbar = () => {
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searching) return;
      setSearching(true);
    }
    setTimeout(() => {
      setSearching(false);
    }, 3000);
  };

  return (
    <div
      className="bg-white h-[600px]"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-[25px] font-bold pb-[20px]">
        Tìm kiếm văn bản theo nội dung
      </h1>
      <div className="input-wrapper mb-[150px]">
        {searching ? (
          <Spin />
        ) : (
          <FaSearch
            className="w-[21px] h-[25.2px] "
            id="search-icon"
            onClick={handleSearch}
          />
        )}
        <input
          placeholder="Nhập nội dung cần tìm kiếm..."
          onKeyDown={handleSearch}
          disabled={searching}
        />
      </div>
    </div>
  );
};

export default Searchbar;
