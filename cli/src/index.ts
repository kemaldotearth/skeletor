#!/usr/bin/env node
import { Command } from 'commander';
import { create } from 'domain';
import * as fs from 'fs';
import {
  createPackageJson,
  createTsConfig,
  createFolderStructure,
  createIndexFile,
  createButtonComponent,
  createClassNamesUtil,
  createGlobalsCss,
  createRollupConfig,
  createTailwindConfig,
  createPostCssConfig,
  createGitIgnore,
  createBabelConfig,
  createReadme,
} from './utils/installers';
// import { promiseResolve } from './utils/helpers';
import { updateSpinnerText, spinnerSuccess } from './utils/spinners';

const program = new Command();

program.description(
  'A simple CLI tool for generating front end design system packages.',
);
program.option('--verbose', 'Verbose logging.');
program.version('0.1.0', '-v, --version', 'Logs current version.');

// program.command('generate:tokens').action(async () => {
//   updateSpinnerText('💀 Skeletor is...');
//   // await promiseResolve(3000);
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   spinnerSuccess();
//   console.log('wow your tokens!');
// });

program
  .command('generate:ui')
  .option('--with-tailwind', 'Adds Tailwind CSS to your package.')
  .action(async (options) => {
    updateSpinnerText('💀 Skeletor is generating your package...');
    // await promiseResolve(3000);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const libName = 'skeletor-ui';
    const includeTailwind = options.withTailwind;

    // 1. Create a directory for the package
    updateSpinnerText('📁 Setting up your package directory...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    fs.mkdirSync(libName);

    // 2. Create a package.json file
    updateSpinnerText('😵‍💫 Spinning up a package.json...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    createPackageJson(libName, includeTailwind);

    // 3. Create a tsconfig.json file
    updateSpinnerText('💀 Adding a tsconfig too...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    createTsConfig(libName);

    // 4. Create directories...
    updateSpinnerText('👷‍♀️ Crafting your first components...');
    await new Promise((resolve) => setTimeout(resolve, 4000));

    createFolderStructure(libName, includeTailwind);

    // 5. Create an index.ts file
    createIndexFile(libName, includeTailwind);
    createButtonComponent(libName);
    createClassNamesUtil(libName);
    if (includeTailwind) createGlobalsCss(libName);

    // 6. Create a rollup.config.js file
    updateSpinnerText('🧻 Adding a rollup.config.js...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    createRollupConfig(libName, includeTailwind);

    // 7. Create extra files
    if (includeTailwind) {
      updateSpinnerText('💨 Setting up TailwindCSS...');
      await new Promise((resolve) => setTimeout(resolve, 4000));

      createTailwindConfig(libName);
      createPostCssConfig(libName);
    }

    updateSpinnerText('💀  Wrapping up!');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    createGitIgnore(libName);
    createBabelConfig(libName);

    // 8. Create a README.md file
    updateSpinnerText(`📄 Oh, don't forget to add a README.md!`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    createReadme(libName);

    updateSpinnerText(`💀 That's it! ~ cd ${libName} && npm install`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    spinnerSuccess();
  });

const run = async () => {
  await program.parseAsync();
};

run();

process.on('unhandledRejection', function (err: Error) {
  const debug = program.opts().verbose;

  if (debug) {
    console.error(err.stack);
  }

  program.error('', { exitCode: 1 });
});
