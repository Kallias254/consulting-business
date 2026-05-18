import * as migration_20260517_190441_init from './20260517_190441_init';

export const migrations = [
  {
    up: migration_20260517_190441_init.up,
    down: migration_20260517_190441_init.down,
    name: '20260517_190441_init'
  },
];
