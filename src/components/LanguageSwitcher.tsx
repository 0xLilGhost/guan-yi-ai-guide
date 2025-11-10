import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-all"
        >
          <Languages className="h-5 w-5 text-accent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-border/50">
        <DropdownMenuItem
          onClick={() => changeLanguage('zh')}
          className={`cursor-pointer ${
            i18n.language === 'zh' ? 'bg-accent/10 text-accent' : ''
          }`}
        >
          <span className="mr-2">🇨🇳</span>
          中文
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer ${
            i18n.language === 'en' ? 'bg-accent/10 text-accent' : ''
          }`}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
