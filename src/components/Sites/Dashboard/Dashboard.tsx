import { useState, useEffect } from 'react';
import Container from '../../Container/Container';
import { FormControl, InputLabel, Select, MenuItem, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import InfoBox from '../../Mui/Dashboard/InfoBox';
import InfoBoxesContainer from '../../Mui/Dashboard/InfoBoxesContainer';
import SpaceDivider from '../../Mui/Tools/Divider';
import getLng from "../../Mui/Language/GetLng.tsx";

interface Data {
  Service: any;
  IP: any;
  RequestSize: number;
  ResponseTime: number;
  StatusCode: number;
  TimePre: number;
  TimePost: number;
  TimeFull: number;
  ServiceTimePosts: { [key: string]: number };
  ServiceTimePre: { [key: string]: number };
  ServiceRequestSize: { [key: string]: number };
  xLine: number[];
  yPre: number[];
  yPost: number[];
  yFull: number[];
  ySize: number[];
  TopIP: { [key: string]: number };
  ServiceTimePostsArray?: {
    Service: string;
    TimePost: number;
    TimePre: number;
    RequestSize: number;
    Connects: number;
  }[];
}

function Dashboard() {
  const [daten, setDaten] = useState<Data[] | null>(null);
  const [span, setSpan] = useState<string>('all');
  const [updateInterval, setUpdateInterval] = useState<number>(60);
  const [gdata, setGdata] = useState<Data | null>(null);

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
          console.log(response);
        }
        const json = await response.json();
        setDaten(json);
      } catch (error) {
        console.error('Ein Fehler ist aufgetreten beim Abrufen der Daten:', error);
      }
    };

    fetchData().then(() => console.log('Initial data fetched'));

    const intervalId = setInterval(fetchData, updateInterval * 1000);

    return () => clearInterval(intervalId);
  }, [updateInterval, span]);

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
        console.log(response);
      }
      const json = await response.json();
      setDaten(json);
    } catch (error) {
      console.error('Ein Fehler ist aufgetreten beim Abrufen der Daten:', error);
    }
  };

  useEffect(() => {
    if (daten) {
      const data: Data = {
          RequestSize: 0,
          ResponseTime: 0,
          StatusCode: 0,
          TimePre: 0,
          TimePost: 0,
          TimeFull: 0,
          ServiceTimePosts: {},
          ServiceTimePre: {},
          ServiceRequestSize: {},
          xLine: [],
          yPre: [],
          yPost: [],
          yFull: [],
          ySize: [],
          TopIP: {},
          Service: undefined,
          IP: undefined
      };

      daten.forEach((element) => {
        data.RequestSize += element.RequestSize;
        data.ResponseTime += element.ResponseTime;
        data.xLine.push(data.xLine.length + 1);
        data.yPre.push(element.TimePre / 1000000);
        data.yPost.push(element.TimePost);
        data.yFull.push(element.TimeFull);
        data.ySize.push(element.RequestSize);

        data.TimePre += element.TimePre;
        data.TimePost += element.TimePost;
        data.TimeFull += element.TimeFull;

        if (!data.TopIP[element.IP]) {
          data.TopIP[element.IP] = 1;
        } else {
          data.TopIP[element.IP] += 1;
        }

        if (!data.ServiceTimePosts[element.Service]) {
          data.ServiceTimePosts[element.Service] = 0;
          data.ServiceTimePre[element.Service] = 0;
          data.ServiceRequestSize[element.Service] = 0;
        }
        data.ServiceTimePosts[element.Service] += element.TimePost;
        data.ServiceTimePre[element.Service] += element.TimePre;
        data.ServiceRequestSize[element.Service] += element.RequestSize;
      });

      data.RequestSize /= daten.length;
      data.ResponseTime /= daten.length;

      data.TimePre /= daten.length;
      data.TimePost /= daten.length;
      data.TimeFull /= daten.length;

      data.ServiceTimePostsArray = Object.keys(data.ServiceTimePosts).map((service) => ({
        Service: service,
        TimePost: data.ServiceTimePosts[service] / daten.filter((d) => d.Service === service).length,
        TimePre: data.ServiceTimePre[service] / daten.filter((d) => d.Service === service).length,
        RequestSize: data.ServiceRequestSize[service] / daten.filter((d) => d.Service === service).length,
        Connects: daten.filter((d) => d.Service === service).length,
      }));

      setGdata(data);
    }
  }, [daten]);

  return (
    <Container title="Home">
      <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2}}>
        <FormControl sx={{minWidth: 120}}>
          <InputLabel id="span-select-label">{getLng(15)}</InputLabel>
          <Select
            labelId="span-select-label"
            id="span-select"
            value={span}
            label="Zeitspanne"
            onChange={(e) => setSpan(e.target.value as string)}
          >
            <MenuItem value="all">{getLng(19)}</MenuItem>
            <MenuItem value="day">{getLng(21)}</MenuItem>
            <MenuItem value="hour">{getLng(22)}</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{minWidth: 120}}>
          <InputLabel id="update-interval-select-label">{getLng(16)}</InputLabel>
          <Select
            labelId="update-interval-select-label"
            id="update-interval-select"
            value={updateInterval}
            label="Aktualisierungsperiode"
            onChange={(e) => setUpdateInterval(Number(e.target.value))}
          >
            <MenuItem value={10}>10 {getLng(20)}</MenuItem>
            <MenuItem value={30}>30 {getLng(20)}</MenuItem>
            <MenuItem value={60}>60 {getLng(20)}</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={fetchDataManual}>{getLng(17)}</Button>
      </Box>

      {gdata && (
        <Box>
          <InfoBoxesContainer>
            <InfoBox caption="Gateway Time" value={(gdata.TimePre / 1000000).toFixed(2)} unit="Millisekunden" />
            <InfoBox caption="Endpoint Time" value={gdata.TimePost.toFixed(2)} unit="Millisekunden" />
            <InfoBox caption="Full Time" value={gdata.TimeFull.toFixed(2)} unit="Millisekunden" />
            <InfoBox caption="Average Request Size" value={gdata.RequestSize.toFixed(2)} unit="kb" />
          </InfoBoxesContainer>
          <InfoBoxesContainer>
            <LineChart
              
              xAxis={[{data: gdata.xLine}]}
              series={[{data: gdata.yPre, label: 'Time Pre (ms)', area: true, showMark: false}]}
              width={500}
              height={300}
            />
            <LineChart
             
              xAxis={[{data: gdata.xLine}]}
              series={[{data: gdata.yPost, label: 'Time Post (ms)', area: true, showMark: false}]}
              width={500}
              height={300}
            />
            <LineChart
              
              xAxis={[{data: gdata.xLine}]}
              series={[{data: gdata.yFull, label: 'Time Full (ms)', area: true, showMark: false}]}
              width={500}
              height={300}
            />
            <LineChart
              
              xAxis={[{data: gdata.xLine}]}
              series={[{data: gdata.ySize, label: 'Request Size (kb)', area: true, showMark: false}]}
              width={500}
              height={300}
            />
          </InfoBoxesContainer>

          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Service</b></TableCell>
                  <TableCell align="right"><b>Time Pre (ms)</b></TableCell>
                  <TableCell align="right"><b>Time Post (ms)</b></TableCell>
                  <TableCell align="right"><b>RequestSize (kb)</b></TableCell>
                  <TableCell align="right"><b>Requests</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gdata.ServiceTimePostsArray && gdata.ServiceTimePostsArray.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.Service}</TableCell>
                    <TableCell align="right">{(service.TimePre / 1000000).toFixed(2)}</TableCell>
                    <TableCell align="right">{service.TimePost.toFixed(2)}</TableCell>
                    <TableCell align="right">{(service.RequestSize).toFixed(2)}</TableCell>
                    <TableCell align="right">{service.Connects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <SpaceDivider />
          <SpaceDivider />
          {gdata.TopIP && (
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>IP</b></TableCell>
                    <TableCell align="right"><b>Requests</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(gdata.TopIP).map((ip, index) => (
                    <TableRow key={index}>
                      <TableCell>{ip}</TableCell>
                      <TableCell align="right">{gdata.TopIP[ip]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      <SpaceDivider />
      <SpaceDivider />
    </Container>
  );
}

export default Dashboard;
