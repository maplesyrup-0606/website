import { useRef, useEffect } from 'react';
import styles from './Platform.module.css';
import { PLATFORMS, GROUND_Y } from '../data/content';

export default function Platforms({ activePlatform, onOpen, isChaos }) {
  const platformRefs = useRef([]);
  const velRef       = useRef(PLATFORMS.map(() => ({ vx: 0, vy: 0 })));
  const posRef       = useRef(PLATFORMS.map(p => ({ x: p.xPct, y: p.y })));
  const modeRef      = useRef('idle'); // 'chaos' | 'returning' | 'idle'
  const rafRef       = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    if (isChaos) {
      modeRef.current = 'chaos';

      // Give each platform a random velocity with a minimum speed
      velRef.current = PLATFORMS.map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 0.45;
        return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
      });

      const tick = () => {
        if (modeRef.current !== 'chaos') return;

        PLATFORMS.forEach((p, i) => {
          const pos = posRef.current[i];
          const vel = velRef.current[i];

          pos.x += vel.vx;
          pos.y += vel.vy;

          // Bounce off edges
          if (pos.x < 0)                    { pos.x = 0;                    vel.vx =  Math.abs(vel.vx); }
          if (pos.x + p.widthPct > 100)     { pos.x = 100 - p.widthPct;    vel.vx = -Math.abs(vel.vx); }
          if (pos.y < 2)                    { pos.y = 2;                    vel.vy =  Math.abs(vel.vy); }
          if (pos.y > GROUND_Y - 8)         { pos.y = GROUND_Y - 8;        vel.vy = -Math.abs(vel.vy); }

          const el = platformRefs.current[i];
          if (el) { el.style.left = `${pos.x}%`; el.style.top = `${pos.y}%`; }
        });

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

    } else {
      modeRef.current = 'returning';

      const tick = () => {
        if (modeRef.current !== 'returning') return;

        let allDone = true;

        PLATFORMS.forEach((p, i) => {
          const pos = posRef.current[i];
          const dx  = p.xPct - pos.x;
          const dy  = p.y    - pos.y;

          if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
            allDone = false;
            pos.x += dx * 0.04;
            pos.y += dy * 0.04;
          } else {
            pos.x = p.xPct;
            pos.y = p.y;
          }

          const el = platformRefs.current[i];
          if (el) { el.style.left = `${pos.x}%`; el.style.top = `${pos.y}%`; }
        });

        if (!allDone) rafRef.current = requestAnimationFrame(tick);
        else          modeRef.current = 'idle';
      };

      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isChaos]);

  return (
    <>
      {PLATFORMS.map((p, i) => (
        <div
          key={p.id}
          ref={el => { platformRefs.current[i] = el; }}
          className={`${styles.platform} ${activePlatform === p.id ? styles.active : ''}`}
          style={{ left: `${p.xPct}%`, top: `${p.y}%`, width: `${p.widthPct}%`, '--color': p.color }}
          onClick={() => onOpen(p.id)}
        >
          <span className={styles.emoji}>{p.emoji}</span>
          <span className={styles.label} style={{ color: p.color }}>{p.label}</span>
          {activePlatform === p.id && (
            <span className={styles.enterHint}>[ ENTER ]</span>
          )}
        </div>
      ))}

      <div className={styles.ground} style={{ top: `${GROUND_Y}%` }} />
    </>
  );
}
