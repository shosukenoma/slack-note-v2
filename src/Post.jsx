import { React } from 'react'
import './Post.css'

function Post({ id, content, isPinned, deletePost, togglePin, dateCreated }) {

  let day = dateCreated.getDate();
  let month = dateCreated.getMonth() + 1;
  let year = dateCreated.getFullYear();
  let hours = dateCreated.getHours();
  let minutes = dateCreated.getMinutes();
  let suffix = "AM"
  if (hours > 12) {
    hours = hours - 12
    suffix = "PM"
  }

  return (
    <div className="post-outer-box">
      <li className={`post ${isPinned ? "pinned" : ""}`} onDoubleClick={() => togglePin(id, isPinned)}>
        <div className="post-content">
          <img className="user-icon" src="https://a.slack-edge.com/80588/marketing/img/avatars/slackbot/avatar-slackbot@2x.png" alt="Slackbot Icon" />
          <div className="flex-container">
            <p className="user-name">You</p>
            <span className="post-time">{`${hours}:${minutes} ${suffix}`}</span>
          </div>
          <p className="post-text">{content}</p>
        </div>
        <button className="btn--delete" onClick={() => deletePost(id)}>Delete</button>
        {/* <button className="btn--pin" onClick={() => togglePin(id, isPinned)}>{isPinned ? "Unpin" : "Pin"}</button> */}
      </li>
    </div>
    
  )
}

export default Post