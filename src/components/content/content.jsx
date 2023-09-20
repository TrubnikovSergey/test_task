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
  const result = { page: 1 };
  if (searchParams.size > 0) {
    if (searchParams.has("query")) {
      result.query = searchParams.get("query");
    }
    if (searchParams.has("page")) {
      result.page = Number(searchParams.get("page"));
    }
    if (searchParams.has("tags")) {
      result.tags = searchParams.get("tags");
    }
    if (searchParams.has("type")) {
      result.type = searchParams.get("type");
    }
  }

  return result;
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
        const { query, page, type, tags } = paramsRef.current;

        if (query) {
          const reg = new RegExp(`${query}`, "ig");

          newGoods = value.goods.filter((item) => item.title.search(reg) >= 0);
        }
        if (type) {
          newGoods = newGoods.filter((item) => item.type === type);
        }
        if (tags) {
          newGoods = newGoods.filter((item) => item.tags.includes(tags));
        }
        if (page) {
          const calcPage = Math.ceil(newGoods.length / sizePage);
          const minPage = Math.min(calcPage, page);

          totalCountGoodsRef.current = newGoods.length;
          newGoods = newGoods.filter((item, idx) => idx >= (minPage - 1) * sizePage && idx < minPage * sizePage);

          if (minPage > 0) {
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

  const handleChangeFilter = (data) => {
    if (data.tags) {
      paramsRef.current = { ...paramsRef.current, tags: data.tags };
    }
    if (data.type) {
      paramsRef.current = { ...paramsRef.current, type: data.type };
    }
    setSearchParams(paramsRef.current);
  };
  const handleResetFilter = () => {
    delete paramsRef.current.tags;
    delete paramsRef.current.type;

    paramsRef.current = { ...paramsRef.current };

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
        <Filter value={{ type, tags }} onChangeFilter={handleChangeFilter} onResetFilter={handleResetFilter} />
      </div>
      {goods.length > 0 && <TableComponent rows={goods} />}
      <PaginationComponent currentPage={page || 1} total={totalCountGoodsRef.current} onChange={handleChangePaginate} />
    </div>
  );
};

export default Content;
