import { useState, useEffect } from 'react';

import type { User, Letter, Reply } from '../types';

import API_URL from '../config';

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [newName, setNewName] = useState('');
    const [newLastChat, setNewLastChat] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [letterContent, setLetterContent] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [receivedAt, setReceivedAt] = useState('');
    const [userLetters, setUserLetters] = useState<Letter[]>([]);
    const [viewingLetters, setViewingLetters] = useState(false);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [viewingReplies, setViewingReplies] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchReplies = async () => {
        try {
            const res = await fetch(`${API_URL}/replies`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setReplies(data);
                setViewingReplies(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newName, lastChat: newLastChat })
            });
            if (res.ok) {
                alert('유저가 생성되었습니다!');
                setNewName('');
                setNewLastChat('');
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSendLetter = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        const formData = new FormData();
        formData.append('userId', selectedUser._id);
        formData.append('content', letterContent);
        if (receivedAt) {
            formData.append('receivedAt', receivedAt);
        }
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('media', files[i]);
            }
        }

        try {
            const res = await fetch(`${API_URL}/letters`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (res.ok) {
                alert('편지가 전송되었습니다!');
                setLetterContent('');
                setFiles(null);
                setReceivedAt('');
                setSelectedUser(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUserLetters = async (userId: string) => {
        try {
            const res = await fetch(`${API_URL}/letters/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUserLetters(data);
                setViewingLetters(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteLetter = async (letterId: string) => {
        if (!window.confirm('정말 이 편지를 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`${API_URL}/letters/${letterId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('편지가 삭제되었습니다.');
                if (selectedUser) fetchUserLetters(selectedUser._id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateLetter = async (letterId: string, currentContent: string) => {
        const newContent = window.prompt('편지 내용을 수정하세요:', currentContent);
        if (newContent === null) return;
        try {
            const res = await fetch(`${API_URL}/letters/${letterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newContent })
            });
            if (res.ok) {
                alert('수정되었습니다.');
                if (selectedUser) fetchUserLetters(selectedUser._id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('정말 이 유저를 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`${API_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('유저가 삭제되었습니다.');
                fetchUsers();
                if (selectedUser?._id === userId) setSelectedUser(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateUserLastChat = async (userId: string, currentLastChat: string) => {
        const newLastChat = window.prompt('새로운 마지막 카톡 내용을 입력하세요:', currentLastChat);
        if (newLastChat === null) return;
        try {
            const res = await fetch(`${API_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lastChat: newLastChat })
            });
            if (res.ok) {
                alert('수정되었습니다.');
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px', width: '90%', maxWidth: '1000px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#5d4037', margin: 0 }}>편지쓰기</h1>
                <div>
                    <button onClick={fetchReplies} style={{ backgroundColor: '#6d5a43', fontSize: '0.9rem', marginRight: '10px' }}>답장 보기</button>
                    <button onClick={handleLogout} style={{ backgroundColor: '#aaa', fontSize: '0.9rem' }}>로그아웃</button>
                </div>
            </div>

            <div className="paper">
                <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>유저 생성</h2>
                <form onSubmit={handleCreateUser}>
                    <input type="text" placeholder="이름" value={newName} onChange={e => setNewName(e.target.value)} required />
                    <input type="text" placeholder="마지막 카톡" value={newLastChat} onChange={e => setNewLastChat(e.target.value)} required />
                    <button type="submit">생성</button>
                </form>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="paper" style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>유저 목록</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {users.map(user => (
                            <li key={user._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #eee' }}>
                                <span>{user.name} <small style={{ color: '#888' }}>({user.lastChat})</small></span>
                                <div>
                                    <button onClick={() => { setSelectedUser(user); setViewingLetters(false); }} style={{ padding: '5px 10px', fontSize: '0.9rem', marginRight: '5px' }}>편지 쓰기</button>
                                    <button onClick={() => { setSelectedUser(user); fetchUserLetters(user._id); }} style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#6d5a43', marginRight: '5px' }}>보기</button>
                                    <button onClick={() => handleUpdateUserLastChat(user._id, user.lastChat)} style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#4CAF50', marginRight: '5px' }}>수정</button>
                                    <button onClick={() => handleDeleteUser(user._id)} style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#f44336' }}>삭제</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedUser && !viewingLetters && (
                    <div className="paper" style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>{selectedUser.name}에게 편지 쓰기</h2>
                        <form onSubmit={handleSendLetter}>
                            <label style={{ display: 'block', marginBottom: '10px', color: '#666' }}>날짜 (선택):</label>
                            <input
                                type="date"
                                value={receivedAt}
                                onChange={e => setReceivedAt(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            />
                            <textarea
                                value={letterContent}
                                onChange={e => setLetterContent(e.target.value)}
                                placeholder="편지 내용을 작성해주세요..."
                                rows={10}
                                style={{ width: '100%', lineHeight: '30px', background: 'transparent' }}
                                required
                            />
                            <br />
                            <input
                                type="file"
                                multiple
                                onChange={e => setFiles(e.target.files)}
                                accept="image/*,video/*"
                                style={{ marginTop: '10px' }}
                            />
                            <br />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit">편지 보내기</button>
                                <button type="button" onClick={() => setSelectedUser(null)} style={{ backgroundColor: '#aaa' }}>취소</button>
                            </div>
                        </form>
                    </div>
                )}

                {selectedUser && viewingLetters && (
                    <div className="paper" style={{ flex: 1, minWidth: '300px', maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                            <h2 style={{ margin: 0 }}>{selectedUser.name}의 편지함</h2>
                            <button onClick={() => setSelectedUser(null)} style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#aaa' }}>닫기</button>
                        </div>
                        {userLetters.length === 0 ? (
                            <p>편지가 없습니다.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {userLetters.map(letter => (
                                    <li key={letter._id} style={{ marginBottom: '20px', borderBottom: '1px dashed #eee', paddingBottom: '20px' }}>
                                        {letter.media.length > 0 && (
                                            <div style={{ marginBottom: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                {letter.media.map((url, idx) => (
                                                    <div key={idx} style={{ border: '1px solid #ddd', padding: '5px' }}>
                                                        {url.match(/\.(mp4|webm)$/i) ? (
                                                            <video src={`${API_URL}${url}`} controls style={{ maxWidth: '200px', maxHeight: '200px', display: 'block' }} />
                                                        ) : (
                                                            <img src={`${API_URL}${url}`} alt={`attachment-${idx}`} style={{ maxWidth: '200px', maxHeight: '200px', display: 'block' }} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{new Date(letter.receivedAt || letter.createdAt).toLocaleDateString()}</span>
                                            <div>
                                                <button onClick={() => handleUpdateLetter(letter._id, letter.content)} style={{ padding: '2px 5px', fontSize: '0.8rem', backgroundColor: '#4CAF50', marginRight: '5px', color: 'white', border: 'none', borderRadius: '3px' }}>수정</button>
                                                <button onClick={() => handleDeleteLetter(letter._id)} style={{ padding: '2px 5px', fontSize: '0.8rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px' }}>삭제</button>
                                            </div>
                                        </div>
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{letter.content}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {viewingReplies && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="paper" style={{ width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                            <h2 style={{ margin: 0 }}>받은 답장 목록</h2>
                            <button onClick={() => setViewingReplies(false)} style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#aaa' }}>닫기</button>
                        </div>
                        {replies.length === 0 ? (
                            <p>받은 답장이 없습니다.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {replies.map(reply => (
                                    <li key={reply._id} style={{ marginBottom: '20px', borderBottom: '1px dashed #eee', paddingBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{reply.userId?.name || '알 수 없음'}</span>
                                            <span style={{ fontSize: '0.9rem', color: '#888' }}>{new Date(reply.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ whiteSpace: 'pre-wrap', color: '#333' }}>{reply.content}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
