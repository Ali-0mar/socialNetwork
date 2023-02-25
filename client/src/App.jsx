import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';
import './App.css'
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {themeSettings} from "./theme.js";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(()=> createTheme(themeSettings(mode)) , [mode])
  return (

    <div className="App">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/profile/:userId' element={<ProfilePage />} />
            </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
