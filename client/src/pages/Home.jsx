import React, { useState } from "react";
import "./css/home.css";

export default function Home() {
  return (
    <section>
      <div className="page-content">
        <div className="main-heading">
          <h1>Home</h1>
        </div>
        <div className="content">
          <h2>Welcome to BlogConnect</h2>
          <p className="content-paragraph">
            Login or Sign up to view the posts of other users, make your own
            post and share it with everyone!
          </p>
        </div>
      </div>
    </section>
  );
}
