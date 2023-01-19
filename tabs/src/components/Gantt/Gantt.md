import React, { useEffect } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "../../styles/Graph.css";

interface Props<T> {
  tasks: T;
  role: number;
}

export default function Gantt<T extends unknown>({ tasks, role }: Props<T>) {
  useEffect(() => {
    if (role === 0) {
      gantt.config.readonly = true;
    } else {
      gantt.config.readonly = false;
    }

    const initGanttDataProcessor = () => {
      const dp = gantt.createDataProcessor(
        (type: any, action: any, item: any, id: any) => {
          return new Promise<void>((resolve, reject) => {
            console.log(type, action, item, id);
            return resolve();
          });
        }
      );
      dp.init(tasks);
    };
    gantt.init("gantt_here");
    initGanttDataProcessor();
    gantt.parse(tasks);
  }, [role, tasks]);

  return <div id="gantt_here" style={{ height: "100%", width: "100%" }}></div>;
}
