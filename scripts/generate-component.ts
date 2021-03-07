// @ts-nocheck
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const writeFile = (p, ...args) => {
  fs.writeFileSync(p, ...args);
};

(() => {
  const inputComponentName = process.argv[2];
  const antComp = process.argv[3] === "--geist";
  const workspace = "components";
  const rootPath = path.join(__dirname, `../src/${workspace}`);
  const genRoot = path.join(rootPath, inputComponentName);

  if (fs.existsSync(genRoot)) {
    console.error("Component already exists.");
    return false;
  }

  mkdirp.sync(genRoot);

  writeFile(
    path.join(genRoot, `${inputComponentName}.style.tsx`),
    `
  import styled, {css} from 'styled-components';`
  );

  const importStatement = (compName) =>
    antComp
      ? `
  import React from 'react';
  import { ${compName} as Zeit${compName} } from '@geist-ui/react'
  `
      : `import React from 'react';`;

  writeFile(
    path.join(genRoot, `${inputComponentName}.tsx`),
    `${importStatement(inputComponentName)}\n
  export interface ${inputComponentName}Props {}

  export const ${inputComponentName}: React.FC<${inputComponentName}Props> = (props) => {\n

    return (
      <div>This a ${inputComponentName} component</div>
    )
  }`
  );
})();
