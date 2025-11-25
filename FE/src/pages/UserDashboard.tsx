import { useState, useEffect } from 'react';

import type { Letter } from '../types';

export default function UserDashboard() {
    const [letters, setLetters] = useState<Letter[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const res = await fetch('http://localhost:3000/letters', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setLetters(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchLetters();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div style={{ padding: '20px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#5d4037', margin: 0 }}>내 편지함</h1>
                <button onClick={handleLogout} style={{ backgroundColor: '#aaa', fontSize: '0.9rem' }}>로그아웃</button>
            </div>

            {letters.length === 0 ? (
                <div className="paper" style={{ textAlign: 'center', color: '#888' }}>
                    <p>아직 도착한 편지가 없어요.</p>
                </div>
            ) : (
                letters.map(letter => (
                    <div key={letter._id} className="paper" style={{ marginBottom: '40px' }}>
                        {letter.media.length > 0 && (
                            <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {letter.media.map((url, index) => (
                                    <div key={index} style={{ border: '5px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                        {url.match(/\.(mp4|webm)$/i) ? (
                                            <video src={`http://localhost:3000${url}`} controls style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }} />
                                        ) : (
                                            <img src={`http://localhost:3000${url}`} alt="attachment" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ minHeight: '200px', lineHeight: '30px', whiteSpace: 'pre-wrap', fontSize: '1.2em', color: '#333' }}>
                            {letter.content}
                        </div>

                        <div style={{ marginTop: '30px', textAlign: 'right', color: '#888', fontStyle: 'italic' }}>
                            {new Date(letter.receivedAt || letter.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
