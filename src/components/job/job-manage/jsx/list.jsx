import React from 'react';
import { Table, Button, Modal, Popconfirm, message } from 'antd';
import useSetState from '../../../../lib/use-set-state';
import {cancelApply, getJobApplyList, startJob, finishJob, deleteJob } from '../server';
import { settlementTypes, genderLimits } from '../enum';

const statusMap = new Map();
statusMap.set(0, '已删除');
statusMap.set(1, '已创建');
statusMap.set(2, '已满员');
statusMap.set(3, '已开始');
statusMap.set(4, '已结束');


const emptyApplyInfo = {
    visible: false,
    applyList: [],
};

function List(props) {
    const { listData: { total, jobList }, editor } = props;

    const [ applyInfo, setApplyInfo, initApplyInfo ] = useSetState(emptyApplyInfo);

    const columns = [
        {
            title: '名称',
            dataIndex: 'title'
        },
        {
            title: '描述信息',
            dataIndex: 'description',
            render: (d) => (<pre>{d}</pre>)
        },
        {
            title: '工作须知',
            dataIndex: 'notice',
            width: '150px',
            render: (d) => (<pre>{d}</pre>)
        },
        {
            title: '金额',
            dataIndex: 'jobPrice',
            width: '100px',
            render: (d, record) => {
                return (
                    <div>
                        {d}元/{record.priceUnit}
                    </div>
                )
            }
        },
        {
            title: '结算方式',
            dataIndex: 'settlementType',
            width: '90px',
            render: (d) => (
                <div>
                    {settlementTypes[d]}
                </div>
            )
        },
        {
            title: '状态',
            width: '80px',
            dataIndex: 'jobStatus',
            render: (d) => statusMap.get(d)
        },
        {
            title: '报名人数',
            dataIndex: 'limitNum',
            width: '100px',
            render: (d, record) => {
                return (
                    <div>
                        <a
                            onClick={async () => {
                                const r = await getJobApplyList({ jobId: record.jobId });
                                if (r.code === 0) {
                                    initApplyInfo({ visible: true, applyList: r.info.applyList })
                                } else {
                                    Modal.error({
                                        title: r.msg,
                                    });
                                }
                            }}
                        >
                            {record.applyList?.length || 0}
                        </a>/{d}
                    </div>
                )
            }
        },
        {
            title: '性别要求',
            width: '80px',
            dataIndex: 'genderLimit',
            render: (d) => (
                <div>
                    {genderLimits[d]}
                </div>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '120px'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (__, record) => {
                return (
                    <div>
                        {
                            record.jobStatus === 1 || record.jobStatus === 2 ? (
                                <Button
                                    size="small"
                                    onClick={async () => {
                                        const p = { jobId: record.jobId };
                                        const r = await startJob(p);
                                        if (r.code === 0) {
                                            message.success('操作成功!');
                                            document.querySelector('.search-button').click();
                                        } else {
                                            Modal.error({
                                                title: r.msg,
                                            });
                                        }
                                    }}
                                    style={{ marginRight: '10px' }}
                                >
                                    开始
                                </Button>
                            ) : record.jobStatus === 3 ? (
                                <Button
                                    size="small"
                                    onClick={async () => {
                                        const p = { jobId: record.jobId };
                                        const r = await finishJob(p);
                                        if (r.code === 0) {
                                            message.success('操作成功!');
                                            document.querySelector('.search-button').click();
                                        } else {
                                            Modal.error({
                                                title: r.msg,
                                            });
                                        }
                                    }}
                                    style={{ marginRight: '10px' }}
                                >
                                    完成
                                </Button>
                            ) : null
                        }
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
                            title={`是否删除"${record.title}"信息?`}
                            onConfirm={async () => {
                                const p = {
                                    jobId: record.jobId,
                                }
                                const r = await deleteJob(p);
                                if (r.code === 0) {
                                    message.success('操作成功');
                                    document.querySelector('.search-button').click();
                                } else {
                                    Modal.error({
                                        title: r.msg,
                                    });
                                }
                            }}
                            okText="是"
                            cancelText="否"
                        >
                            <Button
                                type="danger"
                                size="small"
                            >
                                删除
                            </Button>
                        </Popconfirm>

                    </div>
                )
            }
        }
    ];

    const applyColumns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 80,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: 70,
            render: () => '男'

        },
        {
            title: '报名时间',
            dataIndex: 'createTime',
            width: '120px'
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
        },
        {
            title: '信用分',
            dataIndex: 'prestige',
            width: '80px'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (__, record) => {
                return (
                    <div>
                        <Popconfirm
                            // todo: name取值
                            title={`是否取消${record.name || '张三'}的报名?`}
                            onConfirm={async () => {
                                const p = {
                                    applyId: record.applyId,
                                    jobId: record.jobId,
                                }
                                const r = await cancelApply(p);
                                if (r.code === 0) {
                                    message.success('操作成功');
                                    initApplyInfo();
                                    document.querySelector('.search-button').click();
                                } else {
                                    Modal.error({
                                        title: r.msg,
                                    });
                                }
                            }}
                            okText="是"
                            cancelText="否"
                        >
                            <Button
                                danger
                                size="small"
                            >
                                取消
                            </Button>
                        </Popconfirm>

                    </div>
                )
            }
        }
    ];
    return (
        <div>
            <Table
                scroll={{
                    y: window.innerHeight - 210,
                }}
                rowKey="jobId"
                bordered
                columns={columns}
                dataSource={jobList}
                pagination={false}
            />
            <Modal
                title="报名人员"
                visible={applyInfo.visible}
                maskClosable={false}
                width={800}
                footer={[
                    <Button
                        type="primary"
                        onClick={() => initApplyInfo({ visible: false })}
                    >
                        确定
                    </Button>
                ]}
                onCancel={() => initApplyInfo({ visible: false })}
            >
                <Table
                    scroll={{
                        y: 200,
                    }}
                    rowKey="applyId"
                    bordered
                    columns={applyColumns}
                    dataSource={applyInfo.applyList}
                    pagination={false}
                />
            </Modal>
        </div>
    );
}

export default List;