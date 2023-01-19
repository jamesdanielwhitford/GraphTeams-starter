import React, { useContext, useState } from "react";
import { TeamsFxContext } from "../components/Context";
import config from "../lib/config";
import Gantt from "../components/Gantt";
import Navbar from "../components/Navbar";

const showFunction = Boolean(config.apiName);
const data = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2019-04-15",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2019-04-18",
      duration: 3,
      progress: 0.4,
    },
    {
      id: 3,
      text: "Task #3",
      start_date: "2019-04-18",
      duration: 7,
      progress: 0.4,
    },
    {
      id: 4,
      text: "Task #4",
      start_date: "2019-04-18",
      duration: 3,
      progress: 0.4,
    },
    {
      id: 5,
      text: "Task #5",
      start_date: "2019-04-18",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
};

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  const [role, setRole] = useState(0);

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <Navbar setRole={setRole} />
      <Gantt tasks={data} role={role} />
    </div>
  );
}
