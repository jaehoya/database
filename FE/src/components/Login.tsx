import { useState } from "react";
import API_URL from '../config';


interface LoginProps {
    onLogin: (isAdmin: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {

    const [name, setName] = useState('');
    const [lastChat, setLastChat] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastChat }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                console.log('Login successful, token stored:', data.token);
                alert('로그인 성공!');
                onLogin(data.isAdmin);
            } else {
                console.error('Login failed');
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('로그인 중 오류 발생');
        }

        setName('');
        setLastChat('');
    }

    return (
        <div className="paper">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#5d4037', margin: 0 }}>편지함</h1>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="이름" value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="마지막 카톡" value={lastChat}
                    onChange={(e) => setLastChat(e.target.value)} />
                <button type="submit" style={{ marginTop: '20px' }}>확인하기</button>
            </form>
        </div>
    )
}