import { useState } from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';



const EditFile = ({ stateFormEditFile, setStateFormEditFile }) => {
    // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // pdf file onChange state
    const [pdfFile, setPdfFile] = useState(null);
    // pdf file error state
    const [pdfError, setPdfError] = useState('');
    const allowedFiles = ['application/pdf'];

    const [docNo, setDocNo] = useState('')
    const [docDate, setDocDate] = useState('')
    const [docSigner, setDocSigner] = useState('')

    const handleSubmit = () => {

    }
    const handleFile = async (e) => {
        let selectedFile = e.target.files[0];
        // console.log(selectedFile.type);
        if (selectedFile) {
            console.log("uploaded file:", selectedFile);
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
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
                                        <div className='flex'>
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
                                    <div className='w-[50%] pl-[12px]'>
                                        <div className='text-[20px] font-bold'>Kết quả OCR</div>
                                        <div className='mt-[10px]'>
                                            <p className='text-[18px] font-[500]'>Số công văn: <span className='font-normal'>{docNo}</span></p>
                                            <p className='text-[18px] font-[500]'>Thời gian ban hành: <span className='font-normal'>{docDate}</span></p>
                                            <p className='text-[18px] font-[500]'>Người ký: <span className='font-normal'>{docSigner}</span></p>
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