import Cookies from "js-cookie";
import React, { useEffect } from "react";
import {
  useDeleteContactsMutation,
  useGetContactsQuery,
} from "../redux/api/contactApi";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../redux/contactSlice";

const Table = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactsQuery(token);
  const [deleteContacts] = useDeleteContactsMutation();
  const contacts = useSelector((state) => state.contact.contacts);
  const search = useSelector((state) => state.contact.search);
  const cc = contacts?.contacts?.data;
  const fit = cc?.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts(data));
  }, [data]);
  return (
    <>
      {isLoading ? (
        <div className=" d-flex justify-content-center align-items-center min-vh-100">
          <div
            className="spinner-border text-secondary"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {search.length > 0 ? (
                <>
                  {fit.map((contact) => {
                    return (
                      <tr key={contact.id}>
                        <th scope="row">{contact.name}</th>
                        <td>
                          {contact.email === null
                            ? "example@gmail.com"
                            : contact.email}
                        </td>
                        <td>{contact.phone}</td>
                        <td>
                          {contact.address === null
                            ? "taunggyi"
                            : contact.address}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={async () =>
                              await deleteContacts({ token, id: contact.id })
                            }
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {cc?.map((contact) => {
                    return (
                      <tr key={contact.id}>
                        <th scope="row">{contact.name}</th>
                        <td>
                          {contact.email === null
                            ? "example@gmail.com"
                            : contact.email}
                        </td>
                        <td>{contact.phone}</td>
                        <td>
                          {contact.address === null
                            ? "taunggyi"
                            : contact.address}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={async () =>
                              await deleteContacts({ token, id: contact.id })
                            }
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;

// {cc.map((contact) => {
//     return (
//       <tr key={contact.id}>
//         <th scope="row">{contact.name}</th>
//         <td>
//           {contact.email === null
//             ? "example@gmail.com"
//             : contact.email}
//         </td>
//         <td>{contact.phone}</td>
//         <td>
//           {contact.address === null ? "taunggyi" : contact.address}
//         </td>
//         <td>
//           <button
//             className="btn btn-danger"
//             onClick={async () =>
//               await deleteContacts({ token, id: contact.id })
//             }
//           >
//             <FiTrash />
//           </button>
//         </td>
//       </tr>
//     );
//   })}
