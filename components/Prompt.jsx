'use client';
import {useState} from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react';
// import {usePathname,useRouter} from 'next/navigation';

export const PromptCard = ({post,handleTagClick,handleEdit,handleEdit}) => {
  const [copied,setCopied]=useState("");
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
         <div className='flex-1 flex justify-start items-center 
          gap-3 cursor-pointer'
         >
          <Image
            src={post.creator.image}
            alt="user_image"
            height={40}
            width={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-grey-900'>
               {post.creator.username}
              </h3>
              <h3 className='font-inter text-sm text-gray-500'>
                {post.creator.email}
              </h3>
          </div>
         
         </div>
         <div className='copy_btn' onClick={()=>{}}>
            <Image
              src={copied === post.prompt ? '/assets/icons/icon.svg':'/assets/icons/copy.svg'}
              width={12}
              height={12}
            />

          </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-grey-700'>
        {post.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cusror-pointer'>
        {post.tag}
      </p>
    </div>
  )
}
