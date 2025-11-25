import { useState, useEffect } from 'react';
import type { Letter } from '../types';
import API_URL from '../config';
import MediaCarousel from '../components/MediaCarousel';

export default function UserDashboard() {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [replyContent, setReplyContent] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const res = await fetch(`${API_URL}/letters`, {
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

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim()) return;

        try {
            const res = await fetch(`${API_URL}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: replyContent })
            });

            if (res.ok) {
                alert('답장이 전송되었습니다!');
                setReplyContent('');
            } else {
                alert('답장 전송 실패');
            }
        } catch (err) {
            console.error(err);
            alert('오류 발생');
        }
    };

    return (
        <div style={{ padding: '10px 15px', width: '90%', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#5d4037', margin: 0, fontSize: '1.5rem' }}>from. 재호</h1>
                <button onClick={handleLogout} style={{ backgroundColor: '#aaa', fontSize: '0.9rem' }}>편지함 닫기</button>
            </div>

            {letters.length === 0 ? (
                <div className="paper" style={{ textAlign: 'center', color: '#888' }}>
                    <p>아직 도착한 편지가 없어요.</p>
                </div>
            ) : (
                letters.map(letter => (
                    <div key={letter._id} className="paper" style={{ marginBottom: '40px' }}>
                        {letter.media.length > 0 && (
                            <MediaCarousel media={letter.media} />
                        )}

                        <div style={{ minHeight: '120px', lineHeight: '30px', whiteSpace: 'pre-wrap', fontSize: '1em', color: '#333' }}>
                            {letter.content}
                        </div>

                        <div style={{ marginTop: '30px', textAlign: 'right', color: '#888', fontStyle: 'italic' }}>
                            {new Date(letter.receivedAt || letter.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))
            )}

            <div className="paper" style={{ marginTop: '60px', borderTop: '2px dashed #ccc', paddingTop: '40px' }}>
                <h2 style={{ color: '#5d4037', fontSize: '1.2rem', marginBottom: '20px' }}>답장 쓰기</h2>
                <form onSubmit={handleReplySubmit}>
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="하고 싶은 말을 적어주세요..."
                        style={{ width: '100%', height: '150px', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                    />
                    <button type="submit" style={{ width: '100%' }}>보내기</button>
                </form>
            </div>
        </div>
    );
}
