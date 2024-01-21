import { Routes, Route, BrowserRouter } from "react-router-dom"
import DoNext from './DoNext'
import Edit from './Edit'
import TodoDataInterchange from "./todo/TodoDataInterchange"
import TaskDataInterchange from "./task/TaskDataInterchange"
import Focus from "./focus/Focus"
import FocusTaskDataInterchange from "./focus/FocusTaskDataInterchange"
import FocusStateProvider from "./focus/FocusStateProvider"
import FocusStorageProvider from "./focus/FocusStorageProvider"

function App() {


  return <BrowserRouter>
    <FocusStorageProvider>
      <FocusStateProvider>
        <Routes>
          <Route path="/" >
            <Route index element={<DoNext />} />
            <Route path="focus" element={<Focus />} />
            <Route path="edit" element={<Edit />} />
            <Route path="todo-data-interchange" element={<TodoDataInterchange />} />
            <Route path="task-data-interchange" element={<TaskDataInterchange />} />
            <Route path="focus-task-data-interchange" element={<FocusTaskDataInterchange />} />
          </Route>
        </Routes>
      </FocusStateProvider>
    </FocusStorageProvider>
  </BrowserRouter>
}

export default App

