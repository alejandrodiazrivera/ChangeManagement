import React from 'react';
import { Card, CardHeader } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';

export const AdkarView: React.FC = () => {
  return (
    <>
      <Card style={{ flexShrink: 0 }}>
        <div className="module-toolbar">
          <div><h2>ADKAR Assessment</h2><span>Identify the barrier preventing adoption</span></div>
          <button className="btn btn-primary btn-sm">+ New assessment</button>
        </div>
        <Table>
          <Thead><Tr><Th>Population</Th><Th>Awareness</Th><Th>Desire</Th><Th>Knowledge</Th><Th>Ability</Th><Th>Reinforcement</Th><Th>Barrier</Th></Tr></Thead>
          <Tbody>
            <Tr><Td>Sales</Td><Td>90%</Td><Td>48%</Td><Td>72%</Td><Td>65%</Td><Td>50%</Td><Td><Badge color="red">Desire</Badge></Td></Tr>
            <Tr><Td>Warehouse</Td><Td>85%</Td><Td>78%</Td><Td>42%</Td><Td>45%</Td><Td>60%</Td><Td><Badge color="red">Ability</Badge></Td></Tr>
            <Tr><Td>Finance</Td><Td>92%</Td><Td>85%</Td><Td>80%</Td><Td>75%</Td><Td>70%</Td><Td><Badge color="green">None critical</Badge></Td></Tr>
          </Tbody>
        </Table>
      </Card>
      <Card style={{ marginTop: '16px', flexShrink: 0 }}>
        <CardHeader><h2>Sales — ADKAR Profile</h2><span>Latest assessment</span></CardHeader>
        <ProgressBar value={90} label="Awareness" />
        <ProgressBar value={48} label="Desire" />
        <ProgressBar value={72} label="Knowledge" />
        <ProgressBar value={65} label="Ability" />
        <ProgressBar value={50} label="Reinforcement" />
      </Card>
    </>
  );
};