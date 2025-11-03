/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { resolve } from "path"
import { defineConfig } from 'vitest/config'
// import heliosPlugin from './lib/HeliosLoader.ts';
import tsconfigPaths from 'vite-tsconfig-paths';

import { 
    heliosRollupLoader, 
    heliosRollupBundler 
} from "@donecollectively/stellar-contracts/rollup-plugins";

//  for (const stream of [process.stdout, process.stderr]) stream?._handle?.setBlocking?.(true);

export default defineConfig({
    plugins: [
        // string({
        //     // Required to be specified
        //     include: "**/*.hl",
        // }),
        heliosRollupLoader({ 
            project: "stellar-tokenomics",            
            // include: [
            //     "**/*.hl",
            //     // "../stellar-contracts/**/*.hl",
            // ]
        }),
        heliosRollupBundler({
            vite: true,
        }),
        tsconfigPaths(),
    ],
    resolve: {        
        // conditions: "typescriptNative"
    },

    test: {
        // include: ['tests/new*.test.ts', ],
        reporters: ["verbose"],
        include: [
            "tests/*.test.ts", 
            "tests/*.test.js",
            "**/tests/*.test.ts",
            "**/tests/*.test.js",
        ],
        exclude: [
            "disabled-for-now/**",
            "zz_disabled/**",
            "node_modules/**",
        ],
        // diff: './vitest.diff.ts',

        globals: true,
        sourcemap: true,
        restoreMocks: true,
        testTimeout: 1000000,
        hookTimeout: 780000,
        teardownTimeout: 23000,

        poolOptions: {        
            forks: {
                minForks: 1,
                maxForks: 1
            }
        }
        
        // browser: {
        //     enabled: true,
        //     name: 'chrome', // browser name is required
        //   },
    },

    // build: {
    //     target: ["node", "esnext"],
    //     sourcemap: true,
    //     sourcemapIgnoreList: false,

    //     lib: {
    //         // Could also be a dictionary or array of multiple entry points
    //         entry: resolve(__dirname, "lib/index.ts"),
    //         name: "stellar-contracts",
    //         // the proper extensions will be added
    //         fileName: "stellar-contracts",
    //     },
    // },
})
