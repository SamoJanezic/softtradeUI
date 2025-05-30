import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getTable, getSingle, updateKategorija, updateIzdelek } from '../../models/sql.js'
import { up } from '../../external/nodejsqlite/scripts/up.js'
import { downloadStart } from '../../external/nodejsqlite/xml-downloader/app.js'

// Custom APIs for renderer
const api = {
  updateIzdelek: (obj) => {
    return updateIzdelek(obj)
  },
  getTable: (param) => {
    return getTable(param)
  },
  getSingle: (id) => {
    return getSingle(id)
  },
  updateKategorija: (marza, id) => {
    return updateKategorija(marza, id)
  },
  clearDb: () => {
    return up()
  },
  downloadXml: () => {
    return downloadStart();
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
