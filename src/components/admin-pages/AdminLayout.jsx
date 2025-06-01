// all-components/admin-panel-page/AdminLayout.jsx
import React from 'react';

import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="pt-10 p-0 md:p-2">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
