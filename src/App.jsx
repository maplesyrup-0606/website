import { useState, useRef, useCallback, useEffect } from 'react';
import Background from './components/Background';
import Ball from './components/Ball';
import Platforms from './components/Platform';
import SectionPanel from './components/SectionPanel';
import HUD from './components/HUD';
import TouchControls from './components/TouchControls';
import { useGamePhysics } from './hooks/useGamePhysics';
import styles from './App.module.css';

export default function App() {
  const worldRef = useRef(null);
  const touchRef = useRef({ left: false, right: false, jump: false });

  const [activePlatform, setActivePlatform] = useState(null);
  const [openSection, setOpenSection]       = useState(null);
  const [isChaos, setIsChaos]               = useState(false);

  const handleLand  = useCallback((id) => setActivePlatform(id), []);
  const handleLeave = useCallback(() => setActivePlatform(null), []);

  const { ballRef, shadowRef } = useGamePhysics({
    worldRef,
    onLand:   handleLand,
    onLeave:  handleLeave,
    touchRef,
  });

  // Enter key opens panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Enter' && activePlatform) setOpenSection(activePlatform);
      if (e.code === 'Escape') setOpenSection(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePlatform]);

  return (
    <div className={styles.viewport}>
      {/* Name header */}
      <div className={styles.heroTitle}>
        <span className={styles.name}>MERCURY MCINDOE</span>
      </div>

      {/* Game world */}
      <div className={styles.worldWrapper}>
        <div ref={worldRef} className={styles.world}>
          <Background />
          <Platforms activePlatform={activePlatform} onOpen={setOpenSection} isChaos={isChaos} />
          <Ball ballRef={ballRef} shadowRef={shadowRef} />
        </div>
      </div>

      {/* Chaos button */}
      <button
        className={`${styles.chaosBtn} ${isChaos ? styles.chaosBtnActive : ''}`}
        onClick={() => setIsChaos(c => !c)}
      >
        {isChaos ? '🌀 CALM' : '🌀 CHAOS'}
      </button>

      {/* HUD */}
      <HUD activePlatform={activePlatform} />

      {/* Mobile touch controls */}
      <TouchControls touchRef={touchRef} activePlatform={activePlatform} onOpen={setOpenSection} />

      {/* Section panel */}
      {openSection && (
        <SectionPanel sectionId={openSection} onClose={() => setOpenSection(null)} />
      )}
    </div>
  );
}
