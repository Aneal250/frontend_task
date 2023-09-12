import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import EditPage from "./page/EditPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:name",
      element: <EditPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
