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

## Deployment

The app is deployed to K3s using `k8s.yaml`. K3s ships Traefik as the default ingress controller; cert-manager is required for automatic TLS via Let's Encrypt.

### Prerequisites

- K3s cluster with [cert-manager](https://cert-manager.io) installed
- A `ClusterIssuer` named `letsencrypt-prod` configured in cert-manager
- A DNS A record pointing your hostname at the cluster's public IP

### First-time setup

1. Edit `k8s.yaml` and replace `app.example.com` with your real hostname.

2. Apply the manifest:
   ```sh
   kubectl apply -f k8s.yaml
   ```

3. Create the GHCR pull secret (needed to pull the image from `ghcr.io`):
   ```sh
   kubectl -n nuxt-template create secret docker-registry ghcr-pull-secret \
     --docker-server=ghcr.io \
     --docker-username=<github-username> \
     --docker-password=<github-pat>
   ```

4. Create the app secret:
   ```sh
   kubectl -n nuxt-template create secret generic app-secrets \
     --from-literal=TZ=Europe/Copenhagen \
     --from-literal=POSTGRES_HOST=<host> \
     --from-literal=POSTGRES_USER=<user> \
     --from-literal=POSTGRES_PASSWORD=<password>
   ```

5. If the pod started before the secrets existed, restart the rollout:
   ```sh
   kubectl -n nuxt-template rollout restart deployment/nuxt-template
   ```

### Deploying a new image

After a new image is pushed to `ghcr.io` (via the Build workflow), restart the deployment to pull it:

```sh
kubectl -n nuxt-template rollout restart deployment/nuxt-template
```

This works because the Deployment uses `imagePullPolicy: Always`.

### Notes

- **Health probes** — liveness and readiness probes hit `GET /api/health`. This endpoint does not exist yet (tracked in issue #10). Until it is added, pods will fail readiness checks; comment out the probes in `k8s.yaml` if you need to deploy before that issue lands.
- **Encrypted secrets in git** — if you want to commit secrets safely, consider [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) or [SOPS](https://github.com/getsops/sops). The current `k8s.yaml` intentionally omits Secret resources; they are created out-of-band via `kubectl`.

## Code style

This project uses Eslint and Stylistic to enforce lint and style errors.

To run it use the `lint` npm script to validate or `lint:fix` to automatically fix eslint and stylistic errors.

## Dependabot

Dependabot is enabled in the GitHub repository. Dependabot automatically scans dependencies for security vulnerabilities and updates to dependencies and creates pull requests.
