'use client';
import {useState,useEffect} from 'react'
import {useRouter,useSearchParams} from 'next/navigation'
import  Form  from '@components/Form';


 const EditPrompt = () => {
    const router=useRouter();
    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({prompt:'',tag:'',});
    const searchParams=useSearchParams()
    const promptId=searchParams.get('id');
    

    useEffect(()=>{
       const getPromptDetails = async()=>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data=response.json();
            setPost({
                prompt:data.prompt,
                tag:data.tag,
            })
        }
    },[promptId])
    const createPrompt = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try{
            const response = await fetch("/api/prompt/new",{
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            });
            
            if (response.ok) {
                const responseData = await response.json();
                console.log("response:::>", responseData);
                router.push('/');
            } else {
                console.log("error:::>", response.status);
            }
            
        }catch(error)
        {
            console.log("error:::>"+error);

        }finally{
            setSubmitting(false);
        }
    }
  return (
    <Form
       type="Create"
       post={post}
       setPost={setPost}
       submiting={submitting}
       handleSubmit={createPrompt}
    />
  )
}

export default EditPrompt
