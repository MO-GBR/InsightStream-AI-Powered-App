import ActionButton from "./ActionButton";
import ToggleMenu from "./ToggleMenu";

const Navbar = async () => {
    return (
        <nav className='w-full border-b border-gray-600 p-3 bg-gray-800 flex items-center justify-between max-lg:flex-col'>
            <div className="flex-center">
                <ToggleMenu />
            </div>
            <ActionButton />
        </nav>
    )
}

export default Navbar