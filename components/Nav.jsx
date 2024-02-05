'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState , useEffect } from 'react'
import {signIn ,signOut ,useSession , getProviders} from 'next-auth/react';
const Nav = () => {

    const [providers , setProviders] = useState(null);
    const [toggleDropDown , setToggleDropDown] = useState(false)
    const {data:session} = useSession();

    useEffect(()=>{
        const setUpProviders =async ()=>{
            const response =await getProviders();
            setProviders(response)
        }
        setUpProviders();
    },[])

  return (
   <nav className='flex-between w-full mb-16 pt-3'>

    <Link href="/" className='flex gap-2 flex-center'>
        <Image className='object-contain' alt='logo' src='/assets/images/logo.svg' width={40} height={40} />
        <p className='logo_text'>Promtopia</p>
    </Link>

    

    {/* {Desktop Navigation} */}
    <div className='sm:flex hidden'>

    {session?.user ?(
        // user Looged In
        <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href="/create-prompt">
                Create Post 
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

            <Link href="/profile">
                <Image className='rounded-full ' src={session?.user.image} alt=' user profile' width={50} height={50}/>
            </Link>
        </div>
    ):(
        // user NOt Logged IN
        <>
        {providers && Object.values(providers).map((provider)=>(
            <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn' >
                Sign In
            </button>
        ))}
        </>
    )}
    </div>

    {/* {Mobile navigation} */}

    <div className='sm:hidden flex-relative'>
            {session?.user ?(
               <div className='flex'>
                <Image className='rounded-full ' 
                 src={session?.user.image}
                alt=' user profile' 
                width={40} height={40}
                onClick={()=>{setToggleDropDown((prev)=>!prev)}}/>

              {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
                </div>
                )}

               </div>

               
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>(
            <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn' >
                Sign In
            </button>
        ))}
                </>
            )}
    </div>
   </nav>
  )
}

export default Nav
