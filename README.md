# action-build-import-map-microfrontend-deps

Github action for building import-map-microfrontend-deps

## Usage

Add a `uses: single-spa/action-build-import-map-microfrontend-deps@v1` step to your Github workflow

## Inputs

See [action.yml](/action.yml) for a list of all required and optional inputs

## Example

```yml
- name: Build Import Map Dependencies
  uses: single-spa/action-build-import-map-microfrontend-deps@v1
  with:
    import-map-template: importmap-template.json
    output-folder: dist
    base-origin: https://react.microfrontends.app
    dependencies-folder: deps
```
