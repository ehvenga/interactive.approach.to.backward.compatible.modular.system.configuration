'use client';

import React from 'react';
import { ReactFlow, Background, Controls, Edge, Node } from '@xyflow/react';
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
              nodes={initialNodes}
              edges={initialEdges}
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
