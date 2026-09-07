/**
 * antiInspectWatchdog.ts
 *
 * Bitcoin-grade DOM MutationObserver Anti-Inspect Watchdog.
 * Protects visual coin balances and arcade financial elements against
 * DevTools "Inspect Element" (DOM manipulation, text node editing, innerHTML injection).
 *
 * When an attacker double-clicks a balance span in DevTools and edits the text
 * (e.g. from 2,000 to 999,999), the MutationObserver immediately intercepts the change,
 * synchronously restores the verified balance, and trips the security ledger tamper alert.
 */

import { useEffect, useRef } from 'react';
import { currencyManager } from './currencyManager';

export function useAntiTamperText<T extends HTMLElement = HTMLSpanElement>(
  targetText: string,
  contextLabel: string
) {
  const elementRef = useRef<T | null>(null);
  const expectedTextRef = useRef<string>(targetText);
  const isSelfHealingRef = useRef<boolean>(false);

  // Keep expected text synchronized with trusted React state
  useEffect(() => {
    expectedTextRef.current = targetText;
    const el = elementRef.current;
    if (el && el.textContent !== targetText) {
      isSelfHealingRef.current = true;
      el.textContent = targetText;
      isSelfHealingRef.current = false;
    }
  }, [targetText]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      if (isSelfHealingRef.current) return;

      const currentText = el.textContent ?? '';
      const target = expectedTextRef.current;

      if (currentText !== target) {
        // DevTools Inspect Element attempted to tamper with visual text!
        isSelfHealingRef.current = true;
        el.textContent = target;
        isSelfHealingRef.current = false;

        currencyManager.tripTamper(
          `Manipulasi DOM terdeteksi pada ${contextLabel} via DevTools Inspect Element (Mencoba mengubah "${target}" menjadi "${currentText}")`
        );
      }
    });

    observer.observe(el, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      observer.disconnect();
    };
  }, [contextLabel]);

  return elementRef;
}

/**
 * Attaches an anti-inspect watchdog directly to any DOM element.
 * Useful for imperative elements or integration testing.
 */
export function attachAntiInspectWatchdog(
  element: HTMLElement,
  getExpectedText: () => string,
  contextLabel: string
): () => void {
  let isHealing = false;

  const observer = new MutationObserver(() => {
    if (isHealing) return;

    const currentText = element.textContent ?? '';
    const expected = getExpectedText();

    if (currentText !== expected) {
      isHealing = true;
      element.textContent = expected;
      isHealing = false;

      currencyManager.tripTamper(
        `Manipulasi DOM terdeteksi pada ${contextLabel} via DevTools Inspect Element (Mencoba mengubah "${expected}" menjadi "${currentText}")`
      );
    }
  });

  observer.observe(element, {
    characterData: true,
    childList: true,
    subtree: true,
    attributes: false,
  });

  return () => observer.disconnect();
}
