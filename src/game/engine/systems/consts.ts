/**
 * Priority categories.
 * @enum {number}
 */
export const PriorityCategories = {
    /**
     * Systems that handle user input (keyboard, mouse, touch, etc.).
     * Priority range: 100-199
     * @type {number}
     */
    INPUT: 100,

    /**
     * Systems that run before the main game logic update.
     * Used for preliminary changes or state processing.
     * Priority range: 200-299
     * @type {number}
     */
    PRE_UPDATE: 200,

    /**
     * Main game logic update systems.
     * Where the primary calculations and state changes occur.
     * Priority range: 300-399
     * @type {number}
     */
    UPDATE: 300,

    /**
     * Systems that run after the main game logic update.
     * Used for subsequent changes like applying effects or post-processing data.
     * Priority range: 400-499
     * @type {number}
     */
    POST_UPDATE: 400,

    /**
     * Physics systems that calculate object interactions, collisions, and other physical aspects.
     * Priority range: 500-599
     * @type {number}
     */
    PHYSICS: 500,

    /**
     * Systems that run before rendering.
     * Used for preparing data for rendering, updating cameras, etc.
     * Priority range: 600-699
     * @type {number}
     */
    PRE_RENDER: 600,

    /**
     * Main rendering systems.
     * Where the drawing of objects and scenes occurs.
     * Priority range: 700-799
     * @type {number}
     */
    RENDER: 700,

    /**
     * Systems that run after rendering.
     * Used for post-processing effects, updating the interface, etc.
     * Priority range: 800-899
     * @type {number}
     */
    POST_RENDER: 800
} as const;