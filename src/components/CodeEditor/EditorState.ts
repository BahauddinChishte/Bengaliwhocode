import { EditorState } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { languages, defaultCodes, type SupportedLanguage } from './languages';

export async function createEditorState(language: SupportedLanguage) {
  const languageExtension = await languages[language]();
  
  return EditorState.create({
    doc: defaultCodes[language],
    extensions: [
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: 'monospace' },
        '.cm-line': { padding: '0 4px' },
      }),
      languageExtension
    ]
  });
}

export function getCurrentLanguage(): SupportedLanguage {
  return (new URLSearchParams(window.location.search).get('lang') as SupportedLanguage) || 'javascript';
}