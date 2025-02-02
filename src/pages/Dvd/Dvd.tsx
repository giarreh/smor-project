import { useState, useEffect, useCallback } from 'react';
import { useDvdScreensaver, DvdScreensaver } from 'react-dvd-screensaver';
import './Dvd.css';

export default function Dvd() {
  const { containerRef } = useDvdScreensaver();
  const [componentImpactCount, setComponentImpactCount] = useState(0);

  const getRandomColor = useCallback(() => {
    if (componentImpactCount <= 1) {
      return '#fdff94';
    }
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
  }, [componentImpactCount]);

  const handleComponentImpactCount = useCallback((count: number) => {
    setComponentImpactCount((prevCount) => {
      if (prevCount !== count) {
        document.body.style.backgroundColor = getRandomColor();
        return count;
      }
      return prevCount;
    });
  }, [getRandomColor]);

  useEffect(() => {
    const originalBackground = document.body.style.backgroundColor; // Capture original background
  
    return () => {
      document.body.style.backgroundColor = originalBackground; // Reset on unmount
    };
  }, []);

  return (
    <div ref={containerRef}>
      <h2>Impact count:</h2>
      <h2>{componentImpactCount}</h2>
      <div className="component-parent">
        <DvdScreensaver  speed={0.5} impactCallback={handleComponentImpactCount}>
          <img src="./smor.png" alt="" height={50} />
        </DvdScreensaver>
      </div>
    </div>
  );
}
