import React from "react";

import "./postcard.css";

const PostCard = ({ _id, name, content, author, dateCreated }) => {
  const formattedDate = new Date(dateCreated).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card-container">
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <p>{formattedDate}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
