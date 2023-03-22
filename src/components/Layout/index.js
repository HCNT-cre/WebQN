import { useState } from 'react'
import Header from './Header'
import SideBar from './Sidebar'

const Layout = ({ children }) => {
    const [sideBarWidth, setSideBarWidth] = useState(200)
    return (
        <>
            <Header sideBarWidth={sideBarWidth} setSideBarWidth={setSideBarWidth}/>
            <SideBar sideBarWidth={sideBarWidth}/>

            <div className={`${sideBarWidth === 200 ? "ml-[200px] w-[calc(100%-200px)]" : "ml-[50px] w-[calc(100%-50px)]"} mt-[60px] flex`}>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;