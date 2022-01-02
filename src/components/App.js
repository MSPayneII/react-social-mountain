import axios from "axios";
import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((response) => {
        console.log(response.data);

        this.setState({ posts: response.data });
      })
      .catch((error) => console.log(error));
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((response) => this.setState({ posts: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((response) => this.setState({ posts: response.data }))
      .catch((error) => console.log(error));
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((response) => this.setState({ posts: response.data }))
      .catch((error) => console.log(error));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                date={post.date}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
