import { useEffect, useState } from "react";
import { deleteRequest, getRequest, postRequest } from "../Utils";


const endpoint = `https://express-server.hyderion.com`


const mockData = [
    {firstName: 'Ibrahim', lastName: 'Aboud', email: 'iaboud@gmail.com', encryptedPassword: '123456', userStatus: 'Admin' },
    {firstName: 'Tony', lastName: 'Stark', email: 'tony@ironman.com', encryptedPassword: 'Pepper', userStatus: 'User' },
    {firstName: 'Thor', lastName: 'Odin', email: 't.odin@avengers.com', encryptedPassword: 'Loki', userStatus: 'User' },
    {firstName: 'Jack', lastName: `O'Neil`, email: 'jack@sgc.com', encryptedPassword: 'Charlie', userStatus: 'Admin' },
    {firstName: 'Rodney', lastName: 'MacKay', email: 'rmm@sga.com', encryptedPassword: 'replicators', userStatus: 'User' },
]





const UserList = () => {


    const [users, setUsers]: any = useState([]);
    const [reload, setReload]: any = useState(false);

    const [fName, setFName]: any = useState('');
    const [lName, setLName]: any = useState('');
    const [email, setEmail]: any = useState('');
    const [password, setPassword]: any = useState('');
    const [userStatus, setUserStatus]: any = useState('user');



    const stateMapper: any = {
        fName: setFName,
        lName: setLName,
        email: setEmail,
        password: setPassword,
        userStatus: setUserStatus
    }




    useEffect(() => {
        
        getRequest(`${endpoint}/api/users`)
            .then((response: any) => {
                console.log(response);
                setUsers(response.users);
            })
    }, [reload])



    const handleChange = async (e: any) => {
        await stateMapper[e.target.name](e.target.value);
    }



    const addUser = async () => {

        const newUser = {
            firstName: fName,
            lastName: lName,
            email: email,
            password: password,
            userStatus: userStatus
        }

        await postRequest(`${endpoint}/api/users/add`, JSON.stringify(newUser));
        setReload(!reload);

        setFName('');
        setLName('');
        setEmail('');
        setPassword('');

    }


    const deleteUser = async (id: number) => {
        console.log(id);

        const response = await deleteRequest(`${endpoint}/api/users/delete`, id);
        console.log(response);
        setReload(!reload);
    }


  return (
    <div>
        <div>
            <table className="w-100 p-3">
                <thead className="">
                    <tr className="">
                        <th className="">First Name</th>
                        <th className="">Last Name</th>
                        <th className="">Email</th>
                        <th className="">Encrypted Password</th>
                        <th className="">User Status</th>
                    </tr>
                </thead>
                <tbody className="">


                {
                    users && users.map((user: any, index: number) => {
                        return (
                            <tr className="text-center" key={index}>
                                <td className="">{ user.firstName }</td>
                                <td className="">{ user.lastName }</td>
                                <td className="">{ user.email }</td>
                                <td className="">{ user.password }</td>
                                <td className="">{ user.userStatus }</td>
                                <td className="">
                                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })
                }


                    <tr className="text-center">
                        <td className="">
                            <input className="text-center p-3 w-100" type="text" onChange={handleChange} value={fName} name="fName" />
                        </td>

                        <td className="">
                            <input className="text-center p-3 w-100" type="text" onChange={handleChange} value={lName} name="lName" />
                        </td>

                        <td className="">
                            <input className="text-center p-3 w-100" type="text" onChange={handleChange} value={email} name="email" />
                        </td>

                        <td className="">
                            <input className="text-center p-3 w-100" type="password" onChange={handleChange} value={password} name="password" />
                        </td>

                        <td className="">
                            <select className="p-3 w-100 text-center" onChange={handleChange} name="userStatus">
                                <option value={`user`}>User</option>
                                <option value={`admin`}>Admin</option>
                            </select>
                        </td>

                        <td className="">
                            <button className="btn btn-primary" onClick={addUser}>Add</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default UserList;