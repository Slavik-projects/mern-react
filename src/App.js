//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";



const ROLES = {
	'User': 1925,
	'Editor': 1984,
	'Admin': 1923
}

/* IN index.js
<BrowserRouter>
	   <AuthProvider>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</AuthProvider>
</BrowserRouter>*/

function App() {
   return (
<BrowserRouter>
{/*<AuthProvider>*/}
<AuthProvider>
   <Routes>
		<Route path="/" element={<Layout />}>
         <Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="linkpage" element={<LinkPage />} />
			<Route path="unauthorized" element={<Unauthorized />} />

			<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
				<Route path="/" element={<Home />} />
			</Route>

			<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
				<Route path="editor" element={<Editor />} />
			</Route>

			<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
				<Route path="admin" element={<Admin />} />
			</Route>

			<Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
				<Route path="lounge" element={<Lounge />} />
			</Route>

			<Route path="*" element={<Missing />} />
		</Route>
	</Routes>
	</AuthProvider>
{/*</AuthProvider>*/}
</BrowserRouter>
   );
}

export default App;
