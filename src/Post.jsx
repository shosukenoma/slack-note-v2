import React from 'react'

function Post({ id, content, deletePost}) {
  return (
    <li>
      <span>{content}</span>
      <button onClick={() => deletePost(id)}>Delete</button>
    </li>
  )
}

export default Post