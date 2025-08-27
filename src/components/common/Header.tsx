import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ko') ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

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
    } as React.CSSProperties,
    langButton: {
      color: '#fff',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      border: '1px solid rgba(255, 107, 107, 0.5)',
      borderRadius: '0.5rem',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      background: 'transparent',
      cursor: 'pointer',
      marginRight: '1rem'
    } as React.CSSProperties,
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <header style={headerStyle.container}>
      <div style={headerStyle.content}>
        <a href="#" style={headerStyle.logo}>
          {t('intro.title')}
        </a>
        <div style={headerStyle.rightSection}>
          <button 
            onClick={toggleLanguage}
            style={headerStyle.langButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
              e.currentTarget.style.borderColor = '#ff6b6b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.5)';
            }}
          >
            {t('common.languageButton')}
          </button>
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
      </div>
    </header>
  );
};

export default Header;
