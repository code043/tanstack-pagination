"use client";

import { useState } from "react";
import { usePosts } from "./utils/queries";

export default function Home() {
  const limit = 3;
  const [page, setPage] = useState(0);
  const posts = usePosts(limit, page * limit);

  const handlePrevButton = () => {
    setPage(page === 0 ? 0 : page - 1);
  };
  const handleNextButton = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-white">Pagination with Tanstack Query</h1>
      <div className="border border-blue-300 p-3 m-3">
        <div>Items por pagina: {limit}</div>
        <div>Numero da pagina: {page}</div>
        <button
          className="border border-blue-300 mx-2 px-2"
          onClick={handlePrevButton}
        >
          Pagina Anterior
        </button>
        <button
          className="border border-blue-300 mx-2 px-2"
          onClick={handleNextButton}
        >
          Proxima pagina
        </button>
      </div>

      {posts.isFetching && <p className="text-red-700">Carregando...</p>}
      {posts.data && (
        <ul>
          {posts.data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
