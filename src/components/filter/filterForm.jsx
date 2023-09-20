import "./filterForm.css";

const FilterForm = ({ dataForm, onChangeForm }) => {
  console.log("FilterForm", dataForm);
  return (
    <form onChange={onChangeForm}>
      <div className="type">
        <label>Тип ПК</label>
        <select name="type">
          <option>Value 1</option>
          <option>Value 2</option>
        </select>
      </div>
      <div className="tags">
        <label>Теги</label>
        <select name="tags">
          <option>Value 1</option>
          <option>Value 2</option>
        </select>
      </div>
    </form>
  );
};

export default FilterForm;
