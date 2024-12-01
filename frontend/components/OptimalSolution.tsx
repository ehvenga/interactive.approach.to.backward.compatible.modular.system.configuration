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

interface OptimalSolutionProps {
  type: 'sm' | 'md' | 'xl';
}

const OptimalSolution: React.FC<OptimalSolutionProps> = ({ type }) => {
  const [result, setResult] = useAtom(resultAtom);
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'custom',
      position: { x: 50, y: 0 },
      data: {
        label: 'Source\nServer',
        leftInterface: 'i1',
        rightInterface: 'i2\ni3',
      },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 300, y: -50 },
      data: {
        label: 'Primary\nStorage',
        leftInterface: 'i2',
        rightInterface: 'i5',
      },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 300, y: 100 },
      data: {
        label: 'Secondary\nStorage',
        leftInterface: 'i3',
        rightInterface: 'i4',
      },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 550, y: 25 },
      data: {
        label: 'Read\nReplica',
        leftInterface: 'i5\ni4',
        rightInterface: 'i7',
      },
    },
  ]);
  const [edges, setEdges] = useState([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      sourceHandle: 'i2',
      targetHandle: 'i2',
      style: { strokeDasharray: '5,5' },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      sourceHandle: 'i3',
      targetHandle: 'i3',
      style: { strokeDasharray: '5,5' },
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      sourceHandle: 'i5',
      targetHandle: 'i5',
      style: { strokeDasharray: '5,5' },
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      sourceHandle: 'i4',
      targetHandle: 'i4',
      style: { strokeDasharray: '5,5' },
    },
  ]);
  // const [nodeTypes, setNodeTypes] = useState([]);

  function convertToDiagram(json: WebService[]): {
    nodes: Node[];
    edges: Edge[];
  } {
    const stagePositions = {
      1: { x: 50, y: 0 },
      2: { x: 300, y: 0 },
      3: { x: 550, y: 0 },
    };
    const verticalSpacing = 150;

    const nodes: Node[] = json.map((service, index) => {
      const position = {
        x: stagePositions[service.stage]?.x || 0,
        y: stagePositions[service.stage]?.y + index * verticalSpacing,
      };

      return {
        id: service.webserviceid,
        type: 'custom',
        position,
        data: {
          label: service.webservicename,
          leftInterface: `i${service.stage}`,
          rightInterface: `i${service.stage + 1}`,
        },
      };
    });

    const edges: Edge[] = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        style: { strokeDasharray: '5,5' },
      },
      {
        id: 'e1-3',
        source: '1',
        target: '3',
        style: { strokeDasharray: '5,5' },
      },
      {
        id: 'e2-4',
        source: '2',
        target: '4',
        style: { strokeDasharray: '5,5' },
      },
      {
        id: 'e3-4',
        source: '3',
        target: '4',
        style: { strokeDasharray: '5,5' },
      },
    ];

    return { nodes, edges };
  }

  return (
    <section className='mt-5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Optimal Solution
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='border border-gray-400 px-[7px] rounded-full text-sm -translate-y-2'>
                  i
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>A preview of current optimal solution</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
