import React from 'react'
import Logo from '../Logo'

const ContactForm = () => {
    return (
        <form className="space-y-10 p-5 py-10 max-lg:m-2 ml-10 border border-[#0fff37] rounded-tl-3xl rounded-bl-3xl border-t-4 flex w-full border-r-0">
            <div className="flex flex-col gap-6 w-[80%]">
                <div>
                    <label htmlFor="name" className="mb-3 block font-mono text-[15px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                        01 / Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mb-3 block font-mono text-[15px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                        02 / Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="mb-3 block font-mono text-[15px] uppercase w-fit tracking-[0.25em] text-white font-bold bg-[#00530e] p-2 rounded-full">
                        03 / Message
                    </label>
                    <textarea
                        name="message"
                        placeholder="Tell us what you're building..."
                        rows={5}
                        className="w-full resize-none border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#0fff37]"
                    />
                </div>
                <button
                    type="submit"
                    className="group w-[20rem] flex-center gap-4 rounded-full bg-[#0fff37] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#64ff4d]"
                >
                    Send message
                    <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                    </span>
                </button>
            </div>
            <div className='bg-black h-[30rem] rounded-2xl hidden md:flex-center w-fit p-5'>
                <div
                    className="group flex-center flex-col gap-8"
                >
                    <Logo square="h-20 w-20" dot="h-6 w-6" />

                    <span className="text-sm font-bold tracking-[0.2em] text-white">
                        INSIGHT<span className="text-[#0fff37]">STREAM</span>
                    </span>
                    <span className="text-center text-[10px] text-white bg-[#00530e] font-bold p-2 rounded-full">
                        #WE_GOT_YOU
                    </span>
                </div>
            </div>
        </form>
    )
}

export default ContactForm