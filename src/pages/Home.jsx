import { useEffect, useState } from 'react'
import './../Home.css'
import Post from '../Post'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import axios from 'axios';

function Home() {

    const [newPost, setNewPost] = useState("")
    const [postList, setPostList] = useState([])
  
    /* Scroll to bottom upon 
        a) first render
        b) adding new post */
    useEffect(() => {
      updateScroll()
      // fetchData()
    }, [])
  
  function addPost(post) {  

      if (newPost === "") {
        setTimeout(() => {
          setNewPost("")
        }, 0.1)
        
        return
      }
      
      setPostList(currentPostList => {
        return [...currentPostList, post]
      })
   
      /* Delay textfield reset:
          1) New line created by enter key
          2) Empty textfield
      */
      setTimeout(() => {
        setNewPost("")
      }, 0.1)
      
      /* The updateScroll() function always runs faster than 
      the adding of a new post, so we use a delayed timer here. */
      setTimeout(() => {
        updateScroll()
      }, 1)
      
  }
  
  /*creates new post in database and renders the post*/
  async function handleSubmit(e){ 
    e.preventDefault()
    try{
    const date = new Date;
      let post = {
        content: newPost,
        isPinned: false,
        dateCreated: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes()},
        thread: []
      }
    const {data} = await axios.post('/api/v1/posts',post)
    addPost(data.newDocument)
  }
    catch(error){console.log(error)}}
    
  /*Loads all of the user's posts*/ 
  async function fetchData(){ 
    try {
      const {data} = await axios.get("/api/v1/posts")
      data.allDocuments.
      forEach(post => {
        const {content,isPinned,dateCreated,_id:id} = post
        setPostList(currentPostList => {
          return [...currentPostList, {
            content,
            isPinned,
            dateCreated,id
          }]
        })
  })
}
     catch (error) {
      console.log(error)
    }
  }

  /* Used in junction with `onKeyDown={handleEnter}`*/
  function handleEnter(e) {
    if (e.key=='Enter') {
      addPost()
    }
  }

  async function deletePost(id) {
    await axios.delete(`/api/v1/posts/${id}`)
    setPostList(currentPostList => {
      return currentPostList.filter(post => post.id !== id)
    })
  }

  async function togglePin(id, isPinned) {
    await axios.patch(`/api/v1/posts/${id}`,{isPinned:!isPinned})
    setPostList(currentPostList => {
      return currentPostList.map(post => {
        if (post.id === id) return { ...post, isPinned: !isPinned }
        return post
      })
    })
  }

  /* Special function for pin scrolling to bottom */
  /* https://stackoverflow.com/a/21067431/21966800 */
  function updateScroll(){
    /* This HAS TO BE getElementById. Class doesn't work. */
    var element = document.getElementById("post-container");
    element.scrollTop = element.scrollHeight;
  }

  
  return (
    <div className="app-container" >
      <header className="header">
        <h2 className="title">Slack Note</h2>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="https://github.com/shosukenoma/slack-note-v2" className="btn--github" target='blank'><i className="devicon-github-original"></i></a></li>
          </ul>
        </nav>
      </header>
       <div className="post-container" id="post-container">
        <ul className="post-list">
          {postList.map(post => {
            return (<Post key={post._id} {...post} deletePost={deletePost} togglePin={togglePin}/>)
          })}
        </ul>
      </div>
      <div className="input-container">
        <form className="text-box-container" onSubmit={handleSubmit}>
          <TextareaAutosize className="text-box" placeholder="Jot something down" maxRows={19} value={newPost} onChange={e => setNewPost(e.target.value)} onKeyDown={handleEnter}/>
          <button className="btn--send">Send</button>
        </form>
      </div>
      <div className="thread-container">
        <p>Threads feature coming soon...</p>
      </div>
    </div>
  )
}

export default Home
