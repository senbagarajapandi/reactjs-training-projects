import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/edit/:id" element={<EditPost/>} />
        <Route path="/post/:id" element={<PostDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;