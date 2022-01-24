import React, { useState, useEffect, ChangeEvent } from "react";
import {Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router-dom';

import UserDataService from "../Services/UserService";
import IUserData from "../types/User";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const User: React.FC<Props> = (props: Props) => {
  const initialUserState = {
    id: null,
    name: "",
    emailId: "",
    userName: "",
    password:""
  };
  const [currentUser, setCurrentUser] = useState<IUserData>(initialUserState);
  const [message, setMessage] = useState<string>("");

  const getUser = (id: string) => {
    UserDataService.get(id)
      .then((response: any) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentUser.id,
      name: currentUser.name,
      emailId: currentUser.emailId,
      userName: currentUser.userName,
      password:currentUser.password
    };

    UserDataService.update(currentUser.id, data)
      .then((response: any) => {
        console.log(response.data);
        //setCurrentUser({ ...currentUser, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateUser = () => {
    if (window.confirm('Are you sure you wish to update this item?'))
    UserDataService.update(currentUser.id, currentUser)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The User detail was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    if (window.confirm('Are you sure you wish to delete this item?'))
    UserDataService.remove(currentUser.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/users");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  console.log(currentUser.id)
  return (
   
    <div>
      {currentUser ? (
        
        <div className="edit-form">
          <h4>User</h4>
          <form autoComplete="off">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Email Id</label>
              <input
                type="text"
                className="form-control"
                id="emailId"
                name="emailId"
                value={currentUser.emailId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={currentUser.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
              />
            </div>
          </form>

         

          <button  onClick={deleteUser}>
            Delete
          </button>


          <button
            type="submit"
            
            onClick={updateUser}
          >
            Update
          </button>
          <Link to={"/users"} className="nav-link">
             Back To Users....
            </Link>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;