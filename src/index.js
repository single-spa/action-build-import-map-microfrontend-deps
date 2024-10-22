import { getInput } from "@actions/core";
import { promises as fs } from "node:fs";
import { buildImportMapDependencies } from "@single-spa/import-map-microfrontend-deps";
import { ImportMapMicrofrontendUtils } from "@single-spa/import-map-microfrontend-utils";

const templatePath = getInput("import-map-template");

await buildImportMapDependencies({
  outputFolder: getInput("output-folder"),
  template: await fs.readFileSync(templatePath, "utf-8"),
  utils: new ImportMapMicrofrontendUtils({
    baseOrigin: getInput("base-origin"),
  }),
});
