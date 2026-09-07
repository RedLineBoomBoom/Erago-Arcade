/**
 * antiInspectWatchdog.ts
 *
 * Bitcoin-grade DOM MutationObserver Anti-Inspect Watchdog.
 * Protects visual coin balances and arcade financial elements against
 * DevTools "Inspect Element" (DOM manipulation, text node editing, innerHTML injection).
 *
 * It validates that the visual DOM text always matches the cryptographically verified ledger.
 * Legitimate React state transitions (e.g. 10-minute loyalty reward +100, trivia roll -10, mini-game reward)
 * are recognized by cross-checking with the canonical CurrencyManager ledger, completely
 * preventing false-positive tamper warnings during normal gameplay and idle rewards.
 */

import { useEffect, useLayoutEffect, useRef } from 'react';
import { currencyManager } from './currencyManager';

export function useAntiTamperText<T extends HTMLElement = HTMLSpanElement>(
  targetText: string,
  contextLabel: string
) {
  const elementRef = useRef<T | null>(null);
  const expectedTextRef = useRef<string>(targetText);
  const observerRef = useRef<MutationObserver | null>(null);

  // Synchronously update expected text during render
  expectedTextRef.current = targetText;

  // Synchronously ensure DOM text matches target before browser paints
  useLayoutEffect(() => {
    expectedTextRef.current = targetText;
    const el = elementRef.current;
    if (el && el.textContent !== targetText) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      el.textContent = targetText;
      if (observerRef.current) {
        observerRef.current.observe(el, {
          characterData: true,
          childList: true,
          subtree: true,
          attributes: false,
        });
      }
    }
  }, [targetText]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      const currentRaw = el.textContent ?? '';
      const currentText = currentRaw.trim();
      const expectedText = expectedTextRef.current.trim();

      // 1. If DOM matches our current expected text, it's 100% valid
      if (currentText === expectedText) {
        return;
      }

      // 2. Canonical Ledger Cross-Verification:
      // Does currentText match the real coin balance from the verified cryptographic ledger?
      // (Handles legitimate React update transitions between ticks, time rewards, rolls)
      const canonicalCoins = currencyManager.getCoins();
      const validVariants = new Set([
        canonicalCoins.toLocaleString(),
        `${canonicalCoins.toLocaleString()} COINS`,
        `${canonicalCoins.toLocaleString()}`,
        String(canonicalCoins),
        expectedText,
      ]);

      if (validVariants.has(currentText)) {
        // It's a legitimate value from CurrencyManager! Synchronize expected and return safely.
        expectedTextRef.current = currentText;
        return;
      }

      // 3. True Tamper Attempt Detected!
      // (e.g. user inspected element and typed '999,999' or arbitrary html)
      observer.disconnect();
      el.textContent = expectedText;
      observer.observe(el, {
        characterData: true,
        childList: true,
        subtree: true,
        attributes: false,
      });

      currencyManager.tripTamper(
        `Manipulasi DOM terdeteksi pada ${contextLabel} via DevTools Inspect Element (Mencoba mengubah "${expectedText}" menjadi "${currentText}")`
      );
    });

    observerRef.current = observer;

    observer.observe(el, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
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
  let observer: MutationObserver | null = null;

  observer = new MutationObserver(() => {
    const currentText = (element.textContent ?? '').trim();
    const expected = getExpectedText().trim();

    if (currentText === expected) return;

    const canonicalCoins = currencyManager.getCoins();
    const validVariants = new Set([
      canonicalCoins.toLocaleString(),
      `${canonicalCoins.toLocaleString()} COINS`,
      String(canonicalCoins),
      expected,
    ]);

    if (validVariants.has(currentText)) return;

    observer?.disconnect();
    element.textContent = expected;
    observer?.observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: false,
    });

    currencyManager.tripTamper(
      `Manipulasi DOM terdeteksi pada ${contextLabel} via DevTools Inspect Element (Mencoba mengubah "${expected}" menjadi "${currentText}")`
    );
  });

  observer.observe(element, {
    characterData: true,
    childList: true,
    subtree: true,
    attributes: false,
  });

  return () => observer.disconnect();
}
