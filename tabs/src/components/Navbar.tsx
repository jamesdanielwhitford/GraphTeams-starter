import { Avatar } from '@fluentui/react-northstar';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { TeamsFxProvider } from '@microsoft/mgt-teamsfx-provider';
import { useData, useGraph } from '@microsoft/teamsfx-react';
import React, { useState, useContext, useEffect } from 'react';
import '../styles/Navbar.css';
import { TeamsFxContext } from './Context';
import axios from 'axios';

import Gantt from '../components/Gantt';

const baseUrl = 'http://localhost:8010/api/';

export default function Navbar() {
  const [role, setRole] = useState(0);
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });

  const dataGraph = useGraph(
    async (graph, teamsfx, scope) => {
      // Call graph api directly to get user profile information
      const profile = await graph.api('/me').get();

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsfx, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = '';
      try {
        const photo = await graph.api('/me/photo/$value').get();
        photoUrl = URL.createObjectURL(photo);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl };
    },
    { scope: ['User.Read'], teamsfx: teamsfx }
  );

  useEffect(() => {
    dataGraph.reload();
  }, []);

  const userName = loading || error ? '' : data!.displayName;

  useEffect(() => {
    const getUserInfo = async (teamsId: string) => {
      const userInfo = await axios.get(`${baseUrl}user/teamsid/${teamsId}`);
      return userInfo.data;
    };
    if (dataGraph.data) {
      getUserInfo(dataGraph.data.profile.id).then((res) => {
        if (!res) {
          let managerRole = 0;
          if (dataGraph.data?.profile.jobTitle === 'Manager') {
            managerRole = 1;
          }
          axios.post(`${baseUrl}user`, {
            firstName: dataGraph.data?.profile.givenName,
            lastName: dataGraph.data?.profile.surname,
            email: dataGraph.data?.profile.mail ?? '',
            mobile: dataGraph.data?.profile.mobilePhone ?? '',
            teamsId: dataGraph.data?.profile.id,
            username: dataGraph.data?.profile.userPrincipalName,
            displayName: dataGraph.data?.profile.displayName,
            photoUrl: dataGraph.data?.photoUrl,
            role: managerRole,
          });
          setRole(managerRole);
        } else {
          setRole(res.role);
        }
      });
    }
  }, [dataGraph.data, setRole]);

  return (
    <div>
      <div className="navbarContainer">
        <div className="userName">
          {userName ? userName : 'Cannot get username'}
        </div>
        <div className="iconContainer">
          {dataGraph.data ? (
            <Avatar
              size="medium"
              image={dataGraph.data.photoUrl}
              name={dataGraph.data.profile.displayName}
            />
          ) : (
            <button onClick={dataGraph.reload} disabled={dataGraph.loading}>
              Sign In
            </button>
          )}
        </div>
      </div>
      <Gantt role={role} />
    </div>
  );
}
