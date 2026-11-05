/** All tunables in one place. Values are starting points validated by the e2e fixture corpus. */
export const GESTURE_GRACE_MS = 5000; // overlays appearing within this long after a trusted gesture are user-owned
export const SCAN_THROTTLE_MS = 250;
export const MAX_CLICKS_PER_MINUTE_PER_FRAME = 10;
export const MAX_ATTEMPTS_PER_SIGNATURE = 2;
export const REOPEN_WINDOW_MS = 10_000;
export const MIN_VIEWPORT_COVERAGE = 0.2; // generic overlay
export const MIN_Z_INDEX = 100; // generic fixed-like overlay
export const MAX_CONSECUTIVE_ERRORS = 5; // circuit breaker per frame
export const CIRCUIT_BREAKER_PAUSE_MS = 60_000;
export const MAX_FORM_INPUTS = 1; // overlays with more visible inputs are never auto-closed
