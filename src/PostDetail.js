import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ posts, updatePost, deletePost, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(post._id, { title: editedTitle, content: editedContent });
      setIsEditing(false);
      setPost({ ...post, title: editedTitle, content: editedContent });
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="post-detail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="post-image" />
          )}
          <p>{post.content}</p>
          <div className="post-meta">
            <span>By {post.author.username}</span>
            <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {user && user._id === post.author._id && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PostDetail;