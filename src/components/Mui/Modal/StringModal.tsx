import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextBoxNormal from '../Textbox/TextBoxNormal';
import SpacheDivider from '../Tools/Divider';

interface StringModalProps {
  modalcaption: string;
  onAdd: (entry: string) => void;
  text: string;
  label: string;
  validationType: string;
  notEmpty: boolean;
}

const StringModal: React.FC<StringModalProps> = ({
  modalcaption,
  onAdd,
  text,
  label,
  validationType,
  notEmpty
}) => {
  const [newEntry, setNewEntry] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
    setNewEntry('');
  };

  const handleAddEntry = () => {
    onAdd(newEntry);
    handleClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEntry(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalcaption}</DialogTitle>
        <DialogContent>
          {text}
          <SpacheDivider />
        <TextBoxNormal
            id="newentry"
            helperText=''
            
           
           
            label={label}
            validationType={validationType as 'email' | 'number' | 'prefix' | 'urla' | 'plainurl' | 'ip' | undefined}
        
     
            value={newEntry}
            onChange={handleChange}
            notempty={notEmpty}
        />
          <SpacheDivider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleAddEntry}>Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StringModal;
