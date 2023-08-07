import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [addUser, setAddUser] = useState({
    name: "",
    description: "",
  });

  const [updateUser, setUpdateUser] = useState({
    name: "",
    description: "",
  });

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Xóa người dùng
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/users/${id}`)
      .then((res) => {
        console.log("Xóa thành công");
        loadUsers();
      })
      .catch((err) => console.log(err));
  };

  // Thêm người dùng
  const handleChange = (e) => {
    setAddUser({ ...addUser, [e.target.name]: e.target.value });
  };
  //   console.log(addUser);
  const handleCreateUser = async () => {
    await axios
      .post("http://localhost:3000/api/v1/users", addUser)
      .then((res) => {
        loadUsers();
        setAddUser({
          username: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
  };

  //   update
  const handleChangeUpdate = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    await axios
      .put(`http://localhost:3000/api/v1/users/${updateUser.id}`, updateUser)
      .then((res) => {
        console.log("Cập nhật thành công");
        loadUsers();
        setUpdateUser({
          id: "",
          name: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create Student
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={3}
                  defaultValue={""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleCreateUser}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Student List</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(element.users_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
