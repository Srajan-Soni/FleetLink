
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AddVehicle from './pages/AddVehicle';
import SearchBook from './pages/SearchBook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'add-vehicle', element: <AddVehicle /> },
      { path: 'search-book', element: <SearchBook /> },
      { index: true, element: <AddVehicle /> }, 
    ],
  },
]);

function App() {
  return(
  <>
   <RouterProvider router={router} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
  </>
  )
}

export default App;
