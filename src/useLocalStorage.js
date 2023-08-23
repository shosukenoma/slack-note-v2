import React from 'react'
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialList) {
  const [postList, setPostList] = useState(() => {
    const localPostList = localStorage.getItem(key)
    if (localPostList == null) {
      console.log("Local storage is empty.")
      return initialList
    } else {
      return JSON.parse(localPostList)
      console.log("Local storage contains posts from previous session.")
    }
  })

  useEffect(() => {
    localStorage.setItem("postList", JSON.stringify(postList)) // Must convert object to a string.
    console.log("Updated list in local storage.")
  }, [postList])
  
  return [postList, setPostList]
}