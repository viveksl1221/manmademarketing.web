"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

// framer-motion's own useReducedMotion() reads matchMedia synchronously on
// first client render, which differs from the server's default and causes
// a hydration mismatch for users with reduced motion enabled. This variant
// always agrees with the server on the first render via useSyncExternalStore,
// then corrects itself client-side once subscribed (a normal re-render, not
// a hydration check).
export default function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
