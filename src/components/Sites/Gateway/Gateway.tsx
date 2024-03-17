import React, {useState, useEffect} from 'react';
import Container from '../../Container/Container';
import Typography from '@mui/material/Typography';
import TextBox from '../../Mui/Textbox/TextBoxNormal';
import CheckBox from '../../Mui/Checkbox/CheckBox';
import SpaceDivider from '../../Mui/Tools/Divider';
import StringlistEditor from '../../Mui/Modal/StringListEditor';
import Styledbox from '../../Mui/Tools/StyledBox';
import Button from '@mui/material/Button';
import StyleHR from '../../Mui/Tools/StyleHr';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import {Alert, AlertTitle} from '@mui/material';
import SimpleModal from '../../Mui/Modal/Dialog';
import DescBox from '../../Mui/InfoBox/DescBox';
import GetLng from '../../Mui/Language/GetLng';
import SecurityIcon from '@mui/icons-material/Security';
import getLng from "../../Mui/Language/GetLng";

interface Configuration {
    name: string;
    prefix: string;
    debug: boolean;
    port: number;
    sslPort: number;
    sslDomain: string;
    sslCertDays: number;
    sslMail: string;
    exportLog: boolean;
    exportLogPath: string;
    hostnamecheck: boolean;
    hostname: string;
    ssl: boolean;
    pemCrt: string;
    pemKey: string;
    rate: {
        rate: number;
        window: number;
    };
    rateLimiter: boolean;
    rateWhitelist: string[];
    systemWhitelist: string[];
    systemWhitelistDNS: string[];
    cors: boolean;
    corsAdvanced: boolean;
    corsAllowOrigins: string[];
    corsAllowMethods: string[];
    corsAllowHeaders: string[];
}

const KonfigurationsKomponente: React.FC = () => {
    const [konfiguration, setKonfiguration] = useState<Configuration | null>(null);
    const [alert, setAlert] = useState<string>('');
    const [alertState, setAlertState] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dialog, setDialog] = useState<string>('');

    useEffect(() => {
        const fetchKonfiguration = async () => {
            try {
                const response = await fetch(`${localStorage.getItem('host')}/config_global`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token') || '',
                    },
                });
                if (!response.ok) {
                    setAlertState(true);
                    setAlert(`HTTP error! status: ${response.status}`);

                } else {
                    setAlertState(false);
                    setAlert('');
                }
                const json: Configuration = await response.json();
                console.log(json);
                setKonfiguration(json);
            } catch (error) {
                setAlertState(true);
                setAlert(`Ein Fehler ist aufgetreten beim Abrufen der Konfiguration: ${error}`);
                console.error('Ein Fehler ist aufgetreten beim Abrufen der Konfiguration:', error);
            }
        };

        fetchKonfiguration();
    }, []);

    if (!konfiguration) {
        return (
            <Container title="">
                <LoadingSpinner/>
                {alertState && (
                    <p>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {alert}
                        </Alert>
                    </p>
                )}
            </Container>
        );
    } else {
        const handleClose = () => {
            setDialog('');
            setOpen(false);
        };

        const updateSystemWhitelist = (newList: string[]) => {
            setKonfiguration({...konfiguration, systemWhitelist: newList});
        };

        const updateRateWhitelist = (newList: string[]) => {
            setKonfiguration({...konfiguration, rateWhitelist: newList});
        };

        const updateCorsAllowOrigins = (newList: string[]) => {
            setKonfiguration({...konfiguration, corsAllowOrigins: newList});
        };
        const updateCorsAllowMethods = (newList: string[]) => {
            setKonfiguration({...konfiguration, corsAllowMethods: newList});
        };
        const updateCorsAllowHeaders = (newList: string[]) => {
            setKonfiguration({...konfiguration, corsAllowHeaders: newList});
        };

        const NewCert = async () => {
            interface Cert {
                domain: string;
                mail: string;
            }

            const cert: Cert = {
                domain: konfiguration.sslDomain,
                mail: konfiguration.sslMail,
            };

            const res = await fetch(`${localStorage.getItem('host')}/retiveCert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token') || '',
                },
                body: JSON.stringify(cert),
            })
            if (res.ok) {
                const data = await res.json();
                if (data.success) {

                    setDialog(getLng(28));
                    setOpen(true);
                } else {
                    setDialog( data?.error);
                    setOpen(true);
                }
            }else{
                const data2 = await res.json();
                setDialog(getLng(29)+ data2?.error);
                setOpen(true);
            }
        }
        const HandleSave = () => {
            fetch(`${localStorage.getItem('host')}/config_global`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token') || '',
                },
                body: JSON.stringify(konfiguration),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    setDialog(getLng(26));
                    setOpen(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setDialog(getLng(27));
                    setOpen(true);

                });
        };

        return (
            <Container title="Konfiguration">
                <Typography variant="h4" gutterBottom component="div">
                    Gateway Basic Configuration
                </Typography>
                <SpaceDivider/>
                <Styledbox>

                    <TextBox
                        id='t1'
                        label="Gateway Name"
                        helperText=""
                        value={konfiguration.name}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.name = e.target.value;
                            setKonfiguration(updatedConf);
                        }}

                    />
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={100} description={500}/>
                    <TextBox
                        id='t2'
                        label="Prefix"
                        helperText=""
                        value={konfiguration.prefix}
                        validationType={'prefix'}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.prefix = e.target.value;
                            setKonfiguration(updatedConf);
                        }}

                    />

                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={101} description={501}/>
                    <CheckBox
                        label="Debug"
                        checked={konfiguration.debug}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.debug = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />

                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <TextBox
                        id='t3'
                        label="HTTP Port"
                        helperText=""
                        value={(konfiguration.port).toString()}
                        validationType={'number'}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.port = e.target.valueAsNumber;
                            setKonfiguration(updatedConf);
                        }}

                    />
                    <SpaceDivider/>
                    <TextBox
                        id='t4'
                        label="HTTPS Port"
                        helperText=""
                        validationType={'number'}
                        value={konfiguration.sslPort.toString()}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.sslPort = e.target.valueAsNumber;
                            setKonfiguration(updatedConf);
                        }}
                    />
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={103} description={503}/>
                    <CheckBox
                        label="Export Log"
                        checked={konfiguration.exportLog}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.exportLog = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />

                    <SpaceDivider/>
                    {konfiguration.exportLog && (
                        <>
                            <SpaceDivider/>
                            <TextBox
                                id='t3'
                                label={GetLng(5)}
                                helperText=""
                                value={konfiguration.exportLogPath}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.exportLogPath = e.target.value;
                                    setKonfiguration(updatedConf);
                                }}

                            />
                        </>
                    )}
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={102} description={502}/>
                    <CheckBox
                        label="Hostname Check"
                        checked={konfiguration.hostnamecheck}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.hostnamecheck = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />

                    <SpaceDivider/>
                    {konfiguration.hostnamecheck && (
                        <>
                            <SpaceDivider/>
                            <TextBox
                                id='t4'

                                label="Hostname"
                                helperText={GetLng(6)}
                                value={konfiguration.hostname}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.hostname = e.target.value;
                                    setKonfiguration(updatedConf);
                                }}

                            />
                        </>
                    )}
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={104} description={504}/>
                    <CheckBox
                        label="SSL"
                        checked={konfiguration.ssl}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.ssl = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />


                    {konfiguration.ssl && (
                        <>
                            <SpaceDivider/>
                            <TextBox
                                id='t41'
                                label={GetLng(23)}
                                helperText=""
                                value={konfiguration.sslDomain}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.sslDomain = e.target.value;
                                    setKonfiguration(updatedConf);
                                }}
                            />
                            <SpaceDivider/>
                            <TextBox
                                id='t41'
                                label={GetLng(24)}
                                helperText=""
                                value={konfiguration.sslMail}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.sslMail = e.target.value;
                                    setKonfiguration(updatedConf);
                                }}
                            />
                            {konfiguration.sslMail && konfiguration.sslDomain && (
                                <>
                                    <SpaceDivider/>
                                    <Button fullWidth variant="contained" onClick={NewCert}  endIcon={<SecurityIcon />}>
            {GetLng(25)}
          </Button>
                                </>
                            )}

                            <SpaceDivider/>
                            <TextBox
                                id='t5'
                                label={GetLng(7)}
                                helperText=""
                                value={konfiguration.pemCrt}
                                   onChange={() => {}}


                            />
                            <SpaceDivider/>
                            <TextBox
                                id='t6'
                                label={GetLng(8)}
                                helperText=""
                                value={konfiguration.pemKey}
                                 onChange={() => {}}


                            />
                        </>
                    )}
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={105} description={505}/>
                    <CheckBox
                        label="Rate Limiter"
                        checked={konfiguration.rateLimiter}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.rateLimiter = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />

                    <SpaceDivider/>
                    {konfiguration.rateLimiter && (
                        <>
                            <SpaceDivider/>
                            <TextBox
                                id='t7'
                                label={GetLng(9)}
                                helperText=""
                                validationType={'number'}
                                value={konfiguration.rate.rate.toString()}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.rate.rate = e.target.valueAsNumber;
                                    setKonfiguration(updatedConf);
                                }}

                            />
                            <SpaceDivider/>
                            <TextBox
                                id='t8'
                                label={GetLng(10)}
                                helperText=""
                                validationType={'number'}
                                value={(konfiguration.rate.window / 1_000_000_000 / 60).toString()}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.rate.window = e.target.valueAsNumber * 1_000_000_000 * 60;
                                    setKonfiguration(updatedConf);
                                }}

                            />
                            <SpaceDivider/>
                            <StringlistEditor
                                validationType={'ip'}
                                notEmpty={true}
                                whitelist={konfiguration.rateWhitelist || []}
                                setWhitelist={updateRateWhitelist}
                                modalcaption={GetLng(11)}
                                caption={'Rate Whitelist'}
                            />
                        </>
                    )}
                </Styledbox>
                <SpaceDivider/>

                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={107} description={507}/>
                    <StringlistEditor
                        validationType={'ip'}
                        notEmpty={true}
                        whitelist={konfiguration.systemWhitelist}
                        setWhitelist={updateSystemWhitelist}
                        modalcaption={GetLng(11)}
                        caption={'Internal Whitelist / Login / Garaphs'}
                    />

                </Styledbox>

                <SpaceDivider/>
                <Styledbox>
                    <DescBox title={106} description={506}/>
                    <CheckBox
                        label="Cors System Default"
                        checked={konfiguration.cors}
                        onChange={(e) => {
                            const updatedConf = {...konfiguration};
                            updatedConf.cors = e.target.checked;
                            setKonfiguration(updatedConf);
                        }}
                    />

                    {konfiguration.cors && (
                        <>
                            <SpaceDivider/>
                            <CheckBox
                                label="Cors Advanced"
                                checked={konfiguration.corsAdvanced}
                                onChange={(e) => {
                                    const updatedConf = {...konfiguration};
                                    updatedConf.corsAdvanced = e.target.checked;
                                    setKonfiguration(updatedConf);
                                }}
                            />
                            <SpaceDivider/>
                            {konfiguration.corsAdvanced && (
                                <>
                                    <SpaceDivider/>
                                    <StyleHR/>
                                    <StringlistEditor
                                        whitelist={konfiguration.corsAllowOrigins}
                                        setWhitelist={updateCorsAllowOrigins}
                                        modalcaption={'AllowOrigin'}
                                        caption={'Allow Origins'}
                                        validationType={''} notEmpty={false}
                                    />
                                    <StyleHR/>
                                    <StringlistEditor
                                        whitelist={konfiguration.corsAllowMethods}
                                        setWhitelist={updateCorsAllowMethods}
                                        modalcaption={'AllowMethod'}
                                        caption={'Allow Methods'} validationType={''} notEmpty={false}/>
                                    <StyleHR/>
                                    <StringlistEditor
                                        whitelist={konfiguration.corsAllowHeaders}
                                        setWhitelist={updateCorsAllowHeaders}
                                        modalcaption={'corsAllowHeader'}
                                        caption={'Allow Headers'}
                                        validationType={''} notEmpty={false}
                                    />
                                </>
                            )}
                        </>
                    )}
                </Styledbox>
                <SpaceDivider/>
                <Styledbox>
                    <Button variant="contained" onClick={HandleSave}>
                        {getLng(30)}
                    </Button>
                </Styledbox>
                <SimpleModal open={open} onClose={handleClose} caption="Hinweis" text={dialog}/>
                <SpaceDivider/>
                <SpaceDivider/>
                <SpaceDivider/>
                <SpaceDivider/>
                <SpaceDivider/>
            </Container>
        );
    }
};

export default KonfigurationsKomponente;
