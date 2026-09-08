import React from 'react';
import { Card, CardHeader } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

export const StakeholdersView: React.FC = () => {
  return (
    <>
      <Card style={{ flexShrink: 0 }}>
        <div className="module-toolbar">
          <div><h2>Stakeholder Management</h2><span>Map influence, support and engagement</span></div>
          <button className="btn btn-primary btn-sm">+ Add stakeholder</button>
        </div>
        <Table>
          <Thead><Tr><Th>Name / Group</Th><Th>Role</Th><Th>Influence</Th><Th>Support</Th><Th>Engagement</Th><Th>Strategy</Th></Tr></Thead>
          <Tbody>
            <Tr><Td>CEO</Td><Td>Executive Sponsor</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td>Manage closely</Td></Tr>
            <Tr><Td>Sales Director</Td><Td>Business Lead</Td><Td>High</Td><Td>Medium</Td><Td>Medium</Td><Td>Build support</Td></Tr>
            <Tr><Td>Warehouse Team</Td><Td>End Users</Td><Td>Medium</Td><Td>Low</Td><Td>Low</Td><Td>Intensive engagement</Td></Tr>
            <Tr><Td>Finance</Td><Td>Process Owner</Td><Td>Medium</Td><Td>High</Td><Td>High</Td><Td>Keep informed</Td></Tr>
          </Tbody>
        </Table>
      </Card>
      <div className="grid-2 stakeholders-panel">
        <Card>
          <CardHeader><h2>Influence × Support</h2><span>Stakeholder map</span></CardHeader>
          <div className="matrix-grid">
            <div className="matrix-box">
              <div className="dot stakeholder-dot--ceo"></div>
              <div className="dot stakeholder-dot--sales"></div>
              <div className="dot stakeholder-dot--warehouse"></div>
              <div className="dot stakeholder-dot--finance"></div>
              <div className="axis-x">Low influence → High influence</div>
              <div className="axis-y">Support</div>
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader><h2>Priority</h2><span>Requires attention</span></CardHeader>
          <p className="stakeholder-priority-copy">High-influence stakeholders with low or medium support should receive targeted engagement before the next rollout milestone.</p>
        </Card>
      </div>
    </>
  );
};