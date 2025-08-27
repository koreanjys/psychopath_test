import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const footerStyle = {
    container: {
      padding: '2rem',
      textAlign: 'center' as const,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(0, 0, 0, 0.8)'
    },
    text: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9rem',
      margin: 0
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  return (
    <footer style={footerStyle.container}>
      <p style={footerStyle.text}>
        <a href="https://jybr.me" style={footerStyle.link}>
          {t('common.footer')}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
