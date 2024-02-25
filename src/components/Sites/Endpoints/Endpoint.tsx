import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextBoxNormal from '../../Mui/Textbox/TextBoxNormal';
import SpaceDivider from '../../Mui/Tools/Divider';
import Styledbox from '../../Mui/Tools/StyledBox';
import Button from '@mui/material/Button';
import CheckBox from '../../Mui/Checkbox/CheckBox';
import KeyValueEditor from '../../Mui/Modal/KeyValueEditor';
import TextBoxMulti from '../../Mui/Textbox/TextBoxMulti';
import HeaderReplaceEditor from '../../Mui/Modal/HeaderReplaceEditor';
import StringlistEditor from '../../Mui/Modal/StringListEditor';

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
    HeaderExists:{ Header: string; Value: string }[];
    HeaderAdd: { Header: string; Value: string }[];
    JWTPreCheck: boolean;
    JWTData: {
      Header: string;
      Key: string;
      OnlySign: boolean;
      Field: string;
      Match: string[];
    };
    HeaderReplace: { Header: string; Value: string; NewValue: string }[];
  }

interface EndpointProps {
  endpointData: EndpointData;
  onSave: (data: EndpointData) => void;
  basic: boolean;
  onCancel: () => void;
}

const Endpoint: React.FC<EndpointProps> = ({ endpointData, onSave, onCancel,basic }) => {
  const [endpoint, setEndpoint] = useState<EndpointData>(endpointData);

  const updateHeaderRouteMatches = (newList: any) => {
    setEndpoint({ ...endpoint, HeaderRouteMatches: newList });
  };

  const updateHeaderAdd = (newList: any) => {
    setEndpoint({ ...endpoint, HeaderAdd: newList });
  };

  const updateHeaderExists = (newList: any) => {
    setEndpoint({ ...endpoint, HeaderExists: newList });
  };

  const updateHeaderReplace = (newList: any) => {
    setEndpoint({ ...endpoint, HeaderReplace: newList });
  };

  const updateJWTMatch = (newList: any) => {
    const updatedEndpoint = { ...endpoint };
    updatedEndpoint.JWTData.Match = newList;
    setEndpoint(updatedEndpoint);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(endpoint);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>ServicesA</Typography>
      Configuration - [{endpoint.Name}]

      <SpaceDivider />
      {/* ------------ name */}
      <Styledbox>
        <TextBoxNormal
                  label="Endpoint Name"
                  helperText=""
                  value={endpoint.Name}
                  onChange={(e) => setEndpoint({ ...endpoint, Name: e.target.value })}
                  required id={''}        />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Active */}
      <Styledbox>
        <CheckBox
          label="Active"
          checked={endpoint.Active}
          onChange={(e) =>
            setEndpoint({ ...endpoint, Active: e.target.checked })
          }
        />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Endpoint ULR */}
      <Styledbox>
        <TextBoxNormal
                  label="Endpoint URL"
                  helperText="full URL of the endpoint"
                  value={endpoint.Endpoint}
                  onChange={(e) => setEndpoint({ ...endpoint, Endpoint: e.target.value })}
                  required id={''}        />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Override Timeout */}
      <Styledbox>
        <TextBoxNormal
                  label="Override Timeout (5sec)"
                  helperText="0 = no override"
                  value={endpoint.OverrideTimeout.toString()}
                  onChange={(e) => setEndpoint({ ...endpoint, OverrideTimeout: parseInt(e.target.value)})}
                  required id={''}        />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Header match */}
      
      {!basic && (
        <Styledbox>
          <KeyValueEditor list={endpoint.HeaderRouteMatches} setList={updateHeaderRouteMatches} modalCaption={'Add Header match'} caption={'Header Routing match'} />
        </Styledbox>
      )}
    
      {/* ------------ VerifySSL */}
      <Styledbox>
        <KeyValueEditor list={endpoint.HeaderAdd} setList={updateHeaderAdd} modalCaption={'Add Header'} caption={'Header Add'} />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Header Exists */}
      <Styledbox>
        <KeyValueEditor list={endpoint.HeaderExists} setList={updateHeaderExists} modalCaption={'Add Must Exist Header'} caption={'Must Exist Header'} />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ Header Replace */}
      <Styledbox>
        <HeaderReplaceEditor list={endpoint.HeaderReplace} setList={updateHeaderReplace} modalCaption={'Header value replace'} caption={'Header value replace'} />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ VerifySSL */}
      <Styledbox>
        <CheckBox
          label="Verify endpoint SSL certificate"
          checked={endpoint.VerifySSL}
          onChange={(e) =>
            setEndpoint({ ...endpoint, VerifySSL: e.target.checked })
          }
        />
      </Styledbox>
      <SpaceDivider />
      {/* ------------ CertAuth */}
      <Styledbox>
        <CheckBox
          label="CertAuth"
          checked={endpoint.CertAuth}
          onChange={(e) => {
            const updatedEndpoint = { ...endpoint };
            updatedEndpoint.CertAuth = e.target.checked;
            setEndpoint(updatedEndpoint);
          }}
        /><SpaceDivider />
        {endpoint.CertAuth && (
          <>
            <SpaceDivider />
            <TextBoxMulti
              label="CertPem"
              helperText="Certificate"
              rows={4}
              value={endpoint.Certs.CertPEM}
              onChange={(e) => {
                const updatedEndpoint = { ...endpoint };
                updatedEndpoint.Certs.CertPEM = e.target.value;
                setEndpoint(updatedEndpoint);
              }}
            />
            <SpaceDivider />
            <TextBoxMulti
              label="CertKey"
              helperText="Certificate"
              rows={4}
              value={endpoint.Certs.CertKEY}
              onChange={(e) => {
                const updatedEndpoint = { ...endpoint };
                updatedEndpoint.Certs.CertKEY = e.target.value;
                setEndpoint(updatedEndpoint);
              }}
            />
          </>
        )}
      </Styledbox>
      <SpaceDivider />
      {/* ------------ JWT PreCheck */}
      <Styledbox>
        <CheckBox
          label="JWT PreCheck"
          checked={endpoint.JWTPreCheck}
          onChange={(e) => {
            const updatedEndpoint = { ...endpoint };
            updatedEndpoint.JWTPreCheck = e.target.checked;
            setEndpoint(updatedEndpoint);
          }}
        /><SpaceDivider />
        {endpoint.JWTPreCheck && (
          <>
            <TextBoxNormal
                          label="Header"
                          helperText="Header key"
                          value={endpoint.JWTData.Header}
                          onChange={(e) => {
                              const updatedEndpoint = { ...endpoint };
                              updatedEndpoint.JWTData.Header = e.target.value;
                              setEndpoint(updatedEndpoint);
                          } } id={''}            />
            <SpaceDivider />
            <TextBoxNormal
                          label="JWT Sign Key"
                          helperText="JWT Sign Key"
                          value={endpoint.JWTData.Key}
                          onChange={(e) => {
                              const updatedEndpoint = { ...endpoint };
                              updatedEndpoint.JWTData.Key = e.target.value;
                              setEndpoint(updatedEndpoint);
                          } } id={''}            />
            <SpaceDivider />
            <CheckBox
              label="JWT check only sign"
              checked={endpoint.JWTData.OnlySign}
              onChange={(e) => {
                const updatedEndpoint = { ...endpoint };
                updatedEndpoint.JWTData.OnlySign = e.target.checked;
                setEndpoint(updatedEndpoint);
              }}
            /><SpaceDivider />
            {!endpoint.JWTData.OnlySign && (
              <>
                <TextBoxNormal
                                  label="JWT field"
                                  helperText="JWT field"
                                  value={endpoint.JWTData.Field}
                                  onChange={(e) => {
                                      const updatedEndpoint = { ...endpoint };
                                      updatedEndpoint.JWTData.Field = e.target.value;
                                      setEndpoint(updatedEndpoint);
                                  } } id={''}                />
                <SpaceDivider />
                <StringlistEditor whitelist={endpoint.JWTData.Match || []} setWhitelist={updateJWTMatch} modalcaption={'JWT field match'} caption={'JWT field match'} validationType={''} notEmpty={false} />
              </>
            )}
          </>
        )}
      </Styledbox>
      <SpaceDivider />
      {/* ------------ CertAuth */}
      <Styledbox>
        <Button variant="outlined" onClick={onCancel} color="primary">
          Abbrechen
        </Button>
        <Button variant="outlined" onClick={handleSubmit} color="primary">
          Speichern
        </Button>
      </Styledbox>
      <SpaceDivider />
      <SpaceDivider />
      <SpaceDivider />
      <SpaceDivider />
      <SpaceDivider />
    </>
  );
};

export default Endpoint;
