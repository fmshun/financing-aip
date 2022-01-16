import React from 'react';
import {Table, Button, Popconfirm, Modal, message} from 'antd';
import { updateContact } from '../server';

const statusMap = new Map();
statusMap.set(0, '已删除');
statusMap.set(1, '已启用');
statusMap.set(2, '已停用');


function List(props) {
    const { listData: { total, contactList }, editor } = props;
    const columns = [
        {
            title: '联系人姓名',
            dataIndex: 'contactName'
        },
        {
            title: '联系人微信',
            dataIndex: 'contactWechatCode'
        },
        {
            title: '联系人手机号',
            dataIndex: 'contactPhoneNumber'
        },
        {
            title: '状态',
            dataIndex: 'contactStatus',
            render: (d) => statusMap.get(d)
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (d, record) => {
                return (
                    <div>
                        <Button
                            size="small"
                            onClick={() => {
                                editor(record);
                            }}
                        >
                            编辑
                        </Button>
                        <div style={{ display: 'inline-block', marginLeft: '10px' }} />
                        <Popconfirm
                            title="是否确定删除"
                            onConfirm={async () => {
                                const r = await updateContact({
                                    contactId: record.contactId,
                                    contactStatus: record.contactStatus === 1 ? 2 : 1
                                });
                                if (r && r.code === 0) {
                                    message.success('删除成功');
                                    document.querySelector('.search-button').click();
                                } else {
                                    Modal.error({
                                        title: '操作失败，请重试！',
                                    })
                                }
                            }}
                            okText="是"
                            cancelText="否"
                        >
                            {
                                record.contactStatus === 1 ? (
                                    <Button
                                        type="danger"
                                        size="small"
                                    >
                                        停用
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        size="small"
                                    >
                                        启用
                                    </Button>
                                )
                            }

                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <Table
                scroll={{
                    y: window.innerHeight - 210,
                }}
                rowKey="jobId"
                bordered
                columns={columns}
                dataSource={contactList}
                pagination={false}
            />
        </div>
    );
}


export default List;