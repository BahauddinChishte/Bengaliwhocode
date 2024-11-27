export async function runCode(code: string, language: string): Promise<string> {
  try {
    switch (language) {
      case 'javascript':
        return await runJavaScript(code);
      case 'python':
        return await runPython(code);
      case 'html':
      case 'css':
        return code; // HTML/CSS code is rendered directly
      default:
        throw new Error(`Language ${language} is not supported yet`);
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function runJavaScript(code: string): Promise<string> {
  const logs: string[] = [];
  const originalConsoleLog = console.log;
  
  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  try {
    const result = eval(code);
    if (result !== undefined) {
      logs.push(String(result));
    }
  } finally {
    console.log = originalConsoleLog;
  }

  return logs.join('\n');
}

async function runPython(code: string): Promise<string> {
  // This is a placeholder for Python execution
  // In a real implementation, we would use Pyodide or a similar solution
  return "Python execution is not supported in the browser yet";
}