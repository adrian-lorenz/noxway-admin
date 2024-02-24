import { CSSProperties } from 'react';
import './Footer.css';
import GitHub from '@mui/icons-material/GitHub';

function Footer() {
  const footerStyle: CSSProperties = {
    float: 'left',
  };

  const linkStyle: CSSProperties = {
    float: 'right',
  };

  return (
    <footer className="footer">
      <span style={footerStyle}>noxway is an Open Source API Gateway project | Made in Germany</span>
      <span style={linkStyle}><a href='https://github.com/adrian-lorenz/noxway'><GitHub /></a></span>
    </footer>
  );
}

export default Footer;
