import styles from './TouchControls.module.css';

export default function TouchControls({ touchRef }) {
  const press   = (key) => () => { touchRef.current[key] = true; };
  const release = (key) => () => { touchRef.current[key] = false; };

  return (
    <div className={styles.controls}>
      {/* Left side: movement buttons */}
      <div className={styles.dpad}>
        <button
          className={styles.btn}
          onPointerDown={press('left')}
          onPointerUp={release('left')}
          onPointerLeave={release('left')}
          onPointerCancel={release('left')}
          aria-label="Move left"
        >
          ◀
        </button>
        <button
          className={styles.btn}
          onPointerDown={press('right')}
          onPointerUp={release('right')}
          onPointerLeave={release('right')}
          onPointerCancel={release('right')}
          aria-label="Move right"
        >
          ▶
        </button>
      </div>

      {/* Right side: jump button */}
      <button
        className={`${styles.btn} ${styles.jump}`}
        onPointerDown={press('jump')}
        onPointerUp={release('jump')}
        onPointerLeave={release('jump')}
        onPointerCancel={release('jump')}
        aria-label="Jump"
      >
        ▲
      </button>
    </div>
  );
}
