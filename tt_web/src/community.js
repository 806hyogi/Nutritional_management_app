import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, arrayUnion, query, where, orderBy, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import * as jose from 'jose';

function Community() {
  // 게시글, 새 게시글 제목/내용, 새 댓글, 보여지는 뷰, 현재 게시글, 현재 사용자, 검색어 state
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [view, setView] = useState("list");
  const [currentPost, setCurrentPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  
  
  // 컴포넌트에 사용될 CSS 스타일
  const styles = {
    ul: {
      listStyleType: 'none',
      padding: 0,
      width: '100%',
      height: '500px',
      overflow: 'auto',
    },
    li: {
      border: '1px solid #ddd',
      marginTop: '-1px',
      backgroundColor: '#f6f6f6',
      padding: '12px',
      cursor: 'pointer',
      color: 'black',
    },
    input: {
      width: '95%',
      padding: '12px',
      border: '1px solid #ccc',
      marginTop: '10px',
      position: 'relative',
      bottom: '20px',
    },
    button: {
      width: '100%',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '14px',
      margin: '8px 0',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      bottom: '20px',
    },
    h1: {
      fontSize: '18px',
    },
    p: {
      fontSize: 'px',
    },
    commentAuthor: {
      float: 'right',
      color: 'gray',
    }
  };
  
  // 컴포넌트가 마운트 되면 사용자 정보와 게시글을 불러옴
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const uT = localStorage.getItem('userToken');
      const token = jose.decodeJwt(uT);

      if (token) {
        const userEmail = token.firebase.identities.email[0];

        try {
          const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
          const usersSnapshot = await getDocs(usersQuery);

          if (!usersSnapshot.empty) {
            const userDocSnapshot = usersSnapshot.docs[0];
            setCurrentUser({ id: userDocSnapshot.id, ...userDocSnapshot.data()});
          } else {
            console.log("No user found with this email");
          }
        } catch (error) {
          console.log("Error getting document:", error);
        }
      }
    };
    fetchCurrentUser();
    fetchPosts();
    }, []);

    // 게시글 불러오는 함수
    const fetchPosts = async () => {
  const postsQuery = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc')
  );

  const postsSnapshot = await getDocs(postsQuery);
  const newPosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  setPosts(newPosts);
};

 //게시글 클릭
  const handlePostClick = (post) => {
    setView("detail");
    setCurrentPost(post);
  };

  // 게시글 작성 함수
  const handleWritePost = async () => {
    if (currentUser) {
      const newPost = {
        id: Date.now().toString(),
        title: newPostTitle,
        content: newPostContent,
        author: currentUser.nickname,
        authorId: currentUser.id,
        comments: [],
        likes: 0,
        createdAt: new Date()
      };
      const postsRef = collection(db, 'posts');
      await setDoc(doc(postsRef, newPost.id), newPost);
      await increaseExperience(currentUser.id, 10);
      await fetchPosts();
      setNewPostTitle("");
      setNewPostContent("");
      setView("list");
    }
  };

  // 사용자가 입력한 제목을 newPostTitle state에 저장
  const handleNewPostTitleChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  // 사용자가 입력한 내용을 newPostContent state에 저장
  const handleNewPostContentChange = (event) => {
    setNewPostContent(event.target.value);
  };

  // 사용자가 입력한 댓글을 newComment state에 저장
  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  //댓글 기능 함수
  const handleAddComment = async () => {
    if (currentUser) {
      const comment = {
        author: currentUser.nickname,
        comment: newComment
      };
      const postRef = doc(db, 'posts', currentPost.id);
      await updateDoc(postRef, {
        comments: arrayUnion(comment),
      });
      await increaseExperience(currentUser.id, 5);

      setCurrentPost({
        ...currentPost,
        comments: [...currentPost.comments, comment],
      });

      setNewComment("");
    } else {
      console.log("There's no current user!");
    }
  };

  // 좋아요 기능 함수
  const handleLike = async () => {
    const postRef = doc(db, 'posts', currentPost.id);
    await updateDoc(postRef, {
      likes: currentPost.likes + 1,
    });
    await increaseExperience(currentPost.authorId, 5);
    fetchPosts();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

    //검색창 기능 함수
  const handleSearch = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('title', '==', searchTerm));
    const querySnapshot = await getDocs(q);
    let searchResult = [];
    querySnapshot.forEach((doc) => {
      searchResult.push({ id: doc.id, ...doc.data() });
    });
    setPosts(searchResult); 
  };

  // 경험치를 증가시키는 함수
const increaseExperience = async (userId, amount) => {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData = userDocSnapshot.data();
  const currentExperience = userData.experience || 0;
  const newExperience = currentExperience + amount;
  await updateDoc(userDocRef, { experience: newExperience });
}


 // 뷰에 따른 컴포넌트 렌더링
  if(view === "list") {
    // 게시글 목록 뷰
    return (
      <div>
        <ul style={styles.ul}>
          {posts.map(post => (
            <li key={post.id} style={styles.li} onClick={() => handlePostClick(post)}>
              {post.title} - {post.likes} 
              <span style={styles.commentAuthor}>{post.author}</span>
            </li>
          ))}
        </ul>
        <button style={styles.button} onClick={() => setView("write")}>글쓰기</button>
        <input style={styles.input} type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색어를 입력하세요." />
        <button style={styles.button} onClick={handleSearch}>검색</button>
      </div>
    );
  } else if(view === "write") {
    // 새 게시글 작성 뷰
    return (
      <div>
        <input style={styles.input} type="text" value={newPostTitle} onChange={handleNewPostTitleChange} placeholder="제목을 입력하세요." />
        <textarea style={styles.input} value={newPostContent} onChange={handleNewPostContentChange} placeholder="내용을 입력하세요." />
        <button style={styles.button} onClick={handleWritePost}>제출</button>
      </div>
    );
  } else if(view === "detail" && currentPost) {
    // 게시글 상세 뷰
    return (
      <div>
        <h1 style={styles.h1}>{currentPost.title}</h1>
        <p style={styles.p}>{currentPost.content}</p>
        <ul style={styles.ul}>
          {currentPost.comments ? currentPost.comments.map((comment, index) => (
            <li key={index} style={styles.li}>
              {comment.comment}
              <span style={styles.commentAuthor}>{comment.author}</span>
            </li>
          )) : null}
        </ul>
        <input style={styles.input} type="text" value={newComment} onChange={handleNewCommentChange} placeholder="댓글을 입력하세요." />
        <button style={styles.button} onClick={handleAddComment}>댓글 작성</button>
        <button style={styles.button} onClick={handleLike}>좋아요</button>
        <button style={styles.button} onClick={() => setView("list")}>뒤로가기</button>
      </div>
    );
  }
}

export default Community;