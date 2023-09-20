import { Table } from "antd";

const TableComponent = ({ rows }) => {
  const getColumns = (obj) => {
    const keys = Object.keys(obj);
    const columns = keys
      .filter((key) => key !== "id" && key !== "category")
      .map((key) => {
        const upCaseKey = key[0].toUpperCase() + key.slice(1);
        return { title: upCaseKey, dataIndex: key };
      });

    return columns;
  };

  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const el = rows[i];
    data.push({
      ...el,
      key: el.id,
    });
  }

  return data.length > 0 && <Table pagination={{ position: ["none"] }} columns={getColumns(rows[0])} dataSource={data} />;
};

export default TableComponent;
