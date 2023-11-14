import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'navy',
      barWidth: 2,
      barRadius: 3,
      responsive: true,
      height: 100,
      // If you want to use the MediaElement backend:
      backend: 'MediaElement',
    });

    wavesurfer.current.load(url);

    // Clean up on unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
  };

  // Add more controls as necessary

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <button onClick={handlePlayPause}>Play/Pause</button>
      {/* Add more controls as necessary */}
    </div>
  );
}

export default Waveform;
