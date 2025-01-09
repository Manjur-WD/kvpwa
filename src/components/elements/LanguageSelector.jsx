import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { TbLanguage } from "react-icons/tb";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    // Define language list
    const languages = [
        { code: "en", lang: "English" },
        { code: "bn", lang: "বাংলা" },
        { code: "hn", lang: "हिन्दी" },
    ];


    const getLanguageName = (id) => {
        switch (id) {
            case "en":
                return "English"
            case "bn":
                return "বাংলা"
            case "hn":
                return "हिन्दी"
        }
    }

    // Initialize selected language based on the current language set in i18n
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [langDropDown, setLangDropDown] = useState(false);

    // Update selectedLanguage if i18n.language changes (e.g., when language is switched)
    useEffect(() => {
        const languageName = getLanguageName(i18n.language);
        setSelectedLanguage(languageName);
    }, [i18n.language]);

    const handleSelectLanguage = (lang, lang_code) => {
        setSelectedLanguage(lang);
        setLangDropDown(false); // Close the dropdown when a language is selected
        i18n.changeLanguage(lang_code); // Change language in i18next
    };

    const toggleDropdown = () => {
        setLangDropDown(!langDropDown); // Toggle the dropdown visibility
    };

    return (
        <div className="inline-block relative header__language--btn">
            <button
                className="text-white md:me-2 border-e pe-2 cursor-pointer list-none uppercase"
                onClick={toggleDropdown}
            >
                <TbLanguage className="inline-block md:border-none border p-[1px] rounded-lg me-1 text-lightgreen mx-3 md:text-lg text-2xl" />
                <span className="md:inline hidden">{selectedLanguage}</span>
                <IoIosArrowDown className="mx-2 downarrow md:inline hidden" />
            </button>

            {langDropDown && (
                <ul className="header__language--list block absolute shadow-2xl py-2 rounded-lg top-[30px] border border-lightdark text-center bg-whitesmoke z-50">
                    {languages.map((item, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer px-5 py-1 hover:bg-lightdark hover:text-white border-b border-b-lightdark uppercase"
                            onClick={() => handleSelectLanguage(item.lang, item.code)}
                        >
                            {item.lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
