import React, { useState } from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogTitle, Table, TableBody, TableCell, TableRow, TableContainer, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextBoxNormal from '../Textbox/TextBoxNormal';
import SpaceDivider from '../Tools/Divider';
import GetLng from '../Language/GetLng';

interface StringlistEditorProps {
  whitelist: string[];
  setWhitelist: any;
  modalcaption: string;
  caption: string;
  validationType: string;
  notEmpty: boolean;
}

const StringlistEditor: React.FC<StringlistEditorProps> = ({ whitelist, setWhitelist, modalcaption, caption, validationType, notEmpty }) => {
  const [newEntry, setNewEntry] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEntry('');
  };

  const handleAddEntry = () => {
    if (newEntry && !whitelist.includes(newEntry)) {
      setWhitelist([...whitelist, newEntry]);
      handleClose();
    }
  };

  const handleRemoveEntry = (entryToRemove: string) => {
    setWhitelist(whitelist.filter((entry) => entry !== entryToRemove));
  };

  return (
    <div>
      <Typography variant="h6" style={{ margin: '10px' }}><b>{caption}</b></Typography>
      <SpaceDivider />
      <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
        <Table aria-label="whitelist table" size="small">
          <TableBody>
            {whitelist.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEntry(entry)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained" size="small">
        {GetLng(12)}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalcaption}</DialogTitle>
        <TextBoxNormal
                  label="Eintrag"



                  value={newEntry}
                  validationType={validationType as 'email' | 'number' | 'prefix' | 'urla' | 'plainurl' | 'ip' | undefined}
                  notempty={notEmpty}
                  onChange={(e) => setNewEntry(e.target.value)} 
                  id={''} 
                  helperText={''}   
                 
                       />
        <DialogActions>
        <Button onClick={handleClose}>{GetLng(14)}</Button>
          <Button onClick={handleAddEntry}>{GetLng(13)}</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StringlistEditor;
