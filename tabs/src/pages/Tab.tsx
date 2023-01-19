import React, { useContext } from 'react';
import { TeamsFxContext } from '../components/Context';
import Navbar from '../components/Navbar';

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div className={themeString === 'default' ? '' : 'dark'}>
      <Navbar />
    </div>
  );
}
