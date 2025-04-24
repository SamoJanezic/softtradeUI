import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getTable, getSingle } from '../../models/sql.js'
// Custom APIs for renderer
const api = {
  getTable: (param) => {
    return getTable(param)
  },
  getSingle: (id) => {
    return getSingle(id)
  }
  // Add more APIs as needed
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
