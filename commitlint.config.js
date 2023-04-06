/* eslint-disable @typescript-eslint/no-var-requires */
// CommonJS
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scopes = fs.readdirSync(path.resolve(__dirname, 'src')).map((i) => i.toLowerCase());

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n');

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/\//g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

module.exports = {
  extends: ['@jsxiaosi/commitlint-config'],
  prompt: {
    // setting of range.
    scopes: [...scopes, 'mock'],
    // "Can the scope be selected multiple times?"
    enableMultipleScopes: true,
    // "Separate the selected ranges with identifiers."
    scopeEnumSeparator: ',',
    //  "Set the position of the empty option and custom option in the selected range."
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    // "If the defaultScope matches the value in the list of selected range options, the starred and pinned operation will be performed."
    defaultScope: scopeComplete,
    // "describe the default value."
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
  },
};
