import {RouterProvider, createBrowserRouter} from "react-router-dom"
import {Root }from "./routes/Root/Root"
import  {Login } from "./routes/Login/Logit"
import {Todo} from "./routes/Todo/Todo"
import Register from "./routes/Register/Register"

 let router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    errorElement: <h1>ERR0R</h1>,
    children:[
      {
        index: true,
element: <Todo />
      },
      {
        path: '/login',
element: <Login />
      },
      {
        path: '/register',
element: <Register/>
      }
    ]


  }
])
 function App() {
 return <RouterProvider router={router} />
 }
 export default App