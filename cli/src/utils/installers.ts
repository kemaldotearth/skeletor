import * as fs from 'fs';

export const createPackageJson = (
  libName: string,
  includeTailwind: boolean,
  includeStyledComponents: boolean,
  includeStorybook: boolean,
) => {
  fs.writeFileSync(
    `${libName}/package.json`,
    JSON.stringify(
      {
        name: libName,
        version: '0.1.0',
        description: 'A simple UI library generated by Skeletor.',
        main: 'dist/cjs/index.js',
        module: 'dist/esm/index.js',
        files: ['dist'],
        types: './dist/index.d.ts',
        scripts: {
          build:
            'rimraf dist && tsc --emitDeclarationOnly && NODE_ENV=production rollup --config',
          tsc: 'tsc',
          ...(includeStorybook && {
            storybook: 'start-storybook -p 6006',
            'build-storybook': 'build-storybook',
            'deploy-storybook': 'storybook-to-ghpages',
          }),
        },
        author: 'skeletor-cli',
        license: 'UNLICENSED',
        devDependencies: {
          '@babel/core': '^7.14.3',
          '@babel/preset-env': '^7.14.2',
          '@babel/preset-react': '^7.13.13',
          '@rollup/plugin-babel': '^5.3.0',
          '@rollup/plugin-commonjs': '^17.1.0',
          '@rollup/plugin-node-resolve': '^11.2.1',
          '@rollup/plugin-typescript': '^8.2.1',
          '@types/react': '^17.0.3',
          '@types/react-dom': '^17.0.3',
          'babel-loader': '^8.2.2',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          typescript: '^4.3.5',
          rimraf: '^3.0.2',
          rollup: '^2.52.1',
          'rollup-plugin-peer-deps-external': '^2.2.4',
          'rollup-plugin-dts': '^3.0.1',
          webpack: '^5.52.1',
          ...(includeTailwind && {
            tailwindcss: '^2.2.19',
            postcss: '^8.3.11',
            autoprefixer: '^10.3.7',
            'rollup-plugin-postcss': '^4.0.0',
            '@storybook/addon-postcss': '^3.0.0',
          }),
          ...(includeStyledComponents && {
            'styled-components': '^5.3.3',
            '@types/styled-components': '^5.1.15',
            'babel-plugin-styled-components': '^1.13.3',
          }),
          ...(includeStorybook && {
            '@storybook/addon-actions': '^6.3.12',
            '@storybook/addon-essentials': '^6.3.12',
            '@storybook/addon-links': '^6.3.12',
            '@storybook/addon-interactions': '^6.3.12',
            '@storybook/addon-themes': '^6.3.12',
            '@storybook/react': '^6.3.12',
            '@storybook/dark-mode': '^6.3.12',
            '@storybook/storybook-deployer': '^2.8.7',
            '@storybook/testing-library': '^0.0.1-alpha.1',
          }),
        },
      },
      null,
      2,
    ),
  );
};

export const createTsConfig = (libName: string) => {
  fs.writeFileSync(
    `${libName}/tsconfig.json`,
    JSON.stringify(
      {
        compilerOptions: {
          target: 'es5',
          jsx: 'react',
          module: 'esnext',
          rootDir: './src',
          lib: ['es6', 'dom', 'es2016', 'es2017'],
          moduleResolution: 'node',
          resolveJsonModule: true,
          allowJs: false,
          declaration: true,
          declarationDir: 'types',
          sourceMap: true,
          outDir: './dist',
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
          strict: true,
          skipLibCheck: true,
          emitDeclarationOnly: true,
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules', 'dist'],
      },
      null,
      2,
    ),
  );
};

export const createFolderStructure = (
  libName: string,
  includeTailwind: boolean,
  includeStorybook: boolean,
) => {
  fs.mkdirSync(`${libName}/src`);
  fs.mkdirSync(`${libName}/src/utils`);
  fs.mkdirSync(`${libName}/src/components`);
  fs.mkdirSync(`${libName}/src/components/Button`);
  if (includeTailwind) {
    fs.mkdirSync(`${libName}/src/styles`);
  }
  if (includeStorybook) {
    fs.mkdirSync(`${libName}/.storybook`);
  }
};

export const createIndexFile = (libName: string, includeTailwind: boolean) => {
  fs.writeFileSync(
    `${libName}/src/index.ts`,
    `${includeTailwind ? `import './styles/globals.css';` : ''}
  export { default as Button, ButtonProps } from './components/Button/index';
    `,
  );
};

export const createButtonComponent = (
  libName: string,
  includeStyledComponents: boolean,
  includeStorybook: boolean,
) => {
  fs.writeFileSync(
    `${libName}/src/components/Button/index.tsx`,
    `
import React from 'react';
${includeStyledComponents && `import styled from 'styled-components';`}

export interface ButtonProps {
  label: string;
}

${
  includeStyledComponents &&
  `
const StyledButton = styled.button\`
  background-color: #0000FF;
  color: #FFFFFF;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
\`;
`
}

const Button = ({ label }: ButtonProps) => {
  return (
    ${
      includeStyledComponents
        ? `<StyledButton>{label}</StyledButton>`
        : `<button>{label}</button>`
    }
  );
};

export default Button;
  `,
  );

  if (includeStorybook) {
    fs.writeFileSync(
      `${libName}/src/components/Button/Button.stories.tsx`,
      `
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './index';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};
    `,
    );
  }
};

export const createGlobalsCss = (libName: string) => {
  fs.writeFileSync(
    `${libName}/src/styles/globals.css`,
    `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `,
  );
};

export const createClassNamesUtil = (libName: string) => {
  fs.writeFileSync(
    `${libName}/src/utils/classnames.ts`,
    `
export function classnames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}
  `,
  );
};

export const createRollupConfig = (
  libName: string,
  includeTailwind: boolean,
  // includeStyledComponents: boolean,
) => {
  fs.writeFileSync(
    `${libName}/rollup.config.js`,
    `
    import resolve from '@rollup/plugin-node-resolve';
    import commonjs from '@rollup/plugin-commonjs';
    import external from 'rollup-plugin-peer-deps-external';
    import typescript from '@rollup/plugin-typescript';
    import dts from 'rollup-plugin-dts';
    import babel from '@rollup/plugin-babel';
    import pkg from './package.json';
    ${includeTailwind && `import postcss from "rollup-plugin-postcss";`}

    export default [
      {
        input: ['src/index.ts'],
        output: [
          {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-ts-lib',
          },
          {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
          },
        ],
        plugins: [
          babel({
            babelHelpers: 'bundled',
          }),
          external(),
          resolve(),
          commonjs(),
          ${
            includeTailwind &&
            `postcss({ 
            extensions: ['.css'],
              minimize: true,
              inject: {
                insertAt: 'top',
              },
          }),`
          },
          typescript({
            tsconfig: './tsconfig.json',
          }),
        ],
        external: ['react', 'react-dom'],
      },
      {
        input: 'dist/esm/types/index.d.ts',
        output: [
          {
            file: 'dist/index.d.ts',
            format: 'esm',
          },
        ],
        external: [/\.css$/],
        plugins: [dts()],
      },
    ];`,
  );
};

export const createTailwindConfig = (libName: string) => {
  fs.writeFileSync(
    `${libName}/tailwind.config.js`,
    `
    module.exports = {
      purge: ['./src/**/*.{js,jsx,ts,tsx}'],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
    }; 
  `,
  );
};

export const createPostCssConfig = (libName: string) => {
  fs.writeFileSync(
    `${libName}/postcss.config.js`,
    `
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
  `,
  );
};

export const createGitIgnore = (libName: string) => {
  fs.writeFileSync(
    `${libName}/.gitignore`,
    `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

    # dependencies
    /node_modules
    /.pnp
    .pnp.js
    
    # testing
    /coverage
    
    # next.js
    /.next/
    /out/
    
    # production
    /build
    
    # misc
    .DS_Store
    *.pem
    
    # debug
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    
    # local env files
    .env.local
    .env.development.local
    .env.test.local
    .env.production.local
    
    # vercel
    .vercel
  `,
  );
};

export const createBabelConfig = (
  libName: string,
  includeStyledComponents: boolean,
) => {
  fs.writeFileSync(
    `${libName}/.babelrc`,
    `
    {
      "presets": [
        "@babel/preset-env", 
        "@babel/preset-react",
        ${includeStyledComponents && `"babel-plugin-styled-components",`}
      ]
    }
  `,
  );
};

export const createReadme = (libName: string) => {
  fs.writeFileSync(
    `${libName}/README.md`,
    `# ${libName}

    A simple UI library generated by Skeletor. 💀`,
  );
};

export const createStoryBookConfig = (
  libName: string,
  includeTailwind: boolean,
) => {
  fs.writeFileSync(
    `${libName}/.storybook/main.js`,

    `module.exports = {
      stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
      addons: [
        '@storybook/addon-links', 
        '@storybook/addon-essentials', 
        '@storybook/addon-interactions', 
        '@storybook/dark-mode',
        ${
          includeTailwind &&
          `
        {
          name: '@storybook/addon-postcss',
          options: {
            postcssLoaderOptions: {
              implementation: require('postcss'),
            },
          },
        },
        `
        }
      ],
      framework: '@storybook/react',
    };`,
  );

  fs.writeFileSync(
    `${libName}/.storybook/preview.js`,
    `
    import '../src/styles/global.css';

    export const parameters = {
      actions: { argTypesRegex: "^on[A-Z].*" },
      darkMode: {
        darkClass: 'dark',
        classTarget: 'html',
        stylePreview: true
      }
    }
    `,
  );

  fs.writeFileSync(
    `${libName}/.storybook/manager.js`,
    `
    import { addons } from '@storybook/addons';

    addons.setConfig({
      sidebar: {
        showRoots: true,
      },
    });
    `,
  );
};
