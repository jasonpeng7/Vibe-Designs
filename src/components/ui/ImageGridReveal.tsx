import { useEffect, useMemo } from "react";

type ImageGridRevealProps = {
  src: string;
  rows: number;
  cols: number;
  onComplete: () => void;
};

const ImageGridReveal = ({
  src,
  rows,
  cols,
  onComplete,
}: ImageGridRevealProps) => {
  // Create a stable, ordered grid of tiles. Each tile knows its row and column.
  const tiles = useMemo(() => {
    const orderedTiles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        orderedTiles.push({ row, col });
      }
    }
    return orderedTiles;
  }, [rows, cols]);

  // Create a shuffled list of indices to determine the animation delay for each tile.
  const animationDelays = useMemo(() => {
    const delays = Array.from({ length: rows * cols }, (_, i) => i);
    // Shuffle the array for a random animation order
    for (let i = delays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delays[i], delays[j]] = [delays[j], delays[i]];
    }
    return delays;
  }, [rows, cols]);

  const animationStagger = 15; // ms - Faster stagger
  const animationDuration = 150; // ms - Faster duration

  // When the component mounts, set a single timer for when the entire animation will be complete.
  useEffect(() => {
    const totalTiles = rows * cols;
    // Calculate the time for the last tile to start animating plus its own duration.
    const totalAnimationTime =
      (totalTiles - 1) * animationStagger + animationDuration;

    const animationEndTimer = setTimeout(() => {
      onComplete(); // Directly call onComplete, no fade-out
    }, totalAnimationTime);

    return () => clearTimeout(animationEndTimer);
  }, [rows, cols, onComplete]);

  return (
    <div
      className="absolute inset-0 z-20 grid overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {/* Map over the ORDERED tiles to ensure they are placed correctly in the grid */}
      {tiles.map(({ row, col }, index) => (
        <div
          key={`${row}-${col}`}
          className="w-full h-full animate-tile-reveal opacity-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            // This is correct because we are using the row/col from the ordered map
            backgroundPosition: `${(col / (cols - 1)) * 100}% ${
              (row / (rows - 1)) * 100
            }%`,
            // Assign a unique, shuffled delay to each tile
            animationDelay: `${animationDelays[index] * animationStagger}ms`,
            animationDuration: `${animationDuration}ms`,
            animationFillMode: "forwards",
          }}
        />
      ))}
    </div>
  );
};

export default ImageGridReveal;
