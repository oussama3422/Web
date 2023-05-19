'use client';
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@components/profile';

const MyProfile = () => {
    const [posts,setPosts]=useState([]);
    const {data:session} = useSession();
    const route = useRouter();
    const handleEdit = async()=>{

    }
    const handleDelete = async()=>{

    }

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
            setPosts(data);
        }
  
        if(session?.user.id) fetchPosts();
        // route.push('/');
    },[])
  return (
    <Profile
     name="My"
     desc= "Welcome to your personalized profile page"
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />
  )
}

export default MyProfile