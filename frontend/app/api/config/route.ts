// app/api/configure-systems/route.ts

import { NextRequest, NextResponse } from 'next/server';

type Interface = { id: number; label: string; name: string };
type Device = {
  id: number;
  label: string;
  name: string;
  interfaces: { input?: string[]; output?: string[] };
};

const interfaces: Interface[] = [
  { id: 1, label: 'USB 2.0', name: 'i1' },
  { id: 2, label: 'USB 3.0', name: 'i2' },
  { id: 3, label: 'Display Port 1.2', name: 'i3' },
  { id: 4, label: 'Display Port 1.4', name: 'i4' },
  { id: 5, label: 'HDMI 1.4', name: 'i5' },
  { id: 6, label: 'HDMI 2.0', name: 'i6' },
  { id: 7, label: 'PCIe 4.0', name: 'i7' },
  { id: 8, label: 'PCIe 5.0', name: 'i8' },
];

const devices: Device[] = [
  { id: 1, label: 'Controller', name: 'p1', interfaces: { input: ['i1'] } },
  { id: 2, label: 'VR Headset', name: 'p2', interfaces: { input: ['i3'] } },
  {
    id: 3,
    label: 'Laptop',
    name: 'p3',
    interfaces: { input: ['i2', 'i4'], output: ['i6', 'i7'] },
  },
  { id: 4, label: 'Monitor', name: 'p4', interfaces: { input: ['i5'] } },
  {
    id: 5,
    label: 'Capture Card',
    name: 'p5',
    interfaces: { input: ['i8'], output: ['i6'] },
  },
];

type InterfaceParameter = {
  id: number;
  label: string;
  name: string;
};

type ConfigureSystemsRequestData = {
  initialParameters: InterfaceParameter[];
  goalParameters: InterfaceParameter[];
};

type ConfigureSystemsResponseData = {
  success: boolean;
  message: string;
  data?: {
    chain: Device[];
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initialParameters, goalParameters } =
      body as ConfigureSystemsRequestData;

    if (!initialParameters || !goalParameters) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing initialParameters or goalParameters in the request body',
        },
        { status: 400 }
      );
    }

    // Extract interface names from the parameters
    const initialInterfaceNames = initialParameters.map((param) => param.name);
    const goalInterfaceNames = goalParameters.map((param) => param.name);

    // Chain-building logic
    const chain = findOptimalChain(initialInterfaceNames, goalInterfaceNames);

    if (chain) {
      return NextResponse.json(
        {
          success: true,
          message: 'Optimal chain found.',
          data: { chain },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            'Could not build an optimal chain to reach the goal parameters.',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the request.',
        // error: error.message,
      },
      { status: 500 }
    );
  }
}

// Helper function to find the optimal chain
function findOptimalChain(
  initialInterfaces: string[],
  goalInterfaces: string[]
): Device[] | null {
  // Initialize the queue for BFS
  const queue: {
    currentInterfaces: string[];
    chain: Device[];
  }[] = [];

  // Start from the initial interfaces without any device
  queue.push({
    currentInterfaces: initialInterfaces,
    chain: [],
  });

  const visited = new Set<string>();

  while (queue.length > 0) {
    const { currentInterfaces, chain } = queue.shift()!;

    // Check if goal interfaces are met
    if (goalInterfaces.every((goal) => currentInterfaces.includes(goal))) {
      return chain;
    }

    // Create a unique key for visited states
    const stateKey = `${currentInterfaces.sort().join(',')}:${chain
      .map((d) => d.id)
      .join(',')}`;
    if (visited.has(stateKey)) {
      continue;
    }
    visited.add(stateKey);

    // Find devices that can connect to the current interfaces
    const nextDevices = devices.filter((device) => {
      // Avoid cycles
      if (chain.find((d) => d.id === device.id)) {
        return false;
      }

      // Check if device's input matches any of the current interfaces
      return device.interfaces.input?.some((input) =>
        currentInterfaces.includes(input)
      );
    });

    for (const device of nextDevices) {
      const newInterfaces = [
        ...currentInterfaces,
        ...(device.interfaces.output || []),
      ];

      queue.push({
        currentInterfaces: newInterfaces,
        chain: [...chain, device],
      });
    }
  }

  // No chain found
  return null;
}
