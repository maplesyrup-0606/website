import styles from './Ball.module.css';

export default function Ball({ ballRef, shadowRef }) {
  return (
    <>
      {/* Shadow */}
      <div ref={shadowRef} className={styles.shadow} />
      {/* Ball */}
      <div ref={ballRef} className={styles.ball}>
        <div className={styles.shine} />
        <div className={styles.eye} />
      </div>
    </>
  );
}
