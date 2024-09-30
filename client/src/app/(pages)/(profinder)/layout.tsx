



import Navbar from '@/components/Navbar/page'

// import '../../globals.css'
import '../../globals.css'
import Footer from '@/components/Footer'


export default function ProfinderLayout({children}:{children:React.ReactNode}){
    return(
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}