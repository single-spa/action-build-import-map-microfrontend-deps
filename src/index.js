import { getInput, setFailed } from "@actions/core";
import fs from "node:fs/promises";
import { buildImportMapDependencies } from "@single-spa/import-map-microfrontend-deps";
import { ImportMapMicrofrontendUtils } from "@single-spa/import-map-microfrontend-utils";

const templatePath = getInput("import-map-template");

let templateStr, templateJson;

try {
  templateStr = await fs.readFile(templatePath, "utf-8");
} catch (err) {
  console.error(err);
  setFailed(
    `Unable to read import-map-template from filePath '${templatePath}'`,
  );
}

try {
  templateJson = JSON.parse(templateStr);
} catch (err) {
  console.error(err);
  setFailed(
    `import map template at file path '${templatePath}' does not contain valid JSON`,
  );
}

await buildImportMapDependencies({
  outputFolder: getInput("output-folder"),
  template: templateJson,
  utils: new ImportMapMicrofrontendUtils({
    baseOrigin: getInput("base-origin"),
  }),
});
