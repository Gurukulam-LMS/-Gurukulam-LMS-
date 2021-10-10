import React, { useEffect, useState } from "react";
import style from "../assets/css/UserTable.module.css";
import { Accordion } from "react-bootstrap";
import { useHttpClient } from "../customHook/http-hook";

const Users = () => {
  const { sendRequest } = useHttpClient();
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_API_URL}/admin/auth/getAllUsers`).then(
      (res) => {
        if (res.status === 200) {
          setAllUsers(res.allUsers);
        }
      }
    );
  }, []);

  console.log(allUsers);

  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.heading}>Users</div>
        <div className={style.tableContainer}>
          <Accordion>
            {allUsers.map((user, idx) => {
              return (
                <Accordion.Item eventKey={idx} key={idx}>
                  <Accordion.Header style={{ padding: "5px", margin: "0" }}>
                    {user.local.personalInfo.firstName +
                      (user.local.personalInfo.lastName || "")}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={style.profileDetailsContainer}>
                      <div className={style.row}>
                        <div className={style.details}>
                          <div className={style.label}>Email Address</div>
                          <div className={style.val}>
                            {user.local.personalInfo.email}
                          </div>
                        </div>
                        <div className={style.details}>
                          <div className={style.label}>Mobile number</div>
                          <div className={style.val}>
                            {user.local.personalInfo.mobileNumber || "NA"}
                          </div>
                        </div>
                      </div>
                      <div className={style.row}>
                        <div className={style.details}>
                          <div className={style.label}>Gender</div>
                          <div className={style.val}>
                            {user.local.personalInfo.gender || "NA"}
                          </div>
                        </div>
                        <div
                          className={style.details}
                          style={{ textAlign: "left" }}
                        >
                          <div className={style.label}>Date of Birth</div>
                          <div className={style.val}>
                            {dateHandler(user.local.personalInfo.dob) || "NA"}
                          </div>
                        </div>
                      </div>
                      <div className={style.row}>
                        <div className={style.details}>
                          <div className={style.label}>Country</div>
                          <div className={style.val}>
                            {user.local.personalInfo.country || "NA"}
                          </div>
                        </div>
                        <div className={style.details}>
                          {/* <div className={style.label}>Email Address</div> */}
                          {/* <div className={style.val}>alimodassir@gmail.com</div> */}
                        </div>
                      </div>

                      {user.local.educationalInfo.length > 0 && (
                        <div className={style.educationalInfo}>
                          EDUCATIONAL INFO
                        </div>
                      )}

                      {user.local.educationalInfo.map((info, idx) => {
                        return (
                          <div className={style.row} key={idx}>
                            <div className={style.details}>
                              <div className={style.label}>Education</div>
                              <div className={style.val}>{info.degree}</div>
                            </div>
                            <div className={style.details}>
                              <div className={style.label}>
                                Name of college/school
                              </div>
                              <div className={style.val}>{info.collage}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Users;
