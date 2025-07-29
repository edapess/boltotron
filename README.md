# Boltotron

> **Note:** Documentation is in progress (for developers only)

## Development Commands

### 1. Install dependencies

**Note:** This is syncing only example app, for main boltotron, go to dir and instal packages there

```bash
yarn project:install
```
### 2. Run Boltotron Tauri Desktop App

```bash
yarn start:boltotron
```

### 3. Run Example React Native App

```bash
yarn start:example
```

## Development Notes

- When creating a new package and debugging it directly in the example app, ensure you:
  - Add the package path to `tsconfig.base.json`
  - Add the alias to `extraNodeModules` in `metro.config.js`

## Resources

### Learn More

- [Nx Workspace Setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Nx Plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Community

- [Discord](https://go.nx.dev/community)
- [Twitter](https://twitter.com/nxdevtools) | [LinkedIn](https://www.linkedin.com/company/nrwl)
- [YouTube Channel](https://www.youtube.com/@nxdevtools)
- [Blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
