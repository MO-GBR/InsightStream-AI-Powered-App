import ContactForm from '@/components/Landing_Page/ContactForm'
import Newsletter from '@/components/Landing_Page/Newsletter'
import SectionHeading from '@/components/Landing_Page/SectionHeading'
import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <section className='flex-center flex-col my-10 g-11'>
            <SectionHeading
                eyebrow='Contact Us'
                title='Get in touch with us'
                description='Have any questions or feedback? We would love to hear from you!'
            />
            <ContactForm />
            <Newsletter />
        </section>
    )
}

export default Contact