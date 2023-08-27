import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./css/singlepost.css";

const SinglePost = () => {
  const { postId } = useParams(); // Get the postId from the URL parameter
  const [post, setPost] = useState(null);
  const [user, setUser] = useState();
  const [updating, setUpdating] = useState();
  const [postContent, setPostContent] = useState("");
  const [postName, setPostName] = useState("");

  const handleChangeContent = (e) => {
    setPostContent(e.target.value);
  };

  const handleChangeName = (e) => {
    setPostName(e.target.value);
  };

  const handleDeletePost = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await fetch(
        `https://cs409-final-project.onrender.com/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: storedToken,
          },
        }
      );
      if (response.ok) {
        window.location.href = "/posts";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("token");

      const requestBody = {};
      if (postName) {
        requestBody.name = postName;
      }
      if (postContent) {
        requestBody.content = postContent;
      }

      const response = await fetch(
        `https://cs409-final-project.onrender.com/posts/${postId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: storedToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        console.log(response, "Post was successfully updated");
        setUpdating(null);
        window.location.reload();
      }
    } catch (err) {
      setUpdating(null);
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setUpdating(true);
    setPostContent(post.content);
    setPostName(post.name);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await fetch(
          `https://cs409-final-project.onrender.com/posts/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: storedToken,
            },
          }
        );
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
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await fetch(
          "https://cs409-final-project.onrender.com/account/",
          {
            method: "GET",
            headers: {
              Authorization: storedToken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  const formattedDate = new Date(post.dateCreated).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  if (updating == true) {
    return (
      <div className="post-form">
        <form onSubmit={handleUpdatePost}>
          <label className="label-post-name">Title</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChangeName}
            className="post-name"
            value={postName}
          />
          <textarea
            name="post"
            id="post"
            cols="72"
            rows="5"
            className="post"
            value={postContent}
            onChange={handleChangeContent}
          ></textarea>
          <button className="btn-post">Update Post</button>
        </form>
      </div>
    );
  }

  if (user && user.role != "admin" && user.name != post.author.name) {
    return (
      <div className="post-container">
        <h1>{post.name}</h1>
        <p className="post-content">{post.content}</p>
        <p>Author: {post.author.name}</p>
        <p>Date: {formattedDate}</p>
      </div>
    );
  }
  return (
    <div className="post-container">
      <h1>{post.name}</h1>
      <p className="post-content">{post.content}</p>
      <p>Author: {post.author.name}</p>
      <p>Date: {formattedDate}</p>
      <div className="post-buttons">
        <button className="btn update" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn delete" onClick={handleDeletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
