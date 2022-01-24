import React, { useState, ChangeEvent } from "react";
import {Link } from "react-router-dom";
import UserDataService from "../Services/UserService";
import IUserData from '../types/User';

const AddUser: React.FC = () => {
  const initialUserState = {
    id: null,
    name: "",
    emailId: "",
    userName: "",
    password:""
  };
  const [user, setUser] = useState<IUserData>(initialUserState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    
    var data = {
        name: user.name,
        emailId: user.emailId,
        userName: user.userName,
        password:user.password
    };

    UserDataService.create(data)
      .then((response: any) => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          emailId: response.data.emailid,
          userName: response.data.username,
          password: response.data.password
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form" >
      {submitted ? (
        <div>
          <h4>User has been created successfully!</h4>
          <div>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
          <Link to={"/users"} className="nav-link">
              <button>View Users</button>
            </Link>
          </div>
         
        </div>
      ) : (

        <div>  
            <form>   
  <div className="form-row">
        <div className="form-group col-3" >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group col-3">
          <label htmlFor="emailId">Email Id</label>
          <input
            type="text"
            className="form-control"
            id="emailId"
            required
            value={user.emailId}
            onChange={handleInputChange}
            name="emailId"
          />
        </div>
        </div>
        <div className="form-group col-3">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            required
            value={user.userName}
            onChange={handleInputChange}
            name="userName"
          />
        </div>
        <div className="form-group col-3">
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

          <button onClick={saveUser} className="btn btn-primary">
            Submit
          </button>
          
          </form> 
        </div>
        
      )}
    </div>
  );
};

export default AddUser;