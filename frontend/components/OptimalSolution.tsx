'use client';

import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, Edge, Node } from '@xyflow/react';
import { useAtom } from 'jotai';
import { optimalResultAtom, currentSolutionAtom } from '@/utils/store';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface OptimalSolutionProps {
  type?: 'sm' | 'md' | 'xl';
}

type WebService = {
  webserviceid: string;
  webservicename: string;
  input_parameters: string[];
  output_parameters: string[];
  stage: number;
};

const OptimalSolution: React.FC<OptimalSolutionProps> = ({ type = 'sm' }) => {
  const [optimalResult] = useAtom(optimalResultAtom);
  const [currentSolution] = useAtom(currentSolutionAtom);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Combine optimalResult (cumulative) and currentSolution (chosen parts).
    const combinedServices = [...optimalResult, ...currentSolution];

    // Deduplicate by webserviceid to remove exact duplicates.
    const uniqueServices = [
      ...new Map(
        combinedServices.map((svc) => [svc.webserviceid, svc])
      ).values(),
    ];

    if (uniqueServices.length > 0) {
      const diagram = convertToDynamicDiagram(uniqueServices);
      setNodes(diagram.nodes);
      setEdges(diagram.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [optimalResult, currentSolution]);

  function convertToDynamicDiagram(json: WebService[]): {
    nodes: Node[];
    edges: Edge[];
  } {
    const xSpacing = 250;
    const ySpacing = 150;

    if (!json || json.length === 0) return { nodes: [], edges: [] };

    // Group services by their stage
    const groupedByStage = json.reduce<Record<number, WebService[]>>(
      (acc, service) => {
        acc[service.stage] = acc[service.stage] || [];
        acc[service.stage].push(service);
        return acc;
      },
      {}
    );

    // Extract and sort the stages that actually have nodes
    const stages = Object.keys(groupedByStage)
      .map(Number)
      .sort((a, b) => a - b);

    if (stages.length === 0) return { nodes: [], edges: [] };

    // Map each actual stage to an index so that we only add horizontal distance
    // when there's a new, higher stage with nodes
    const stageIndexMap: Record<number, number> = {};
    stages.forEach((stg, idx) => {
      stageIndexMap[stg] = idx;
    });

    const maxNodesInStage = Math.max(
      ...Object.values(groupedByStage).map((services) => services.length)
    );
    const totalHeight = (maxNodesInStage - 1) * ySpacing;

    const nodes: Node[] = [];
    const nodeMap: Record<string, WebService> = {};

    // Create nodes and position them based on stage index
    stages.forEach((stage) => {
      const services = groupedByStage[stage];
      const nodesInStage = services.length;

      services.forEach((service, index) => {
        const stageIndex = stageIndexMap[service.stage];
        const y =
          nodesInStage > 1
            ? ((index - (nodesInStage - 1) / 2) * totalHeight) /
              (maxNodesInStage - 1)
            : 0;

        nodes.push({
          id: service.webserviceid,
          type: 'custom',
          position: { x: stageIndex * xSpacing, y },
          data: {
            label: service.webservicename,
            inputParameters: service.input_parameters || [],
            outputParameters: service.output_parameters || [],
          },
        });
        nodeMap[service.webserviceid] = service;
      });
    });

    const edges: Edge[] = [];
    const paramToProducers: Record<string, string[]> = {};

    // Map outputs to producers
    for (const n of nodes) {
      const s = nodeMap[n.id];
      for (const outParam of s.output_parameters) {
        if (!paramToProducers[outParam]) {
          paramToProducers[outParam] = [];
        }
        paramToProducers[outParam].push(s.webserviceid);
      }
    }

    const nodeOutputs: Record<string, Record<string, number>> = {};
    for (const n of nodes) {
      const s = nodeMap[n.id];
      nodeOutputs[n.id] = {};
      for (const outParam of s.output_parameters) {
        nodeOutputs[n.id][outParam] = (nodeOutputs[n.id][outParam] || 0) + 1;
      }
    }

    // Connect edges based on parameters
    for (const n of nodes) {
      const currentService = nodeMap[n.id];
      const nodeStage = currentService.stage;

      for (const inParam of currentService.input_parameters) {
        const producers = paramToProducers[inParam] || [];
        for (const producerNodeId of producers) {
          const producerService = nodeMap[producerNodeId];
          if (producerService && producerService.stage < nodeStage) {
            if (
              nodeOutputs[producerNodeId][inParam] &&
              nodeOutputs[producerNodeId][inParam] > 0
            ) {
              nodeOutputs[producerNodeId][inParam] -= 1;
              const edgeId = `e${producerNodeId}-${currentService.webserviceid}-${inParam}`;
              edges.push({
                id: edgeId,
                source: producerNodeId,
                target: currentService.webserviceid,
                label: inParam,
                style: { strokeDasharray: '5,5' },
              });
              break;
            }
          }
        }
      }
    }

    return { nodes, edges };
  }

  return (
    <section className='mt-5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Optimal Design Solution
          </h2>
        </div>
        <div
          className={`bg-white ${
            type === 'sm' ? 'h-[60vh]' : 'h-svh'
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
