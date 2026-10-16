import Hero from '@/sections/Hero'

import React from 'react'
import Features from '@/sections/Features'
import Pricing from '@/sections/Pricing'
import Collaborations from '@/sections/Collaborations'
import NewFeatures from '@/sections/NewFeatures'
import Contact from '@/sections/Contact'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Landing_Page/Navbar'
import Footer from '@/components/Landing_Page/Footer'

const Home = async () => {
  const session = await auth();

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay of 2 second

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