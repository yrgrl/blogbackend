import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import PostList from './PostList';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import SearchBar from './SearchBar';
import PostDetail from './PostDetail';
import Header from './Header';
import Navbar from './Navbar';
import Hero from './Hero';
import './index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
    // Fetch posts from API
    fetchPosts();
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'x-auth-token': token
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    setLoading(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const addPost = async (post) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(post)
      });
      const newPost = await response.json();
      setPosts([...posts, newPost]);
      setFilteredPosts([...filteredPosts, newPost]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(updatedPost)
      });
      const updated = await response.json();
      const updatedPosts = posts.map(post => post._id === id ? updated : post);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      const updatedPosts = posts.filter(post => post._id !== id);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return true;
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return true;
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Header />
        <Navbar user={user} logout={logout} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="content-wrapper">
          <div className="container">
            <SearchBar onSearch={handleSearch} />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <PostList posts={filteredPosts} />
                </>
              } />
              <Route path="/create" element={user ? <CreatePost addPost={addPost} /> : <Navigate to="/login" />} />
              <Route path="/post/:id" element={<PostDetail posts={posts} updatePost={updatePost} deletePost={deletePost} user={user} />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/register" element={<Register register={register} />} />
              <Route path="/profile" element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;