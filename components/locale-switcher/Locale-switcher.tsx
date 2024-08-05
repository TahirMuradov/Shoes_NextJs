'use client';

import { usePathname } from "next/navigation";
import { i18n, Locale } from "../../i18n-config";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SwitcherLaunguage } from "@/types/DictionaryTypes/Dictionary";

interface SwitcherParams{
  lang:Locale,
  dictionary:SwitcherLaunguage
}
export default function LocaleSwitcher(Params:SwitcherParams) {
  const pathName = usePathname(); 
  const router = useRouter(); 

  const redirectedPathName = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    if (!pathName) return;
    const segments = pathName.split("/");
    segments[1] = newLocale;

    console.log(newLocale);

    router.push(segments.join("/"));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LanguageIcon style={{ marginRight: 8 }} />
      <FormControl variant="outlined">
        <InputLabel id="language-select-label">{Params.dictionary.LaunguageChanger}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={pathName.split("/")[1] || i18n.defaultLocale} 
          onChange={redirectedPathName}
         
        >
          {i18n.locales.map((locale) => (
            <MenuItem key={locale} value={locale}>
              {locale}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
