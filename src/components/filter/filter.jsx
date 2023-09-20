import { Button, Popconfirm } from "antd";
import { useState } from "react";
import FilterForm from "./filterForm";

const Filter = ({ initFilter = { type: "", tags: [] } }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState({ type: "", tags: [] });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setDataFilter((prev) => ({ ...prev, [name]: name === "tags" ? [value] : value }));
  };

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setDataFilter(initFilter);
  };

  return (
    <Popconfirm
      description={<FilterForm dataForm={dataFilter} onChangeForm={handleChangeForm} />}
      icon=""
      cancelText="Сбросить"
      okText="Применить"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        Filter
      </Button>
    </Popconfirm>
  );
};

export default Filter;
