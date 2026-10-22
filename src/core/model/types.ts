// Game-agnostic domain model. Distances are inches unless a field name says otherwise (e.g. frontageMm).
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

/** Rigid ranks and files. Casualties come off the rear rank. */
export interface BlockFormation {
  kind: 'block'
  /** Models per rank. The last rank may be partial and is centered. */
  files: number
}

/**
 * Loose models that move individually. Laid out from the center outwards.
 * Coherency: each model should have N neighbours within maxGapIn (N comes from the game system).
 * Breaking coherency shows a warning; it is never blocked.
 */
export interface SkirmishFormation {
  kind: 'skirmish'
  /** Largest allowed gap between neighbouring bases, edge to edge. Gaps may be smaller. */
  maxGapIn: number
}

/**
 * One model on its own (e.g. a character or a monster). Has a facing like a block,
 * but moves and pivots freely instead of wheeling. modelCount should be 1 (validated, not typed).
 */
export interface SingleFormation {
  kind: 'single'
}

/** How a unit's models are arranged. Switch on `kind` to narrow. */
export type Formation = BlockFormation | SkirmishFormation | SingleFormation
export type FormationKind = Formation['kind']

/** A special model in a unit, drawn in the front rank or as a badge. Generic names only. */
export type Character = 'hero' | 'champion' | 'standard' | 'musician'

/** One unit in an army list, before it is deployed on the table. */
export interface UnitEntry {
  id: string
  name: string
  /** Free text (e.g. "Core"). Each game system has its own categories, so core can't list them. */
  category: string
  points: number
  /** The exact count chosen for this list. Allowed ranges come from the game data and are validated. */
  modelCount: number
  /**
   * Base used by every model in the unit. Read it through a helper, not directly: mixed bases
   * (model groups) are a planned extension.
   */
  base: BaseSize
  /** Formation the unit deploys in. */
  formation: Formation
  /** Special models in the unit. */
  characters: Character[]
  notes?: string
}
