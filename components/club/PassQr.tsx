"use client";

import { useMemo } from "react";

type PassQrProps = {
  value: string;
  className?: string;
};

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function isFinder(row: number, col: number, size: number) {
  const origins: Array<[number, number]> = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];

  for (const [ox, oy] of origins) {
    if (row < oy || row >= oy + 7 || col < ox || col >= ox + 7) continue;
    const x = col - ox;
    const y = row - oy;
    const outline = x === 0 || y === 0 || x === 6 || y === 6;
    const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
    return outline || core;
  }

  return false;
}

function isTiming(row: number, col: number, size: number) {
  if (row === 6 && col >= 8 && col <= size - 9) return col % 2 === 0;
  if (col === 6 && row >= 8 && row <= size - 9) return row % 2 === 0;
  return false;
}

function isReserved(row: number, col: number, size: number) {
  if (row < 8 && col < 8) return true;
  if (row < 8 && col >= size - 8) return true;
  if (row >= size - 8 && col < 8) return true;
  if (row === 6 || col === 6) return true;
  return false;
}

function buildMatrix(value: string, size = 25) {
  const seed = hashString(value);
  const matrix: boolean[][] = [];

  for (let row = 0; row < size; row += 1) {
    const line: boolean[] = [];
    for (let col = 0; col < size; col += 1) {
      if (isFinder(row, col, size) || isTiming(row, col, size)) {
        line.push(true);
        continue;
      }
      if (isReserved(row, col, size)) {
        line.push(false);
        continue;
      }
      const bit = (Math.imul(seed ^ (row * 73856093), col * 19349663 + 83492791) >>> (row % 16)) & 1;
      line.push(bit === 1);
    }
    matrix.push(line);
  }

  return matrix;
}

export function PassQr({ value, className }: PassQrProps) {
  const matrix = useMemo(() => buildMatrix(value), [value]);
  const size = matrix.length;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect width={size} height={size} fill="#ffffff" />
      {matrix.map((line, row) =>
        line.map((on, col) =>
          on ? (
            <rect
              key={`${row}-${col}`}
              x={col}
              y={row}
              width={1}
              height={1}
              fill="#111111"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
