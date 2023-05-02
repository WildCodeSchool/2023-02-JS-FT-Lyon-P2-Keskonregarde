// import React, { useContext, useEffect } from "react";
import Dropdown from "react-dropdown";
//import Dropdown from "rc-dropdown";
import { useNavigate } from "react-router-dom";

import styles from "./SearchFilter.module.css";
import "react-dropdown/style.css";

export default function SearchFilter() {
  const navigate = useNavigate();
  const url = "/search";

  const options = [
    {
      value: "Mieux notés",
      label: "Mieux notés",
    },
    { value: "Nouveautés", label: "Nouveautés" },
    { value: "Populaires", label: "Populaires" },
  ];
  return (
    <div className={styles.searchFilterBar}>
      <Dropdown
        placeholder="Films"
        options={options}
        onChange={() => navigate(url)}
      />{" "}
      <Dropdown
        placeholder="Séries TV"
        options={["Mieux notés", "Nouveautés", "Populaires"]}
      />
    </div>
  );
}
