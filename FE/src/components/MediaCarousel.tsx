import { useState, useRef } from 'react';
import API_URL from '../config';

interface MediaCarouselProps {
    media: string[];
}

export default function MediaCarousel({ media }: MediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
            setCurrentIndex(index);
        }
    };

    if (!media || media.length === 0) return null;

    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '30px' }}>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    borderRadius: '8px'
                }}
            >
                {media.map((url, index) => (
                    <div key={index} style={{
                        flex: '0 0 100%',
                        scrollSnapAlign: 'start',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f8f8f8'
                    }}>
                        {url.match(/\.(mp4|webm)$/i) ? (
                            <video
                                src={`${API_URL}${url}`}
                                controls
                                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                            />
                        ) : (
                            <img
                                src={`${API_URL}${url}`}
                                alt={`slide-${index}`}
                                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {media.length > 1 && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    pointerEvents: 'none'
                }}>
                    {currentIndex + 1} / {media.length}
                </div>
            )}
        </div>
    );
}
