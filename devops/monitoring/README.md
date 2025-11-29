# Monitoring Configurations

This folder is where you'll add monitoring configurations for the DevOps System.

## Level 4 - Monitoring

Add the following configurations here:
- `client-servicemonitor.yaml` - ServiceMonitor for client metrics
- `server-servicemonitor.yaml` - ServiceMonitor for server metrics
- Custom Grafana dashboards (optional)

**Prerequisites:**
- Prometheus operator should be installed
- Applications should expose `/metrics` endpoint

Refer to `devops-kit/level-4/helper/` for reference configurations.
