"use client"

import { SignIn, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
    const { user } = useUser()
    if (user) {
      redirect("/dashboard")
    }

    
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignIn />
    </div>
  )
}