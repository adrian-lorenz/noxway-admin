import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface EndpointEditorProps {
  endpointData: { Endpoint: string; Name: string };
  onSave: (data: { Endpoint: string; Name: string }) => void;
  onCancel: () => void;
}

const EndpointEditor: React.FC<EndpointEditorProps> = ({ endpointData, onSave, onCancel }) => {
  const [endpoint, setEndpoint] = useState<{ Endpoint: string; Name: string }>(endpointData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(endpoint);
  };

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
      style={{ width: '80%', maxWidth: 'none', height: '80%', maxHeight: 'none' }}
    >
      <DialogTitle id="form-dialog-title">
        Basic Endpoint bearbeiten
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="endpoint"
          label="Endpoint URL"
          type="text"
          fullWidth
          value={endpoint.Endpoint}
          onChange={(e) =>
            setEndpoint({ ...endpoint, Endpoint: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={endpoint.Name}
          onChange={(e) => setEndpoint({ ...endpoint, Name: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Abbrechen
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EndpointEditor;
