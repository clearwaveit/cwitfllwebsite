import type { ContactFormFieldConfig } from "@/app/components/ui/ContactForm";

export const DEFAULT_CONTACT_SUBMIT_BUTTON_TEXT = "";
export const DEFAULT_CONTACT_SUCCESS_MESSAGE = "";

export function trimString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function parseBooleanLike(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value !== "string") return undefined;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (["1", "true", "yes", "on", "show", "enabled"].includes(normalized)) return true;
  if (["0", "false", "no", "off", "hide", "disabled"].includes(normalized)) return false;
  return undefined;
}

export function parseNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getSettingString(
  settings: Record<string, unknown> | undefined,
  keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = trimString(settings?.[key]);
    if (value) return value;
  }
  return undefined;
}

function getSettingBoolean(
  settings: Record<string, unknown> | undefined,
  keys: string[]
): boolean | undefined {
  for (const key of keys) {
    const value = parseBooleanLike(settings?.[key]);
    if (typeof value === "boolean") return value;
  }
  return undefined;
}

type ContactFieldTemplate = {
  name: ContactFormFieldConfig["name"];
  defaultPlaceholder: string;
  defaultRequired: boolean;
  alwaysVisible?: boolean;
  placeholderKeys: string[];
  visibleKeys: string[];
  requiredKeys: string[];
};

const CONTACT_FIELD_TEMPLATES: ContactFieldTemplate[] = [
  {
    name: "fullName",
    defaultPlaceholder: "Tell us your name!",
    defaultRequired: true,
    alwaysVisible: true,
    placeholderKeys: ["fullNamePlaceholder", "namePlaceholder"],
    visibleKeys: ["showFullNameField", "showNameField", "enableFullNameField", "enableNameField"],
    requiredKeys: ["fullNameRequired", "nameRequired"],
  },
  {
    name: "email",
    defaultPlaceholder: "Your email",
    defaultRequired: true,
    alwaysVisible: true,
    placeholderKeys: ["emailPlaceholder"],
    visibleKeys: ["showEmailField", "enableEmailField"],
    requiredKeys: ["emailRequired"],
  },
  {
    name: "phone",
    defaultPlaceholder: "Your phone",
    defaultRequired: false,
    placeholderKeys: ["phonePlaceholder"],
    visibleKeys: ["showPhoneField", "enablePhoneField"],
    requiredKeys: ["phoneRequired"],
  },
  {
    name: "company",
    defaultPlaceholder: "Your Company",
    defaultRequired: true,
    placeholderKeys: ["companyPlaceholder"],
    visibleKeys: ["showCompanyField", "enableCompanyField"],
    requiredKeys: ["companyRequired"],
  },
  {
    name: "message",
    defaultPlaceholder: "What is your requirement?",
    defaultRequired: true,
    alwaysVisible: true,
    placeholderKeys: ["messagePlaceholder", "descriptionPlaceholder"],
    visibleKeys: ["showMessageField", "showDescriptionField", "enableMessageField", "enableDescriptionField"],
    requiredKeys: ["messageRequired", "descriptionRequired"],
  },
];

export const DEFAULT_CONTACT_FORM_FIELDS: ContactFormFieldConfig[] =
  CONTACT_FIELD_TEMPLATES.map((field) => ({
    name: field.name,
    placeholder: field.defaultPlaceholder,
    required: field.defaultRequired,
  }));

export function buildContactFormFields(
  settings: Record<string, unknown> | undefined
): ContactFormFieldConfig[] {
  if (!settings) return [];

  return CONTACT_FIELD_TEMPLATES.filter((field) => {
    const placeholder = getSettingString(settings, field.placeholderKeys);
    const explicitVisibility = getSettingBoolean(settings, field.visibleKeys);
    if (explicitVisibility === false) return false;
    return explicitVisibility === true || !!placeholder;
  }).map((field) => ({
    name: field.name,
    placeholder: getSettingString(settings, field.placeholderKeys) || "",
    required: getSettingBoolean(settings, field.requiredKeys) ?? false,
  }));
}
