import { Button, Popconfirm } from "antd";
import { useState } from "react";
import FilterForm from "./filterForm";

const Filter = ({ value = {}, onChangeFilter, onResetFilter }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState(value);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    if (!value) {
      setDataFilter((prev) => delete { ...prev }[name]);
    } else {
      setDataFilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setConfirmLoading(false);

    const respons = {};
    if (dataFilter.tags) {
      respons.tags = dataFilter.tags;
    }
    if (dataFilter.type) {
      respons.type = dataFilter.type;
    }
    onChangeFilter(respons);
  };

  const handleCancel = () => {
    setDataFilter({});
    onResetFilter();
    onChangeFilter({});
  };

  return (
    <Popconfirm
      description={<FilterForm dataForm={dataFilter} onChangeForm={handleChangeForm} />}
      icon=""
      title="Title"
      cancelText="Сбросить"
      okText="Применить"
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary">Filter</Button>
    </Popconfirm>
  );
};

export default Filter;
