import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Alert
} from '@mui/material';

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

interface FormData {
  licenseKey: string;
  activationDate: string;
  expiryDate: string;
  licenseType: string;
  licenseStatus: string;
  holderName: string;
  holderEmail: string;
  systemId: string;
  activationIp: string;
  numberOfUsers: string;
}

interface Errors {
  licenseKey?: string;
  holderName?: string;
  holderEmail?: string;
}

const LicenseActivationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    licenseKey: '',
    activationDate: '',
    expiryDate: '',
    licenseType: '',
    licenseStatus: '',
    holderName: '',
    holderEmail: '',
    systemId: '',
    activationIp: '',
    numberOfUsers: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');

  const generateSystemId = () =>
    'SYS-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const getIpAddress = () =>
    '192.168.1.' + Math.floor(Math.random() * 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === 'licenseKey') {
      const formattedKey = value.trim().toUpperCase();
      const licenseData = MOCK_LICENSES[formattedKey];

      if (licenseData) {
        newFormData.activationDate = licenseData.activationDate;
        newFormData.expiryDate = licenseData.expiryDate;
        newFormData.licenseType = licenseData.licenseType;
        newFormData.licenseStatus = licenseData.licenseStatus;
        newFormData.holderName = licenseData.holderName;
        newFormData.holderEmail = licenseData.holderEmail;
        newFormData.systemId = generateSystemId();
        newFormData.activationIp = getIpAddress();
        setStatusMessage('');
      } else {
        setStatusMessage('❌ Invalid License Key. Please check and try again.');
        Object.assign(newFormData, {
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
    }

    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!formData.licenseKey || !/^[A-Z0-9\-]{25}$/.test(formData.licenseKey)) {
      newErrors.licenseKey = 'License Key must be 25-character alphanumeric (with dashes).';
    }
    if (!formData.holderName) {
      newErrors.holderName = 'License Holder Name is required.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.holderEmail)) {
      newErrors.holderEmail = 'Valid email is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('License Activated:', formData);
      setStatusMessage('✅ License successfully activated.');
    }
  };

  const handleCancel = () => {
    setFormData({
      licenseKey: '',
      activationDate: '',
      expiryDate: '',
      licenseType: '',
      licenseStatus: '',
      holderName: '',
      holderEmail: '',
      systemId: '',
      activationIp: '',
      numberOfUsers: '',
    });
    setErrors({});
    setStatusMessage('');
  };

  return (
    <Box sx={{ width: '80%', mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        License Activation
      </Typography>

      {statusMessage && (
        <Alert
          severity={statusMessage.startsWith('✅') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {statusMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="licenseKey"
                  label="License Key"
                  value={formData.licenseKey}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.licenseKey}
                  helperText={errors.licenseKey}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="activationDate"
                  label="Activation Date"
                  value={formData.activationDate}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="licenseType"
                  label="License Type"
                  value={formData.licenseType}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="systemId"
                  label="System ID"
                  value={formData.systemId}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="holderName"
                  label="License Holder Name"
                  value={formData.holderName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.holderName}
                  helperText={errors.holderName}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="numberOfUsers"
                  label="No. of Users"
                  value={formData.numberOfUsers}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="expiryDate"
                  label="Expiry Date"
                  value={formData.expiryDate}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="licenseStatus"
                  label="License Status"
                  value={formData.licenseStatus}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="activationIp"
                  label="Activation IP Address"
                  value={formData.activationIp}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="holderEmail"
                  label="License Holder Email"
                  value={formData.holderEmail}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.holderEmail}
                  helperText={errors.holderEmail}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} mt={10}>
            <Button type="submit" variant="contained" color="primary">
              Activate
            </Button>
            <Button type="button" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default LicenseActivationForm;
