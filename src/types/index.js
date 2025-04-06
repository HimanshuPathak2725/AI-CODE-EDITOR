import { Monaco } from "@monaco-editor/react";
import { Id } from "../../convex/_generated/dataModel";

/**
 * @typedef {Object} Theme
 * @property {string} id
 * @property {string} label
 * @property {string} color
 */

/**
 * @typedef {Object} Language
 * @property {string} id
 * @property {string} label
 * @property {string} logoPath
 * @property {string} monacoLanguage
 * @property {string} defaultCode
 * @property {LanguageRuntime} pistonRuntime
 */

/**
 * @typedef {Object} LanguageRuntime
 * @property {string} language
 * @property {string} version
 */

/**
 * @typedef {Object} ExecuteCodeResponse
 * @property {Object} [compile]
 * @property {string} compile.output
 * @property {Object} [run]
 * @property {string} run.output
 * @property {string} run.stderr
 */

/**
 * @typedef {Object} ExecutionResult
 * @property {string} code
 * @property {string} output
 * @property {string|null} error
 */

/**
 * @typedef {Object} CodeEditorState
 * @property {string} language
 * @property {string} output
 * @property {boolean} isRunning
 * @property {string|null} error
 * @property {string} theme
 * @property {number} fontSize
 * @property {Monaco|null} editor
 * @property {ExecutionResult|null} executionResult
 * @property {function(Monaco):void} setEditor
 * @property {function():string} getCode
 * @property {function(string):void} setLanguage
 * @property {function(string):void} setTheme
 * @property {function(number):void} setFontSize
 * @property {function():Promise<void>} runCode
 */

/**
 * @typedef {Object} Snippet
 * @property {Id<"snippets">} _id
 * @property {number} _creationTime
 * @property {string} userId
 * @property {string} language
 * @property {string} code
 * @property {string} title
 * @property {string} userName
 */

// Export empty objects as placeholders for the types
// These serve as documentation references only
export const Theme = {};
export const Language = {};
export const LanguageRuntime = {};
export const ExecuteCodeResponse = {};
export const ExecutionResult = {};
export const CodeEditorState = {};
export const Snippet = {};
