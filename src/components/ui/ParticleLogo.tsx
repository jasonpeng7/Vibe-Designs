import React, { useRef, useEffect, useState } from "react";
import "./ParticleLogo.css";

const DENSITY = 2;
const PARTICLE_SIZE = 2;
const EASE = 0.08;
const DISPERSE_SPEED = 6;

class Particle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  state: "converging" | "dispersing" = "converging";
  disperseAngle: number = 0;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.startX = Math.random() * this.canvasWidth;
    this.startY = Math.random() * this.canvasHeight;
    this.x = this.startX;
    this.y = this.startY;
    this.targetX = this.startX;
    this.targetY = this.startY;
    this.size = PARTICLE_SIZE;
    const hue = 180 + Math.random() * 70;
    this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.5 + 0.5})`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    if (this.state === "dispersing") {
      this.x += Math.cos(this.disperseAngle) * DISPERSE_SPEED;
      this.y += Math.sin(this.disperseAngle) * DISPERSE_SPEED;
    } else {
      this.x += (this.targetX - this.x) * EASE;
      this.y += (this.targetY - this.y) * EASE;
    }
  }
}

interface ParticleLogoProps {
  words: string[];
  startAnimation: boolean;
}

const ParticleLogo: React.FC<ParticleLogoProps> = ({
  words,
  startAnimation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !startAnimation) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const updateParticleTargets = (word: string) => {
      canvas.width = 600;
      canvas.height = 800;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "bold 100px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(word, canvas.width / 2, canvas.height / 2);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const newTargets: { x: number; y: number }[] = [];
      for (let y = 0; y < imageData.height; y += DENSITY) {
        for (let x = 0; x < imageData.width; x += DENSITY) {
          if (imageData.data[y * 4 * imageData.width + x * 4 + 3] > 128) {
            newTargets.push({ x, y });
          }
        }
      }

      // Shuffle targets for a more organic look
      for (let i = newTargets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTargets[i], newTargets[j]] = [newTargets[j], newTargets[i]];
      }

      // Assign new targets to existing particles, create/remove as needed
      for (let i = 0; i < newTargets.length; i++) {
        if (particles.current[i]) {
          particles.current[i].targetX = newTargets[i].x;
          particles.current[i].targetY = newTargets[i].y;
        } else {
          const p = new Particle(canvas.width, canvas.height);
          p.targetX = newTargets[i].x;
          p.targetY = newTargets[i].y;
          particles.current.push(p);
        }
      }

      if (particles.current.length > newTargets.length) {
        particles.current.splice(newTargets.length);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    updateParticleTargets(words[currentWordIndex]);
    particles.current.forEach((p) => (p.state = "converging"));
    animate();

    const cycleTimer = setInterval(() => {
      // Disperse current word
      particles.current.forEach((p) => {
        p.state = "dispersing";
        p.disperseAngle = Math.random() * Math.PI * 2;
      });

      // After a delay, converge to the next word
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length;
          updateParticleTargets(words[nextIndex]);
          particles.current.forEach((p) => {
            p.state = "converging";
            // Reset start position for a more dramatic effect
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
          });
          return nextIndex;
        });
      }, 1500); // Dispersal time
    }, 3000); // Hold time + Dispersal time

    return () => {
      clearInterval(cycleTimer);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [startAnimation, words, currentWordIndex]); // Rerun effect when word changes

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${startAnimation ? "in-view" : ""}`}
    />
  );
};

export default ParticleLogo;
