import React from 'react';
import { PageHeader } from 'antd';
import './header.module.css';

const Header = () => (
  <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Ctlyst member"
    subTitle="This is a ctlyst member data"
  />
);

export default Header;
