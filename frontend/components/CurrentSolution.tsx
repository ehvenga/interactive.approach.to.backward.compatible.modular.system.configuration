'use client';

import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, Edge, Node } from '@xyflow/react';
import { useAtom } from 'jotai';
import { partsChosenListAtom, currentSolutionAtom } from '@/utils/store';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface CurrentSolutionProps {
  type: 'sm' | 'md' | 'xl';
}

type WebService = {
  webserviceid: string;
  webservicename: string;
  input_parameters: string[];
  output_parameters: string[];
  stage: number;
};

const CurrentSolution: React.FC<CurrentSolutionProps> = ({ type }) => {
  const [currentSolution] = useAtom(currentSolutionAtom);
  const [partsChosenList] = useAtom(partsChosenListAtom);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Combine previously chosen parts and currently chosen parts
    const combinedParts = [...currentSolution, ...partsChosenList];
    if (combinedParts.length > 0) {
      const diagram = convertToDynamicDiagram(combinedParts);
      setNodes(diagram.nodes);
      setEdges(diagram.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [currentSolution, partsChosenList]);

  function convertToDynamicDiagram(json: WebService[]): {
    nodes: Node[];
    edges: Edge[];
  } {
    if (!json || json.length === 0) {
      return { nodes: [], edges: [] };
    }

    const xSpacing = 250; // Horizontal spacing between stages
    const ySpacing = 150; // Vertical spacing between nodes in a stage

    // Group services by stage
    const groupedByStage = json.reduce<Record<number, WebService[]>>(
      (acc, service) => {
        acc[service.stage] = acc[service.stage] || [];
        acc[service.stage].push(service);
        return acc;
      },
      {}
    );

    const stages = Object.keys(groupedByStage)
      .map(Number)
      .sort((a, b) => a - b);

    if (stages.length === 0) {
      return { nodes: [], edges: [] };
    }

    // Find the maximum number of nodes in any stage
    const maxNodesInStage = Math.max(
      ...Object.values(groupedByStage).map((services) => services.length)
    );
    const totalHeight = (maxNodesInStage - 1) * ySpacing;

    // Create nodes
    const nodes: Node[] = [];
    const nodeMap: Record<string, WebService> = {};

    stages.forEach((stage) => {
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
          position: { x: stage * xSpacing, y },
          data: {
            label: service.webservicename,
            inputParameters: service.input_parameters || [],
            outputParameters: service.output_parameters || [],
          },
        });
        nodeMap[service.webserviceid] = service;
      });
    });

    // Build a parameter -> producers map
    const paramToProducers: Record<string, string[]> = {};
    for (const node of nodes) {
      const service = nodeMap[node.id];
      for (const outParam of service.output_parameters) {
        if (!paramToProducers[outParam]) {
          paramToProducers[outParam] = [];
        }
        // Add this node as a producer of outParam
        paramToProducers[outParam].push(service.webserviceid);
      }
    }

    // Track the availability of output interface for each node
    // nodeOutputs[nodeId][param] = how many times this parameter can still be used
    const nodeOutputs: Record<string, Record<string, number>> = {};
    for (const node of nodes) {
      const service = nodeMap[node.id];
      nodeOutputs[node.id] = {};
      for (const outParam of service.output_parameters) {
        if (!nodeOutputs[node.id][outParam]) {
          nodeOutputs[node.id][outParam] = 0;
        }
        nodeOutputs[node.id][outParam] += 1;
      }
    }

    const edges: Edge[] = [];
    const edgeSet = new Set<string>(); // to avoid duplicates

    // Connect inputs from any previous stage node that still has that output param available
    for (const node of nodes) {
      const currentService = nodeMap[node.id];
      const nodeStage = currentService.stage;

      for (const inParam of currentService.input_parameters) {
        const producers = paramToProducers[inParam] || [];
        // We need to find a producer that has this param still available (unused)
        // and is from an earlier stage
        let connected = false;
        for (const producerNodeId of producers) {
          const producerService = nodeMap[producerNodeId];
          if (producerService && producerService.stage < nodeStage) {
            // Check if producer still has outParam available
            if (
              nodeOutputs[producerNodeId][inParam] &&
              nodeOutputs[producerNodeId][inParam] > 0
            ) {
              // Use this param once
              nodeOutputs[producerNodeId][inParam] -= 1;

              const edgeId = `e${producerNodeId}-${currentService.webserviceid}-${inParam}`;
              if (!edgeSet.has(edgeId)) {
                edges.push({
                  id: edgeId,
                  source: producerNodeId,
                  target: currentService.webserviceid,
                  label: inParam,
                  style: { strokeDasharray: '5,5' },
                });
                edgeSet.add(edgeId);
              }
              connected = true;
              break; // Stop after finding one available producer
            }
          }
        }
        // If no available producer found, no edge for this param
      }
    }

    return { nodes, edges };
  }

  return (
    <section className={`${type == 'xl' ? 'w-full' : 'w-3/5'}`}>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Current Design Solution
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
