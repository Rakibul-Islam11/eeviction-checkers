import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="text-xl font-bold text-center md:text-left">Admin Panel</div>
                <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm font-medium">
                    
                    <li>
                        <Link to="dashboard" className="hover:text-yellow-300">
                            Dashbroad
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
