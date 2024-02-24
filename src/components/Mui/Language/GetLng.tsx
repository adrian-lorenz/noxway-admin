import texts from './Translations';

const GetLng = (key: number): string => {
  const language: string = localStorage.getItem('language') || 'en';
  const text: string | undefined = texts[language]?.[key];
  return text || `Text not found for key ${key}`;
};

export default GetLng;
