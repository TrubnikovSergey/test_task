import { useState } from "react";
import "./filterForm.css";
import { useEffect } from "react";
import { useRef } from "react";

const FilterForm = ({ dataForm, onChangeForm }) => {
  const { tags, type } = dataForm;
  const isTags = Boolean(tags);
  const isType = Boolean(type);
  const [tagsList, setTagsList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/a290dd31-2574-426c-9c05-c36fa935fc7b")
      .then((respons) => respons.json())
      .then((data) => {
        console.log("useEffect", data);
      });
  }, []);

  const handleChangeSelect = () => {};

  console.log("tagsList typeList", { tagsList, typeList });
  return (
    <form onChange={onChangeForm}>
      <div className="type">
        <label>Тип ПК</label>
        <select name="type" value={isType ? type : ""} onChange={handleChangeSelect}>
          <option value="" disabled>
            Выбрать
          </option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
        </select>
      </div>
      <div className="tags">
        <label>Теги</label>
        <select name="tags" value={isTags ? tags : ""} onChange={handleChangeSelect}>
          <option value="" disabled>
            Выбрать
          </option>
          <option value="tags1">Tags 1</option>
          <option value="tags2">Tags 2</option>
        </select>
      </div>
    </form>
  );
};

export default FilterForm;
