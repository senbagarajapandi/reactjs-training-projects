import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { response } from './Response';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { title, content };
    response('http://localhost:5000/posts', 'POST', JSON.stringify(newPost))
      .then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form className='base-container' onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;