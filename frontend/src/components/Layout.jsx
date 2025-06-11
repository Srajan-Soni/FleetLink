import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="">
      <Header />
      <div className='max-w-full mt-5 px-4 sm:px-6 lg:px-6 py-4'>
        <Outlet />
      </div>
      
    </div>
  );
};

export default Layout;
