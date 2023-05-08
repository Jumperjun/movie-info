import React from "react";
import { Pagination } from "antd";
import "./paginator.css";
import { PopularMovieContext } from "../contexts/popularMovies";
import { useContext } from "react";

export default function Paginator() {
  const { totalPage, setCurrentPage, searchActive, searchTotalPage,currentPage } =
    useContext(PopularMovieContext);

  // 處理頁碼變更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      <Pagination
        total={
          searchActive ? searchTotalPage : totalPage <= 500 ? totalPage : 500
        }
        pageSize={1}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={true}
      />
    </div>
  );
}
