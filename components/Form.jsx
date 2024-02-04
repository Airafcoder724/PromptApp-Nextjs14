import React from 'react'
import Link from 'next/link'

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} post</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} and Share Amazing prompts with the world with any Ai powered platform  
        </p>

        <form 
            onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '
        >
            <label htmlFor="prompt">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Your AI Prompt
                </span>
            <textarea 
                name='prompt'
                id='prompt'
                value={post.prompt}
                onChange={(e)=>setPost({...post,prompt:e.target.value })}
                placeholder='Write your Prompt Here ... '
                required
                className='form_textarea'
            />           
            </label>

            <label htmlFor="input">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Tag <span className='font-normal'>(#product , #Study , #Knowlege)</span>
                </span>
            </label>
            <input 
                id='input'
                name='input'
                value={post.tag}
                onChange={(e)=>setPost({...post,
                tag:e.target.value })}
                placeholder='Write your #tag Here ... '
                required
                className='form_input'
            />
            
           

            <div className='flex-end max-3 mb-5 gap-4'>
                <Link href="/" className='text-gray-500 text-sm'>
                    Cancel 
                </Link>
                <button className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white' type='submit' disabled={submitting}>
                    {submitting?`${type}...`: type}
                </button>
            </div>


        </form>

    </section>
  )
}

export default Form
