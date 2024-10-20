import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import type { FormProps } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  repeat_p?: string;
  remember?: boolean;
  name?: string;
  patronymic?: string;
  lastname?: string;
  dob?: string;
  address?: string;
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    const response = await fetch('http://localhost3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(values)
    });
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="registration"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType>
        label="Логин"
        name="username"
        rules={[
          { required: true, message: 'Необходимо ввести логин!' },
          { min: 6, max: 20, message: 'Логин должен содержать от 6 до 20 символов!' },
          { pattern: /^[a-zA-Z0-9]+$/, message: 'Разрешены только буквы латинского алфавита и цифры!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Необходимо ввести пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Повтор пароля"
        name="repeat_p"
        rules={[
          { required: true, message: 'Необходимо повторить пароль!' },
          ({ getFieldValue } : { getFieldValue: (field: string) => {} }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли должны совпадать!'));
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
    
      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const ProfileEditForm = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="profile-edit"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType>
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Необходимо ввести имя!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Отчество"
        name="patronymic"
        rules={[{ required: true, message: 'Необходимо ввести отчество!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Фамилия"
        name="lastname"
        rules={[{ required: true, message: 'Необходимо ввести фамилию!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Дата рождения"
        name="dob"
        rules={[
          { pattern: /^\d{2}\.\d{2}\.\d{4}$/, message: 'Формат даты: ДД.ММ.ГГГГ' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Адрес"
        name="address"
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}

export { RegistrationForm, ProfileEditForm };
