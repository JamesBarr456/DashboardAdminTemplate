import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ReactNode } from 'react';
interface TabsCustomProps {
  data: {
    trigger: string;
    value: string;
    content: ReactNode;
  }[];
}
function TabsCustom({ data }: TabsCustomProps) {
  return (
    <Tabs defaultValue={data[0].value} className='w-full'>
      <TabsList>
        {data.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.trigger}
          </TabsTrigger>
        ))}
      </TabsList>

      {data.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default TabsCustom;
