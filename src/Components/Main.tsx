import { Route, Routes } from "react-router-dom";
import UserList from "./UserList";



const Main = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={ <UserList /> } /> 
        </Routes>
    </div>
  );
}

export default Main;