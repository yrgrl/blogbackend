import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let imageUrl = null;
    if (image) {
      // In a real app, you'd upload the image to a server here
      // and get back a URL. For now, we'll use a local object URL.
      imageUrl = URL.createObjectURL(image);
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, imageUrl }),
      });
      
      if (response.ok) {
        await addPost({ title, content, imageUrl });
        navigate('/');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <h2>Create a New Post</h2>
      {error && <p className="error-message">{error}</p>}
      {/* Include form fields for title, content, and image upload */}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePost;