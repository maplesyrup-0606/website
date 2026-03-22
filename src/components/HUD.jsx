import styles from './HUD.module.css';

export default function HUD({ activePlatform }) {
  return (
    <div className={styles.hud}>
      <div className={styles.controls}>
        <span>← → MOVE</span>
        <span>↑ JUMP</span>
        {activePlatform && (
          <>
            <span className={styles.divider}>|</span>
            <span className={styles.hint}>[ ENTER ] OPEN</span>
          </>
        )}
      </div>
    </div>
  );
}
