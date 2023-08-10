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
        isPinned: false,
        thread: []
      }]
    })
    setNewPost("")
  }

  function handleEnter(e) {
    if (e.key=='Enter') {
      addPost()
    }
  }

  function deletePost(id) {
    setPostList(currentPostList => {
      return currentPostList.filter(post => post.id !== id)
    })
  }

  function togglePin(id, isPinned) {
    setPostList(currentPostList => {
      return currentPostList.map(post => {
        if (post.id === id) return { ...post, isPinned: !isPinned }
        return post
      })
    })
  }

  return (
    <div className="container">
      <ul className="post-list">
        {postList.map(post => {
          return (<Post key={post.id} {...post} deletePost={deletePost} togglePin={togglePin}/>)
        })}
      </ul>
      <div>
        <input type="text" value={newPost} onChange={e => setNewPost(e.target.value)} onKeyDown={handleEnter}/>
        <button className="btn--send" onClick={addPost}>Send</button>
      </div>
    </div>
  )
}

export default App
