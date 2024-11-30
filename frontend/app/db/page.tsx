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

interface Parameter {
  parameterid: string;
  parametername: string;
}

interface Part {
  webserviceid: string;
  webservicename: string;
}

interface InputOutputParameter {
  webserviceid: string;
  parameterid: string;
}

interface InitialGoalParameter {
  transactionid: string;
  iorg: string;
  parameterid: string;
}

export default function Database() {
  const [parameterData, setParameterData] = useState<Parameter[]>([]);
  const [partData, setPartData] = useState<Part[]>([]);
  const [inputParameterData, setInputParameterData] = useState<
    InputOutputParameter[]
  >([]);
  const [outputParameterData, setOutputParameterData] = useState<
    InputOutputParameter[]
  >([]);
  const [initialGoalParams, setInitialGoalParams] = useState<
    InitialGoalParameter[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async <T,>(
    url: string,
    setData: React.Dispatch<React.SetStateAction<T>>
  ) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData<Part[]>('http://127.0.0.1:8002/api/parts/', setPartData);
    fetchData<Parameter[]>(
      'http://127.0.0.1:8002/api/parameters/',
      setParameterData
    );
    fetchData<InputOutputParameter[]>(
      'http://127.0.0.1:8002/api/inputparameters/',
      setInputParameterData
    );
    fetchData<InputOutputParameter[]>(
      'http://127.0.0.1:8002/api/outputparameters/',
      setOutputParameterData
    );
    fetchData<InitialGoalParameter[]>(
      'http://127.0.0.1:8002/api/initialgoalparameters/',
      setInitialGoalParams
    );
  }, []);

  const renderParameterList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-black'>Parameter ID</TableHead>
          <TableHead className='text-black'>Parameter Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parameterData.map((item) => (
          <TableRow key={item.parameterid}>
            <TableCell>{item.parameterid}</TableCell>
            <TableCell>{item.parametername}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPartList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-black'>Part ID</TableHead>
          <TableHead className='text-black'>Part Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partData.map((item) => (
          <TableRow key={item.webserviceid}>
            <TableCell>{item.webserviceid}</TableCell>
            <TableCell>{item.webservicename}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderInputParameterList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-black'>Part ID</TableHead>
          <TableHead className='text-black'>Parameter ID</TableHead>
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
          <TableHead className='text-black'>Part ID</TableHead>
          <TableHead className='text-black'>Parameter ID</TableHead>
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

  const renderGoalParameters = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-black'>Transaction ID</TableHead>
          <TableHead className='text-black'>IORG</TableHead>
          <TableHead className='text-black'>Parameter ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialGoalParams.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.transactionid}</TableCell>
            <TableCell>{item.iorg}</TableCell>
            <TableCell>{item.parameterid}</TableCell>
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
      <Tabs
        defaultValue='parameterlist'
        className='w-full border border-gray-300 bg-gray-50 p-4 rounded-xl'
      >
        <TabsList className='border border-gray-200 p-1 bg-gray-100 w-full flex justify-start'>
          <TabsTrigger className='hover:text-gray-700' value='partlist'>
            Parts List
          </TabsTrigger>
          <TabsTrigger className='hover:text-gray-700' value='parameterlist'>
            Parameter List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='inputparameterlist'
          >
            Input Parameter List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='outputparameterlist'
          >
            Output Parameter List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='parameterhierarchy'
          >
            Initial Goal Parameters
          </TabsTrigger>
        </TabsList>

        <TabsContent value='partlist'>{renderPartList()}</TabsContent>
        <TabsContent value='parameterlist'>{renderParameterList()}</TabsContent>
        <TabsContent value='inputparameterlist'>
          {renderInputParameterList()}
        </TabsContent>
        <TabsContent value='outputparameterlist'>
          {renderOutputParameterList()}
        </TabsContent>
        <TabsContent value='parameterhierarchy'>
          {renderGoalParameters()}
        </TabsContent>
      </Tabs>
    </main>
  );
}
