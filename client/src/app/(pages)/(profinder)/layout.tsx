



import Navbar from '@/components/Navbar/page'

// import '../../globals.css'
import '../../globals.css'


export default function ProfinderLayout({children}:{children:React.ReactNode}){
    return(
        <>
            <Navbar />
            {children}
        </>
    )
}