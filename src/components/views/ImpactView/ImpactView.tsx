import React from 'react';
import { Card } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

export const ImpactView: React.FC = () => {
  return (
    <>
      <Card style={{ flexShrink: 0 }}>
        <div className="module-toolbar">
          <div><h2>Impact Assessment</h2><span>Assess how the change affects each population</span></div>
          <button className="btn btn-primary btn-sm">+ Add assessment</button>
        </div>
        <Table>
          <Thead><Tr><Th>Population</Th><Th>Process Impact</Th><Th>System Impact</Th><Th>Role Impact</Th><Th>Behavior Impact</Th><Th>Overall</Th></Tr></Thead>
          <Tbody>
            <Tr><Td>Sales</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td><Badge color="red">High</Badge></Td></Tr>
            <Tr><Td>Warehouse</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td><Badge color="red">High</Badge></Td></Tr>
            <Tr><Td>Finance</Td><Td>Medium</Td><Td>High</Td><Td>Medium</Td><Td>Medium</Td><Td><Badge color="yellow">Medium</Badge></Td></Tr>
            <Tr><Td>HR</Td><Td>Low</Td><Td>Medium</Td><Td>Low</Td><Td>Low</Td><Td><Badge color="green">Low</Badge></Td></Tr>
          </Tbody>
        </Table>
      </Card>
      <div className="grid-3 impact-summary-panel">
        <div className="module-card card"><h3>Most impacted</h3><p>Sales and Warehouse have the highest combined process, role and behavioral impact.</p></div>
        <div className="module-card card"><h3>Change volume</h3><p>12 processes · 8 roles · 3 systems affected.</p></div>
        <div className="module-card card"><h3>Assessment status</h3><p>86% of identified populations have been assessed.</p></div>
      </div>
    </>
  );
};