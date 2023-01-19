/**
 * Application configuration
 */
import { GanttConfig, ProjectModel } from '@bryntum/gantt';

// create project which loads data from a URL
const project = new ProjectModel({
  taskStore: {
    autoTree: true,
    transformFlatData: true,
  },
  // specify data source
  transport: {
    load: {
      url: 'http://localhost:8010/api/user/data',
    },
    sync: {
      url: 'http://localhost:8010/api/user/api',
    },
  },
  autoLoad: true,
  autoSync: true,
  validateResponse: true,
});

const ganttConfig: Partial<GanttConfig> = {
  width: '100vw', // = 800px
  height: '100vh',
  listeners: {},
  dependencyIdField: 'sequenceNumber',
  columns: [{ type: 'name', width: 250, text: 'Tasks' }],
  viewPreset: 'weekAndDayLetter',
  barMargin: 10,

  project,
};

ganttConfig.readOnly = true;

project.load();

export { ganttConfig };
