import type { NextPage } from 'next';
import { Layout, Menu, Tag } from 'antd';
import Header from '../src/component/Header';
import './index-style.module.css';
import menu from '../src/data/menu';
import Data from '../src/data/database.json';
import Table from '../src/component/Table';
const { Content, Sider } = Layout;

const ColumnsTable = [
  {
    title: 'Photo',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (data: {} | undefined) => <Tag color={data === 'Active' ? "green" : "red"}>{data}</Tag>
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['user']}
            defaultOpenKeys={['user']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={menu}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
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
            <Table columns={ColumnsTable} data={Data} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home
