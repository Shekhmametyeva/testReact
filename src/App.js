import React, { useMemo, useState } from "react";
import "./styles/App.css";
import MyModal from "./components/UI/MyModal/MyModal";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyButton from "./components/UI/button/MyButton";


function App() {
  // state
  const [posts, setPosts] = useState([
    {id: 1, title: "Java Script", body: "Description 1"},
    {id: 2, title: "Java", body: "Description 2"},
    {id: 3, title: "Go", body: "Description 3"}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  //useMemo
  //сортировка постов
  const sortedPost = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);
  // сортировка + филтрация
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPost.filter((post) => post.title.toUpperCase().includes(filter.query.toUpperCase()));
  }, [filter.query, sortedPost]);
  
  // setState
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(el => el.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: '15px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost}/>
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
    </div>
  );
}

export default App;