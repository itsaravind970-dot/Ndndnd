
export enum AppState {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CARD_OPENED = 'CARD_OPENED',
  CELEBRATION = 'CELEBRATION'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}
