import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "../FormData/FormData";

axios.defaults.baseURL = "http://localhost:8080/";

export default function Home() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [dataFormEdit, setDataFormEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setDataForm((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", dataForm);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", dataFormEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setDataFormEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (item) => {
    setDataFormEdit(item);
    setEditSection(true);
  };

  return (
    <>
      {console.log(dataForm)}
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={() => setAddSection(true)}
            >
              Add
            </button>

            {addSection && (
              <FormData
                handleOnChange={handleOnChange}
                handleClose={() => setAddSection(false)}
                handleSubmit={handleSubmit}
                rest={dataForm}
              />
            )}
            {editSection && (
              <FormData
                handleOnChange={handleEditOnChange}
                handleClose={() => setEditSection(false)}
                handleSubmit={handleUpdate}
                rest={dataFormEdit}
              />
            )}

            <div className="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((item) => (
                    <tr key={item.id}>
                      <td> {item.name} </td>
                      <td> {item.email} </td>
                      <td> {item.mobile} </td>
                      <td>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
