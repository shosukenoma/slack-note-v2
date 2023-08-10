import { React } from 'react'
import './Post.css'

function Post({ id, content, isPinned, deletePost, togglePin }) {

  return (
    <li className={`post ${isPinned ? "pinned" : ""}`}>
      <span>{content}</span>
      <button className="btn--delete" onClick={() => deletePost(id)}>Delete</button>
      <button className="btn--pin" onClick={() => togglePin(id, isPinned)}>{isPinned ? "Unpin" : "Pin"}</button>
    </li>
  )
}

export default Post