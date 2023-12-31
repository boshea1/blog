import { useStoreActions, useStoreState } from "easy-peasy";
import { Outlet, Link } from "react-router-dom";
const Layout = () => {

const loggedIn = useStoreState((state)=>state.loggedIn)
const LogInOut = useStoreActions((actions) => actions.LogInOut)
const color = loggedIn ? 'bg-green-500':'bg-red-500'

    return (
      <>
      <div className="flex justify-end mr-8 mt-4">
      <button onClick={()=> LogInOut()} 
      className="mx-4 pb-1 px-2 border-b-2 hover:border-pink23">
        {loggedIn ? 'Log Out' : 'Log In'}
      </button>
      <h1 className={`${color} px-2 rounded`}>{loggedIn?'LOGGED IN':'LOGGED OUT'}</h1>
      </div>
        <nav className="flex justify-end mb-20">
          <ul className="flex justify-between mt-3 mr-3">
            <li className={`mx-4 pb-1 px-2 hover:border-blue-600 border-b-2`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`mx-4 pb-1 px-2 hover:border-red-600 border-b-2`}>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className={`mx-4 pb-1 px-2 hover:border-green-600 border-b-2`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </>
    )
  };
  
  export default Layout;