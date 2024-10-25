<h1 align="center">FunscrutRU Next app</h1>

<p align="center">
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" >

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" >

</p>

## Project structure

-   components
    -   layout
    -   shared
    -   ui
-   constants
-   hooks
-   services
-   utils

## Installation and Running

Please, checke your `node.js` version before project installation. It should be not older than **18.17.0**

```js
node - v
```

1. Clone the repository
2. Move to **'frontend-react'** folder
3. `npm install`
4. Set up EsLint and Prettier in your code editor (installation in project no needed)
5. `npm run lint` (errors in libs should be fixed)
6. `npm run dev`

---

## Stack

-   [TS](https://www.typescriptlang.org/)
-   [Next](https://nextjs.org/) ([App router](https://nextjs.org/docs/app))
-   [Tailwind CSS](https://tailwindcss.com/)
-   Eslint, Prettier

## Project workflow

1. Decompose tasks into subtasks
2. Task distribution
3. We discuss, ask questions, keep each other informed about problems and successes
4. When the task is ready:
    1. Pull changes from the main branch (currently is _dev-front-react_) to your task branch
    2. Do a local merge
    3. Check functionality
        - insert your component on _page.tsx_ and check how it is work
        ```
        /app/page.tsx
        ```
    4. Create a PR (pull request), this PR should not have conflicts with the working branch
    5. According to PR template describe the content of the task at PR test part
    6. To check PR, attach the teamlead to conduct a code review, without their approval we do not merge this PR (except for emergency cases, which are discussed separately in the chat)
    7. After approval, merge the feature branch into the working one, select **Squash and merge**
    8. Delete the feature branch

**All correspondence in the repository, names of commits, PR, etc. provided in English.**

## Project structure

### GIT:

-   The **main** branch - for sending code to product
-   The **dev-front-react** branch is a working branch, from which we create branches to perform our tasks
-   Feature branches are called like **FF-12-feat/task-name**
-   Other branches in the same style - **FF-12-fix/issue-name** (docs, refactor etc.)
-   PR name - **FF-12-feat Task name** e.g. **FF-12-feat Header button colors**
    **Where number e.g. FF-12 or FF-30 is the same as task number at Jira.**

Commit names - follow [commit convention](https://www.conventionalcommits.org/en/v1.0.0/) ([Russian transation](https://gist.github.com/Voloshin-Sergei/ffbec67c6d9fcb32b0df014ababba0e9) of this convention), e.g. `FF-12-feat: add submit button` or `FF-12-fix: some error`

p.s. We try to stick to this style. The main point is to have meaningful names.

<br/>

# Style Guide

## Code Guidelines for the project

This document provides suggestions for writing code in the project, covering folder structure, naming conventions, and style management. The main goal of it is improve readability, and facilitate collaboration across the team.

https://nextjs.org/docs/app/building-your-application/routing/colocation

## 1. Folder Structure

We have two different apps: desktop and mobile. Each component can be related only for one type:

-   mobile (from 320px to 767px)
-   desktop (from 768px to 1920px)

_Note: **ui folder** is a list of figma's styled components. Please don't change them_

```
/frontend-react
 /components
  desktop
  mobi
  ui
```

We organize components in a structured manner:

-   Main components are placed in the _/pageDesktop/layout_ (or /_pageMobi/layout_) folder.
-   Subcomponents are organized within their respective folders

```
/components
 /desktop
  /layout
    FooterDesktop.tsx
    HeaderDesktop.tsx
    /ProfessionSectionDesktop
      ProfessionsSectionDesktop.tsx
    /HowWeWork
      content.tsx
      HowWeWorkDesktop.tsx
```

### Next.js Specific Folder Structure

Following Next.js best practices, the app folder is strictly for pages, layouts, and routing. Other components or logical entities are placed out of app under appropriate directories, such as components.

## 2. Naming Conventions

-   Component file names: **UpperCamelCase** (e.g., HowWeWorkDesktop.tsx).
-   Hook file names: **lowerCamelCase** (e.g., useSomething.tsx).
-   Other file names: **kebab-case**

For more details, refer to this [common practice](https://medium.com/@hiro08gh/next-js-naming-conventions-are-checked-with-eslint-rules-946371d67882#:~:text=Component%20Naming%20Conventions,name%20of%20%20the%20folder%20path.).

---

> **Important:** a name of each component should have special end:
>
> -   **Mobi** (for mobile components)
> -   **Desktop** (for Desktop components)
>
>     Example:
>
>     -   HowWeWork<mark>Desktop</mark>.tsx
>     -   HomePage<mark>Mobi</mark>.tsx

---

## 3. TypeScript Naming Conventions

-   Classes, interfaces, types, enums, decorators, type parameters: **UpperCamelCase**.
-   Variables, parameters, functions, methods, properties, module aliases: **lowerCamelCase**.
-   Global constants (including enum elements): **CONSTANT_CASE**.

### Props Types

-   Props types are declared directly in the component file.
-   General or reusable types are placed in a dedicated constants directory.

## 4. Tailwind CSS

### 4.1. Classes for Reusable Styles

You can create your own custom style classes to decrease lines of codes and make clear for reading and understanding.
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

Also, you can add changes in config files in `/tailwind-config` folder. The available configs are described in `tailwind.config.ts`

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

### 4.2. Use of Variables

Avoid "magic numbers." Use variables for colors (use HSV), spacing, and dimensions wherever possible. You can add your own variables in `/styles/globals.css` if it needed:

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

### 4.3. Use these variables from `tailwind.config.ts` to determine screen sizes

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

## 5. Images

### 5.1. To insert any image, you should use the [Image component](https://nextjs.org/docs/pages/api-reference/components/image) from next.js:

    ```jsx
    import Image from 'next/image'

    export default function Page() {
        return <Image src="/profile.png" width={500} height={500} alt="Picture of the author" />
    }
    ```

### 5.2. SVG

    use the custom component from `/components/assets/icons.tsx`

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

### 5.3. Any images, pics, background

```
    /public
        /background
        /images
```

```jsx
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
