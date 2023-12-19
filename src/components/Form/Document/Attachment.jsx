/* eslint-disable react-hooks/exhaustive-deps */
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
import {
  INCOMING_DOC,
  OUTCOMING_DOC,
  MARKED_DOC,
} from "../../../storage/Eoffice";
import AddDoc from "./AddDoc";
import { useSelector } from "react-redux";
import { GetDataFromIDFile } from "../../../custom/Function";
import axiosHttpService from "src/utils/httpService";
import { Table } from "../../../custom/Components";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FaSearch } from "react-icons/fa";
import "./EOFFICEstyle.css";
import { useEffect } from "react";
import DocumentAPIService from "src/service/api/DocumentAPIService";

const TABLE_FIELDS = [
  { title: "Tên", width: "100%", key: 'name' },
  { title: "Thông tin", width: "200%", key: 'info' },
  { title: "Ngày tạo", width: "100%", key: 'createDate' },
];

const Attachment = ({
  id,
  state,
  setState,
}) => {
  const [docs, setDocs] = useState([]);
  const [stateAddDoc, setStateAddDoc] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);
  const userPermissionId = useSelector((state) => state.user.permission_id);
  const [govFileIdOfDoc, setGovFileIdOfDoc] = useState(null);
  const [stateCheckBox, setStateCheckBox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);



  const fetchDoc = async () => {
    const _docs = [];
    for (const doc of docs) {
      for (const cb of stateCheckBox) {
        const idOfCb = parseInt(
          cb.substring(cb.indexOf("checkbox") + "checkbox".length)
        );
        if (doc.id === idOfCb) {
          await axiosHttpService.get(doc.link, {
            responseType: "blob",
          })
            .then((res) => {
              const uploadedFile = res.data;
              uploadedFile.name = doc.doc_name;
              _docs.push(uploadedFile);
            });
        }
      }
    }
    setFileUploaded(_docs);
    setStateAddDoc(true);
  };

  const fetchFile = async () => {
    const data = await GetDataFromIDFile(govFileIdOfDoc, userPermissionId);
    setFileData(data);
  };

  const handleAddFile = () => {
    setIsLoading(true);
    fetchFile();
    fetchDoc();
    setIsLoading(false);
  };

  useEffect(() => {
    const getDoc = async () => {
      if (!state) return;
      const docs = await DocumentAPIService.getEofficeAttachmentByDocId(id);

      setDataTable(docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.name,
          info: doc.info[0],
          createDate: doc.createDate,
        }
      }))
    }
    getDoc();
  }, [state])

  return (
    <>
      {state && (
        <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
          <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
            <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
              <div className="relative">
                <button
                  onClick={() => setState(false)}
                  className="text-[20px] absolute right-0 w-[40px] h-full bg-gray-500 top-0 text-white font-medium "
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="bg-gray-500 text-white font-bold py-[8px] px-[24px]">
                  <p className="text-bold">Thêm văn bản từ EOFFICE</p>
                </div>
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
                      <div className="w-[12.5%] text-center px-[5px] flex">
                        <button
                          onClick={handleAddFile}
                          className="rounded-[5px] h-[30px] flex justify-center w-full px-[16px] items-center text-[12px] font-medium text-white bg-black"
                        >
                          Thêm văn bản
                        </button>
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
      
    </>
  );
};
export default Attachment;
