import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query. Returns false on the server and on first client
 * render, then the real value after mount — so anything gated on a `true`
 * result (e.g. a heavy WebGL canvas) never mounts on devices that don't match.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
