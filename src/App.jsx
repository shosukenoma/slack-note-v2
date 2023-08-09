import { useState } from 'react'
import './App.css'
import Post from './Post'

function App() {

  const [newPost, setNewPost] = useState("")
  const [postList, setPostList] = useState([])

  function addPost() {
    if (newPost === "") return
    setPostList(currentPostList => {
      return [...currentPostList, {
        id: crypto.randomUUID(),
        content: newPost,
        pinned: false,
        thread: []
      }]
    })
    setNewPost("")
  }

  function deletePost(id) {
    setPostList(currentPostList => {
      return currentPostList.filter(post => post.id !== id)
    })
  }

  return (
    <div className="container">
      <ul className="post-list">
        {postList.map(post => {
          return (<Post key={post.id} {...post} deletePost={deletePost}></Post>)
        })}
      </ul>
      <div>
        <input type="text" value={newPost} onChange={e => setNewPost(e.target.value)}/>
        <button onClick={addPost}>Send</button>
      </div>
    </div>
  )
}

export default App
