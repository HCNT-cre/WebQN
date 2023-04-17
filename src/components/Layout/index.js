import { useState } from 'react'
import Header from './Header'
import SideBar from './Sidebar'
const Layout = ({ children }) => {
    const [sideBarWidth, setSideBarWidth] = useState(250)
    return (
        <>
            <Header sideBarWidth={sideBarWidth} setSideBarWidth={setSideBarWidth} />
            <SideBar sideBarWidth={sideBarWidth} />

            <div className={`${sideBarWidth === 250 ? "ml-[250px] w-[calc(100%-250px)]" : "ml-[80px] w-[calc(100%-80px)]"} mt-[20px] flex`}>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;