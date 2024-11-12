import React from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
  return (
    <div id="latest-posts" className="post-list">
      <h2 className="section-title">LATEST POSTS</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-preview">
          <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="post-image" />
          )}
          <p>{ post.content.substring(0, 200)}...</p>
          <div className="post-meta">
            <span>By {post.author.username}</span>
            <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;