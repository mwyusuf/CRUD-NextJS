import React from "react";
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number,
  name: string,
  avatar: string,
  email: string,
  salary: string,
  date: string,
  status: string,
}

interface CartCardProps {
  columns: ColumnsType<DataType>,
  data: DataType[],
}

const App = ({ columns, data }: CartCardProps) => <Table columns={columns} dataSource={data} />;

export default App;
