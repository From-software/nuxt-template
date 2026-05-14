# Nuxt template

This is a Nuxt template to hit the ground running while building new apps.

## Stack

- Nuxt 4, Vue 3 & Typecsript
- Node, Docker & K3s
- Eslint & Stylistic

## Usage

To use this template, fork the repository. This means that commits in forks can be pushed back to this template repository.

## Development

Clone the repository and run `npm install`. This will prepare Nuxt and also install Husky git hooks.

Then use Docker to start the Nuxt dev server and Postgres server: `docker compose up --detach`.

### Github Workflows

This repository uses two GitHub Workflows:
- CI: Runs typecheck and linting on pull requests to main to make sure the PR does not introduce any errors
- Build: Builds and pushes a new Docker image to ghcr.io on pushes to the main branch.

### Prerequisites

- Node 24 & npm
- Docker

## Code style

This project uses Eslint and Stylistic to enforce lint and style errors.

To run it use the `lint` npm script to validate or `lint:fix` to automatically fix eslint and stylistic errors.

## Dependabot

Dependabot is enabled in the GitHub repository. Dependabot automatically scans dependencies for security vulnerabilities and updates to dependencies and creates pull requests.
