import React, { useEffect, useState, useContext } from "react";
import style from "../assets/css/UserTable.module.css";
import { Accordion } from "react-bootstrap";
import { AuthContext } from "../context/authContext";

const Users = () => {
  const [searchInp, setSearchInp] = useState("");
  const { allUsers } = useContext(AuthContext);
  const [users, setUsers] = useState([...allUsers]);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (searchInp === "") setUsers(allUsers);
    const userFilter = allUsers.filter((user) => {
      console.log(user);
      const name = (
        user.local.personalInfo.firstName + user.local.personalInfo.lastName
      )?.toLowerCase();
      return name.includes(searchInp.toLowerCase());
    });
    if (!!userFilter) setUsers(userFilter);
  }, [searchInp]);

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
        <div className={style.containerHeader}>
          <div className={style.heading}>Users</div>
          <input
            className={style.searchInput}
            type="text"
            placeholder="Search a user  🔎"
            onChange={(e) => setSearchInp(e.target.value)}
          />
        </div>
        <div className={style.tableContainer}>
          <div className={style.header}>
            <div className={style.col1}>User Name</div>
            <div className={style.col2}>Date of joining</div>
            <div className={style.col3}>Total Courses Enrolled</div>
          </div>
          <Accordion>
            {users.map((user, idx) => {
              console.log(user);
              return (
                <Accordion.Item eventKey={idx} key={idx}>
                  <Accordion.Header style={{ padding: "0px", margin: "0" }}>
                    <div className={style.col1}>
                      {user.local.personalInfo.firstName +
                        (user.local.personalInfo.lastName || "")}
                    </div>
                    <div className={style.col2}>
                      {dateHandler(user.createdAt)}
                    </div>
                    <div className={style.col3}>
                      {user.local.coursesEnrolled?.length}
                    </div>
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
