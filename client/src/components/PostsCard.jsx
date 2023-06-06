import React from "react";

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
        <h3 className="content-title">{name}</h3>
      </div>
      <div>
        <p className="date">{formattedDate}</p>
        <p className="content">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
