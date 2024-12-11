'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface Parameter {
  parameterid: string;
  parametername: string;
}

interface Part {
  webserviceid: string;
  webservicename: string;
  reputation?: number;
  price?: number;
  duration?: number;
  provider?: string;
  url?: string;
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

  // Form states for parts
  const [newPart, setNewPart] = useState<Partial<Part>>({});
  const [deletePartId, setDeletePartId] = useState<string>('');

  // Form states for parameters
  const [newParameter, setNewParameter] = useState<Partial<Parameter>>({});
  const [deleteParameterId, setDeleteParameterId] = useState<string>('');

  // Form states for input parameters
  const [newInputParam, setNewInputParam] = useState<
    Partial<InputOutputParameter>
  >({});
  const [deleteInputPartId, setDeleteInputPartId] = useState<string>('');
  const [deleteInputParamId, setDeleteInputParamId] = useState<string>('');

  // Form states for output parameters
  const [newOutputParam, setNewOutputParam] = useState<
    Partial<InputOutputParameter>
  >({});
  const [deleteOutputPartId, setDeleteOutputPartId] = useState<string>('');
  const [deleteOutputParamId, setDeleteOutputParamId] = useState<string>('');

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

  const refetchAll = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    refetchAll();
  }, []);

  // Add/Delete Part
  const handleAddPart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8002/api/parts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPart),
      });
      if (!response.ok) throw new Error('Failed to add part');
      setNewPart({});
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeletePart = async () => {
    if (!deletePartId) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8002/api/parts/${deletePartId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete part');
      setDeletePartId('');
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Add/Delete Parameter
  const handleAddParameter = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8002/api/parameters/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newParameter),
      });
      if (!response.ok) throw new Error('Failed to add parameter');
      setNewParameter({});
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteParameter = async () => {
    if (!deleteParameterId) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8002/api/parameters/${deleteParameterId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete parameter');
      setDeleteParameterId('');
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Add/Delete Input Parameter
  const handleAddInputParam = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8002/api/inputparameters/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInputParam),
        }
      );
      if (!response.ok) throw new Error('Failed to add input parameter');
      setNewInputParam({});
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteInputParam = async () => {
    if (!deleteInputPartId || !deleteInputParamId) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8002/api/inputparameters/${deleteInputPartId}/${deleteInputParamId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete input parameter');
      setDeleteInputPartId('');
      setDeleteInputParamId('');
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Add/Delete Output Parameter
  const handleAddOutputParam = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8002/api/outputparameters/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOutputParam),
        }
      );
      if (!response.ok) throw new Error('Failed to add output parameter');
      setNewOutputParam({});
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteOutputParam = async () => {
    if (!deleteOutputPartId || !deleteOutputParamId) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8002/api/outputparameters/${deleteOutputPartId}/${deleteOutputParamId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete output parameter');
      setDeleteOutputPartId('');
      setDeleteOutputParamId('');
      refetchAll();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className='p-4 mb-6 border border-gray-200 rounded-lg bg-white space-y-4'>
      <h3 className='font-semibold text-lg'>{title}</h3>
      {children}
    </div>
  );

  const FormRow = ({ children }: { children: React.ReactNode }) => (
    <div className='flex items-center space-x-3 flex-wrap'>{children}</div>
  );

  const WideButton = ({
    onClick,
    variant,
    children,
  }: {
    onClick: () => void;
    variant?: 'default' | 'destructive';
    children: React.ReactNode;
  }) => (
    <Button onClick={onClick} variant={variant} className='w-32'>
      {children}
    </Button>
  );

  const renderPartList = () => (
    <>
      <SectionCard title='Add Part'>
        {/* Row 1: Part ID, Part Name */}
        <FormRow>
          <Label htmlFor='part-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='part-id'
            value={newPart.webserviceid || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, webserviceid: e.target.value })
            }
            placeholder='e.g. P1'
            className='w-32'
          />

          <Label htmlFor='part-name' className='w-32'>
            Part Name
          </Label>
          <Input
            id='part-name'
            value={newPart.webservicename || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, webservicename: e.target.value })
            }
            placeholder='e.g. Source Server'
            className='w-48'
          />
        </FormRow>

        {/* Row 2: Reputation, Price */}
        <FormRow>
          <Label htmlFor='rep' className='w-32'>
            Reputation
          </Label>
          <Input
            id='rep'
            type='number'
            value={newPart.reputation || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, reputation: Number(e.target.value) })
            }
            placeholder='e.g. 4'
            className='w-32'
          />

          <Label htmlFor='price' className='w-32'>
            Price
          </Label>
          <Input
            id='price'
            type='number'
            value={newPart.price || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, price: Number(e.target.value) })
            }
            placeholder='e.g. 1000'
            className='w-32'
          />
        </FormRow>

        {/* Row 3: Duration, Provider */}
        <FormRow>
          <Label htmlFor='dur' className='w-32'>
            Duration
          </Label>
          <Input
            id='dur'
            type='number'
            value={newPart.duration || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, duration: Number(e.target.value) })
            }
            placeholder='e.g. 5'
            className='w-32'
          />

          <Label htmlFor='prov' className='w-32'>
            Provider
          </Label>
          <Input
            id='prov'
            value={newPart.provider || ''}
            onChange={(e) =>
              setNewPart({ ...newPart, provider: e.target.value })
            }
            placeholder='e.g. CISCO'
            className='w-48'
          />
        </FormRow>

        {/* Row 4: URL, Add Button */}
        <FormRow>
          <Label htmlFor='url' className='w-32'>
            URL
          </Label>
          <Input
            id='url'
            value={newPart.url || ''}
            onChange={(e) => setNewPart({ ...newPart, url: e.target.value })}
            placeholder='e.g. cisco.com/server/z667db'
            className='w-64'
          />
        </FormRow>
        <FormRow>
          <WideButton onClick={handleAddPart}>Add</WideButton>
        </FormRow>
      </SectionCard>

      <SectionCard title='Delete Part'>
        <FormRow>
          <Label htmlFor='del-part-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='del-part-id'
            value={deletePartId}
            onChange={(e) => setDeletePartId(e.target.value)}
            placeholder='e.g. P1'
            className='w-32'
          />
          <WideButton onClick={handleDeletePart} variant='destructive'>
            Delete
          </WideButton>
        </FormRow>
      </SectionCard>

      <Separator className='my-6' />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-black'>Part ID</TableHead>
            <TableHead className='text-black'>Part Name</TableHead>
            <TableHead className='text-black'>Reputation</TableHead>
            <TableHead className='text-black'>Price</TableHead>
            <TableHead className='text-black'>Duration</TableHead>
            <TableHead className='text-black'>Provider</TableHead>
            <TableHead className='text-black'>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partData.map((item) => (
            <TableRow key={item.webserviceid}>
              <TableCell>{item.webserviceid}</TableCell>
              <TableCell>{item.webservicename}</TableCell>
              <TableCell>{item.reputation}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.provider}</TableCell>
              <TableCell>{item.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  const renderParameterList = () => (
    <>
      <SectionCard title='Add Parameter'>
        <FormRow>
          <Label htmlFor='param-id' className='w-32'>
            Parameter ID
          </Label>
          <Input
            id='param-id'
            value={newParameter.parameterid || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, parameterid: e.target.value })
            }
            placeholder='e.g. p1'
            className='w-32'
          />
          <Label htmlFor='param-name' className='w-32'>
            Parameter Name
          </Label>
          <Input
            id='param-name'
            value={newParameter.parametername || ''}
            onChange={(e) =>
              setNewParameter({
                ...newParameter,
                parametername: e.target.value,
              })
            }
            placeholder='e.g. p1name'
            className='w-48'
          />
          <WideButton onClick={handleAddParameter}>Add</WideButton>
        </FormRow>
      </SectionCard>

      <SectionCard title='Delete Parameter'>
        <FormRow>
          <Label htmlFor='del-param-id' className='w-32'>
            Parameter ID
          </Label>
          <Input
            id='del-param-id'
            value={deleteParameterId}
            onChange={(e) => setDeleteParameterId(e.target.value)}
            placeholder='e.g. p1'
            className='w-32'
          />
          <WideButton onClick={handleDeleteParameter} variant='destructive'>
            Delete
          </WideButton>
        </FormRow>
      </SectionCard>

      <Separator className='my-6' />

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
    </>
  );

  const renderInputParameterList = () => (
    <>
      <SectionCard title='Add Input Parameter'>
        <FormRow>
          <Label htmlFor='inpart-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='inpart-id'
            value={newInputParam.webserviceid || ''}
            onChange={(e) =>
              setNewInputParam({
                ...newInputParam,
                webserviceid: e.target.value,
              })
            }
            placeholder='e.g. P1'
            className='w-32'
          />
          <Label htmlFor='inparam-id' className='w-32'>
            Param ID
          </Label>
          <Input
            id='inparam-id'
            value={newInputParam.parameterid || ''}
            onChange={(e) =>
              setNewInputParam({
                ...newInputParam,
                parameterid: e.target.value,
              })
            }
            placeholder='e.g. p2'
            className='w-32'
          />
          <WideButton onClick={handleAddInputParam}>Add</WideButton>
        </FormRow>
      </SectionCard>

      <SectionCard title='Delete Input Parameter'>
        <FormRow>
          <Label htmlFor='del-inpart-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='del-inpart-id'
            value={deleteInputPartId}
            onChange={(e) => setDeleteInputPartId(e.target.value)}
            placeholder='e.g. P1'
            className='w-32'
          />
          <Label htmlFor='del-inparam-id' className='w-32'>
            Param ID
          </Label>
          <Input
            id='del-inparam-id'
            value={deleteInputParamId}
            onChange={(e) => setDeleteInputParamId(e.target.value)}
            placeholder='e.g. p2'
            className='w-32'
          />
          <WideButton onClick={handleDeleteInputParam} variant='destructive'>
            Delete
          </WideButton>
        </FormRow>
      </SectionCard>

      <Separator className='my-6' />

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
    </>
  );

  const renderOutputParameterList = () => (
    <>
      <SectionCard title='Add Output Parameter'>
        <FormRow>
          <Label htmlFor='outpart-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='outpart-id'
            value={newOutputParam.webserviceid || ''}
            onChange={(e) =>
              setNewOutputParam({
                ...newOutputParam,
                webserviceid: e.target.value,
              })
            }
            placeholder='e.g. P1'
            className='w-32'
          />
          <Label htmlFor='outparam-id' className='w-32'>
            Param ID
          </Label>
          <Input
            id='outparam-id'
            value={newOutputParam.parameterid || ''}
            onChange={(e) =>
              setNewOutputParam({
                ...newOutputParam,
                parameterid: e.target.value,
              })
            }
            placeholder='e.g. p2'
            className='w-32'
          />
          <WideButton onClick={handleAddOutputParam}>Add</WideButton>
        </FormRow>
      </SectionCard>

      <SectionCard title='Delete Output Parameter'>
        <FormRow>
          <Label htmlFor='del-outpart-id' className='w-32'>
            Part ID
          </Label>
          <Input
            id='del-outpart-id'
            value={deleteOutputPartId}
            onChange={(e) => setDeleteOutputPartId(e.target.value)}
            placeholder='e.g. P1'
            className='w-32'
          />
          <Label htmlFor='del-outparam-id' className='w-32'>
            Param ID
          </Label>
          <Input
            id='del-outparam-id'
            value={deleteOutputParamId}
            onChange={(e) => setDeleteOutputParamId(e.target.value)}
            placeholder='e.g. p2'
            className='w-32'
          />
          <WideButton onClick={handleDeleteOutputParam} variant='destructive'>
            Delete
          </WideButton>
        </FormRow>
      </SectionCard>

      <Separator className='my-6' />

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
    </>
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
      {error && <p className='text-red-500'>Error: {error}</p>}

      <Tabs
        defaultValue='partlist'
        className='w-full border border-gray-300 bg-gray-50 p-4 rounded-xl'
      >
        <TabsList className='border border-gray-200 p-1 bg-gray-100 w-full flex justify-start space-x-2'>
          <TabsTrigger className='hover:text-gray-700' value='partlist'>
            Parts List
          </TabsTrigger>
          <TabsTrigger className='hover:text-gray-700' value='parameterlist'>
            Interface List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='inputparameterlist'
          >
            Input Interface List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='outputparameterlist'
          >
            Output Interface List
          </TabsTrigger>
          <TabsTrigger
            className='hover:text-gray-700'
            value='parameterhierarchy'
          >
            Initial Goal Interfaces
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
