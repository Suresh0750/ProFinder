



export default function Layout ({children}:{children:React.ReactNode}){
    return(
        <>
         <div className="flex h-screen bg-gray-100 mt-[4em]">
            <aside className="w-64 bg-[#111826] shadow-md text-white">
                <div className="p-4">
                <h2 className="text-xl font-semibold text-white">Dashboard</h2>
                </div>
                <nav className="mt-4">
                <a href="#" className="block py-2 px-4 text-white active:bg-gray-200 hover:bg-gray-700">Profile</a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">Messages</a>
                {/* Add more navigation items as needed */}
                </nav>
            </aside>    
            {children}
         </div>
        </>
    )
}