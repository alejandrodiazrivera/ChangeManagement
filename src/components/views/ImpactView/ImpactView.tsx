import React, { useMemo, useState } from 'react';
import { Card } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

type Level = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';

type PopulationAssessment = {
  population: string;
  process: Level;
  technology: Level;
  role: Level;
  skills: Level;
  behaviour: Level;
  overall: Level;
  currentState: string;
  futureState: string;
  impactSummary: string;
  whatChanges: string;
  consequences: string;
  start: string[];
  stop: string[];
  continue: string[];
  change: string[];
  dimensions: Array<{
    title: string;
    level: Level;
    summary: string;
  }>;
  interventions: Array<{
    type: string;
    description: string;
    priority: 'Immediate' | 'Near-term' | 'Ongoing';
  }>;
  alignment: Array<{
    title: string;
    value: string;
  }>;
};

const levelColors: Record<Level, 'gray' | 'green' | 'yellow' | 'orange' | 'red'> = {
  None: 'gray',
  Low: 'green',
  Medium: 'yellow',
  High: 'orange',
  Critical: 'red',
};

const assessments: PopulationAssessment[] = [
  {
    population: 'Sales',
    process: 'High',
    technology: 'High',
    role: 'High',
    skills: 'Medium',
    behaviour: 'High',
    overall: 'High',
    currentState: 'Sales teams are working through a largely manual process, with frequent handoffs between opportunity qualification, pricing approval, and customer communication. The current rhythm is familiar but fragmented and highly dependent on individual experience.',
    futureState: 'The operating model will become more standardised and data-led, with shared process steps, tighter governance, and a clearer handoff between sales enablement and customer-facing teams. The change increases consistency and visibility, but reduces flexibility at the individual level.',
    impactSummary: 'This group carries the highest operational exposure because the change affects how they sell, how they coordinate with support functions, and how they manage customer expectations. The impact is not only technical; it is behavioural and process-led.',
    whatChanges: 'Sales will move from a discretionary, relationship-led workflow to a more structured and governed motion. Reps will need to follow defined steps, use shared systems consistently, and adapt to a more controlled customer journey.',
    consequences: 'Revenue conversations may slow during transition, confidence in new process discipline may vary by team, and frontline managers will need to coach adoption more actively to avoid productivity dips.',
    start: ['Standardised pricing and approval steps', 'Shared sales handoff checkpoints', 'Forecast review rhythms by segment'],
    stop: ['Ad hoc approvals outside the standard workflow', 'Duplicate customer follow-up by different teams', 'Manual spreadsheet-based deal tracking'],
    continue: ['Customer relationship management', 'Segment-based account planning', 'Proactive deal coaching'],
    change: ['Move from individual process preferences to standard operating steps', 'Shift from reactive follow-up to governed pipeline review', 'Use a single source of truth for customer and deal decisions'],
    dimensions: [
      { title: 'Process', level: 'High', summary: 'Sales routines become more structured, with less flexibility in how deals move through approval and handoff stages.' },
      { title: 'Technology', level: 'High', summary: 'New workflow tooling and tracked decision points will require consistent use of shared systems and updated customer data handling.' },
      { title: 'Role', level: 'High', summary: 'Reps and managers will need to reframe their accountability around governance, reporting, and disciplined execution.' },
      { title: 'Skills', level: 'Medium', summary: 'Teams need stronger confidence in using standardised templates, approvals, and process visibility tools.' },
      { title: 'Behaviour', level: 'High', summary: 'The change requires a move from informal judgment and individual working style to shared process discipline.' },
    ],
    interventions: [
      { type: 'Coaching', description: 'Provide frontline managers with deal review scripts and coaching to reinforce new patterns in daily sales interactions.', priority: 'Immediate' },
      { type: 'Enablement', description: 'Create a short practical guide for the new workflow, including how to escalate exceptions and complete approvals.', priority: 'Near-term' },
      { type: 'Reporting', description: 'Introduce a simple dashboard to track adoption, pipeline health, and time-to-approval across the sales team.', priority: 'Ongoing' },
    ],
    alignment: [
      { title: 'Strategic alignment', value: 'Strong' },
      { title: 'Goal alignment', value: 'Strong' },
      { title: 'Stakeholder alignment', value: 'Moderate' },
      { title: 'Process alignment', value: 'Strong' },
      { title: 'Structural alignment', value: 'Moderate' },
      { title: 'Technological alignment', value: 'Strong' },
      { title: 'Behavioural alignment', value: 'Moderate' },
    ],
  },
  {
    population: 'Warehouse',
    process: 'High',
    technology: 'High',
    role: 'High',
    skills: 'High',
    behaviour: 'High',
    overall: 'High',
    currentState: 'Warehouse operations are driven by established routines, clear task sequencing, and role-based physical work. The current process is resilient but dependent on local knowledge and informal coordination when work patterns change.',
    futureState: 'The warehouse will operate with more tightly coordinated handling, digital task visibility, and standardised sequencing across shifts and locations. Operational expectations will become clearer, but so will the discipline required to keep flow consistent.',
    impactSummary: 'This group is highly exposed because the change alters task flow, role rhythm, and operational decision-making under time pressure. The consequences are operationally visible and immediate.',
    whatChanges: 'Warehouse teams will need to adapt from local, experience-based routines to a more consistent, digitally supported flow. Work allocation, task timing, and exception handling will become more standardised.',
    consequences: 'Short-term productivity may dip while operators learn new team handoffs and digital task controls. There is also a risk of fatigue if the pace of change outstrips supervisor support.',
    start: ['Shift-based task visibility', 'Digital dispatch workflows', 'Exception escalation checkpoints'],
    stop: ['Unstructured task prioritisation', 'Local workaround patterns without handoff logging', 'Paper-based task tracking'],
    continue: ['Safety-first operating discipline', 'Clear team ownership of physical workflows', 'Operational escalation when volume spikes'],
    change: ['Shift to standardised flow control', 'Adopt shared digital task visibility', 'Reframe supervisor role around coaching and coordination'],
    dimensions: [
      { title: 'Process', level: 'High', summary: 'Task sequencing and handoffs become more structured, increasing the need to follow standard operational flow.' },
      { title: 'Technology', level: 'High', summary: 'Digital task management and workflow visibility will require operational consistency across shifts and locations.' },
      { title: 'Role', level: 'High', summary: 'Supervisors and operators will take on more explicit coordination and accountability responsibilities.' },
      { title: 'Skills', level: 'High', summary: 'Teams need confidence in using new systems, interpreting task priority, and managing exceptions quickly.' },
      { title: 'Behaviour', level: 'High', summary: 'The operating culture must become more consistent and less reliant on informal, local adaptation.' },
    ],
    interventions: [
      { type: 'Simulation', description: 'Run operational walkthroughs and short training sessions to practise new handoff patterns before go-live.', priority: 'Immediate' },
      { type: 'Supervisor support', description: 'Equip team leads with escalation scripts and daily recovery routines for the first two weeks of adoption.', priority: 'Immediate' },
      { type: 'Process review', description: 'Review task delays, exception rates, and productivity variance weekly to adjust the operational controls quickly.', priority: 'Ongoing' },
    ],
    alignment: [
      { title: 'Strategic alignment', value: 'Strong' },
      { title: 'Goal alignment', value: 'Strong' },
      { title: 'Stakeholder alignment', value: 'Strong' },
      { title: 'Process alignment', value: 'Strong' },
      { title: 'Structural alignment', value: 'Moderate' },
      { title: 'Technological alignment', value: 'Strong' },
      { title: 'Behavioural alignment', value: 'Moderate' },
    ],
  },
  {
    population: 'Finance',
    process: 'Medium',
    technology: 'High',
    role: 'Medium',
    skills: 'Medium',
    behaviour: 'Medium',
    overall: 'Medium',
    currentState: 'Finance teams work within strong control frameworks and detailed reporting routines. Their process is highly structured, which makes the group more resilient to change but also more sensitive to policy and data quality adjustments.',
    futureState: 'Finance will work within a more connected control environment, with shared data flows and tighter review steps. The change introduces greater consistency and traceability while requiring additional discipline around reporting and approval timing.',
    impactSummary: 'The impact is moderate but operationally important. Finance is less disrupted in day-to-day scheduling, but the change raises expectations for data quality, controls, and governance discipline.',
    whatChanges: 'Finance will move from a primarily local control mindset to a more integrated, system-aligned cadence. Reporting, reconciliations, and approval activity will need to be completed in a more visible and traceable way.',
    consequences: 'The most significant risk is not productivity loss but delayed month-end cycles, more review questions, and an increased need for data quality assurance during transition.',
    start: ['Data review checkpoints', 'Standardised approval reporting', 'Shared controls documentation'],
    stop: ['Ad hoc reconciliation exceptions without escalation', 'Manual data transfers between teams', 'Legacy approval patterns without audit trail'],
    continue: ['Strong controls culture', 'Financial governance discipline', 'Detailed variance review'],
    change: ['Move to connected controls and shared data triggers', 'Tighten reporting rhythm around the revised process', 'Increase traceability and review consistency'],
    dimensions: [
      { title: 'Process', level: 'Medium', summary: 'The process remains manageable but will require clearer controls and more explicit review rhythm across teams.' },
      { title: 'Technology', level: 'High', summary: 'System updates create a significant need for cleaner data flows and stronger operational consistency.' },
      { title: 'Role', level: 'Medium', summary: 'Finance roles remain stable but will require more cross-functional coordination and oversight discipline.' },
      { title: 'Skills', level: 'Medium', summary: 'Teams need confidence in broader process visibility and stronger data-handling routines.' },
      { title: 'Behaviour', level: 'Medium', summary: 'The group will need to balance control rigor with more collaborative cross-functional review.' },
    ],
    interventions: [
      { type: 'Control mapping', description: 'Map the new workflow to current finance controls and highlight the required review checkpoints.', priority: 'Immediate' },
      { type: 'Data quality support', description: 'Create a short troubleshooting guide for reconcile exceptions and reporting quality issues.', priority: 'Near-term' },
      { type: 'Governance review', description: 'Review adoption and approval timing monthly to identify friction before it impacts close cycles.', priority: 'Ongoing' },
    ],
    alignment: [
      { title: 'Strategic alignment', value: 'Strong' },
      { title: 'Goal alignment', value: 'Strong' },
      { title: 'Stakeholder alignment', value: 'Moderate' },
      { title: 'Process alignment', value: 'Strong' },
      { title: 'Structural alignment', value: 'Moderate' },
      { title: 'Technological alignment', value: 'Moderate' },
      { title: 'Behavioural alignment', value: 'Moderate' },
    ],
  },
  {
    population: 'HR',
    process: 'Low',
    technology: 'Medium',
    role: 'Low',
    skills: 'Low',
    behaviour: 'Low',
    overall: 'Low',
    currentState: 'HR operates in a highly structured, service-oriented environment with established processes for employee support, employee relations, and policy maintenance. The team is comparatively stable and less dependent on live operational workflow changes.',
    futureState: 'The workforce model becomes more visible and connected to the wider transformation, but the direct operating impact on HR remains limited. The team mainly needs to support managers and employees through the transition rather than redesign core day-to-day execution.',
    impactSummary: 'HR has a lower direct impact because the workforce change is more managed through guidance, communication, and support processes than through operational rework. The role is important but less exposed than frontline groups.',
    whatChanges: 'HR will need to support the transition more than transform day-to-day operating execution. The change is primarily about policy interpretation, manager enablement, and employee support routines.',
    consequences: 'The primary risk is slower decision-making for employee questions, fragmented manager guidance, and lower confidence in support quality if communications are not aligned.',
    start: ['Manager guidance materials', 'Support playbooks for employee questions', 'Structured policy communication cadence'],
    stop: ['Inconsistent manager advice', 'Unstructured employee support flows', 'Off-the-record policy interpretation'],
    continue: ['Employee-first service approach', 'Clear policy governance', 'Manager relationship support'],
    change: ['Shift from informal support into a more structured enablement model', 'Strengthen process clarity for employee questions and escalations', 'Create more consistent manager support across business units'],
    dimensions: [
      { title: 'Process', level: 'Low', summary: 'The change introduces more coordination but does not significantly redefine the operating rhythm of HR support work.' },
      { title: 'Technology', level: 'Medium', summary: 'Some teams will need more consistency in how employee data and support workflows are accessed and tracked.' },
      { title: 'Role', level: 'Low', summary: 'The role is affected mostly through increased support expectations rather than a major redesign of responsibilities.' },
      { title: 'Skills', level: 'Low', summary: 'The need for new capability is limited but manager-facing communications will still need stronger consistency.' },
      { title: 'Behaviour', level: 'Low', summary: 'The change is manageable because HR already operates within clear service and governance routines.' },
    ],
    interventions: [
      { type: 'Communication', description: 'Prepare manager-facing guidance and FAQs to reduce local interpretation and inconsistent employee support.', priority: 'Near-term' },
      { type: 'Service model', description: 'Clarify escalation routes and the ownership model for employee questions during the transition period.', priority: 'Immediate' },
      { type: 'Support review', description: 'Review request volumes and common questions weekly to keep the support approach aligned with the transition.', priority: 'Ongoing' },
    ],
    alignment: [
      { title: 'Strategic alignment', value: 'Strong' },
      { title: 'Goal alignment', value: 'Strong' },
      { title: 'Stakeholder alignment', value: 'Strong' },
      { title: 'Process alignment', value: 'Strong' },
      { title: 'Structural alignment', value: 'Strong' },
      { title: 'Technological alignment', value: 'Moderate' },
      { title: 'Behavioural alignment', value: 'Strong' },
    ],
  },
];

const summaryCards = [
  {
    title: 'Most impacted',
    text: 'Sales and Warehouse have the highest combined process, role, and behavioural exposure to the change.',
  },
  {
    title: 'Intervention focus',
    text: 'Warehouse and Sales need the most direct coaching and process reinforcement during the transition.',
  },
  {
    title: 'Assessment status',
    text: '4 of 4 identified populations have a current impact assessment and intervention view.',
  },
];

const getBadgeColor = (level: Level) => levelColors[level];

export const ImpactView: React.FC = () => {
  const [selectedPopulation, setSelectedPopulation] = useState<string>('Sales');

  const selectedAssessment = useMemo(
    () => assessments.find((assessment) => assessment.population === selectedPopulation) ?? assessments[0],
    [selectedPopulation],
  );

  return (
    <>
      <style>{`
        .impact-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .impact-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .impact-toolbar h2 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .impact-toolbar span {
          font-size: 0.75rem;
          color: #7b8793;
        }

        .impact-summary-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .impact-summary-card {
          background: #f8fafc;
          border: 1px solid #e7edf3;
          border-radius: 12px;
          padding: 16px 18px;
        }

        .impact-summary-card h3 {
          margin: 0 0 8px;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #667588;
        }

        .impact-summary-card p {
          margin: 0;
          color: #415066;
          line-height: 1.5;
          font-size: 0.88rem;
        }

        .impact-overview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .impact-overview-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .impact-overview-header span {
          font-size: 0.75rem;
          color: #7b8793;
        }

        .impact-table-wrap {
          overflow-x: auto;
          overflow-y: hidden;
        }

        .impact-table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          font-size: 0.82rem;
        }

        .impact-table th {
          text-align: left;
          padding: 10px 10px;
          background: #f3f6f9;
          color: #677684;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid #e3e8ee;
        }

        .impact-table td {
          padding: 12px 10px;
          border-bottom: 1px solid #edf1f5;
          vertical-align: middle;
        }

        .impact-table tr {
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .impact-table tr:hover {
          background: #f8fbff;
        }

        .impact-table tr.selected {
          background: #f3f8ff;
        }

        .impact-table .population-name {
          font-weight: 600;
          color: #213044;
        }

        .impact-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .impact-detail-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .impact-detail-header span {
          font-size: 0.74rem;
          color: #7b8793;
          display: block;
          margin-top: 4px;
        }

        .impact-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .impact-panel {
          background: #f9fafb;
          border: 1px solid #e5eaf0;
          border-radius: 12px;
          padding: 16px;
        }

        .impact-panel h4 {
          margin: 0 0 10px;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #667588;
        }

        .impact-panel p,
        .impact-panel li {
          margin: 0;
          color: #425066;
          line-height: 1.6;
          font-size: 0.88rem;
        }

        .impact-panel ul {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 10px;
        }

        .impact-panel-wide {
          margin-bottom: 16px;
        }

        .impact-dimension-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .impact-dimension-item {
          background: #fff;
          border: 1px solid #e9edf3;
          border-radius: 12px;
          padding: 14px 16px;
        }

        .impact-dimension-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .impact-dimension-top h5 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: #213044;
        }

        .impact-dimension-item p {
          margin: 0;
          color: #485a6d;
          line-height: 1.55;
          font-size: 0.82rem;
        }

        .impact-two-column {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .impact-alignment-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 14px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .impact-alignment-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 0.82rem;
          color: #425066;
          padding: 6px 0;
          border-bottom: 1px solid #edf1f5;
        }

        .impact-alignment-list strong {
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .impact-summary-grid,
          .impact-detail-grid,
          .impact-dimension-list,
          .impact-two-column {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="impact-view">
        <Card style={{ flexShrink: 0 }}>
          <div className="impact-toolbar">
            <div>
              <h2>Impact Assessment</h2>
              <span>Assess how the change affects each population</span>
            </div>
            <button className="btn btn-primary btn-sm">+ Add assessment</button>
          </div>

          <div className="impact-summary-grid">
            {summaryCards.map((card) => (
              <div key={card.title} className="impact-summary-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="impact-overview-header">
            <div>
              <h3>Population overview</h3>
              <span>Current assessment by affected group</span>
            </div>
          </div>

          <div className="impact-table-wrap">
            <Table className="impact-table">
              <Thead>
                <Tr>
                  <Th>Population</Th>
                  <Th>Process</Th>
                  <Th>Technology</Th>
                  <Th>Role</Th>
                  <Th>Skills</Th>
                  <Th>Behaviour</Th>
                  <Th>Overall</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assessments.map((assessment) => (
                  <Tr
                    key={assessment.population}
                    className={selectedPopulation === assessment.population ? 'selected' : ''}
                    onClick={() => setSelectedPopulation(assessment.population)}
                    style={{
                      borderLeft: selectedPopulation === assessment.population ? '3px solid #4f7df3' : '3px solid transparent',
                    }}
                  >
                    <Td className="population-name">{assessment.population}</Td>
                    <Td><Badge color={getBadgeColor(assessment.process)}>{assessment.process}</Badge></Td>
                    <Td><Badge color={getBadgeColor(assessment.technology)}>{assessment.technology}</Badge></Td>
                    <Td><Badge color={getBadgeColor(assessment.role)}>{assessment.role}</Badge></Td>
                    <Td><Badge color={getBadgeColor(assessment.skills)}>{assessment.skills}</Badge></Td>
                    <Td><Badge color={getBadgeColor(assessment.behaviour)}>{assessment.behaviour}</Badge></Td>
                    <Td><Badge color={getBadgeColor(assessment.overall)}>{assessment.overall}</Badge></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </Card>

        <Card>
          <div className="impact-detail-header">
            <div>
              <h3>{selectedAssessment.population} population</h3>
              <span>Selected impact assessment</span>
            </div>
            <Badge color={getBadgeColor(selectedAssessment.overall)}>{selectedAssessment.overall}</Badge>
          </div>

          <div className="impact-detail-grid">
            <div className="impact-panel">
              <h4>Current state</h4>
              <p>{selectedAssessment.currentState}</p>
            </div>
            <div className="impact-panel">
              <h4>Future state</h4>
              <p>{selectedAssessment.futureState}</p>
            </div>
          </div>

          <div className="impact-panel impact-panel-wide">
            <h4>Overall impact summary</h4>
            <p>{selectedAssessment.impactSummary}</p>
          </div>

          <div className="impact-panel impact-panel-wide">
            <h4>What changes for this population?</h4>
            <p>{selectedAssessment.whatChanges}</p>
          </div>

          <div className="impact-dimension-list">
            {selectedAssessment.dimensions.map((dimension) => (
              <div key={dimension.title} className="impact-dimension-item">
                <div className="impact-dimension-top">
                  <h5>{dimension.title}</h5>
                  <Badge color={getBadgeColor(dimension.level)}>{dimension.level}</Badge>
                </div>
                <p>{dimension.summary}</p>
              </div>
            ))}
          </div>

          <div className="impact-two-column">
            <div className="impact-panel">
              <h4>Start / Stop / Continue / Change</h4>
              <ul>
                <li><strong>Start:</strong> {selectedAssessment.start.join('; ')}</li>
                <li><strong>Stop:</strong> {selectedAssessment.stop.join('; ')}</li>
                <li><strong>Continue:</strong> {selectedAssessment.continue.join('; ')}</li>
                <li><strong>Change:</strong> {selectedAssessment.change.join('; ')}</li>
              </ul>
            </div>

            <div className="impact-panel">
              <h4>Practical consequences</h4>
              <p>{selectedAssessment.consequences}</p>
            </div>
          </div>

          <div className="impact-two-column" style={{ marginTop: '16px' }}>
            <div className="impact-panel">
              <h4>Required interventions</h4>
              <ul>
                {selectedAssessment.interventions.map((intervention) => (
                  <li key={`${selectedAssessment.population}-${intervention.type}`}>
                    <strong>{intervention.type}</strong> — {intervention.description} <em>({intervention.priority})</em>
                  </li>
                ))}
              </ul>
            </div>

            <div className="impact-panel">
              <h4>Alignment</h4>
              <ul className="impact-alignment-list">
                {selectedAssessment.alignment.map((item) => (
                  <li key={item.title}>
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};