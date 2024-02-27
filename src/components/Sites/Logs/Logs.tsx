import { useState, useEffect } from 'react';
import Container from '../../Container/Container';

import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import SpaceDivider from '../../Mui/Tools/Divider';

function Dashboard() {
  const [daten, setDaten] = useState(null);
  const [span, setSpan] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(localStorage.getItem('host') + '/database/' + span, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || '',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        json.forEach((item: any, index: number) => {
          item.id = index;
        });

        setDaten(json);
      } catch (error) {
        console.error('Ein Fehler ist aufgetreten beim Abrufen der Daten:', error);
      }
    };

    fetchData();
  }, [span]);

  const fetchDataManual = async () => {
    try {
      const response = await fetch(localStorage.getItem('host') + '/database/' + span, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token') || '',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      // add id key to json
      json.forEach((item: any, index: number) => {
        item.id = index;
      });

      setDaten(json);
    } catch (error) {
      console.error('Ein Fehler ist aufgetreten beim Abrufen der Daten:', error);
    }
  };

  const columns = [
    {
      field: 'IP',
      headerName: 'IP',
      width: 150,
      editable: false,
    },
    {
      field: 'Service',
      headerName: 'Service',
      width: 200,
      editable: false,
    },
    {
      field: 'ServiceExists',
      headerName: 'Exists',
      type: 'boolean',
      width: 100,
      editable: false,
    },
    {
      field: 'Routed',
      headerName: 'Routed',
      type: 'boolean',
      width: 100,
      editable: false,
    },
    {
      field: 'Method',
      headerName: 'Method',
      width: 100,
      editable: false,
    },
    {
      field: 'TimePre',
      headerName: 'TimePre',
      width: 100,
      editable: false,
      valueFormatter: (params: any) => {
        return (params.value / 1000000).toFixed(2);
      },
    },
    {
      field: 'TimePost',
      headerName: 'TimePost',
      width: 100,
      editable: false,
    },
    {
      field: 'TimeFull',
      headerName: 'TimeFull',
      width: 100,
      editable: false,
    },
    {
      field: 'RequestSize',
      headerName: 'Size',
      width: 100,
      editable: false,
    },
    {
      field: 'StatusCode',
      headerName: 'ECode',
      width: 100,
      editable: false,
    },
    {
      field: 'Created',
      headerName: 'Created',
      type: 'dateTime',
      width: 200,
      editable: false,
      valueFormatter: (params: any) => {
        return format(new Date(params.value), 'dd.MM.yyyy HH:mm:ss');
      },
    },
    {
      field: 'Message',
      headerName: 'Message',
      hide: true,
      editable: false,
    },
    {
      field: 'EndPoint',
      headerName: 'EndPoint',
      width: 200,
      hide: true,
      editable: false,
    },
    {
      field: 'Host',
      headerName: 'Host',
      width: 200,
      hide: true,
      editable: false,
    },
    {
      field: 'HeadersCount',
      headerName: 'Headers',
      width: 100,
      hide: true,
      editable: false,
    },
  ];

  return (
    <Container title="Home">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="span-select-label">Zeitspanne</InputLabel>
          <Select
            labelId="span-select-label"
            id="span-select"
            value={span}
            label="Zeitspanne"
            onChange={(e) => setSpan(e.target.value)}
          >
            <MenuItem value="all">Alle</MenuItem>
            <MenuItem value="day">Tag</MenuItem>
            <MenuItem value="hour">Stunde</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={fetchDataManual}>Fetch</Button>
      </Box>
      {daten && (
        <Box sx={{ height: '80%', width: '100%' }}>
          <DataGrid
            columnVisibilityModel={{
              id: false,
              HeadersCount: false,
              Message: false,
              EndPoint: false,
              Host: false,
            }}
            rows={daten}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[50]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
      <SpaceDivider />
      <SpaceDivider />
    </Container>
  );
}

export default Dashboard;
