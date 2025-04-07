<h1 align="center">FunscrutRU Next app</h1>

<p align="center">
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" >

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" >

</p>

## Структура проекта

-   components
    -   desktop
     -  mobi
    -   shared
    -   ui
-   constants
-   hooks
-   services
-   utils

## Установка и запуск

**Примечание:** Перед установкой убедитесь, что версия `node.js` не ниже **18.17.0**. Воспользуйтесь командой:

```js
node - v
```

1. Склонируйте репозиторий [по ссылке](https://github.com/nikolay-klekto/fs-platform-ru.git), используя команду
   `git clone `
2. `cd frontend-react`
3. `npm install`
4. Настройте EsLint и Prettier форматтеры в своем редакторе кода (VS Code, Webstorm). Установка зависимостей в проект не требуется.
    - _Пример для VS Code_:
        - **ESLint**:
            1. Зайдите в настройки (`CTRL + ,`)
            2. Установите: **ESLint: Enable**
        - **Prettier**:
            1. Зайдите в настройки (`CTRL + ,`)
            2. Введите в поиске: `format on save`
            3. Установите: **Editor: Format On Save**
            4. Введите в поиске (в том же окне): `default formatter`
            5. Установите: **Editor: Default Formatter** в значение `esbent.prettier-vscode`
        - Перезапустите редактор
5. `npm run lint` (убедитесь, что ошибки, относящиеся к библиотекам, отсутствуют)
6. `npm run dev`

---

## Стек разработки

-   [Next](https://nextjs.org/) ([App router](https://nextjs.org/docs/app))
-   [TS](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [shadcn](https://ui.shadcn.com/)
-   Eslint, Prettier

## Рабочий процесс проекта

1. Декомпозируйте задачи на подзадачи
2. Распределейте задачи и время на их выполнение
3. Мы обсуждаем, задаем вопросы, информируем друг друга и о проблемах, и об успехах.

4. **Когда задача готова:**
    1. Подтяните изменения из основной ветки _dev-front-react_ в свою ветку разработки (`git pull`)
    2. Сделайте локальное слияние (`git merge`)
    3. Проверьте корректность работы:
        - вставьте свой компонент в _page.tsx_
        ```
        /app/page.tsx
        ```
    4. В случае корректного отображения работы, создайте PR (pull request). Убедитесь, что ваш PR не имеет конфликтов с веткой _dev-front-react_
    5. Ваш PR должен включать:
        - Наззвание PR должно быть связано с кодировкой задач в таск-трекере Jira (см примеры ниже);
        - Кратко опишите результат вашей работы;
        - Прикрепите скрины, отображающие конечный результат.
        - Убедитесь, что пустые строки и закомментированные участки кода отсутствуют.
        - Убедитесь, что в PR отображаются только те файлы, которые вы меняли.
    6. Чтобы получить одобрение на мердж, необходимо запросить проверку вашего PR у тимлида. Без его апрува, мерджить запрещено. (Конечно, существуют различные экстренные ситуацию, когда мердж делают без апрува, но такие ситуацию обговариваются в чате или другим любым удобным способом коммуникации)
    7. После апрува тилида, можно мерджить, выбрав опцию **Squash and merge**
    8. После успешного мерджа, удалите свою ветку.

```
Все имена комитов и ПР прописываются на английском языке
```

---

## Структура проекта

### GIT:

-   **main** branch - продакшен
-   **dev-front-react** branch - это текущая ветка разработки, с которой стягиваются текущие изменения и происходят ответвления для выполнения задач
-   Правила наименования:
    -   Ветки с созданием новых фитч **FF-12-feat/task-name**
    -   Ветки с другим функционалом - **FF-12-fix/issue-name** (docs, refactor etc.)
    -   PR - **FF-12-feat Task name**, например **FF-12-feat Header button colors**. Где номер, такой как **FF-12 или FF-30** должен совпадать с индексом задаче в Jira
    -   Commit - следуем [commit convention](https://www.conventionalcommits.org/en/v1.0.0/) ([на русском здесь](https://gist.github.com/Voloshin-Sergei/ffbec67c6d9fcb32b0df014ababba0e9) ), например, `FF-12-feat: add submit button` или `FF-12-fix: some error`

```
P.S. Мы стараемся следовать предложенным рекомендациям, но главное задача любых наименований - это их ясность и отражение сути.
```

<br/>

# Стилистика кода

## Общие принципы

В этом документе содержатся рекомендации по написанию кода в рамках проекта, касающиеся структуры папок, соглашений об именовании и управления стилем. Основная цель этого документа - улучшить читаемость и облегчить совместную работу всей команды.

https://nextjs.org/docs/app/building-your-application/routing/colocation

## 1. Структура папок

У нас есть два разных веб-приложения: десктоп и мобилка. Каждый разрабатываемый компонент может быть связан только с одним типом веб-приложения:

-   mobile (от 320px до 767px)
-   desktop (от 768px до 1920px)

_Примечание: в папке **ui** размещены общие переиспользуемые компоненты из дизайн макета figma. Редактирование допускается по согласованию с тимлидом_

```
/frontend-react
 /components
  desktop
  mobi
  ui
```

Логика размещения компонентов:
-   Один файл = один компонент.
-   Переиспользуемые компоненты (например, Header, Footer) хранятся в /components/desktop или /components/mobi.
-   Каждая страница размещается в своей папке внутри /pageDesktop или /pageMobi.
-   Компоненты страниц выносятся отдельно в папку components в папке страницы
-   Контентные данные хранятся в папке data рядом с компонентом.

Структура компонентов:
-   Простой компонент → отдельная папка с одним файлом.
```
/components
/desktop
/Footer
    FooterDesktop.tsx
```
-   Сложный компонент → папка с:
-  -    основным компонентом
-  -    папками-дочерними компонентами
-   -   папкой data (если нужно)

Подкомпоненты сложных компонентов, представляющие повторяющиеся элементы (например, карточки), размещаются в папках, начинающихся с Item.
```
/components
/desktop
/pageDesktop
    /HeaderDesktop - HeaderDesktop.tsx
    /ItemHeaderDesktop - HeaderNavigationDesktop.tsx
        /data - content.tsx

```

-   Подкомпоненты размещаются в одноименных папках

```
/components
 /desktop
  /pageDesktop
    /HomePageDesktop
      HomePageDesktop.tsx
   
```

## 2. Наименования (принципы)

-   Компонента: **UpperCamelCase** (e.g., HowWeWorkDesktop.tsx).
-   Хук: **lowerCamelCase** (e.g., useSomething.tsx).
-   Другие файлы: **kebab-case**

---

> **ВАЖНО:** Название каждого компонента должно иметь специальное окончание:
>
> -   **Mobi** (для mobile компонентов)
> -   **Desktop** (для Desktop компонентов)
>
>     Примеры:
>
>     -   HowWeWork<mark>Desktop</mark>.tsx
>     -   HomePage<mark>Mobi</mark>.tsx

> Даже если у вас один и тот же компонент используется
> без изменений в двух версиях, то его необходимо
> продублировать, соблюдая правило наименования.

## 3. TypeScript Наименования

-   Classes, types, enums, decorators, type parameters: **UpperCamelCase**.
-   Interfaces: **IUpperCamelCase** (например, interface IFormData).
-   Variables, parameters, functions, methods, properties, module aliases: **lowerCamelCase**.
-   Global constants (включая enum elements): **CONSTANT_CASE**.

### Props Types

-   Props types объявляются напрямую в компоненте.
-   Общие или повторно используемые типы помещаются в специальный каталог констант.

## 4. Tailwind CSS

### 4.1. Классы для переиспользуемых стилей

Вы можете создавать свои собственные классы стилей, чтобы сократить количество строк кода и сделать его понятным для чтения и понимания.
`styles/customClasses/customClassElement.css`

```css
@tailwind components;

@layer components {
    .btn-custom {
        @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }

    .card_custom {
        @apply bg-white shadow-md rounded-lg p-4;
    }
}
```

Также, вы можете добавить изменения в config files в папке `/tailwind-config`. Доступные конфиги описаны в `tailwind.config.ts`

```ts
        extend: {
                colors: colorsConfig,
                screens: screensConfig,
                borderRadius: borderRadiusConfig,
                keyframes: keyframesConfig,
                animation: animationConfig,
                fontSize: fontSizeConfig,
                backgroundImage: backgroundImageConfig,
            },
```

### 4.2. Использование переменных

Избегайте "магических чисел". По возможности используйте переменные для цветов (используйте HSV), интервалов и размеров. Вы можете добавлять свои собственные переменные в `/styles/globals.css`, если это необходимо:

```css
:root {
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
}
```

```tsx
<p className="w-fit bg-white bg-opacity-70 text-base md:text-xl lg:text-2xl text-[#878797] font-medium py-2 px-4 rounded-[50px]">
    от{' '}
    <span className="bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] text-transparent bg-clip-text text-lg md:text-3xl lg:text-4xl">
        {price} BYN/
    </span>{' '}
    неделя
</p>
```

### 4.3. Брейкпоинты размеров экрана описаны в `tailwind.config.ts`

```ts
   screens: {
                'sm': '320px',
                'sm_l': '375px',
                'sm_xl': '375px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1440px',
                '3xl': '1560px',
                '4xl': '1920px',
            },
```

## 5. Изображения

### 5.1. Используйте [Image component](https://nextjs.org/docs/pages/api-reference/components/image) от next.js, чтобы вставить любое изображение:

```js
import Image from 'next/image'

export default function Page() {
    return <Image src="/profile.png" width={500} height={500} alt="Picture of the author" />
}
```

### 5.2. SVG

    Для SVG используем кастомный компонент `/components/assets/icons.tsx`

```js
    import React from 'react'
    import { TestIcon } from '@/components/next/assets/icons'

    const HomePageMobi: React.FC = () => {
    return (
           <div className="h-screen">
            <TestIcon/>
           </div>
           )
         }
    export default HomePageMobi
```

### 5.3. Все остальные типы изображений, а также фон

```
    /public
        /background
        /images
```

```js
        const MyBackgroundComponent = () => {
            return (
            <div style={{
                backgroundImage: 'url(/backgrounds/my-background. jpg)',
                height: '100vh',
                backgroundSize: 'cover'
            }}
                <h1>Привет, мир!</h1>
            </div>
            )
        }
```
