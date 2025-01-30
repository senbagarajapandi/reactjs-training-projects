import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { response } from './Response';

const EditPost = () => {
  const [post, setPost] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    response(`http://localhost:5000/posts/${id}`, 'PUT', JSON.stringify(post))
    .then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form className='base-container' onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPost;