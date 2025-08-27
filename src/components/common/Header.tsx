import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  const headerStyle = {
    container: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 2rem'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      color: '#fff',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    homeButton: {
      color: '#fff',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.5rem',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      background: 'transparent'
    } as React.CSSProperties
  };

  return (
    <header style={headerStyle.container}>
      <div style={headerStyle.content}>
        <a href="#" style={headerStyle.logo}>
          사이코패스 테스트
        </a>
        <a 
          href="https://jybr.me" 
          style={headerStyle.homeButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {t('common.homeButton')}
        </a>
      </div>
    </header>
  );
};

export default Header;
