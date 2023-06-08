import React from "react";
import { Link } from "react-router-dom";

import "./postcard.css";

const PostCard = ({ _id, name, content, author, dateCreated }) => {
  const formattedDate = new Date(dateCreated).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="card-container">
      <div>
        <Link to={`/posts/${_id}`} key={_id} className="post-link">
          <h3 className="content-title">{name}</h3>
        </Link>
      </div>
      <div>
        <p className="date">{formattedDate}</p>
        <p className="content">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
