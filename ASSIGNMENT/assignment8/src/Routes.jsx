import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import AddBookPage from './Pages/Book/AddBookPage';
import BookDetailPage from './Pages/Book/BookDetailPage';
import AddMemberPage from './Pages/Member/AddMemberPage';
import MemberDetailPage from './Pages/Member/MemberDetailPage';
import BookPage from './Pages/Book/BookPage';
import MemberPage from './Pages/Member/MemberPage';
import BorrowPage from './Pages/Borrow/BorrowPage';
import AddBorrowPage from './Pages/Borrow/AddBorrowPage';
import SearchPage from './Pages/Book/SearchPage';
import InfiniteScrollList from './Pages/Book/InfiniteScrollList';
import Profile from './Pages/Profile';
import Login from './Pages/Auth/Login';
import PrivateRoute from './PrivateRoute';
import UserTable from './Pages/UserTable';
import Unauthorized from './Pages/Auth/Unauthorized';
import Register from './Pages/Auth/Register';
import UploadPage from './Pages/UploadPage';
import BookRequestPage from './Pages/Book/BookRequestPage';
import DashboardPage from './Pages/DashboardPage.jsx';
import ReportUsingReactPdf from './Pages/ReportUsingReactPdf.jsx';

const Routes = createBrowserRouter([
    {
        // {/* Route yang Membutuhkan Login (Semua User) */}
        element: <PrivateRoute allowedRoles={['Librarian', 'Library Manager', 'Library User']} />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/report",
                element: <ReportUsingReactPdf />,
            },
            {
                path: "/upload",
                element: <UploadPage />,
            },
            {
                path: "/book-request",
                element: <BookRequestPage />,
            }
        ],
    },
    {
        // {/* Route Khusus Librarian */}
        element: <PrivateRoute allowedRoles={['Librarian', 'Library Manager']} />,
        children: [
            {
                path: "/books",
                element: <BookPage />,
            },
            {
                path: "/books/add",
                element: <AddBookPage />,
            },
            {
                path: "/books/:bookId",
                element: <BookDetailPage />,
            },
        ]
    },
    {
        // {/* Route Khusus Library Manager */}
        element: <PrivateRoute allowedRoles={['Library Manager']} />,
        children: [
            {
                path: "/registerLink",
                element: <Register />,
            },
            {
                path: '/members',
                element: <MemberPage />
            },
            {
                path: '/members/add',
                element: <AddMemberPage />
            },
            {
                path: '/members/:userId',
                element: <MemberDetailPage />
            },
        ]
    },
    {/* Rute Publik */
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {/* Halaman Unauthorized */
                path: "/unauthorized",
                element: <Unauthorized />
            },
        ],
    },


    // {
    //     path: '/',
    //     element: <Layout />,
    //     children: [
    //         {
    //             path: '/',
    //             element: <HomePage />
    //         },
    //         {
    //             path: '/books',
    //             element: <BookPage />
    //         },
    //         {
    //             path: '/books/add',
    //             element: <AddBookPage />
    //         },
    //         {
    //             path: '/books/:bookId',
    //             element: <BookDetailPage />
    //         },
    //         {
    //             path: '/members',
    //             element: <MemberPage />
    //         },
    //         {
    //             path: '/members/add',
    //             element: <AddMemberPage />
    //         },
    //         {
    //             path: '/members/:userId',
    //             element: <MemberDetailPage />
    //         },
    //         {
    //             path: '/borrow',
    //             element: <BorrowPage />
    //         },
    //         {
    //             path: '/borrow/add',
    //             element: <AddBorrowPage />
    //         },
    //         {
    //             path: '/search',
    //             element: <SearchPage />
    //         },
    //         {
    //             path: '/infinitescroll',
    //             element: <InfiniteScrollList />
    //         }
    //     ]
    // }
]);

export default Routes;
