import Logo from "../Logo";
import ActionButton from "./ActionButton";
import ToggleMenu from "./ToggleMenu";

const Navbar = async () => {
    
    return (
        <nav className='w-full border-b border-gray-600 p-3 bg-black flex items-center justify-between max-lg:flex-col'>
            <div className="group flex items-center gap-3">
                <Logo square="h-8 w-8" dot="h-2 w-2" />
            
                <span className="text-sm font-bold tracking-[0.2em] text-white">
                    INSIGHT<span className="text-[#0fff37]">STREAM</span>
                </span>
            </div>
            <div className="flex-center">
                <ToggleMenu />
            </div>
            <ActionButton />
        </nav>
    )
}

export default Navbar