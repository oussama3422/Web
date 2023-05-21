'use client';
import {useState,useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import Profile from '@components/Profile';

const OtherUserProfile = ({params}) => {
    const searchParams=useSearchParams();

    const [userPosts,setUserPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();
            setUserPosts(data);
        }
  
        if(params?.id) fetchPosts();
        // route.push('/');
    },[params.id])
  return (
    <Profile
     name='other'
     desc= "User Profile"
     data={userPosts}
    />
  )
}

export default OtherUserProfile
