import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Server from "../atoms/Server";
import SortDDL from "../atoms/SortDDL";
import _orderBy from "lodash.orderby";
import Warning from "../atoms/Warning";
import AnimateBlock from "../atoms/AnimateBlock";

const List = () => {
  const [servers, setServers] = useState([]);
  const [sortingKey, setSorting] = useState("");
  const [message, setWarningMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const token = sessionStorage.getItem("__tok");
  /**
   * If user isn't authenticated > redirect to login page
   * Otherwise load servers list
   */
  useEffect(async () => {
    if (!token) {
      navigate("/login");
    } else {
      const url = "https://playground.nordsec.com/v1/servers";
      setIsLoading(true);

      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .catch(() => {
          setWarningMessage("Something wrong happened!");
        })
        .finally(() => {
          setIsLoading(false);
        });

      const json = await response.json();

      if (response.status === 200) {
        setWarningMessage("");
        setServers(json);
      } else {
        setWarningMessage("Something wrong happened!");
      }
    }
  }, []);

  const constructServers = () => {
    return servers.map((server, index) => {
      return <Server key={index} server={server} />;
    });
  };

  /**
   * Sorting order functionality
   */
  const sortServersByKey = (key) => {
    const sortBy = key.split("-")[0];
    const direction = key.split("-")[1];

    const sortedServers = _orderBy(servers, [sortBy], [direction]);
    setServers(sortedServers);
  };

  return (
    <section className="bg-white h-screen w-full rounded-lg shadow-lg pt-4">
      <div className="flex justify-end px-6">
        <SortDDL
          value={sortingKey}
          onChange={(e) => {
            setSorting(e.target.value);
            sortServersByKey(e.target.value);
          }}
          onBlur={(e) => {
            setSorting(e.target.value);
            sortServersByKey(e.target.value);
          }}
        />
      </div>

      <div className="w-full bg-white rounded-lg mb-4">
        <ul className="divide-y-2 divide-gray-100">
          <li className="flex p-2 px-6 font-bold text-neutral-700 justify-between">
            <span className="flex">
              <span className="flex items-center">
                <span>Location</span>
              </span>
            </span>
            <span>Distance</span>
          </li>
          {isLoading ? <AnimateBlock /> : constructServers()}
        </ul>
        <div className="flex items-center justify-center">
          <div className="md:w-1/4">
            <Warning message={message} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
