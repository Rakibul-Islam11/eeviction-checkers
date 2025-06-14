
import { Link } from 'react-router-dom';

const AccessDenied = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
                <p className="text-lg text-gray-600 mb-6">
                    You don't have permission to access this page.
                </p>
                <Link
                    to="/"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;