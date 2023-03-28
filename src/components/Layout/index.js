import { useState } from 'react'
import Header from './Header'
import SideBar from './Sidebar'
const Layout = ({ children }) => {
    const [sideBarWidth, setSideBarWidth] = useState(300)
    return (
        <>
            <Header sideBarWidth={sideBarWidth} setSideBarWidth={setSideBarWidth} />
            <SideBar sideBarWidth={sideBarWidth} />

            <div className={`${sideBarWidth === 300 ? "ml-[300px] w-[calc(100%-300px)]" : "ml-[80px] w-[calc(100%-80px)]"} mt-[60px] flex`}>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;