import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { response } from './Response';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    response(`http://localhost:5000/posts/${id}`)
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className='base-container'>
      <div className='post-content'>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default PostDetail;