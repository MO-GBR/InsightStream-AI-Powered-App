import React from 'react'

const VaultStats = () => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='rounded-xl border p-4'>
                <p className='text-muted-foreground text-sm'>Document</p>
                <p className='font-bold text-2xl'>3</p>
            </div>
            <div className='rounded-xl border p-4'>
                <p className='text-muted-foreground text-sm'>Tokens Indexed</p>
                <p className='font-bold text-2xl'>45K</p>
            </div>
            <div className='rounded-xl border p-4'>
                <p className='text-muted-foreground text-sm'>Tokens Indexed</p>
                <p className='font-bold text-2xl'>2m ago</p>
            </div>
        </div>
    )
}

export default VaultStats