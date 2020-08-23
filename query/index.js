const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id: id, title: title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id: id, content: content, status });
  }
  if (type === "CommentUpdated") {
    const { status, content, id, postId } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);

  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(5002, async () => {
  console.log("listening on post 5002");

  const res = await axios.get("http://event-bus-srv:5005/events");

  for (let event of res.data) {
    console.log("processing event", event.type);

    handleEvents(event.type, event.data);
  }
});
