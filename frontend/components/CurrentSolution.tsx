'use client';

import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactFlow, Background, Controls, Edge, Node } from '@xyflow/react';
import { useAtom } from 'jotai';
import { resultAtom } from '@/utils/store';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 50, y: 0 },
    data: {
      label: 'Joystick\nController',
      leftInterface: 'i1',
      rightInterface: 'i2',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 50, y: 150 },
    data: {
      label: 'VR Headset',
      leftInterface: 'i1',
      rightInterface: 'i4',
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 350, y: 75 },
    data: {
      label: 'Gaming\nConsole',
      leftInterface: 'i3\ni5',
      rightInterface: 'i7\ni8',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 650, y: 0 },
    data: {
      label: 'Monitor',
      leftInterface: 'i6',
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 650, y: 150 },
    data: {
      label: 'Capture\nCard',
      leftInterface: 'i9',
      rightInterface: 'i7',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    style: { strokeDasharray: '5,5' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    style: { strokeDasharray: '5,5' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    style: { strokeDasharray: '5,5' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    style: { strokeDasharray: '5,5' },
  },
];

const CurrentSolution: React.FC = () => {
  const [result, setResult] = useAtom(resultAtom);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const diagram = convertToDynamicDiagram(result);
    setNodes(diagram.nodes);
    setEdges(diagram.edges);
  }, [result]);

  type WebService = {
    webserviceid: string;
    webservicename: string;
    reputation: number;
    price: number;
    duration: number;
    provider: string;
    url: string;
    stage: number;
  };

  type Node = {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { label: string; leftInterface?: string; rightInterface?: string };
  };

  type Edge = {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    style?: { strokeDasharray: string };
  };

  function convertToDynamicDiagram(json: WebService[]): {
    nodes: Node[];
    edges: Edge[];
  } {
    const xSpacing = 250; // Horizontal spacing between stages
    const ySpacing = 150; // Vertical spacing for multiple items in a stage

    // Group services by stage
    const groupedByStage = json.reduce<Record<number, WebService[]>>(
      (acc, service) => {
        acc[service.stage] = acc[service.stage] || [];
        acc[service.stage].push(service);
        return acc;
      },
      {}
    );

    // Find the maximum number of nodes in any stage
    const maxNodesInStage = Math.max(
      ...Object.values(groupedByStage).map((services) => services.length)
    );

    // Calculate total height based on the maximum number of nodes
    const totalHeight = (maxNodesInStage - 1) * ySpacing;

    // Create nodes
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
            : 0; // Center single node

        nodes.push({
          id: service.webserviceid,
          type: 'custom',
          position: {
            x: stage * xSpacing,
            y: y,
          },
          data: {
            label: service.webservicename,
            leftInterface: `i${service.stage}`,
            rightInterface: `i${service.stage + 1}`,
          },
        });
      });
    });

    // Create edges (connect nodes from previous stages to the current one)
    const edges: Edge[] = [];
    Object.keys(groupedByStage).forEach((stageKey) => {
      const stage = parseInt(stageKey);
      if (!groupedByStage[stage + 1]) return;

      const currentStageServices = groupedByStage[stage];
      const nextStageServices = groupedByStage[stage + 1];

      currentStageServices.forEach((sourceService) => {
        nextStageServices.forEach((targetService) => {
          edges.push({
            id: `e${sourceService.webserviceid}-${targetService.webserviceid}`,
            source: sourceService.webserviceid,
            target: targetService.webserviceid,
            style: { strokeDasharray: '5,5' },
          });
        });
      });
    });

    return { nodes, edges };
  }

  return (
    <section className='w-3/5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Current Solution
          </h2>
        </div>
        <div className='bg-white h-[60vh] mt-6 border-gray-200 border-2 rounded-md'>
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

export default CurrentSolution;
