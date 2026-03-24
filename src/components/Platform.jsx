import styles from './Platform.module.css';
import { PLATFORMS, GROUND_Y } from '../data/content';

export default function Platforms({ activePlatform, onOpen }) {
  return (
    <>
      {PLATFORMS.map((p) => (
        <div
          key={p.id}
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
