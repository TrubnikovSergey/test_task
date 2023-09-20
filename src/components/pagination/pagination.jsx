import { Pagination } from "antd";
import "./pagination.css";

const PaginationComponent = ({ currentPage, total, onChange }) => {
  return (
    <div className="pagination-wrapper">
      <Pagination defaultCurrent={1} current={currentPage} total={total} onChange={onChange} />
    </div>
  );
};

export default PaginationComponent;
