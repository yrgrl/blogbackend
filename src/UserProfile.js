import React from 'react';

function UserProfile({ user }) {
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserProfile;