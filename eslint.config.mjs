// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Arquivos/diretórios a ignorar
    ignores: [
      'eslint.config.mjs',
      'dist/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      '.nyc_output/**/*',
      '*.config.js',
      '*.config.ts',
      'jest.config.js',
      'nest-cli.json',
      'tsconfig*.json',
      'pnpm-lock.yaml',
      'package-lock.json',
    ],
  },
  
  // Regras recomendadas do ESLint
  eslint.configs.recommended,
  
  // Regras recomendadas do TypeScript (com checagem de tipos)
  ...tseslint.configs.recommendedTypeChecked,
  
  // Integração com Prettier
  eslintPluginPrettierRecommended,
  
  // Configurações globais
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module', // ✅ Mudamos de 'commonjs' para 'module' (ES Modules)
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  
  // Regras customizadas
  {
    rules: {
      // === REGRAS DE ESTILO (Prettier cuida disso) ===
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf', // ✅ Mudamos para 'lf' para ficar consistente
        },
      ],
      
      // === REGRAS DE TIPO (TypeScript) ===
      '@typescript-eslint/no-explicit-any': 'warn', // ✅ Mudamos de 'off' para 'warn'
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-floating-promises': 'error', // ✅ Mudamos de 'warn' para 'error'
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/unbound-method': 'warn',
      
      // === REGRAS ESPECÍFICAS DO NESTJS ===
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off', // NestJS usa decorators que já dão o tipo
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      
      // === REGRAS DE BOAS PRÁTICAS ===
      'no-console': 'warn', // Avisa sobre console.log (use Logger do NestJS)
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      
      // === REGRAS DE POSSÍVEIS PROBLEMAS ===
      'no-return-await': 'off', // TypeScript já cuida disso
      'require-await': 'off', // Usamos a versão do TypeScript
    },
  },
);