import { Routes, Route, BrowserRouter } from "react-router-dom"
import DoNext from './DoNext'
import Edit from './Edit'
import TodoDataInterchange from "./todo/TodoDataInterchange"
import TaskDataInterchange from "./task/TaskDataInterchange"
import Focus from "./focus/Focus"

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<DoNext />} />
        <Route path="focus" element={<Focus />} />
        <Route path="edit" element={<Edit />} />
        <Route path="todo-data-interchange" element={<TodoDataInterchange />} />
        <Route path="task-data-interchange" element={<TaskDataInterchange />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App

