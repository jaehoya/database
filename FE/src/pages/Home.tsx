import { useState } from 'react';
import Login from '../components/Login';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

export default function Home() {
    const [view, setView] = useState<'login' | 'admin' | 'user'>('login');

    const handleLogin = (isAdmin: boolean) => {
        setView(isAdmin ? 'admin' : 'user');
    };

    return (
        <div>
            {view === 'login' && <Login onLogin={handleLogin} />}
            {view === 'admin' && <AdminDashboard />}
            {view === 'user' && <UserDashboard />}
        </div>
    )
}