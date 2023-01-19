/**
 * Main Application script
 */
import React, { useRef, useEffect } from 'react';
import { BryntumGantt } from '@bryntum/gantt-react';
import { ganttConfig } from './GanttConfig';
import './App.scss';

interface Props<T> {
  role: number;
}

export default function Gantt<T extends unknown>({ role }: Props<T>) {
  const gantt = useRef<BryntumGantt>(null);
  useEffect(() => {
    if (role === 0) {
      ganttConfig.readOnly = true;
    } else {
      ganttConfig.readOnly = false;
    }
  }, [role]);

  return <BryntumGantt ref={gantt} {...ganttConfig} />;
}

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding
