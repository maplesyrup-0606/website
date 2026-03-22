import { useEffect, useRef, useCallback } from 'react';
import { GROUND_Y, PLATFORMS } from '../data/content';

// Reference resolution the constants were tuned for
const REF_W = 1050;
const REF_H = 600;

const BALL_RADIUS  = 18;
const BASE_BOUNCE  = 11;
const BASE_JUMP    = -13;
const BASE_SPEED   = 4;
const BASE_GRAVITY = 0.5;

export function useGamePhysics({ worldRef, onLand, onLeave, touchRef }) {
  const stateRef = useRef({
    x: window.innerWidth * 0.09,
    y: window.innerHeight * 0.33,
    vx: 0,
    vy: 0,
    activePlatform: null,
    maxJumps: 1,
    jumpsLeft: 1,
    keys: {},
    jumpWasPressed: false,
    frameId: null,
  });

  const ballRef   = useRef(null);
  const shadowRef = useRef(null);

  const onLandRef  = useRef(onLand);
  const onLeaveRef = useRef(onLeave);
  useEffect(() => { onLandRef.current  = onLand;  }, [onLand]);
  useEffect(() => { onLeaveRef.current = onLeave; }, [onLeave]);

  useEffect(() => {
    const s = stateRef.current;

    const onKeyDown = (e) => {
      s.keys[e.code] = true;
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyA','KeyW','KeyD','KeyS'].includes(e.code)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => { s.keys[e.code] = false; };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);

    const tick = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      // Scale physics to viewport so feel is consistent at any resolution
      const sx = ww / REF_W;
      const sy = wh / REF_H;

      const MOVE_SPEED   =  BASE_SPEED   * sx;
      const JUMP_FORCE   =  BASE_JUMP    * sy;
      const FIXED_BOUNCE =  BASE_BOUNCE  * sy;
      const GRAVITY      =  BASE_GRAVITY * sy;

      const groundY = (GROUND_Y / 100) * wh - BALL_RADIUS;
      const touch   = touchRef?.current ?? {};

      // Horizontal movement
      if      (s.keys['ArrowLeft']  || s.keys['KeyA'] || touch.left)  s.vx = -MOVE_SPEED;
      else if (s.keys['ArrowRight'] || s.keys['KeyD'] || touch.right) s.vx =  MOVE_SPEED;
      else s.vx *= 0.85;

      // Jump (edge-triggered)
      const jumpPressed = s.keys['ArrowUp'] || s.keys['KeyW'] || s.keys['Space'] || touch.jump;
      if (jumpPressed && !s.jumpWasPressed && s.jumpsLeft > 0) {
        s.vy = JUMP_FORCE;
        s.jumpsLeft--;
      }
      s.jumpWasPressed = jumpPressed;

      // Gravity
      s.vy += GRAVITY;

      // Move
      s.x += s.vx;
      s.y += s.vy;

      // Clamp horizontal to viewport
      s.x = Math.max(BALL_RADIUS, Math.min(ww - BALL_RADIUS, s.x));

      // Ground → fixed bounce
      if (s.y >= groundY) {
        s.y         = groundY;
        s.vy        = -FIXED_BOUNCE;
        s.jumpsLeft = s.maxJumps;
        if (s.activePlatform !== null) {
          s.activePlatform = null;
          onLeaveRef.current?.();
        }
      }

      // Platform collision → fixed bounce
      if (s.vy >= 0) {
        for (const p of PLATFORMS) {
          const px  = p.xPct    * ww / 100;
          const pw  = p.widthPct * ww / 100;
          const top = (p.y / 100) * wh;

          const bL = s.x - BALL_RADIUS, bR = s.x + BALL_RADIUS;
          const bB = s.y + BALL_RADIUS;
          const bT = s.y - BALL_RADIUS;

          if (bR > px + 4 && bL < px + pw - 4 &&
              bB >= top && bB <= top + 20 + s.vy && bT < top + 16) {
            s.y         = top - BALL_RADIUS;
            s.vy        = -FIXED_BOUNCE;
            s.jumpsLeft = s.maxJumps;
            if (s.activePlatform !== p.id) {
              s.activePlatform = p.id;
              onLandRef.current?.(p.id);
            }
            break;
          }
        }
      }

      // Render ball
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${s.x - BALL_RADIUS}px, ${s.y - BALL_RADIUS}px)`;
      }

      // Shadow
      if (shadowRef.current) {
        const shadowY = (GROUND_Y / 100) * wh;
        const dist    = Math.max(0, shadowY - (s.y + BALL_RADIUS));
        const scale   = Math.max(0.2, 1 - dist / (wh * 0.5));
        const opacity = Math.max(0.05, 0.35 - dist / (wh * 1.0));
        shadowRef.current.style.transform = `translate(${s.x - 18}px, ${shadowY + 4}px) scaleX(${scale})`;
        shadowRef.current.style.opacity   = opacity;
      }

      s.frameId = requestAnimationFrame(tick);
    };

    s.frameId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      cancelAnimationFrame(s.frameId);
    };
  }, [worldRef, touchRef]);

  return { ballRef, shadowRef };
}
