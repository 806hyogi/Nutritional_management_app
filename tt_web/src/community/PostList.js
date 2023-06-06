import React from 'react';
import { Link } from 'react-router-dom';

// 게시물 목록을 보여주는 컴포넌트
const PostList = ({ posts }) => {
  // 타임스탬프를 읽기 쉬운 형식으로 변환하는 함수
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    let postDate = timestamp;

    // postDate를 Date 객체로 변환
    if (typeof postDate === "string" || typeof postDate === "number") {
      postDate = new Date(postDate);
    }

    // postDate가 유효한 Date 객체인지 확인
    if (!(postDate instanceof Date)) {
      console.error("postDate is not a valid Date object");
      return;
    }

    // 현재 시간과 게시물 작성 시간의 차이를 초 단위로 계산
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    // 차이를 읽기 쉬운 형식으로 변환
    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}분 전`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    } else {
      return `${postDate.getFullYear()}년 ${postDate.getMonth() + 1}월 ${postDate.getDate()}일`;
    }
  };

  // 게시물 목록을 렌더링
  return (
    <div className="post-list">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{formatTimestamp(post.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
