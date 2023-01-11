import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'
import UserFrom from '../../../components/user-manage/UserFrom';

const { confirm } = Modal;

function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const addFrom = useRef(null)
  const updateFrom = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:5050/users?_expand=role').then(res => {
      const list = res.data
      setDataSource(list)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5050/regions').then(res => {
      const list = res.data
      setRegionList(list)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5050/roles').then(res => {
      const list = res.data
      setRoleList(list)
    })
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: region => <b>{region === "" ? '全球' : region}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: role => role?.roleName
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => <Switch disabled={item.default} checked={roleState} onChange={() => handleChange(item)}></Switch>
    },
    {
      title: '操作',
      render: (item) =>
        <>
          <Button disabled={item.default} onClick={() => showConfirm(item)} danger shape="circle" icon={<DeleteOutlined />} />
          <Button disabled={item.default} type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleUpdate(item)} />
        </>
    }
  ];

  const handleUpdate = (item) => {
    setIsUpdateVisible(true)
    setTimeout(() => {
      if (item.roleId === 1) {
        setIsUpdateDisabled(true)
      } else {
        setIsUpdateDisabled(false)
      }
      updateFrom.current.setFieldsValue(item)
    }, 0);
  }

  const handleChange = (item) => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:5050/users/${item.id}`, {
      roleState: item.roleState
    })
  }

  const showConfirm = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5050/users/${item.id}`)
  }

  const addFromOk = () => {
    addFrom.current.validateFields().then(value => {
      setIsAddVisible(false)
      addFrom.current.resetFields()
      axios.post('http://localhost:5050/users', {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const updateFromOk = () => {

  }

  return (
    <>
      <Button type='primary' onClick={() => {
        setIsAddVisible(true)
      }}>添加用户</Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
      <Modal
        open={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addFromOk()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={addFrom} />
      </Modal>
      <Modal
        open={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdateVisible(false)
          setIsUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => updateFromOk()}
      >
        <UserFrom regionList={regionList} roleList={roleList} ref={updateFrom} isUpdateDisabled={isUpdateDisabled} />
      </Modal>
    </>
  )
}

export default UserList