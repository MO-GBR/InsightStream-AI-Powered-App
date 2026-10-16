import LogoMarquee from '@/components/Landing_Page/LogoMarquee';
import Quote from '@/components/Landing_Page/Quote';
import Image from 'next/image';
import React from 'react'

const Logos = [
    '/collaboration/figma.png',
    '/collaboration/notion.png',
    '/collaboration/raindrop.png',
    '/collaboration/framer.png',
    '/collaboration/discord.png',
    '/collaboration/slack.png',
    '/collaboration/protopie.png',
    '/collaboration/photoshop.png'
];

const Collaborations = () => {
    return (
        <section className='w-full p-5 my-8 flex-center flex-col'>
            <LogoMarquee logos={Logos} />
            <Quote />
        </section>
    )
}

export default Collaborations