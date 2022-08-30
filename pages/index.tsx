/* eslint-disable import/first */
import { Image, Layout, Menu, Tag } from "antd";
import type { NextPage } from "next";

import Header from "@/component/Header/Header";
import Table from "@/component/Table";
import Data from "@/data/database.json";
import menu from "@/data/menu";

const { Content, Sider } = Layout;

const ColumnsTable = [
  {
    title: `Photo`,
    dataIndex: `avatar`,
    key: `avatar`,
    render: (data: string) => <Image src={data} width={100} alt={data} />,
  },
  {
    title: `Name`,
    dataIndex: `name`,
    key: `name`,
  },
  {
    title: `Email`,
    dataIndex: `email`,
    key: `email`,
  },
  {
    title: `Salary`,
    dataIndex: `salary`,
    key: `salary`,
  },
  {
    title: `Status`,
    dataIndex: `status`,
    key: `status`,
    render: (data: string) => (
      <Tag color={data === `Active` ? `green` : `red`}>{data}</Tag>
    ),
  },
];

const Home: NextPage = () => (
  <Layout>
    <Header />
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={[`user`]}
          defaultOpenKeys={[`user`]}
          style={{
            height: `100%`,
            borderRight: 0,
          }}
          items={menu}
        />
      </Sider>
      <Layout
        style={{
          padding: `0 24px 24px`,
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Table
            data-test-id="CT_Container_index_tableContainer"
            columns={ColumnsTable}
            data={Data}
            totalData={100}
            pageSize={10}
            onChange={(page, pageNumber) => console.log(page)}
          />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default Home;
