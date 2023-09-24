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
      if (file.state.props.children !== "Lưu trữ cơ quan") continue;
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
