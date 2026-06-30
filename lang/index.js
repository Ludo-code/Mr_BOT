import frPermissions from "./fr/permissions.js";
import enPermissions from "./en/permissions.js";
import frMessages from "./fr/messages.js";
import enMessages from "./en/messages.js";

const TRANSLATIONS = {
    fr: {
        permissions: frPermissions,
        messages: frMessages,
    },
    en: {
        permissions: enPermissions,
        messages: enMessages,
    }
};

export function getTranslations(lang = "fr") {
    return TRANSLATIONS[lang] || TRANSLATIONS.fr;
}
