import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./modules/signin";
import Products from "./modules/products";
import AddProduct from "./modules/addProduct";
import ProductDetail from "./modules/productDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id",
      element: <ProductDetail />,
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
