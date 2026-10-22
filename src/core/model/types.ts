// Game-agnostic domain model. Distances are inches unless a field name says otherwise (e.g. frontageMM).
// Table coordinates: origin top-left, x right, y down.

/** A 2D point or vector on the table, in inches. */
export interface Vec {
  x: number
  y: number
}

/**
 * Where a unit stands on the table.
 * (x, y): center of the unit's front edge, in inches.
 * angle: facing in degrees, clockwise, 0 = facing up (-y).
 */
export interface Pose {
  x: number
  y: number
  angle: number
}

export type BaseShape = 'rect' | 'circle' | 'oval'

/** One model's base. Sizes are in mm because bases are sold in mm; convert with mmToIn. */
export interface BaseSize {
  id: string
  shape: BaseShape
  /** Width of the base's front edge. For circles this is the diameter. */
  frontageMm: number
  /** Front-to-back size. For circles this equals frontageMm. */
  depthMm: number
}
