import { sheriff, type SheriffSettings, tseslint } from 'eslint-config-sheriff';

const sheriffOptions: SheriffSettings = {
  "react": true,
  "lodash": false,
  "remeda": false,
  "next": true,
  "astro": false,
  "playwright": false,
  "jest": false,
  "vitest": false
};

export default tseslint.config(sheriff(sheriffOptions));