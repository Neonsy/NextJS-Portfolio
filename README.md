# NextJS Portfolio Site

![JavaScript](https://img.shields.io/badge/JavaScript-031321?style=for-the-badge&logo=javascript&logoColor=yellow)
![NodeJS](https://img.shields.io/badge/NodeJS-031321?style=for-the-badge&logo=node.js&logoColor=green)
![React](https://img.shields.io/badge/React-031321?style=for-the-badge&logo=react&logoColor=61DAFB)
![NextJs](https://img.shields.io/badge/Next.js-031321?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-031321?logo=typescript&logoColor=3178C6&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind-031321?logo=tailwindcss&logoColor=38B2AC&style=for-the-badge)
![Prettier](https://img.shields.io/badge/Prettier-031321?logo=prettier&logoColor=F7B93E&style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-031321?logo=github-actions&logoColor=2088FF&style=for-the-badge)

This is a portfolio site built with NextJS.
It's also my first time properly using NextJS, after learning it, as well as React.

> [!NOTE]
> This Website will replace the current [Portfolio Placeholder](https://github.com/Neonsy/Portfolio) once it's complete.

## Workflows

![Main Workflow](https://github.com/Neonsy/NextJS-Portfolio/actions/workflows/main.yml/badge.svg)
[![Vercel Status](https://vercelbadge.vercel.app/api/Neonsy/NextJS-Portfolio)](https://vercel.com/neonspace/neonspace-portfolio)

### Main Action CI/CD

The workflow is triggered on pull requests targeting the `main` and `Preview` branches when they are opened, reopened, or synchronized.
The reason for this workflow is that with the Vercel environments, I've created a commit flow, that I want to play with.

The current flow, that I have in mind, is:

-   The **Dev** branch, is the outmost layer of the _pipeline_, where all the changes happen.
-   The **Preview** branch, is the 2. layer, where all the changes get merged into and the deployment is being previewed.
-   The **main** branch, is the core layer, that get's all the **Dev** changes, filtered and tested on / form the **Preview** branch, which results in the production version.

> [!NOTE]TL;DR
> **`Dev`**->**`Preview`**->**`main`**

I can also work on Dev directly, depending on the occasion.

#### It runs the following steps:

1. **Restrict PR**

    - **Objective**: Ensure PRs are made from the correct source branches.
    - **Steps**:
        - Checkout the repository.
        - Check if the PR to the `Preview` branch originates from the `Dev` branch.
        - Check if the PR to the `main` branch originates from the `Preview` branch.
        - Add a label and close the PR if the branch conditions are not met.

2. **Label PR**

    - **Objective**: Label PRs based on their target branches.
    - **Steps**:
        - Checkout the repository.
        - Add a "preview" label for PRs from `Dev` to `Preview`.
        - Add a "production ready" label for PRs from `Preview` to `main`.

3. **Format and Lint**

    - **Objective**: Ensure code quality and formatting.
    - **Steps**:
        - Checkout the repository.
        - Setup PNPM and Node.js.
        - Install dependencies.
        - Run ESLint to check for code quality:
            - Add a label if ESLint fails.
            - Remove the label if ESLint succeeds.
            - Fail the job if ESLint fails.
        - Run `format:check` to verify code formatting:
            - Add a label if Prettier check fails.
            - Remove the label if Prettier check succeeds.
            - Run `format:fix` if needed and add a label if successful.
        - Check for changes and commit/push if any are found.

4. **Vercel Deploy**

    - **Objective**: Deploy to Vercel for production.
    - **Steps**:
        - Checkout the repository.
        - Setup PNPM and Node.js.
        - Install dependencies and Vercel CLI.
        - Pull Vercel environment information.
        - Build and deploy project artifacts to Vercel for production.

5. **Vercel Deploy Preview**
    - **Objective**: Deploy to Vercel for preview environments.
    - **Steps**:
        - Checkout the repository.
        - Setup PNPM and Node.js.
        - Install dependencies and Vercel CLI.
        - Pull Vercel environment information for preview.
        - Build and deploy project artifacts to Vercel for preview.
        - Comment the deployment URL on the PR.
