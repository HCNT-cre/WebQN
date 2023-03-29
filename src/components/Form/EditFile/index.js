import { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';



const EditFile = ({ stateFormEditFile, setStateFormEditFile }) => {
    // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState('');
    const allowedFiles = ['application/pdf'];
    const [docNo, setDocNo] = useState('')
    const [docDate, setDocDate] = useState('')
    const [docSigner, setDocSigner] = useState('')
    const [xmlRawData, setXmlRawData] = useState('')

    const handleFile = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("uploaded file:", selectedFile);
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
                // call API
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('ratio', '20,1');
                formData.append('threshold', '0.7');

                try {
                    setDocNo('đang xử lý...');
                    setDocDate('đang xử lý...');
                    setDocSigner('đang xử lý...');
                    const response = await axios.post('http://157.230.37.228:4444/extract', formData);

                    setDocNo(response.data.no.join(' '));
                    setDocDate(response.data.date.join(' '));
                    setDocSigner(response.data.signer.join(' '));

                    console.log(response.data.no.join(' '));
                } catch (error) {
                    console.error(error);
                }
            }
            else {
                setPdfError('Chỉ hỗ trợ file PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('please select a PDF');
        }
    }

    const handleChangeXML = (ev) => {
        console.log(ev.target.value);
        setXmlRawData(ev.target.value)
    }

    const handleCheck = () => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlRawData, "text/xml");

        if (xmlDoc.getElementsByTagName("no").length === 0) {
            alert("Chưa có số công văn");
            return;
        }
        
        if (xmlDoc.getElementsByTagName("date").length === 0) {
            alert("Chưa có ngày giờ");
            return;
        }

        if (xmlDoc.getElementsByTagName("signer").length === 0) {
            alert("Chưa có người ký");
            return;
        }

        if (
            docNo.trim() ===
            xmlDoc.getElementsByTagName("no")[0].childNodes[0].nodeValue.trim()
        )
            console.log("Số công văn khớp");
        else {
            alert("Số công văn không khớp");
            return;
        }
        if (
            docDate.trim() ===
            xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue.trim()
        )
            console.log("Ngày giờ khớp");
        else {
            alert("Ngày giờ không khớp");
            return;
        }
        if (
            docSigner.trim() ===
            xmlDoc.getElementsByTagName("signer")[0].childNodes[0].nodeValue.trim()
        )
            alert("Các trường thông tin đều khớp");
        else {
            alert("Tên người ký không khớp");
            return;
        }

    }
    return (
        <>
            {stateFormEditFile &&
                <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-10 bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full overflow-hidden w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <button onClick={() => { setStateFormEditFile(false) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-[#2f54eb] top-0 text-white ">x</button>
                                <div className="bg-[#2f54eb] text-white py-[16px] px-[24px]">
                                    <p className='text-bold'>Xem trước tài liệu (PDF)</p>
                                </div>
                                <div className="h-full flex pt-[8px]">
                                    <div className='pl-[12px] w-[50%]'>

                                        <form>
                                            <label className='flex justify-center items-center cursor-pointer w-[100px] h-[30px] bg-[#2930ff] rounded-[5px] text-white hover:opacity-90' htmlFor="file-upload">
                                                <i class="fa-solid fa-upload"></i>
                                                <p className='ml-[8px]'>Tải lên</p>
                                            </label>
                                            <input type='file' id="file-upload" name="file-upload" className="hidden" onChange={handleFile}></input>
                                            {pdfError && <span className='text-danger'>{pdfError}</span>}
                                        </form>
                                        <div className='flex mt-[24px]'>
                                            <div className="w-full h-[800px] overflow-y-auto bg-[#e4e4e4] flex justify-center items-center mt-[10px]">
                                                {pdfFile && (
                                                    <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                        <Viewer className="w-[60%]" fileUrl={pdfFile}
                                                            plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                    </Worker>
                                                )}

                                                {/* render this if we have pdfFile state null   */}
                                                {!pdfFile && <>No file is selected yet</>}

                                            </div>


                                        </div>

                                    </div>
                                    <div className='w-[50%] pl-[12px] mr-[12px] '>
                                        <div>
                                            <p className='text-[32px] font-bold'>Thẩm định</p>
                                        </div>
                                        <div className='mt-[8px]'>
                                            <div className='text-[20px] font-bold'> Kết quả OCR </div>
                                            <div className='mt-[10px] border-solid border-[1px] rounded-[5px] bg-[#fbfbfb]'>
                                                <div className='ml-[12px] py-[12px]'>
                                                    <p className='text-[18px] font-[500]'>Số công văn: <span className='font-normal'>{docNo}</span></p>
                                                    <p className='text-[18px] font-[500]'>Thời gian ban hành: <span className='font-normal'>{docDate}</span></p>
                                                    <p className='text-[18px] font-[500]'>Người ký: <span className='font-normal'>{docSigner}</span></p>
                                                </div>
                                            </div>
                                            <div className='mt-[24px]'>
                                                <p className='text-[20px] font-bold'>Đầu vào XML</p>
                                                <textarea onChange={(ev) => handleChangeXML(ev)} type="text" className='outline-none w-full h-[200px] overflow-auto border-solid border-[2px] rounded-[5px] py-[12px] pl-[12px] text-[16px] text-start'>
                                                </textarea>
                                            </div>
                                            <div className='mt-[24px]'>
                                                <button onClick={handleCheck} className='h-[50px] w-[150px] rounded-[5px] hover:opacity-90 text-white bg-[#2f54eb]'>Thẩm định</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditFile