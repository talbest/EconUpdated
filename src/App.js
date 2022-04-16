import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.componenet';
import Navigation from './routes/navigation/navigation.copmonent';
import SignIn from './routes/sign-in/sign-in.component';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="sign-In" element={<SignIn />} />
      </Route>
    </Routes >
  )

}

export default App;
