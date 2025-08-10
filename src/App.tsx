import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"


import * as Pages from "@/pages";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route index element={<Pages.Home />} />
    </Route>
  )
)


const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App