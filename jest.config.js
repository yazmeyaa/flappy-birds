/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/engine/(.*)$": "<rootDir>/src/game/engine/$1",
    "^@/entities/(.*)$": "<rootDir>/src/game/entities/$1",
    "^@/components/(.*)$": "<rootDir>/src/game/components/$1",
    "^@/systems/(.*)$": "<rootDir>/src/game/systems/$1",
    "^@/assets/(.*)$": "<rootDir>/src/game/assets/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [`ts-jest`, { tsconfig: 'tsconfig.json' }]
  }
};
