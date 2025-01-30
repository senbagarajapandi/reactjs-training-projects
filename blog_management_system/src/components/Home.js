import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { response } from './Response';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    response('http://localhost:5000/posts')
      .then(data => setPosts(data));
  }, []);
  
  const handleDelete = (id) => {
    response(`http://localhost:5000/posts/${id}`, 'DELETE')
      .then(() => setPosts(posts.filter(post => post.id !== id)));
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <div className='base-container'>
        <Link to="/create">+ Create a new post</Link>
        <ul>
            {
              posts.length ? (
                posts.map(post => (
                  <li key={post.id}>
                      <Link className='blog-name' to={`/post/${post.id}`}>{post.title}</Link>
                      <Link to={`/edit/${post.id}`}>Edit</Link>
                      <p onClick={() => handleDelete(post.id)}>Delete</p>
                  </li>
                  ))
              ) : (<li className='empty' key='No Data'>No Blog !</li>)
              
            }
        </ul>
      </div>
    </div>
  );
}

export default Home;