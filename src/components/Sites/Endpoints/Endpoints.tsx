import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Typography,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Container from '../../Container/Container';
import SpaceDivider from '../../Mui/Tools/Divider';
import Styledbox from '../../Mui/Tools/StyledBox';
import Endpoint from './Endpoint';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import StringModal from '../../Mui/Modal/StringModal';
import CheckBox from '../../Mui/Checkbox/CheckBox';
import SimpleModal from '../../Mui/Modal/Dialog';

interface EndpointData {
  UUID: string;
  Endpoint: string;
  VerifySSL: boolean;
  CertAuth: boolean;
  Certs: {
    CertPEM: string;
    CertKEY: string;
  };
  Active: boolean;
  Name: string;
  OverrideTimeout: number;
  HeaderRouteMatches: { Header: string; Value: string }[];
  HeaderExists: any[];
  HeaderAdd: any[];
  JWTPreCheck: boolean;
  JWTData: {
    Header: string;
    Key: string;
    OnlySign: boolean;
    Field: string;
    Match: any;
  };
  HeaderReplace: any[];
}

interface Service {
  UUID: string;
  Endpoints: EndpointData[];
  BasicEndpoint: EndpointData;
  Active: boolean;
  Name: string;
}

const Endpoints = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [alert, setAlert] = useState('');
  const [alertState, setAlertState] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointData | null>(null);
  const [basicEndpoint, setBasicEndpoint] = useState(false);
  const [dialogAddBasic, setDialogAddBasic] = useState(false);

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState('');

  useEffect(() => {
    const fetchKonfiguration = async () => {
      try {
        const response = await fetch(localStorage.getItem('host') + '/config_service', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || '',
          },
        });
        if (!response.ok) {
          setAlertState(true);
          setAlert(`HTTP error! status: ${response.status}`);
          console.log('HTTP error! status: ' + response.status);
        } else {
          setAlertState(false);
          setAlert('');
        }
        const json = await response.json();
        setServices(json);
      } catch (error) {
        setAlertState(true);
        setAlert('Ein Fehler ist aufgetreten beim Abrufen der Endpunkte - no route');
        console.error('Ein Fehler ist aufgetreten beim Abrufen der Konfiguration:', error);
      }
    };

    fetchKonfiguration().then(() => console.log('done'));
  }, []);

  if (!services) {
    return (
      <Container title="">
        <LoadingSpinner />
        {alertState && (
          <Alert severity="error">
            <Typography>Error</Typography>
            {alert}
          </Alert>
        )}
      </Container>
    );
  } else {
    const handleDeleteService = (serviceName: string) => {
      setServices(services.filter((service) => service.UUID !== serviceName));
    };

    const handleDeleteEndpoint = (serviceName: string, endpointName: string) => {
      const updatedServices = services.map((service) => {
        if (service.UUID === serviceName) {
          return {
            ...service,
            Endpoints: service.Endpoints.filter((endpoint) => endpoint.UUID !== endpointName),
          };
        }
        return service;
      });
      setServices(updatedServices);
    };

    const handleEditClick = (endpointData: EndpointData, basic: boolean) => {
      setSelectedEndpoint(endpointData);
      setBasicEndpoint(basic);
      setIsEditorOpen(true);
    };

    const HandleSave = () => {
      fetch(localStorage.getItem('host') + '/config_service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify(services),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setDialog('Konfiguration gespeichert');
          setOpen(true);
        })
        .catch((error) => {
          console.error('Error:', error);
          setDialog('Fehler beim Speichern der Konfiguration');
          setOpen(true);
        });
    };

    const handleClose = () => {
      setDialog('');
      setOpen(false);
    };

    const handleAddBasic = (newEntry: string) => {
      setDialogAddBasic(false);
      const nservice: Service = {
        Endpoints: [],
        BasicEndpoint: {
          Endpoint: 'https://',
          VerifySSL: true,
          CertAuth: false,
          Certs: {
            CertPEM: '',
            CertKEY: '',
          },
          Active: false,
          Name: 'Basic',
          UUID: uuidv4(),
          OverrideTimeout: 0,
          HeaderRouteMatches: [],
          HeaderExists: [],
          HeaderAdd: [],
          JWTPreCheck: false,
          JWTData: {
            Header: '',
            Key: '',
            OnlySign: false,
            Field: '',
            Match: null,
          },
          HeaderReplace: [],
        },
        Active: false,
        UUID: uuidv4(),
        Name: newEntry,
      };
      setServices([...services, nservice]);
    };

    const handleAddSubService = (uuid: string, basicname: string) => {
      const nservice: EndpointData = {
        Endpoint: 'https://',
        VerifySSL: true,
        CertAuth: false,
        Certs: {
          CertPEM: '',
          CertKEY: '',
        },
        Active: false,
        Name: basicname,
        UUID: uuidv4(),
        OverrideTimeout: 0,
        HeaderRouteMatches: [{
          Header: 'system',
          Value: 'dev',
        }],
        HeaderExists: [],
        HeaderAdd: [],
        JWTPreCheck: false,
        JWTData: {
          Header: '',
          Key: '',
          OnlySign: false,
          Field: '',
          Match: null,
        },
        HeaderReplace: [],
      };
      const updatedServices = services.map((service) => {
        if (service.UUID === uuid) {
          if (service.Endpoints) {
            return { ...service, Endpoints: [...service.Endpoints, nservice] };
          } else {
            return { ...service, Endpoints: [nservice] };
          }
        }
        return service;
      });
      setServices(updatedServices);
    };

    const HandleReload = async () => {
      try {
        const response = await fetch(localStorage.getItem('host') + '/reload', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || '',
          },
        });
        if (!response.ok) {
          setDialog('Fehler beim Neuladen der Konfiguration - response bad ' + response.status);
          setOpen(true);
        } else {
          setDialog('Dast Gateway hat die Konfiguration neu geladen');
          setOpen(true);
        }
      } catch (error) {
        setDialog('Fehler beim Neuladen der Konfiguration - no route');
        setOpen(true);
      }
    };

    const handleEnableService = (uuid: string, active: boolean) => {
      const updatedServices = services.map((service) => {
        if (service.UUID === uuid) {
          return { ...service, Active: active };
        }
        return service;
      });
      setServices(updatedServices);
    };

    const HandleOpenAdd = () => {
      setDialogAddBasic(true);
    };

    const handleEditorSave = (updatedEndpoint: EndpointData) => {
      const updatedServices = services.map((service) => {
        if (service.BasicEndpoint.UUID === updatedEndpoint.UUID) {
          return { ...service, BasicEndpoint: updatedEndpoint };
        } else if (service.Endpoints) {
          const updatedEndpoints = service.Endpoints.map((endpoint) => {
            if (endpoint.UUID === updatedEndpoint.UUID) {
              return updatedEndpoint;
            }
            return endpoint;
          });
          return { ...service, Endpoints: updatedEndpoints };
        }
        return service;
      });
      setServices(updatedServices);
      setIsEditorOpen(false);
    };

    const handleEditorCancel = () => {
      setIsEditorOpen(false);
    };

    return (
      <Container title="Endpoints">
        {isEditorOpen && selectedEndpoint ? (
            <Endpoint basic={basicEndpoint} endpointData={selectedEndpoint} onSave={handleEditorSave} onCancel={handleEditorCancel} />
        ) : (
          <>
            <Typography variant="h4" gutterBottom>Services</Typography>
            <SpaceDivider />
            <Styledbox>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Typ</b></TableCell>
                      <TableCell><b>Route</b></TableCell>
                      <TableCell><b>Endpoint</b></TableCell>
                      <TableCell><b>Active</b></TableCell>
                      <TableCell><b>Aktionen</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.map((service) => [
                      <TableRow key={service.BasicEndpoint.UUID}>
                        <TableCell>Basic</TableCell>
                        <TableCell>{service.Name}</TableCell>
                        <TableCell>{service.BasicEndpoint.Endpoint}</TableCell>
                        <TableCell>
                          <CheckBox
                            label=""
                            checked={service.Active}
                            onChange={(e) => handleEnableService(service.UUID, e.target.checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditClick(service.BasicEndpoint, true)}><EditIcon /></IconButton>
                          <IconButton onClick={() => handleDeleteService(service.UUID)}><DeleteIcon /></IconButton>
                          <IconButton onClick={() => handleAddSubService(service.UUID, service.Name)}><AddBoxIcon /></IconButton>
                        </TableCell>
                      </TableRow>,
                      ...(service.Endpoints || []).map((endpoint) => (
                        <TableRow key={endpoint.UUID}>
                          <TableCell>Sub</TableCell>
                          <TableCell>{service.Name} --&gt; {endpoint.Name}</TableCell>
                          <TableCell>{endpoint.Endpoint}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEditClick(endpoint,false)}><EditIcon /></IconButton>
                            <IconButton onClick={() => handleDeleteEndpoint(service.UUID, endpoint.UUID)}><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      )),
                    ])}
                    <TableRow>
                      <TableCell>
                        <Button variant="contained" onClick={HandleSave}>Speichern</Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={HandleReload}>Reload Gateway</Button>
                      </TableCell>
                      <TableCell colSpan={4} align="right">
                        <Button variant="contained" onClick={HandleOpenAdd}>Add Main Endpoint</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Styledbox>
            <SpaceDivider />
            {dialogAddBasic && (
              <StringModal
                                modalcaption="Neue Basic Route"
                                text="<host>/<prefix>/<route>  (z.B. https://gateway.example.com/v1/service1)"
                                label="Route"
                                validationType="plainurl"

                                onAdd={handleAddBasic} notEmpty={true}              />
            )}
            <SimpleModal
              open={open}
              onClose={handleClose}
              caption="Hinweis"
              text={dialog}
            />
          </>
        )}
        <SpaceDivider />
        <SpaceDivider />
      </Container>
    );
  }
};

export default Endpoints;
