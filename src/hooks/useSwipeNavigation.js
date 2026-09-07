import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const PRIMARY_TABS = [
  "/student",
  "/student/dsa-track",
  "/student/list",
  "/student/leaderboard",
  "/student/profile"
];

export const useSwipeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStartRef = useRef(null);
  const hasNavigatedRef = useRef(false);

  const currentIndex = PRIMARY_TABS.findIndex((tab) =>
    tab === "/student"
      ? location.pathname === "/student"
      : location.pathname.startsWith(tab)
  );

  useEffect(() => {
    // Only enable swipe navigation for the 5 primary tabs
    if (currentIndex === -1) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      const target = e.target;
      const element = target instanceof Element ? target : target?.parentElement;

      // Block swipe on interactive/scrollable regions
      if (
        element && typeof element.closest === "function" && (
          element.closest("input") ||
          element.closest("textarea") ||
          element.closest("button") ||
          element.closest("a") ||
          element.closest("select") ||
          element.closest("pre") ||
          element.closest(".overflow-x-auto") ||
          element.closest("[data-no-swipe]")
        )
      ) {
        touchStartRef.current = null;
        return;
      }

      hasNavigatedRef.current = false;
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };

    const handleTouchMove = (e) => {
      // Don't preventDefault — keep passive:true. Just cancel if too vertical.
      if (!touchStartRef.current || hasNavigatedRef.current) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartRef.current.x);
      const dy = Math.abs(touch.clientY - touchStartRef.current.y);
      // Cancel tracking if vertical scroll is dominant
      if (dy > dx * 1.2 && dy > 15) {
        touchStartRef.current = null;
      }
    };

    const handleTouchEnd = (e) => {
      if (!touchStartRef.current || hasNavigatedRef.current) return;
      if (e.changedTouches.length !== 1) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const elapsed = Date.now() - touchStartRef.current.time;

      touchStartRef.current = null;

      // Must be fast enough (< 700ms) and horizontal enough
      if (elapsed > 700) return;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Must travel at least 50px horizontally
      if (absX < 50) return;

      // Diagonal rejection: horizontal must dominate (ratio 1.8:1 is forgiving but not too loose)
      if (absY > absX / 1.8) return;

      hasNavigatedRef.current = true;

      if ("vibrate" in navigator) {
        try { navigator.vibrate(8); } catch (e) {}
      }

      if (deltaX < 0 && currentIndex < PRIMARY_TABS.length - 1) {
        // Swipe left → next tab
        navigate(PRIMARY_TABS[currentIndex + 1]);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right → previous tab
        navigate(PRIMARY_TABS[currentIndex - 1]);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: true });
    window.addEventListener("touchend",   handleTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [currentIndex, navigate]);

  return { currentIndex };
};