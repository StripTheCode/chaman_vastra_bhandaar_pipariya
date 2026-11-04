"use client";

import { useState, useEffect, useRef } from "react";

export const DEFAULT_SEARCH_PHRASES = [
  "Search for Sarees...",
  "Search for Lehengas...",
  "Search for Gowns...",
  "Search for Banarasi Silk Sarees...",
  "Search for M.P. Chanderi Handlooms...",
  "Search for Bridal Trousseau...",
  "Search for Designer Kurta Sets...",
  "Search for Pure Kanjivaram Silks...",
];

/**
 * Custom hook to create a smooth, natural typewriter effect for search placeholders.
 * Types character by character, pauses, then backspace-deletes, and moves to the next phrase.
 * Robust against component re-renders and cursor blinks using refs.
 */
export function useTypewriter({
  phrases = DEFAULT_SEARCH_PHRASES,
  typingSpeed = 75,
  deletingSpeed = 35,
  pauseDelay = 1800,
  switchDelay = 400,
  isActive = true,
} = {}) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Store options in refs so inline arrays/values never cause effect re-runs or timer cancellations
  const phrasesRef = useRef(phrases);
  phrasesRef.current = phrases;

  const typingSpeedRef = useRef(typingSpeed);
  typingSpeedRef.current = typingSpeed;

  const deletingSpeedRef = useRef(deletingSpeed);
  deletingSpeedRef.current = deletingSpeed;

  const pauseDelayRef = useRef(pauseDelay);
  pauseDelayRef.current = pauseDelay;

  const switchDelayRef = useRef(switchDelay);
  switchDelayRef.current = switchDelay;

  // Blinking cursor interval (500ms) - completely decoupled from typing logic
  useEffect(() => {
    if (!isActive) return;
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isActive]);

  // Main typing & backspacing state machine
  useEffect(() => {
    if (!isActive) return;

    const currentPhrases = phrasesRef.current;
    if (!currentPhrases || currentPhrases.length === 0) return;

    const currentPhrase = currentPhrases[phraseIndex % currentPhrases.length];
    let timer;

    if (!isDeleting) {
      // Forward typing mode
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeedRef.current);
      } else {
        // Phrase is fully typed: pause for pauseDelay (e.g. 1.8s) before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelayRef.current);
      }
    } else {
      // Deleting mode (backspace)
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeedRef.current);
      } else {
        // Phrase is fully cleared: pause briefly then switch to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % currentPhrases.length);
        }, switchDelayRef.current);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, isActive]);

  return {
    text: displayText,
    cursor: cursorVisible ? "|" : "",
    withCursor: `${displayText}${cursorVisible ? "|" : ""}`,
  };
}
