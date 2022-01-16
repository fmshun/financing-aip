import React, { useEffect, useState } from 'react';
import {Menu, Button, Modal} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, CarryOutOutlined, TeamOutlined,UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';
import { regIslogin } from './server';

const { Item } = Menu;

const menus = [
    {
        key: '1',
        title: '兼职管理',
        link: '/job/job-manage',
        icon: CarryOutOutlined,
    },
    {
        key: '2',
        title: '联系人管理',
        link: '/contacts-manage',
        icon: CarryOutOutlined,
    },
    {
        key: '3',
        title: '人员管理',
        link: '/user-manage',
        icon: UserOutlined,
    },
    /*{
        key: '3',
        title: '用户管理',
        link: '/user-manage',
        icon: TeamOutlined,
    }*/
];

function Root(props) {
    const { children, location: { pathname } } = props;
    const [ selectedKeys, setSelectedKeys ] = useState([]);
    const [ isCollapsed, setIsCollapsed ] = useState(false);
    if (!selectedKeys.length) {
        const currentList = menus.filter(v => v.link === pathname);
        if (currentList.length > 0 && currentList[0].key) {
            setSelectedKeys([currentList[0].key]);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const r = await regIslogin();
            console.log('打印数据')
            console.log(r)
            // if (r.code === 0) {
            //     console.log(r.info);
            // } else {
            //     Modal.error({
            //         title: r.msg,
            //     });
            // }
        };
        fetchData();
    }, []);

    return (
        <div className="nav">
            <div className="nav-row">
                <div className="nav-row-left" style={{ width: isCollapsed ? 80 : 170 }}>
                    {
                        isCollapsed ?
                            (
                                <Button
                                    type="text"
                                    onClick={() => setIsCollapsed(false)}
                                    className="nav-btn"
                                >
                                    <MenuUnfoldOutlined style={{ color: '#bfbfbf' }} />
                                </Button>
                            )
                            : (
                                <>
                                    <Link to="/" onClick={() => setSelectedKeys([])}>Manage系统</Link>
                                    <Button
                                        type="text"
                                        className="nav-btn"
                                        onClick={() => setIsCollapsed(true)}
                                    >
                                        <MenuFoldOutlined style={{ color: '#bfbfbf' }}  />
                                    </Button>
                                </>
                            )
                    }
                </div>
                <div className="nav-row-right">
                    {/*<Breadcrumb>
            {
              current.map(v => (
                <Breadcrumb.Item>
                  {v}
                </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>*/}
                    <div>薪火管理员，你好</div>
                </div>
            </div>
            <div className="nav-body">
                <div className="nav-menu" style={{ width: isCollapsed ? 80 : 170 }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKeys}
                        inlineCollapsed={isCollapsed}
                    >
                        {
                            menus.map(v => (
                                <Item
                                    key={v.key}
                                    onClick={(e) => {
                                        console.log(e);
                                        if (!!e.key) {
                                            setSelectedKeys([e.key]);
                                        }
                                    }}
                                    icon={<v.icon/>}
                                >
                                    <Link title={v.title} to={v.link}>
                                        <span>{v.title}</span>
                                    </Link>
                                </Item>
                            ))
                        }
                    </Menu>
                </div>
                <div className="nav-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Root;
