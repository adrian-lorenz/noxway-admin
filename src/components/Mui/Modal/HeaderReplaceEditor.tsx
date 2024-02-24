import React, { useState } from 'react';
import { Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow, TableContainer, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Entry {
  Header: string;
  Value: string;
  NewValue: string;
}

interface HeaderReplaceEditorProps {
  list: Entry[];
  setList: React.Dispatch<React.SetStateAction<Entry[]>>;
  modalCaption: string;
  caption: string;
}

const HeaderReplaceEditor: React.FC<HeaderReplaceEditorProps> = ({ list, setList, modalCaption, caption }) => {
  const [newEntry, setNewEntry] = useState<Entry>({ Header: '', Value: '', NewValue: '' });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEntry({ Header: '', Value: '', NewValue: '' });
  };

  const handleAddEntry = () => {
    if (newEntry.Header && newEntry.Value && newEntry.NewValue) {
      setList([...list, newEntry]);
      handleClose();
    }
  };

  const handleRemoveEntry = (indexToRemove: number) => {
    setList(list.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Typography style={{ margin: '10px' }}>{caption}</Typography>
      <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
        <Table aria-label="list table" size="small">
          <TableBody>
            {list.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.Header}</TableCell>
                <TableCell>{entry.Value}</TableCell>
                <TableCell>{entry.NewValue}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEntry(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained" size="small">
        Neuer Eintrag
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalCaption}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Header"
            type="text"
            fullWidth
            variant="outlined"
            value={newEntry.Header}
            onChange={(e) => setNewEntry({ ...newEntry, Header: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Value"
            type="text"
            fullWidth
            variant="outlined"
            value={newEntry.Value}
            onChange={(e) => setNewEntry({ ...newEntry, Value: e.target.value })}
          />
          <TextField
            margin="dense"
            label="NewValue"
            type="text"
            fullWidth
            variant="outlined"
            value={newEntry.NewValue}
            onChange={(e) => setNewEntry({ ...newEntry, NewValue: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleAddEntry}>Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeaderReplaceEditor;
