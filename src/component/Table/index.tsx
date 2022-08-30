import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  id: number;
  name: string;
  avatar: string;
  email: string;
  salary: string;
  date: string;
  status: string;
}

interface CartCardProps {
  columns: ColumnsType<DataType>;
  data: DataType[];
  totalData: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

const App = ({
  columns,
  data,
  totalData,
  pageSize,
  onChange,
}: CartCardProps) => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{
      defaultCurrent: 1,
      total: totalData,
      pageSize,
      onChange,
    }}
  />
);

export default App;
