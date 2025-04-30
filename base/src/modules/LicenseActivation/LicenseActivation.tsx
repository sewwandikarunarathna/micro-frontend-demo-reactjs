import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Alert
} from 'antd';

const { Title } = Typography;

// Mock license database
const MOCK_LICENSES: Record<string, {
  activationDate: string;
  expiryDate: string;
  licenseType: string;
  licenseStatus: string;
  holderName: string;
  holderEmail: string;
}> = {
  'ABCDE-FGHIJ-KLMNO-PQRST-UVWXY': {
    activationDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    licenseType: 'Trial',
    licenseStatus: 'Active',
    holderName: 'John Doe Corp',
    holderEmail: 'john@example.com',
  },
  '12345-67890-ABCDE-FGHIJ-KLMNO': {
    activationDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    licenseType: 'Enterprise',
    licenseStatus: 'Active',
    holderName: 'MegaTech Inc',
    holderEmail: 'admin@megatech.com',
  },
};

const LicenseActivationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  const generateSystemId = () =>
    'SYS-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const getIpAddress = () =>
    '192.168.1.' + Math.floor(Math.random() * 100);

  const handleLicenseKeyChange = (value: string) => {
    const formattedKey = value.trim().toUpperCase();
    const licenseData = MOCK_LICENSES[formattedKey];

    if (licenseData) {
      form.setFieldsValue({
        licenseKey: formattedKey,
        activationDate: licenseData.activationDate,
        expiryDate: licenseData.expiryDate,
        licenseType: licenseData.licenseType,
        licenseStatus: licenseData.licenseStatus,
        holderName: licenseData.holderName,
        holderEmail: licenseData.holderEmail,
        systemId: generateSystemId(),
        activationIp: getIpAddress(),
      });
      setStatusMessage('');
    } else {
      setStatusMessage('❌ Invalid License Key. Please check and try again.');
      setStatusType('error');
      form.setFieldsValue({
        activationDate: '',
        expiryDate: '',
        licenseType: '',
        licenseStatus: '',
        holderName: '',
        holderEmail: '',
        systemId: '',
        activationIp: '',
      });
    }
  };

  const handleFinish = (values: any) => {
    console.log('License Activated:', values);
    setStatusMessage('✅ License successfully activated.');
    setStatusType('success');
  };

  const handleCancel = () => {
    form.resetFields();
    setStatusMessage('');
  };

  return (
    <div>
      <div style={{ margin: '2rem auto', padding: 32, borderRadius: 8 }}>
        <div className="flex flex-col justify-start w-auto">
          <h1 className="font-bold text-3xl">License Details</h1>
        </div>

        {statusMessage && (
          <Alert message={statusMessage} type={statusType} showIcon style={{ marginBottom: 24 }} />
        )}
        <div style={{ width: '90%', margin: '2rem auto', backgroundColor: '#f6f6f9', padding: 32, borderRadius: 8 }}>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Row gutter={48}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseKey"
                  label="License Key"
                  rules={[{ required: true, pattern: /^[A-Z0-9\-]{25}$/, message: 'License Key must be 25 characters with dashes.' }]}
                >
                  <Input onChange={(e) => handleLicenseKeyChange(e.target.value)} />
                </Form.Item>

                <Form.Item name="activationDate" label="Activation Date">
                  <Input readOnly />
                </Form.Item>

                <Form.Item name="licenseType" label="License Type">
                  <Input readOnly />
                </Form.Item>

                <Form.Item
                  name="holderName"
                  label="License Holder Name"
                  rules={[{ required: true, message: 'License Holder Name is required.' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="systemId" label="System ID">
                  <Input readOnly />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="numberOfUsers" label="No. of Users">
                  <Input />
                </Form.Item>

                <Form.Item name="expiryDate" label="Expiry Date">
                  <Input readOnly />
                </Form.Item>

                <Form.Item name="licenseStatus" label="License Status">
                  <Input readOnly />
                </Form.Item>

                <Form.Item name="activationIp" label="Activation IP Address">
                  <Input readOnly />
                </Form.Item>

                <Form.Item
                  name="holderEmail"
                  label="License Holder Email"
                  rules={[{ type: 'email', required: true, message: 'Valid email is required.' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div style={{ width: '85%', margin: '2rem auto' }}>
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
            Activate
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default LicenseActivationForm;
