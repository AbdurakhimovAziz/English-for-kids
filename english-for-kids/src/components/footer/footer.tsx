import * as React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__body">
          <a className="github" href="https://github.com/AbdurakhimovAziz" target="_blank" rel="noopener noreferrer">
            abdurakhimovaziz
          </a>
          <a className="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
            <span className="rss-year">`21</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
