// src/community/Post.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// 게시글 상세 페이지 컴포넌트
const Post = () => {
    // useParams hook으로 postId를 받아옴.
    const { postId } = useParams();

    // 상태 변수들을 초기화.
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [likedByUser, setLikedByUser] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const auth = getAuth();

    // useEffect hook을 사용하여 postId와 현재 사용자의 인증 정보가 변경될 때마다 해당 게시글 데이터를 가져옴.
    useEffect(() => {
        const fetchPost = async () => {
            const postRef = doc(db, 'posts', postId);
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                setPost({ ...postData, id: postSnapshot.id });
                setLikes(postData.likes || 0);
                setLikedByUser(postData.likedBy && auth.currentUser && postData.likedBy.includes(auth.currentUser.uid));
                setComments(postData.comments || []);
            } else {
                console.log('No such document!');
            }
        };
        fetchPost();
    }, [postId, auth.currentUser]);

    // 게시글 좋아요 이벤트 핸들러
    const handleLike = async () => {
        const postRef = doc(db, 'posts', postId);
        const newLikedByUser = !likedByUser;
        let newLikes;
        let updatedLikedBy;
        if (newLikedByUser) {
            newLikes = likes + 1;
            updatedLikedBy = [...post.likedBy, auth.currentUser.uid];
        } else {
            newLikes = likes - 1;
            updatedLikedBy = post.likedBy.filter(uid => uid !== auth.currentUser.uid);
        }

        setLikes(newLikes);
        setLikedByUser(newLikedByUser);

        await updateDoc(postRef, { likes: newLikes, likedBy: updatedLikedBy });
    };

    // 댓글 제출 이벤트 핸들러
    const handleCommentSubmit = async event => {
        event.preventDefault();
        if (commentText.trim() === '') {
            return;
        }

        const commentData = {
            text: commentText.trim(),
            author: auth.currentUser.displayName,
            createdAt: new Date(),
        };

        const postRef = doc(db, 'posts', postId);
        const commentsRef = collection(postRef, 'comments');

        try {
            const commentDocRef = await addDoc(commentsRef, commentData);
            setComments([...comments, { ...commentData, id: commentDocRef.id }]);
        } catch (error) {
            console.error('Error adding comment: ', error);
        }

        setCommentText('');
    };

    // 댓글 내용 변경 이벤트 핸들러
    const handleCommentTextChange = event => {
        setCommentText(event.target.value);
    };

    // 게시글과 댓글 목록을 렌더링
    return (
        <div className="post">
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>작성자: {post.author}</p>
                    <p>{post.content}</p>
                    {/* 댓글 목록 렌더링 */}
                    <h3>댓글</h3>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                                <p>작성자: {comment.author}</p>
                                <p>작성일자: {comment.createdAt.toDate().toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>

                    {/* 댓글 작성 폼 */}
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="댓글 작성..."
                            value={commentText}
                            onChange={handleCommentTextChange}
                        ></textarea>
                        <button type="submit">댓글 작성</button>
                    </form>

                    {/* 좋아요 버튼 */}
                    <div>
                        <button type="button" onClick={handleLike}>
                            좋아요 {likes}
                        </button>
                    </div>
                </>
            ) : (
                <p>게시물을 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default Post;