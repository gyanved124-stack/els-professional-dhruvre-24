# Helm Charts

This folder is where you'll create your Helm charts for the DevOps System.

## Level 3 - Helm

Create two Helm charts here:
- `client/` - Helm chart for the React client
- `server/` - Helm chart for the Strapi server

Each chart should contain:
- `Chart.yaml` - Chart metadata
- `values.yaml` - Configuration values
- `templates/` - Kubernetes manifest templates
  - `deployment.yaml`
  - `service.yaml`
  - `_helpers.tpl`

Refer to `devops-kit/level-3/helper/` for complete reference implementations.
