import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layouts"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/createaccount"
import styled, { createGlobalStyle } from "styled-components"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import ProtectedRoute from "./components/protected-route"

const router = createBrowserRouter([
  {
    path:"/",
    element: 
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
    children: [
      {
        path:"",
        element: <Home />,
      },
      {
        path:"profile",
        element: <Profile />,
      }
    ]
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/create_account",
    element: <CreateAccount />,
  }
])

const GlobalStyles = createGlobalStyle`
  
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;



function App() {
  const [, setIsLoading] = useState(true);
  const init = async() => {
    // wait firebase
    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, [])

  
  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>
    </> 
  );
}

export default App
