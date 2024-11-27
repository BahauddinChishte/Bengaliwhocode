import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

export type SupportedLanguage = 'javascript' | 'python' | 'html' | 'css' | 'c';

export const languages = {
  javascript: () => javascript(),
  python: () => python(),
  html: () => html(),
  css: () => css(),
  c: () => javascript(), // Using JavaScript highlighting for C temporarily
};

export const defaultCodes: Record<SupportedLanguage, string> = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>`,
  css: `body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}`,
  javascript: `// Write your JavaScript code here
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`,
  python: `# Write your Python code here
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
};