"use client"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "@/store/newsSlice";

const NewsCard = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-bold mb-2">📰 Crypto News</h2>
      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-500">Error loading news</p>}
      <ul className="space-y-2">
        {articles.map((news, index) => (
          <li key={index} className="border-b pb-2">
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
            >
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCard;
