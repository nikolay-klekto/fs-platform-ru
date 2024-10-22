module.exports = {
    // Указываем, что используем парсер для TypeScript
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Поддержка современных возможностей ECMAScript
        sourceType: 'module', // Использование модулей ES
        ecmaFeatures: {
            jsx: true, // Разрешение для JSX в React
        },
    }, // Расширяем стандартные конфигурации для React и Next.js
    extends: [
        'eslint:recommended', // Рекомендуемые правила ESLint
        'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
        'plugin:react/recommended', // Рекомендуемые правила для React
        'plugin:react/jsx-runtime', // Поддержка JSX без необходимости импорта React в Next.js
        'plugin:prettier/recommended', // Включаем интеграцию с Prettier
        'next/core-web-vitals', // Оптимизированные правила для Next.js
    ],
    plugins: ['@typescript-eslint', 'react', 'prettier'], // Плагины для TypeScript, React и Prettier
    rules: {
        // Настройка собственных правил
        'prettier/prettier': 'error', // Вывод ошибок при несоответствии с настройками Prettier
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключение необходимости указания типов на границах модулей
        '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение при использовании типа "any"
        'react/react-in-jsx-scope': 'off', // Отключаем правило, требующее импортировать React (не нужно в Next.js)
        'react/prop-types': 'off', // Отключаем проверку типов пропсов (используем TypeScript)
        'no-console': ['warn', { allow: ['warn', 'error'] }], // Предупреждение для console.log, но позволяем console.warn и console.error
        'react/jsx-uses-react': 'off', // Для Next.js, где JSX не требует React на верхнем уровне
        'react/display-name': 'off', // Отключаем требование к именам компонентов
    }, // Поддержка глобальных переменных, таких как React (Next.js)
    globals: {
        React: 'writable',
    },
    settings: {
        react: {
            version: 'detect', // Автоматическое определение версии React
        },
    },
}
