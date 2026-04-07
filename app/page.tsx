import Hero from '@/sections/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'
import Features from '@/sections/Features'
import Pricing from '@/sections/Pricing'
import Footer from '@/components/Footer'
import Collaborations from '@/sections/Collaborations'
import NewFeatures from '@/sections/NewFeatures'
import Contact from '@/sections/Contact'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await auth();

  if (session?.user) redirect('/v1/dashboard');
  return (
    <div className='w-full'>
      <Navbar />
      <Hero />
      <Features />
      <Collaborations />
      <Pricing />
      <NewFeatures />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home