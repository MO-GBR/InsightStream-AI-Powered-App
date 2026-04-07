'use client' // Error boundaries must be Client Components
 
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
	    // Log the error to an error reporting service
	    console.error('>>>>>>', error.message);
	}, [error])
	
	return (
	    <div className='flex-center h-screen gap-5'>
			<Image
				src='/roadmap/image-2.png'
				alt='Error'
				width={500}
				height={500}
			/>
		    <div>
				<div className='mb-6 flex items-center gap-2'>
					<Image
						src='/logo.svg'
						alt='Logo'
						width={50}
						height={50}
					/>
					<p className='font-bold font-mono'>InsightSream</p>
				</div>
				<h2 className='text-2xl font-bold'>Something went wrong!</h2>
				<p className='text-red-600'>{error.message}</p>
		    	<button
		    	    onClick={
				        // Attempt to recover by trying to re-render the segment
				        () => reset()
		    	    }
					className='p-3 bg-gray-900 rounded-2xl mt-3'
		    	> Try again </button>
			</div>
		</div>
	)
}