/* eslint-disable react-hooks/exhaustive-deps */
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
import {
  INCOMING_DOC,
  OUTCOMING_DOC,
  MARKED_DOC,
} from "../../../storage/Eoffice";
import { useSelector } from "react-redux";
import { GetDataFromIDFile } from "../../../custom/Function";
import axiosHttpService from "src/utils/httpService";
import { Table } from "../../../custom/Components";
import { FaSearch } from "react-icons/fa";
import "./EOFFICEstyle.css";
import { useEffect } from "react";
import DocumentAPIService from "src/service/api/DocumentAPIService";
import Attachment from "./Attachment";

const TABLE_FIELDS = [
  { title: "Cơ quan ban hành", width: "100%", key: 'coQuanBanHanh' },
  { title: "Số ký hiệu", width: "100%", key: 'soKihieu' },
  { title: "Trích yếu", width: "200%", key: 'trichYeu' },
];


const EOFFICE = ({
  setStateEoffice,
  stateEoffice,
}) => {
  const [stateCheckBox, setStateCheckBox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [idAttachment, setIdAttachment] = useState(null);
  const [stateAttachment, setStateAttachment] = useState(false);


  const handleClickDocument = (id) => {
    setIdAttachment(id);
    setStateAttachment(true);
  }
  useEffect(() => {
    const getDoc = async () => {
      if (!stateEoffice) return;
      setIsLoading(true);
      const docs = await DocumentAPIService.getEofficeDoc();
      setDataTable(docs.map((doc) => {
        return {
          id: doc.id,
          coQuanBanHanh: <p className="cursor-pointer" onClick={() => handleClickDocument(doc.id)}>{doc.coQuanBanHanh}</p>,
          soKihieu: doc.soKihieu,
          trichYeu: doc.trichYeu,
        }
      }));
      setIsLoading(false);
    }
    getDoc();
  }, [stateEoffice])

  return (
    <>
      {stateEoffice && (
        <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
          <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
            <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
              <div className="relative">
                <button
                  onClick={() => setStateEoffice(false)}
                  className="text-[20px] absolute right-0 w-[40px] h-full bg-gray-500 top-0 text-white font-medium "
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="w-full h-full  py-[24px] bg-[#f0f2f5]">
                <div className="flex h-full">

                  <div className="ml-[24px] h-full w-[100%]">
                    <div className="pt-[12px] mx-[24px] flex justify-between">
                      <div className="flex">
                        <div className="input-wrapper">
                          <FaSearch id="search-icon" />
                          <input
                            placeholder="Tìm kiếm ..."
                          />
                        </div>
                      </div>

                    </div>
                    <div className="mt-[16px]">
                      <h2 className="text-[20px] pl-[24px] font-medium">
                        Văn bản, Tài liệu
                      </h2>
                      <Table
                        isLoading={isLoading}
                        setStateCheckBox={setStateCheckBox}
                        fieldNames={TABLE_FIELDS}
                        fieldDatas={dataTable}
                        isCheckBox={true}
                        headerBgColor="#ccc"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Attachment
        id={idAttachment}
        state={stateAttachment}
        setState={setStateAttachment}
      />
    </>
  );
};
export default EOFFICE;
