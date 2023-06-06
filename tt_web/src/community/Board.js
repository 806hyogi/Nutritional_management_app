// src/community/Board.js
import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseConfig';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import PostList from './PostList';
import SearchBar from './SearchBar';
import CreatePostButton from './CreatePostButton';
import './Board.css';

// 게시판 컴포넌트
const Board = () => {
  // 게시글 데이터와 검색창 표시 여부를 상태 변수로 관리
  const [postsData, setPostsData] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // 게시글 목록을 불러오는 함수를 useEffect를 이용하여 컴포넌트가 마운트 될 때 호출
  useEffect(() => {
    const loadPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });

      setPostsData(posts);
    };

    loadPosts();
  }, []);

  // 검색창 표시 여부를 토글
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // 게시글 목록, 검색창, 글쓰기 버튼 렌더링
  return (
    <div className="board-container">
      <div className="board-header">
        <button className="search-button" onClick={toggleSearchBar}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {showSearchBar && <SearchBar />}
      <PostList posts={postsData} />
      <CreatePostButton />
    </div>
  );
};

export default Board;