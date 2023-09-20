import { useState } from "react";
import Filter from "../filter/filter";
import PaginationComponent from "../pagination/pagination";
import Search from "../search/search";
import TableComponent from "../table/table";
import "./content.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

function initParamsRef(searchParams) {
  if (searchParams.size > 0)
    return {
      query: searchParams.get("query") || "",
      page: Number(searchParams.get("page")) || 1,
    };
  else return {};
}

const Content = () => {
  const [goods, setGoods] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let totalCountGoodsRef = useRef(0);
  const sizePage = 10;
  const paramsRef = useRef(initParamsRef(searchParams));
  const { page, query, tags, type } = paramsRef.current;

  useEffect(() => {
    fetch("https://mocki.io/v1/a290dd31-2574-426c-9c05-c36fa935fc7b")
      .then((respons) => respons.json())
      .then((value) => {
        totalCountGoodsRef.current = value.goods.length;
        setGoods(value.goods);
      });
  }, []);

  useEffect(() => {
    fetch("https://mocki.io/v1/a290dd31-2574-426c-9c05-c36fa935fc7b")
      .then((respons) => respons.json())
      .then((value) => {
        let newGoods = value.goods;
        const { query, page } = paramsRef.current;

        if (query) {
          const reg = new RegExp(`${query}`, "ig");
          console.dir(reg);
          newGoods = value.goods.filter((item) => item.title.search(reg) >= 0);
        }
        if (page) {
          const calcPage = Math.ceil(newGoods.length / sizePage);
          const minPage = Math.min(calcPage, page);

          totalCountGoodsRef.current = newGoods.length;
          newGoods = newGoods.filter((item, idx) => idx >= (minPage - 1) * sizePage && idx < minPage * sizePage);

          if (calcPage < page) {
            paramsRef.current.page = minPage;
            setSearchParams(paramsRef.current);
          }
        }

        setGoods(newGoods);
      });
  }, [paramsRef.current]);

  const handleChangePaginate = (numPage) => {
    paramsRef.current = { ...paramsRef.current, page: numPage };
    setSearchParams(paramsRef.current);
  };

  const handleChangeSearch = (query) => {
    paramsRef.current = { ...paramsRef.current, query: query };
    if (!query) {
      delete paramsRef.current.query;
      paramsRef.current = { ...paramsRef.current };
    }

    setSearchParams(paramsRef.current);
  };

  return (
    <div className="content-wrapper">
      <div className="toolbar">
        <Search query={query || ""} onChange={handleChangeSearch} />
        <Filter />
      </div>
      {goods.length > 0 && <TableComponent rows={goods} />}
      <PaginationComponent currentPage={page || 1} total={totalCountGoodsRef.current} onChange={handleChangePaginate} />
    </div>
  );
};

export default Content;
