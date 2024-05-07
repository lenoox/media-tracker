import {useState} from "react";
import {Directory} from "../../models/directory";
import {useTranslation} from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const availableLanguages: Directory[] = [
    { label: "EN", value: "en" },
    { label: "PL", value: "pl" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState<Directory>({
    label: "EN",
    value: "en",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (language: Directory) => {
    if (typeof language?.value !== "string") {
      return;
    }
    setSelectedLanguage(language);
    i18n.changeLanguage(language.value);
    setDropdownOpen(false);
  };
  return (
    <div className="relative inline-block text-left text-stone-900 dark:text-white">
      <div>
        <button
          className="inline-flex w-20 cursor-pointer items-center px-4 py-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedLanguage.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={
              dropdownOpen ? "ml-2 h-4 w-4 rotate-180" : "ml-2 h-4 w-4 rotate-0"
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-20 rounded-md bg-white">
          <div className="py-1">
            {availableLanguages.map((language) => (
              <button
                key={language.label}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleLanguageChange(language)}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
