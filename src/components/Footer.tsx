import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="relative border-t border-border/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-accent">
            观易
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md">
            {t('footer.tagline')}
            <br />
            <span className="text-sm opacity-70">
              {t('footer.taglineEn')}
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            <div className="text-accent text-xl">✦</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground/60">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
