'use client';
import {useState,useEffect} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import Profile from '@components/profile';

const UserProfile = ({params}) => {
    const router = useRouter();
    const searchParams=useSearchParams();
    const userName = searchParams.get("name");

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
     name="My"
     desc= "Welcome to your personalized profile page"
     data={posts}
    />
  )
}

export default UserProfile
