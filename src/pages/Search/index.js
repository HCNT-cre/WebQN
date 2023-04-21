import React, { useRef, useState } from "react";
import { Input, Spin } from "antd";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { OpenFile } from "../../actions/formFile";
const API_SEARCH = process.env.REACT_APP_API_SEARCH;

const Searchbar = () => {
  const refInput = useRef();
  const [searching, setSearching] = useState(false);
  const [completeGetAPI, setCompleteGetAPI] = useState(false);
  const [searchedFile, setSearchedFile] = useState([]);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const query = e.target.value;

    const fetchData = () => {
      setSearching(true);

      setTimeout(async () => {
        const response = await axios.post(API_SEARCH, {
          query: query,
        });
        setCompleteGetAPI(true);
        setSearching(false);
        setTimeout(() => {
          setSearchedFile(response.data.items);
        }, 320);
      }, 2000);
    };

    if (e.key === "Enter" || e.type === "click") {
      fetchData();
    }
  };

  const viewFile = (id) => {
    dispatch(OpenFile("watch_file", parseInt(id)));
  };

  console.log(searchedFile);
  return (
    <div className="bg-white h-[80vh] relative">
      <div
        className={`w-full flex justify-center flex-col items-center absolute transition-all top-[150px] duration-300 ${
          completeGetAPI === true ? "search-bar-after-search" : ""
        }`}
      >
        <h1 className="text-[25px] font-bold pb-[20px] duration-300 transition-all">
          Tìm kiếm văn bản theo nội dung
        </h1>
        <div className="input-wrapper mb-[20px] duration-300 transition-all">
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
            ref={refInput}
            placeholder="Nhập nội dung cần tìm kiếm..."
            onKeyDown={handleSearch}
            disabled={searching}
          />
        </div>
      </div>
      <div>
        <div className="pt-[120px] px-[10%]">
          {searchedFile.length > 0 &&
            searchedFile.map((file, index) => {
              return (
                <div className="border-[2px] border-solid p-[8px] rounded-[5px]  mb-[16px]">
                  <div className="flex justify-left items-center text-[20px]">
                    <span
                      onClick={() => viewFile(file.gov_file_id)}
                      className="cursor-pointer text-[rgba(0,0,0,.45)]"
                    >
                      {file.doc_code}
                    </span>
                    &nbsp;/ &nbsp;
                    <span>{file.doc_name}</span>
                  </div>
                  <div className="font-bold">
                    Nội dung văn bản tìm kiếm được
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
