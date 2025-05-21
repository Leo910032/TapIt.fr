// app/dashboard/layout.jsx - Fixed version
import { Inter } from 'next/font/google'
import NavBar from '../components/General Components/NavBar'
import CheckSession from './general components/CheckSession'
import { Toaster } from 'react-hot-toast'
import Preview from './general components/Preview'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Tapit.fr | Dashboard',
    description: 'Une nouvelle façon de communiquer avec vos clients.',
}

export default function DashboardLayout({ children }) {
    return (
        // Remove html and body tags, as they're already in the parent layout
        <div className='w-screen h-screen max-w-screen max-h-screen overflow-y-auto relative bg-black bg-opacity-[.05] p-2 flex flex-col'>
            <Toaster position="bottom-right" />
            <NavBar />
            <CheckSession />

            <div className="flex sm:px-3 px-2 h-full overflow-y-hidden">
                {children}
                <Preview />
            </div>
        </div>
    )
}