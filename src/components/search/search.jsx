import { Input } from "antd";

const Search = ({ query, onChange }) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div>
      <Input placeholder="Поиск" value={query} onChange={handleChange} />
    </div>
  );
};

export default Search;
