import React from 'react';
import { Card, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';

export const OverviewView: React.FC = () => {
  return (
    <>
      <div className="kpis">
        <Card><div className="kpi-label">Overall Adoption</div><div className="kpi-value">68%</div><div className="trend up">↑ 6% vs. last assessment</div></Card>
        <Card><div className="kpi-label">Change Readiness</div><div className="kpi-value">74%</div><div className="trend up">↑ 4% vs. last assessment</div></Card>
        <Card><div className="kpi-label">Critical Risks</div><div className="kpi-value">3</div><div className="trend down">2 unresolved this week</div></Card>
        <Card><div className="kpi-label">Open Actions</div><div className="kpi-value">17</div><div className="trend neutral">7 due this week</div></Card>
      </div>

      <div className="grid-2">
        <Card>
          <CardHeader><h2>Adoption Status</h2><span>Current assessment</span></CardHeader>
          <div className="adoption-score">
            <div className="score-circle"><div className="score-inner">68%</div></div>
            <div style={{ flex: 1 }}>
              <ProgressBar value={91} label="Awareness" />
              <ProgressBar value={62} label="Desire" />
              <ProgressBar value={74} label="Knowledge" />
              <ProgressBar value={59} label="Ability" />
              <ProgressBar value={55} label="Reinforcement" />
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader><h2>Critical Issues</h2><span>3 issues</span></CardHeader>
          <div className="issue"><Badge color="red">CRITICAL</Badge><div className="issue-title">Low Desire in Sales</div>Employees remain unconvinced about the benefits.</div>
          <div className="issue"><Badge color="red">CRITICAL</Badge><div className="issue-title">Low Ability in Warehouse</div>Employees understand the process but struggle to execute it.</div>
          <div className="issue"><Badge color="yellow">WARNING</Badge><div className="issue-title">Manager communication</div>Messaging is inconsistent across middle management.</div>
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <CardHeader><h2>Stakeholder Alignment</h2><span>Stakeholder Map</span></CardHeader>
          <Table>
            <Thead><Tr><Th>Stakeholder</Th><Th>Influence</Th><Th>Support</Th><Th>Engagement</Th><Th>Status</Th></Tr></Thead>
            <Tbody>
              <Tr><Td>CEO</Td><Td>High</Td><Td>High</Td><Td>High</Td><Td><Badge color="green">Aligned</Badge></Td></Tr>
              <Tr><Td>Sales Director</Td><Td>High</Td><Td>Medium</Td><Td>Medium</Td><Td><Badge color="yellow">Monitor</Badge></Td></Tr>
              <Tr><Td>Warehouse Team</Td><Td>Medium</Td><Td>Low</Td><Td>Low</Td><Td><Badge color="red">Priority</Badge></Td></Tr>
              <Tr><Td>Finance</Td><Td>Medium</Td><Td>High</Td><Td>High</Td><Td><Badge color="green">Aligned</Badge></Td></Tr>
            </Tbody>
          </Table>
        </Card>
        <Card>
          <CardHeader><h2>Priority Actions</h2><span>7 due this week</span></CardHeader>
          <div className="action-item"><div className="action-checkbox"></div><div className="action-content"><div className="action-title">Run Sales leadership workshop</div><div className="action-meta">Change Lead · Sep 10 · Addresses Desire</div></div><Badge color="red">High</Badge></div>
          <div className="action-item"><div className="action-checkbox"></div><div className="action-content"><div className="action-title">Warehouse process simulation</div><div className="action-meta">Training Lead · Sep 12 · Addresses Ability</div></div><Badge color="red">High</Badge></div>
          <div className="action-item"><div className="action-checkbox"></div><div className="action-content"><div className="action-title">Align manager communication</div><div className="action-meta">Communications Lead · Sep 13</div></div><Badge color="yellow">Medium</Badge></div>
        </Card>
      </div>
    </>
  );
};