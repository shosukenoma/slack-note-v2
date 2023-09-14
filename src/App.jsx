import { useEffect, useState } from 'react'
import './App.css'
import Post from './Post'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import axios from 'axios';
import asyncWrapper from 'express-async-wrap';


function App() {

    const [newPost, setNewPost] = useState("")
    const [postList, setPostList] = useState([])
  
    /* Scroll to bottom upon 
        a) first render
        b) adding new post */
    useEffect(() => {
      updateScroll()
      // fetchData()
    }, [])
  
  function addPost(event) {  

    event.preventDefault()
      if (newPost === "") {
        setTimeout(() => {
          setNewPost("")
        }, 0.1)
        
        return
      }
    
      const date = new Date;
      let post = {
        id: crypto.randomUUID(),
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

      setPostList(currentPostList => {
        return [...currentPostList, post ]
      })
   
      handleSubmit(post)
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
  
  async function handleSubmit(post){ 
    try{const {content,isPinned,dateCreated} = post
    await axios.post('/api/v1/posts',{content,isPinned,dateCreated})}
    catch(error){console.log(error)}}
    

  // async function fetchData(){ asyncWrapper(const {data} = await axios.get("/api/v1/posts")

  //     data.allDocuments.forEach(post => setPostList(currentPostList => {
  //       setPostList(currentPostList => {
  //         return [...currentPostList, {
  //           content,
  //           isPinned,
  //           dateCreated
  //         }]
  //       })}))
    
      
          
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  

  /* Used in junction with `onKeyDown={handleEnter}`*/
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
            return (<Post key={post.id} {...post} deletePost={deletePost} togglePin={togglePin}/>)
          })}
        </ul>
      </div>
      <div className="input-container">
        <form className="text-box-container" onSubmit={addPost}>
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


export default App
