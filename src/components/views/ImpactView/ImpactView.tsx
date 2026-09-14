import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardHeader } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { useStakeholders } from '../../../context/StakeholdersContext';

type ImpactLevel = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';

type ImpactAssessment = {
  id: string;
  area: string;
  current: string;
  future: string;
  impact: ImpactLevel | '';
  affected: number[];
};

const IMPACT_AREAS = [
  'Strategy',
  'Goals & KPIs',
  'Process',
  'Technology',
  'Roles & Responsibilities',
  'Skills & Knowledge',
  'Behaviour',
  'Structure & Governance',
  'Stakeholders & Relationships',
  'Culture & Norms',
];

const IMPACT_LEVELS: ImpactLevel[] = [
  'None',
  'Low',
  'Medium',
  'High',
  'Critical',
];

export const ImpactView: React.FC = () => {
  const { stakeholders } = useStakeholders();
  const [assessments, setAssessments] = useState<ImpactAssessment[]>([
    {
      id: crypto.randomUUID(),
      area: '',
      current: '',
      future: '',
      impact: '',
      affected: [],
    },
  ]);

  const addAssessment = () => {
    setAssessments((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        area: '',
        current: '',
        future: '',
        impact: '',
        affected: [],
      },
    ]);
  };

  const updateAssessment = (
    id: string,
    field: 'area' | 'current' | 'future' | 'impact',
    value: string,
  ) => {
    setAssessments((current) =>
      current.map((assessment) =>
        assessment.id === id
          ? {
              ...assessment,
              [field]: value,
            }
          : assessment,
      ),
    );
  };

  const updateAffectedStakeholders = (assessmentId: string, values: string[]) => {
    setAssessments((current) => current.map((assessment) =>
      assessment.id === assessmentId
        ? { ...assessment, affected: values.map(Number) }
        : assessment,
    ));
  };

  const deleteAssessment = (id: string) => {
    setAssessments((current) =>
      current.filter((assessment) => assessment.id !== id),
    );
  };

  return (
    <>
      <style>{`
        .impact-view {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .impact-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .impact-toolbar h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }

        .impact-toolbar span {
          display: block;
          margin: 0 0 0 8px;
          font-size: 13px;
          color: #6b7280;
        }

        .impact-table-wrap {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
          overflow: hidden;
        }

        .impact-table {
          width: 100%;
          min-width: 0;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 13px;
        }

        .impact-table th,
        .impact-table td {
          height: 32px;
          padding: 0 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          vertical-align: middle;
          text-align: left;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .impact-table th {
          height: 28px;
          color: #6b7280;
          background: #fafafa;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .impact-table th:nth-child(1) {
          width: 18%;
        }

        .impact-table th:nth-child(2),
        .impact-table th:nth-child(3) {
          width: 22%;
        }

        .impact-table th:nth-child(4) {
          width: 13%;
        }

        .impact-table th:nth-child(5) {
          width: 17%;
        }

        .impact-table th:nth-child(6) {
          width: 8%;
          text-align: center;
        }

        .impact-table tbody tr {
          transition: background 80ms ease;
        }

        .impact-table tbody tr:hover {
          background: #f0f1f3;
        }

        .impact-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .impact-input,
        .impact-select {
          width: 100%;
          box-sizing: border-box;
          height: 24px;
          min-height: 24px;
          padding: 0 6px;
          border: 1px solid transparent;
          border-radius: 4px;
          background: transparent;
          color: #1a1d21;
          font: inherit;
          outline: none;
          transition:
            background 80ms ease,
            border-color 80ms ease;
        }

        .impact-input {
          min-width: 0;
        }

        .impact-select {
          padding-right: 6px;
          cursor: pointer;
        }

        .impact-input::placeholder {
          color: #9ca3af;
        }

        .impact-input:hover,
        .impact-select:hover,
        .impact-input:focus,
        .impact-select:focus {
          background: #f0f1f3;
        }

        .impact-input:focus,
        .impact-select:focus {
          border-color: rgba(0, 0, 0, 0.08);
        }

        .impact-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .impact-delete {
          width: 24px;
          height: 24px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          border-radius: 4px;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
        }

        .impact-delete:hover,
        .impact-delete:focus-visible {
          background: #f0f1f3;
          border-color: rgba(0, 0, 0, 0.08);
          color: #1a1d21;
          outline: none;
        }

        @media (max-width: 900px) {
          .impact-table {
            table-layout: auto;
          }

          .impact-table th,
          .impact-table td {
            padding-left: 4px;
            padding-right: 4px;
          }
        }
      `}</style>

      <div className="impact-view">
        <Card>
          <CardHeader className="impact-toolbar">
            <div>
              <h2>Impact Assessment</h2>
              <span>
                Current → Future
              </span>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={addAssessment}
              type="button"
            >
              + Add assessment
            </button>
          </CardHeader>

          <div className="impact-table-wrap">
            <Table className="impact-table">
              <Thead>
                <Tr>
                  <Th>Area</Th>
                  <Th>Current</Th>
                  <Th>Future</Th>
                  <Th>Impact</Th>
                  <Th>Affected</Th>
                  <Th aria-label="Actions"></Th>
                </Tr>
              </Thead>

              <Tbody>
                {assessments.map((assessment) => (
                  <Tr key={assessment.id}>
                    <Td>
                      <select
                        className="impact-select"
                        value={assessment.area}
                        onChange={(event) =>
                          updateAssessment(
                            assessment.id,
                            'area',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Select area</option>

                        {IMPACT_AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </Td>

                    <Td>
                      <input
                        className="impact-input"
                        type="text"
                        value={assessment.current}
                        placeholder="Describe the current state..."
                        onChange={(event) =>
                          updateAssessment(
                            assessment.id,
                            'current',
                            event.target.value,
                          )
                        }
                      />
                    </Td>

                    <Td>
                      <input
                        className="impact-input"
                        type="text"
                        value={assessment.future}
                        placeholder="Describe the future state..."
                        onChange={(event) =>
                          updateAssessment(
                            assessment.id,
                            'future',
                            event.target.value,
                          )
                        }
                      />
                    </Td>

                    <Td>
                      <select
                        className="impact-select"
                        value={assessment.impact}
                        onChange={(event) =>
                          updateAssessment(
                            assessment.id,
                            'impact',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Select impact</option>

                        {IMPACT_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </Td>

                    <Td>
                      <select
                        className="impact-select"
                        multiple
                        size={1}
                        value={assessment.affected.length > 0 ? assessment.affected.map(String) : ['']}
                        aria-label="Select affected stakeholders"
                        onChange={(event) =>
                          updateAffectedStakeholders(
                            assessment.id,
                            Array.from(event.target.selectedOptions, (option) => option.value).filter(Boolean),
                          )
                        }
                      >
                        <option value="">Select stakeholders</option>
                        {stakeholders.map((stakeholder) => (
                          <option key={stakeholder.id} value={stakeholder.id}>
                            {stakeholder.name || 'Unnamed stakeholder'}
                          </option>
                        ))}
                      </select>
                    </Td>

                    <Td>
                      <div className="impact-actions">
                      <button
                        className="impact-delete"
                        type="button"
                        title="Delete assessment"
                        aria-label="Delete assessment"
                        onClick={() => deleteAssessment(assessment.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </Card>
      </div>
    </>
  );
};