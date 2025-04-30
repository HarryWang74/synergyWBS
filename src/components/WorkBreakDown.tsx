import  {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  ValidationModule,
} from 'ag-grid-community'
import { TreeDataModule } from 'ag-grid-enterprise'
import { getData } from '../data/data'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TreeDataModule,
  ValidationModule /* Development Only */,
])

const WorkBreakDown = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState<any[]>(getData())
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'created' },
    { field: 'modified' },
    { field: 'size'},
  ])
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: 'File Explorer',
      minWidth: 280,
      cellRendererParams: {
        suppressCount: true,
      },
    }
  }, [])
  const getDataPath = useCallback((data) => data.path, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
        />
      </div>
    </div>
  )
}
export default WorkBreakDown
