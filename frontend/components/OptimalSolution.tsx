'use client';

import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, Edge, Node } from '@xyflow/react';
import { useAtom } from 'jotai';
import { optimalResultAtom } from '@/utils/store';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface OptimalSolutionProps {
  type: 'sm' | 'md' | 'xl';
}

type WebService = {
  webserviceid: string;
  webservicename: string;
  input_parameters: string[];
  output_parameters: string[];
  stage: number;
};

const OptimalSolution: React.FC<OptimalSolutionProps> = ({ type }) => {
  const [optimalResult] = useAtom(optimalResultAtom);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (optimalResult && optimalResult.length > 0) {
      const diagram = convertToDynamicDiagram(optimalResult);
      setNodes(diagram.nodes);
      setEdges(diagram.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [optimalResult]);

  function convertToDynamicDiagram(json: WebService[]): {
    nodes: Node[];
    edges: Edge[];
  } {
    const xSpacing = 250;
    const ySpacing = 150;
    const groupedByStage = json.reduce<Record<number, WebService[]>>(
      (acc, service) => {
        acc[service.stage] = acc[service.stage] || [];
        acc[service.stage].push(service);
        return acc;
      },
      {}
    );

    const maxNodesInStage = Math.max(
      ...Object.values(groupedByStage).map((services) => services.length)
    );
    const totalHeight = (maxNodesInStage - 1) * ySpacing;

    const nodes: Node[] = [];
    Object.keys(groupedByStage).forEach((stageKey) => {
      const stage = parseInt(stageKey);
      const services = groupedByStage[stage];
      const nodesInStage = services.length;

      services.forEach((service, index) => {
        const y =
          nodesInStage > 1
            ? ((index - (nodesInStage - 1) / 2) * totalHeight) /
              (maxNodesInStage - 1)
            : 0;

        nodes.push({
          id: service.webserviceid,
          type: 'custom',
          position: {
            x: stage * xSpacing,
            y: y,
          },
          data: {
            label: service.webservicename,
            inputParameters: service.input_parameters,
            outputParameters: service.output_parameters,
          },
        });
      });
    });

    const edges: Edge[] = [];
    const stages = Object.keys(groupedByStage)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < stages.length - 1; i++) {
      const currentStage = stages[i];
      const nextStage = stages[i + 1];

      const currentStageServices = groupedByStage[currentStage];
      const nextStageServices = groupedByStage[nextStage];

      currentStageServices.forEach((sourceService) => {
        nextStageServices.forEach((targetService) => {
          const matchingParameters = sourceService.output_parameters.filter(
            (param) => targetService.input_parameters.includes(param)
          );

          if (matchingParameters.length > 0) {
            edges.push({
              id: `e${sourceService.webserviceid}-${targetService.webserviceid}`,
              source: sourceService.webserviceid,
              target: targetService.webserviceid,
              label: matchingParameters.join(', '),
              style: { strokeDasharray: '5,5' },
            });
          }
        });
      });
    }

    return { nodes, edges };
  }

  return (
    <section className='mt-5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Optimal Solution
          </h2>
        </div>
        <div
          className={`bg-white ${
            type == 'sm' ? 'h-[60vh]' : 'h-svh'
          } mt-6 border-gray-200 border-2 rounded-md`}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              className='bg-gray-50'
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimalSolution;
