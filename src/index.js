import { getInput } from "@actions/core";
import fs from "fs";
import { buildImportMapDependencies } from "@single-spa/import-map-microfrontend-deps";
import { ImportMapMicrofrontendUtils } from "@single-spa/import-map-microfrontend-utils";

const { readFileSync } = fs.promises;

const templatePath = getInput("import-map-template");

await buildImportMapDependencies({
  outputFolder: getInput("output-folder"),
  template: await readFileSync(templatePath, "utf-8"),
  utils: new ImportMapMicrofrontendUtils({
    baseOrigin: getInput("base-origin"),
  }),
});
