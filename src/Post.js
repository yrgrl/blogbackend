import React from 'react';

function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 100)}...</p>
      <p>Author: {post.author}</p>
    </div>
  );
}

export default Post;