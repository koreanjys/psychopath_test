import { useEffect } from 'react';
import { questions } from '../../data/questions';
import { results } from '../../data/results';

interface ImagePreloaderProps {
  onComplete?: () => void;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const preloadImages = async () => {
      // 모든 이미지 URL 수집
      const imageUrls = [
        ...questions.map(q => q.image),
        ...results.map(r => r.image)
      ].filter(Boolean);

      console.log('Preloading images:', imageUrls.length);

      // 이미지 프리로딩
      const imagePromises = imageUrls.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log('Preloaded:', url);
            resolve();
          };
          img.onerror = () => {
            console.warn('Failed to preload:', url);
            resolve(); // 실패해도 계속 진행
          };
          img.src = url;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log('All images preloaded successfully');
        onComplete?.();
      } catch (error) {
        console.error('Image preloading error:', error);
        onComplete?.(); // 에러가 있어도 계속 진행
      }
    };

    preloadImages();
  }, [onComplete]);

  return null; // 렌더링하지 않음
};

export default ImagePreloader;
