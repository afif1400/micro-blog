import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
    alert("post submitted");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="h5">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
