import React, { forwardRef, useState } from 'react'
import { Form, Select, Input } from 'antd'

const UserFrom = forwardRef((props, ref) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const { roleList, regionList } = props
    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [{required: true, message:"Please input the title of collection!"}]}
            >
                <Select
                    disabled={isDisabled}
                    options={[...regionList]}
                />
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Select
                    onChange={value => {
                        if (value === 1) {
                            setIsDisabled(true)
                            ref.current.setFieldsValue({
                                region: ""
                            })
                        } else {
                            setIsDisabled(false)
                        }
                    }}
                    options={
                        roleList.map(item => {
                            return {
                                value: item.id,
                                label: item.roleName
                            }
                        })
                    }
                />

            </Form.Item>
        </Form>
    )
})

export default UserFrom