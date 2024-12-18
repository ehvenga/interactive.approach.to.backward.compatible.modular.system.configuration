'use client';

import { Handle, Position } from '@xyflow/react';

interface CustomNodeProps {
  data: {
    label: string;
    leftInterface?: string;
    rightInterface?: string;
  };
}

export default function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className='relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-900'>
      <div className='absolute -left-6 top-1/2 -translate-y-1/2 text-sm font-mono'>
        {data.leftInterface}
      </div>
      <Handle type='target' position={Position.Left} className='!bg-gray-900' />
      <div className='font-bold'>{data.label}</div>
      <Handle
        type='source'
        position={Position.Right}
        className='!bg-gray-900'
      />
      <div className='absolute -right-6 top-1/2 -translate-y-1/2 text-sm font-mono'>
        {data.rightInterface}
      </div>
    </div>
  );
}
