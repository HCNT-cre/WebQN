import Header from './Header'
import SideBar from './Sidebar'

const Layout = ({ childrent }) => {
    return (
        <>
            <Header/>
            <div>
                <SideBar/>
                <div>
                    {childrent}
                </div>
            </div>
        </>
    )
}

export default Layout;