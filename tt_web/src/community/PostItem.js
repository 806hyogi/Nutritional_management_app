import React from 'react';
import { Link } from 'react-router-dom';

// 게시글 목록 아이템 컴포넌트
const PostItem = ({ post }) => {
  return (
    <li>
      <h3>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p>작성자: {post.author}</p>
    </li>
  );
};

export default PostItem;
