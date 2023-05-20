'use client';
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@components/profile';

const MyProfile = () => {
    const [posts,setPosts]=useState([]);
    const {data:session} = useSession();
    const router = useRouter();

    const handleEdit = async(post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post)=>{
      const hasConfirmed = Confirm("Are you sure want to delete this prompt ?");
      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post_id.toString()}`,{method:'DELETE'});
          const filteredPosts =  posts.filter((p)=>p._id != post._id);
          setPosts(filteredPosts);
        }catch(error){
         console.log(error);
        }
      }
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
