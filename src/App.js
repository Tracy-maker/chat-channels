import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Chat from "./components/Chat/Chat";
import "./App.css";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Spinner from "react-spinkit";


const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const MenuButton = styled.img`
  cursor: pointer;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  width: 24px;  
  height: 24px; 
  display: none;

  @media (max-width: 700px) {
    display: block;
  }
`;

function App() {
  const [user, loading] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
  ]);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn0.iconfinder.com/data/icons/constructivism-for-the-bank/64/constr_support_chat-512.png"
            alt="logo"
          />
          <Spinner name="ball-triangle-path" color="purple" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <MenuButton
            src={
              sidebarOpen
                ? "https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png" // Delete icon when sidebar is open
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAY1BMVEX///8AAAD6+vry8vJaWlq1tbWkpKT19fWDg4Nubm51dXXd3d3Ozs6KiopEREQSEhLX19dPT08qKiq/v7+RkZFhYWFmZmbn5+ecnJwjIyPIyMhKSko/Pz83NzeqqqoKCgobGxs7EfU+AAACUklEQVR4nO3d626jMBCGYcJhIYATCgmQQ2nv/yobtrtSV7IN+M9o2Pe5gm9kSAyawVEEAAAAAAAAYI08USBfU0k1FuVRgbIYq4VSBnM6H5Q4n8zgq6V5SCfc5tF4LrGbdLqtbs5LbThJZ9vu5LrSJulkISZ7LYl0rjCJtZi7dKwwd2sxhXSsMIW1mFQ6VpjUWsybdKwwb9ZirtKxwlytxVykY4W5WIuppGOFse8BYoUbgNcWILYWE9XSwULU9lqi3Egn2844H9KSUjrbVqV9M/NdzdhKx9uiHT21vK602qgppzX10ouApGq6TIGuqbzLAgAAAAAAAAAAAAAA9qa69KkC/WVpriGKM0Ud9LfM0Wv2Z1V66YDb9J7VqdR1A6fOavKjdLbtjq7Gpkw6WYjMcfOr6TT7qbX/CKjsN3V1nCpsN53Zm7SVts/31mKUDc/99djTyvwHgw2NdKww9lHN+CmdK8TTsdnspIOF6Oy1RLnCEbrC2XQ+KHsCeP3JeEa1B2VjGqV37Dy6v0sHXO/dPm/6z+pkplTAZP5VAQAAAAAAAAAAAAAAv8UqrKlkqLvplwJTVy91NSRdqaa7uS0778cnh0LRkMbhcCt8TU07atHS9x1dz5d0VR4M4GjTytXc+j+19r7GXbUC76pJe1ft87s6sUHd9Nw3+1kaSoeBjLWYXY1pJR/SuUJ8OLYAexptjBKFP85X51PAoG6C5ul5Bqh6NYfpzc6+Qe35/In0UzriWp+p//SJeXGm0RQKmHFa/LrBLM4VWPV2BgAAAAAAAAjzBTJWWKlXfdGjAAAAAElFTkSuQmCC" // Menu icon when sidebar is closed
            }
            onClick={toggleSidebar}
          />
          <AppBody>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <RouterProvider router={router} />

          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;
