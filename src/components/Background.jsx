import { useMemo } from 'react';
import styles from './Background.module.css';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x:       (i * 137.5) % 1050,
  y:       (i * 97.3)  % 85,
  size:    i % 5 === 0 ? 3 : 2,
  opacity: 0.3 + (i % 10) * 0.05,
  delay:   (i % 30) * 0.1,
}));

export default function Background() {
  return (
    <div className={styles.bg}>
      <div className={styles.grid} />
      {STARS.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            left:           s.x,
            top:            `${s.y}%`,
            width:          s.size,
            height:         s.size,
            opacity:        s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <div className={styles.horizonGlow} />
      <div className={styles.scanlines} />
    </div>
  );
}
