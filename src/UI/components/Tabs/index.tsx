import { FC } from 'react';
import { Tabs, TabsProps } from 'antd';

export interface ICustomTabs {
  tabs: TabsProps['items'];
}

const CustomTabs: FC<ICustomTabs> = ({ tabs }) => {
  return <Tabs items={tabs} />;
};

export default CustomTabs;
