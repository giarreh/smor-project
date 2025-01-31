import {useState, useEffect} from 'react'
import { useDvdScreensaver, DvdScreensaver } from 'react-dvd-screensaver'
import './Dvd.css'
export default function Dvd() {
  const {containerRef} = useDvdScreensaver({
    speed:0.5,
  
  });
  const [componentImpactCount, setComponentImpactCount] = useState<number>(0);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    if(componentImpactCount <= 1){
      color = "#fdff94"
    }


    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleComponentImpactCount = (count: number) => {
    setComponentImpactCount(count);
    document.body.style.backgroundColor = getRandomColor(); 
  };

  // Reset background color when component unmounts
  useEffect(() => {
    const originalBackground = document.body.style.backgroundColor; 

    return () => {
      document.body.style.backgroundColor = originalBackground;
    };
  }, []);


  return (
    <div ref={containerRef}>
      <h2>impact count: {componentImpactCount}</h2>
      <div className="component-parent">
        <DvdScreensaver speed={2}  impactCallback={handleComponentImpactCount}
          
        >
          <img src="./smor.png" alt="" height={50}/>
        </DvdScreensaver>
      </div>
    </div>
  )
}
