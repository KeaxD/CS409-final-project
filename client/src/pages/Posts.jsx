import React, { useEffect, useState } from "react";
import PostCard from "../components/PostsCard";
import "./css/posts.css";

const RenderPost = ({ data }) => {
  if (data?.length > 0) {
    return data.map((post) => <PostCard key={post._id} {...post} />);
  }
};

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [postContent, setPostContent] = useState("");
  const [postName, setPostName] = useState("");

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedToken,
        },
        body: JSON.stringify({
          name: postName,
          content: postContent,
        }),
      });
      if (response.ok) {
        window.location.reload();
        console.log("Post successfully created!");
      } else {
        console.log(response, "Server error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeContent = (e) => {
    setPostContent(e.target.value);
  };

  const handleChangeName = (e) => {
    setPostName(e.target.value);
  };

  return (
    <section>
      <div>
        <h1>Community Posts</h1>
        <p>Browse through the community posts!</p>
        <p>or write your own ...</p>
      </div>
      <div className="post-form" method="POST">
        <form onSubmit={handleSubmitPost}>
          <label className="label-post-name">Title</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChangeName}
            className="post-name"
            placeholder="My Awesome post"
            required
          />
          <textarea
            name="post"
            id="post"
            cols="72"
            rows="5"
            className="post"
            placeholder="Today, I ..."
            onChange={handleChangeContent}
            required
          ></textarea>
          <button className="btn-post" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <div className="allposts-container">
        <RenderPost data={allPosts} />
      </div>
    </section>
  );
}
