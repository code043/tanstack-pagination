"use client";

import { useState } from "react";
import { useAllPosts, usePosts } from "./utils/queries";

export default function Home() {
  const limit = 3;
  const [page, setPage] = useState(0);
  const posts = usePosts(limit, page * limit);
  const allPosts = useAllPosts();

  const handlePrevButton = () => {
    setPage(page === 0 ? 0 : page - 1);
  };
  const handleNextButton = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-white">TanStack Query</h1>

      {posts.isFetching && <p className="text-red-700">Carregando...</p>}
      {posts.data && (
        <ul>
          {posts.data.map((item) => (
            <li key={item.id}>
              <h2 className="text-blue-700 py-3">{item.title}</h2>
              <div className="border border-blue-300 p-3">
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="border boder-white p-3 m-3">
        <div>Items por pagina: {limit}</div>
        <div>Numero da pagina: {page}</div>
        <div>Quantidade de paginas: {allPosts.data?.length}</div>
        <button className="border mx-2 px-2" onClick={handlePrevButton}>
          Prev
        </button>
        {posts.data?.map((posts) => {
          return (
            <button key={posts.id} className="border mx-2 px-2">
              {posts.id}
            </button>
          );
        })}
        <button className="border mx-2 px-2" onClick={handleNextButton}>
          Next
        </button>
      </div>
    </div>
  );
}
