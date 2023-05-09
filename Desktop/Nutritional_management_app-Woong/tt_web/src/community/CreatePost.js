// src/community/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '.././utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// 게시글 작성 컴포넌트
const CreatePost = () => {
  //상태 변수 초기화
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  // 각 인풋 값의 변경을 처리하는 이벤트 핸들러를 생성
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  // 게시글 작성 폼 제출 이벤트 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRef = collection(db, 'posts');
      const docRef = await addDoc(postRef, {
        title,
        content,
        author,
        timestamp: new Date().getTime()
      });
      console.log('Document written with ID: ', docRef.id);
      navigate('/community');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // 게시글 작성 폼을 렌더링
  return (
    <div>
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">닉네임:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default CreatePost;
