import React from 'react';
import { Card } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

export const ResistanceView: React.FC = () => {
  return (
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="module-toolbar" style={{ flexShrink: 0 }}>
        <div><h2>Change Risk Register</h2><span>Risks threatening adoption and implementation</span></div>
        <button className="btn btn-primary btn-sm">+ Add risk</button>
      </div>
      <div className="table-wrap" style={{ flex: 1 }}>
        <Table>
          <Thead><Tr><Th>Risk</Th><Th>Population</Th><Th>Probability</Th><Th>Impact</Th><Th>Mitigation</Th><Th>Owner</Th><Th>Status</Th></Tr></Thead>
          <Tbody>
            <Tr><Td>Low adoption</Td><Td>Warehouse</Td><Td>High</Td><Td>High</Td><Td>Practical training + coaching</Td><Td>Operations</Td><Td><Badge color="yellow">Open</Badge></Td></Tr>
            <Tr><Td>Resistance</Td><Td>Sales</Td><Td>High</Td><Td>High</Td><Td>Leadership workshop</Td><Td>Sales Director</Td><Td><Badge color="red">Critical</Badge></Td></Tr>
            <Tr><Td>Inconsistent messaging</Td><Td>Managers</Td><Td>Medium</Td><Td>Medium</Td><Td>Message alignment session</Td><Td>Change Lead</Td><Td><Badge color="yellow">Open</Badge></Td></Tr>
          </Tbody>
        </Table>
      </div>
    </Card>
  );
};