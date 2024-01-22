import './App.css';
import { useEffect, useState, useMemo, useCallback } from 'react';

function App() {
  const [activeKey, setActiveKey] = useState('');
  const [powerOn, setPowerOn] = useState(true);
  const [soundType, setSoundType] = useState('drums');

  const togglePower = () => {
    setPowerOn(!powerOn);
    setActiveKey(' ')
  };

  const toggleSoundType = () => {
    if (soundType === 'drums') {
      setSoundType('piano');
    } else {
      setSoundType('drums');
    }
  };
  

const pads = useMemo(() => [
  {
    keyCode: 81,
    text: "Q",
    name: soundType === 'drums' ? "Heater 1" : "Chord 1",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    name: soundType === 'drums' ? "Heater 2" : "Chord 2",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    name: soundType === 'drums' ? "Heater 3" : "Chord 3",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    name: soundType === 'drums' ? "Heater 4" : "Give us a light",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    name: soundType === 'drums' ? "Heater 6" : "Dry Ohh",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    name: soundType === 'drums' ? "Dsc Oh" : "Bld H1",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    name: soundType === 'drums' ? "Kick n Hat" : "Punchy Kick 1",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    name: soundType === 'drums' ? "RP4 Kick 1" : "Side Stick 1",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    name: soundType === 'drums' ? "Cev H2" : "Brk Snr",
    src: soundType === 'drums' ? "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  },
], [soundType]);


  const music = useCallback((selector) => {
    if (powerOn) {
      const pad = pads.find((pad) => pad.text === selector);

      if (pad) {
        const audio = document.getElementById(pad.text);

        if (audio) {
          audio.play();
          setActiveKey(pad.name);
          const pressedKeyElement = document.getElementById(pad.src);
          pressedKeyElement.classList.add('pressed');
          setTimeout(() => {
            pressedKeyElement.classList.remove('pressed');
          }, 300);

        }
      }
    }
  }, [powerOn, pads]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      music(event.key.toUpperCase());
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [music]);

  return (
    <div className='App'>
  <div id="drum-machine">
    <div id="display">
      <div className="switch-label">
        <span>Off</span>
        <label className="switch power">
          <input type="checkbox" checked={powerOn} onChange={togglePower} />
          <span className="slider round"></span>
        </label>
        <span>On</span>
      </div>
      {activeKey}
    </div>
    <div className='drum-pads'>
      {pads.map((pad) => (
        <div
          key={pad.src}
          onClick={() => {
            music(pad.text);
          }}
          className='drum-pad'
          id={pad.src}
        >
          {pad.text}
          <audio src={pad.src} className='clip' id={pad.text}></audio>
        </div>
      ))}
    </div>
    <div className="switch-label" id="type">
        <span>Drums</span>
        <label className="switch sound-type">
          <input type="checkbox" checked={soundType === 'piano'} onChange={toggleSoundType} />
          <span className="slider round"></span>
        </label>
        <span>Piano</span>
      </div>
  </div>
</div>

  );
}

export default App;
