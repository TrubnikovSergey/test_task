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
        const setType = new Set();
        const setTags = new Set();

        data.goods.forEach((item) => {
          setType.add(item.type);

          item.tags.forEach((item) => {
            setTags.add(item);
          });
        });

        setTypeList(Array.from(setType).sort());
        setTagsList(Array.from(setTags).sort());
      });
  }, []);

  const handleChangeSelect = () => {};

  return (
    tagsList.length > 0 &&
    typeList.length > 0 && (
      <form onChange={onChangeForm}>
        <div className="type">
          <label>Тип ПК</label>
          <select name="type" value={isType ? type : ""} onChange={handleChangeSelect}>
            <option value="" disabled>
              Выбрать
            </option>
            {typeList.map((item, idx) => (
              <option key={`${item}_${idx}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="tags">
          <label>Теги</label>
          <select name="tags" value={isTags ? tags : ""} onChange={handleChangeSelect}>
            <option value="" disabled>
              Выбрать
            </option>
            {tagsList.map((item, idx) => (
              <option key={`${item}_${idx}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
    )
  );
};

export default FilterForm;
