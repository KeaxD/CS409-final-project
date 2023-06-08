import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./css/singlepost.css";

const SinglePost = () => {
  const { postId } = useParams(); // Get the postId from the URL parameter
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
          method: "GET",
          headers: {
            Authorization: storedToken,
          },
        });
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.log("Failed to fetch post");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  const handleDeletePost = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: storedToken,
        },
      });
      if (response.ok) {
        const res = response.json();
      }
    } catch (err) {
      console.log(err);
    }
    window.location.href = "/posts";
  };

  const formattedDate = new Date(post.dateCreated).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="post-container">
      <h1>{post.name}</h1>
      <p className="post-content">{post.content}</p>
      <p>Author: {post.author.name}</p>
      <p>Date: {formattedDate}</p>
      <div className="post-buttons">
        <button className="btn update">Update</button>
        <button className="btn delete" onClick={handleDeletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
