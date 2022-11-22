import React, { useContext } from "react";
import { AppContext } from "../contextAPI/context";
import { Route, Redirect } from "react-router-dom";

export const generateTableHead = (table, data) => {
  const thead = table.createTHead();
  const row = thead.insertRow();
  console.log(data);

  for (let key in data) {
    const th = document.createElement("th");

    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

export const generateTableBody = (table, data) => {
  const tbody = table.createTBody();

  for (let element of data) {
    let row = tbody.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
