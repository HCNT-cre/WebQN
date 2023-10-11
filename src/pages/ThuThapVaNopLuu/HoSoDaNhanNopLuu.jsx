import { ENUM_STATE } from "src/storage/Storage";
import BasePage from "../BasePage";

const HoSoDaNhanNopLuu = () => {
  const parent = [
    {
      title: "Thu thập và nộp lưu",
      link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
    },
  ];

  const current = {
    link: "/thu-thap-va-nop-luu/ho-so-da-nhan-nop-luu",
    title: "Hồ sơ đã nhận nộp lưu",
  };

  const filter = (files) => {
    const newFiles = [];
    for (const file of files) {
      if (file.state.props.children === ENUM_STATE.LUU_TRU_CO_QUAN)
        newFiles.push(file);
    }
    return newFiles;
  };

  return (
    <BasePage
      parent={parent}
      current={current}
      addNewFile={true}
      filter={filter}
      eOffice={false}
    />
  );
};

export default HoSoDaNhanNopLuu;
