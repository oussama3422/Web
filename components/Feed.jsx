'use client'
import React from 'react'
import {useState,useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick })=>{
   return( 
   <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
   </div>
   )
}


export const Feed = () => {
  const [posts,setPosts] = useState([]);

  //Search states
  const [searchText,setSearchText] = useState('');
  const [searchTimeout,setSearchTimeout] = useState(null);
  const [searchedResult,setSearchedResult] = useState([]);
  

  //filterPrompt
  const filterPrompts = (searchText)=>{
    const regex = new RegExp(searchText,"i"); // 'i' flag for case-insensitive
    //search
    return posts.filter(
      (item)=>
      regex.test(item.creator.username) ||
      regex.test(item.creator.email) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
      );
  };

//  handleSearchChange 
  const handleSearchChange = (event)=>{
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);
    setSearchTimeout(setTimeout(()=>{
      const searchResult= filterPrompts(event.target.value);
      setSearchedResult(searchResult);
    },500)
    );
  }

  //handle Click
   const handleTagClick = (tagName)=>{
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResult(searchResult);
   }
   const fetchPosts =  async ()=>{
    const response =  await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  }

  //
  useEffect(()=>{
    fetchPosts();
   },[]);  

    // Update posts to display based on search results
    const displayedPosts = searchText ? searchedResult : posts;
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
     <input 
        type="text"
        placeholder='Search for a tag or a useraname or email'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input text-gray-700'
        />
      </form>
      <PromptCardList
        data={displayedPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}
