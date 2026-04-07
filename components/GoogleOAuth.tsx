import { googleLoginAction } from '@/lib/actions/user.action'

const GoogleOAuth = () => {
    return (
        <div className='flex-center w-full'>
            <form
                className='flex-center'
                action={googleLoginAction}
            >
                <button className='border rounded-xl bg-gray-900 border-violet-950 text-violet-900 font-bold py-2 px-7' type='submit'>Sign In with Google</button>
            </form>
        </div>
    )
}

export default GoogleOAuth