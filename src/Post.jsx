import { React } from 'react'
import './Post.css'

function Post({ id, content, isPinned, deletePost, togglePin }) {

  return (
    <div className="post-outer-box">
      <li className={`post ${isPinned ? "pinned" : ""}`} onDoubleClick={() => togglePin(id, isPinned)}>
        <div className="post-content">
          <img className="user-icon" src="https://a.slack-edge.com/80588/marketing/img/avatars/slackbot/avatar-slackbot@2x.png" alt="Slackbot Icon" />
          <p className="user-name">You</p>
          <p className="post-text">{content}</p>
        </div>
        <button className="btn--delete" onClick={() => deletePost(id)}>Delete</button>
        {/* <button className="btn--pin" onClick={() => togglePin(id, isPinned)}>{isPinned ? "Unpin" : "Pin"}</button> */}
      </li>
    </div>
    
  )
}

export default Post