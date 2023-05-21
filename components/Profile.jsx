import React from 'react';
import PromptCard from './PromptCard';

const Profile = ({name,desc,data,handleEdit,handleDelete}) => {
  const dataArray = data ?? []; // Use an empty array if data is undefined
  return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            {name} Profile
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='mt-10 prompt_layout'>
        {
        dataArray.length==0?(  <div className="flex items-center justify-center h-full">
        <div className="desc text-center">there is no prompt till now</div>
      </div>):(dataArray.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=>handleEdit && handleEdit(post)}
          handleDelete={()=>handleDelete && handleDelete(post)}
        />
        )))}
   </div>
    </section>
  )
}

export default Profile
