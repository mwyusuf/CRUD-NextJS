import type { NextPage } from 'next';
import { Layout, Menu } from 'antd';
import Header from '../src/component/Header';
import './index-style.module.css';
import menu from '../src/data/menu';
const { Content, Sider } = Layout;

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
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home
