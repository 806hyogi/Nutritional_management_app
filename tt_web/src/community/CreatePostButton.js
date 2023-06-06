import React from 'react';
import { Link } from 'react-router-dom';
import './CreatePostButton.css';

// 게시글 작성 버튼 컴포넌트
const CreatePostButton = () => {
  return (
    <Link to="/create-post">
      <button className="create-post-button">글쓰기</button>
    </Link>
  );
};

export default CreatePostButton;
