'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Database() {
  const [parameterData, setParameterData] = useState([]);
  const [partData, setPartData] = useState([]);
  const [inputParameterData, setInputParameterData] = useState([]);
  const [outputParameterData, setOutputParameterData] = useState([]);
  const [initialGoalParams, setInitialGoalParams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to fetch data from an API
  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for all tabs when the component mounts
  useEffect(() => {
    fetchData('http://127.0.0.1:8002/api/parts/', setPartData);
    fetchData('http://127.0.0.1:8002/api/parameters/', setParameterData);
    fetchData(
      'http://127.0.0.1:8002/api/inputparameters/',
      setInputParameterData
    );
    fetchData(
      'http://127.0.0.1:8002/api/outputparameters/',
      setOutputParameterData
    );
    fetchData(
      'http://127.0.0.1:8002/api/initialgoalparameters/',
      setInitialGoalParams
    );
  }, []);

  // Helper functions to render tables for each tab
  const renderParameterList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parameter ID</TableHead>
          <TableHead>Parameter Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parameterData.map((item) => (
          <TableRow key={item.parameterid}>
            <TableCell>{item.parameterid}</TableCell>
            <TableCell>{item.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPartList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part ID</TableHead>
          <TableHead>Part Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partData.map((item) => (
          <TableRow key={item.webserviceid}>
            <TableCell>{item.webserviceid}</TableCell>
            <TableCell>{item.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderInputParameterList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part ID</TableHead>
          <TableHead>Parameter ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inputParameterData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.webserviceid}</TableCell>
            <TableCell>{item.parameterid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderOutputParameterList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part ID</TableHead>
          <TableHead>Parameter ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {outputParameterData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.webserviceid}</TableCell>
            <TableCell>{item.parameterid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderParameterHierarchy = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Goal Parameters</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialGoalParams.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.hierarchyid}</TableCell>
            <TableCell>{item.details}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4'>Database Records</h1>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      <Tabs defaultValue='parameterlist' className='w-full'>
        <TabsList>
          <TabsTrigger value='partlist'>Parts List</TabsTrigger>
          <TabsTrigger value='parameterlist'>Parameter List</TabsTrigger>
          <TabsTrigger value='inputparameterlist'>
            Input Parameter List
          </TabsTrigger>
          <TabsTrigger value='outputparameterlist'>
            Output Parameter List
          </TabsTrigger>
          <TabsTrigger value='parameterhierarchy'>
            Initial Goal Parameters
          </TabsTrigger>
        </TabsList>

        <TabsContent value='partlist'>
          {/* <TableCaption>Parameter List</TableCaption> */}
          {renderPartList()}
        </TabsContent>

        <TabsContent value='parameterlist'>
          {/* <TableCaption>Parameter List</TableCaption> */}
          {renderParameterList()}
        </TabsContent>

        <TabsContent value='inputparameterlist'>
          {/* <TableCaption>Input Parameter List</TableCaption> */}
          {renderInputParameterList()}
        </TabsContent>

        <TabsContent value='outputparameterlist'>
          {/* <TableCaption>Output Parameter List</TableCaption> */}
          {renderOutputParameterList()}
        </TabsContent>

        <TabsContent value='parameterhierarchy'>
          {/* <TableCaption>Parameter Hierarchy</TableCaption> */}
          {renderParameterHierarchy()}
        </TabsContent>
      </Tabs>
    </main>
  );
}
