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
    <div className="app-container">
      <div className="feed-container">
        <div className="post-container">
          <ul className="post-list">
            {postList.map(post => {
              return (<Post key={post.id} {...post} deletePost={deletePost} togglePin={togglePin}/>)
            })}
          </ul>
        </div>
        <div className="input-container">
          <input class="input-box" type="text" placeholder="Jot something down" value={newPost} onChange={e => setNewPost(e.target.value)} onKeyDown={handleEnter}/>
          <button className="btn--send" onClick={addPost}>Send</button>
        </div>
      </div>
      <div className="thread-container">
        <p>Threads feature coming soon...</p>
      </div>
    </div>
  )
}

export default App
