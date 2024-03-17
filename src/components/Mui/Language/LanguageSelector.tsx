import React, { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Define the component using TypeScript
const LanguageSelector: React.FC = () => {
  // Use useState with TypeScript generic to define the type of the state
  const [language, setLanguage] = useState<string>('en'); // Default value is 'en'

  useEffect(() => {
    // Attempt to retrieve the stored language from localStorage or default based on the browser language
    const storedLanguage = localStorage.getItem('language') || (navigator.language.startsWith('de') ? 'de' : 'en');
    setLanguage(storedLanguage);
  }, []);

  // Correctly type the event parameter for TypeScript
  const handleChange = (event: any) => {
    const newLanguage = event.target.value as string; // Type assertion for the new language value
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-selector-label">Language</InputLabel>
      <Select
        labelId="language-selector-label"
        id="language-selector"
        value={language}
        label="Sprache"
        onChange={handleChange}
      >
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
