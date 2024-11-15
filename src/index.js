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

class Utils extends ImportMapMicrofrontendUtils {
  getDependenciesFolderName() {
    return getInput("dependencies-folder") ?? super.getDependenciesFolderName();
  }
}

await buildImportMapDependencies({
  outputFolder: getInput("output-folder"),
  template: templateJson,
  utils: new Utils({
    baseOrigin: getInput("base-origin"),
  }),
});
