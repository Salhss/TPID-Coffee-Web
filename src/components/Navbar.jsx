import { Link, useLocation } from "react-router-dom"
import homeLogoActive from "../assets/home1.png"
import homeLogoInactive from "../assets/home2.png"
import menuLogoActive from "../assets/menu1.png"
import menuLogoInactive from "../assets/menu2.png"

export default function Navbar() {
    const {pathname} = useLocation()
    return (
        <div className=" sticky z-20 bottom-0 h-16 shadow-2xl shadow-gray-700">
            <div className="flex items-center justify-around h-full">
                <Link to={'/'} className="flex flex-col items-center cursor-pointer">
                    {pathname === '/' ? <img src={homeLogoActive} className=" w-5"/> : <img src={homeLogoInactive} className=" w-5"/>}
                    <p className={`text-xs font-semibold ${pathname === '/' ? 'text-gray-800': 'text-gray-500'}`}>Home</p>
                </Link>
                <Link to={'/menu'} className="flex flex-col items-center cursor-pointer">
                {pathname === '/menu' ? <img src={menuLogoActive} className=" w-5"/> : <img src={menuLogoInactive} className=" w-5"/>}
                    <p className={`text-xs font-semibold ${pathname === '/menu' ? 'text-gray-800': 'text-gray-500'}`}>Menu</p>
                </Link>
            </div>
        </div>
    )
}