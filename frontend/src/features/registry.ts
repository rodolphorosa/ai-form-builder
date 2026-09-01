import React from "react"
import { InputType, Item } from "../types/form"
import PhoneInput from "./inputs/phone"
import { CheckboxInput } from "./inputs/checkbox"
import { DateInput } from "./inputs/date"
import { DatetimeInput } from "./inputs/datetime"
import { NumberInput } from "./inputs/number"
import { RadioInput } from "./inputs/radio"
import { SelectInput } from "./inputs/select"
import { TextInput } from "./inputs/text"
import { TextareaInput } from "./inputs/textarea"
import { RatingInput } from "./inputs/rating"
import { FileInput } from "./inputs/file"

import { 
    Calendar, 
    CalendarClock, 
    CircleDot, 
    Container, 
    Hash, 
    Link, 
    List, 
    Lock, 
    Mail, 
    Phone, 
    SquareCheck, 
    Star, 
    Text, 
    TextAlignStart, 
    TextInitial, 
    Type, 
    File as FileIcon, 
    FileUp} from "lucide-react"
import { InputProps, State } from "../types/inputs"



export const itemStrategies: Record<InputType, React.ComponentType<InputProps>> = {
    text: TextInput,
    email: TextInput,
    password: TextInput,
    phone: PhoneInput,
    url: TextInput,
    textarea: TextareaInput,
    number: NumberInput,
    date: DateInput,
    datetime: DatetimeInput,
    select: SelectInput,
    radio: RadioInput,
    checkbox: CheckboxInput,
    rating: RatingInput,
    file: FileInput
}

export const strategyIcons: Record<InputType, React.ComponentType> = {
    text: Type,
    email: Mail,
    password: Lock,
    phone: Phone,
    url: Link,
    textarea: TextAlignStart,
    number: Hash,
    date: Calendar,
    datetime: CalendarClock,
    select: List,
    radio: CircleDot,
    checkbox: SquareCheck,
    rating: Star,
    file: FileUp,
}

export const typesNames: Record<InputType, string> = {
    text: "Text",
    email: "E-mail",
    password: "Password",
    phone: "Phone",
    url: "Link",
    textarea: "Textarea",
    number: "Number",
    date: "Date Picker",
    datetime: "DateTime Picker",
    select: "Select",
    radio: "Radio",
    checkbox: "Checkbox",
    rating: "Rating",
    file: "File"
}

export const operations: Record<string, string> = {
    // Equality
    EQUALS: "equals",
    NOT_EQUALS: "not_equals",

    // Comparison
    GREATER_THAN: "greater_than",
    GREATER_THAN_OR_EQUALS: "greater_than_or_equals",
    LESS_THAN: "less_than",
    LESS_THAN_OR_EQUALS: "less_than_or_equals",
    BETWEEN: "between",

    // Text
    CONTAINS: "contains",
    NOT_CONTAINS: "not_contains",
    STARTS_WITH: "starts_with",
    ENDS_WITH: "ends_with",

    // Collections (MultiSelect, arrays, etc.)
    INCLUDES: "includes",
    NOT_INCLUDES: "not_includes",

    // Nullability
    IS_EMPTY: "is_empty",
    IS_NOT_EMPTY: "is_not_empty",
}

export const operationsNames: Record<string, string> = {
    equals: "is",
    not_equals: "is not",

    greater_than: "is greater than",
    greater_than_or_equals: "is greater than or equal to",
    less_than: "is less than",
    less_than_or_equals: "is less than or equal to",
    between: "is between",

    contains: "contains",
    not_contains: "does not contain",
    starts_with: "starts with",
    ends_with: "ends with",

    includes: "includes",
    not_includes: "does not include",

    is_empty: "is empty",
    is_not_empty: "is not empty",
}

export const itemStates: Record<State, string> = {
    "visible": "Visible state",
    "required": "Required state",
    "disabled": "Disabled state",
}

export const REGEX = {
  // Email
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // URL (http ou https)
  URL: /^https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*$/i,

  // CEP
  CEP: /^\d{5}-?\d{3}$/,

  // CPF (formato)
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,

  // CNPJ (formato)
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/,

  // CPF ou CNPJ
  CPF_CNPJ: /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,

  // Telefone brasileiro
  PHONE_BR: /^(?:\+55\s?)?(?:\(?\d{2}\)?[\s-]?)?(?:9\d{4}|\d{4})-?\d{4}$/,

  // Apenas números
  NUMBERS: /^\d+$/,

  // Apenas letras (incluindo acentos)
  LETTERS: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,

  // Letras e números
  ALPHANUMERIC: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,

  // Apenas letras maiúsculas
  UPPERCASE: /^[A-ZÀ-ÖØ-Þ\s]+$/,

  // Apenas letras minúsculas
  LOWERCASE: /^[a-zà-öø-ÿ\s]+$/,

  // Slug
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // IPv4
  IPV4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,

  // IPv6 (simplificado)
  IPV6: /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|::)$/,

  // Cor hexadecimal
  HEX_COLOR: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

  // Hora (24h)
  TIME_24H: /^(?:[01]\d|2[0-3]):[0-5]\d$/,

  // Data (dd/mm/yyyy)
  DATE_BR: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,

  // Ano (1900-2099)
  YEAR: /^(19|20)\d{2}$/,

  // Senha forte
  STRONG_PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/,

  // Nome de usuário
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // Domínio
  DOMAIN: /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/,

  // MAC Address
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,

  // Base64
  BASE64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
}

export const propertyNames: Record<string, string> = {
    title: "title",
    label: "label",
    type:  "type",
    description: "description",
    placeholder: "placeholder",
    helpText: "help text",
    required: "required",
    disabled: "disabled",
    minValue: "minimum value",
    maxValue: "maximum value",
    minLength: "minimum length",
    maxLength: "maximum length",
    regex: "regex",
    validation: "validation",
    options: "options"
}

export type Country = {
    code: string
    name: string
    dialCode: string
}
  
export const countries: Country[] = [
    { code: "AF", name: "Afghanistan", dialCode: "+93" },
    { code: "ZA", name: "South Africa", dialCode: "+27" },
    { code: "AL", name: "Albania", dialCode: "+355" },
    { code: "DE", name: "Germany", dialCode: "+49" },
    { code: "AD", name: "Andorra", dialCode: "+376" },
    { code: "AO", name: "Angola", dialCode: "+244" },
    { code: "AI", name: "Anguilla", dialCode: "+1" },
    { code: "AG", name: "Antigua and Barbuda", dialCode: "+1" },
    { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
    { code: "DZ", name: "Algeria", dialCode: "+213" },
    { code: "AR", name: "Argentina", dialCode: "+54" },
    { code: "AM", name: "Armenia", dialCode: "+374" },
    { code: "AW", name: "Aruba", dialCode: "+297" },
    { code: "AU", name: "Australia", dialCode: "+61" },
    { code: "AT", name: "Austria", dialCode: "+43" },
    { code: "AZ", name: "Azerbaijan", dialCode: "+994" },
    { code: "BS", name: "Bahamas", dialCode: "+1" },
    { code: "BH", name: "Bahrain", dialCode: "+973" },
    { code: "BD", name: "Bangladesh", dialCode: "+880" },
    { code: "BB", name: "Barbados", dialCode: "+1" },
    { code: "BE", name: "Belgium", dialCode: "+32" },
    { code: "BZ", name: "Belize", dialCode: "+501" },
    { code: "BJ", name: "Benin", dialCode: "+229" },
    { code: "BM", name: "Bermuda", dialCode: "+1" },
    { code: "BY", name: "Belarus", dialCode: "+375" },
    { code: "BO", name: "Bolivia", dialCode: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
    { code: "BW", name: "Botswana", dialCode: "+267" },
    { code: "BR", name: "Brazil", dialCode: "+55" },
    { code: "BN", name: "Brunei", dialCode: "+673" },
    { code: "BG", name: "Bulgaria", dialCode: "+359" },
    { code: "BF", name: "Burkina Faso", dialCode: "+226" },
    { code: "BI", name: "Burundi", dialCode: "+257" },
    { code: "BT", name: "Bhutan", dialCode: "+975" },
    { code: "CV", name: "Cape Verde", dialCode: "+238" },
    { code: "CM", name: "Cameroon", dialCode: "+237" },
    { code: "KH", name: "Cambodia", dialCode: "+855" },
    { code: "CA", name: "Canada", dialCode: "+1" },
    { code: "QA", name: "Qatar", dialCode: "+974" },
    { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
    { code: "TD", name: "Chad", dialCode: "+235" },
    { code: "CL", name: "Chile", dialCode: "+56" },
    { code: "CN", name: "China", dialCode: "+86" },
    { code: "CY", name: "Cyprus", dialCode: "+357" },
    { code: "CO", name: "Colombia", dialCode: "+57" },
    { code: "KM", name: "Comoros", dialCode: "+269" },
    { code: "CG", name: "Congo", dialCode: "+242" },
    { code: "CD", name: "Democratic Republic of the Congo", dialCode: "+243" },
    { code: "KR", name: "South Korea", dialCode: "+82" },
    { code: "CR", name: "Costa Rica", dialCode: "+506" },
    { code: "CI", name: "Ivory Coast", dialCode: "+225" },
    { code: "HR", name: "Croatia", dialCode: "+385" },
    { code: "CU", name: "Cuba", dialCode: "+53" },
    { code: "CW", name: "Curaçao", dialCode: "+599" },
    { code: "DK", name: "Denmark", dialCode: "+45" },
    { code: "DJ", name: "Djibouti", dialCode: "+253" },
    { code: "DM", name: "Dominica", dialCode: "+1" },
    { code: "EG", name: "Egypt", dialCode: "+20" },
    { code: "SV", name: "El Salvador", dialCode: "+503" },
    { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
    { code: "EC", name: "Ecuador", dialCode: "+593" },
    { code: "ER", name: "Eritrea", dialCode: "+291" },
    { code: "SK", name: "Slovakia", dialCode: "+421" },
    { code: "SI", name: "Slovenia", dialCode: "+386" },
    { code: "ES", name: "Spain", dialCode: "+34" },
    { code: "US", name: "United States", dialCode: "+1" },
    { code: "EE", name: "Estonia", dialCode: "+372" },
    { code: "SZ", name: "Eswatini", dialCode: "+268" },
    { code: "ET", name: "Ethiopia", dialCode: "+251" },
    { code: "FJ", name: "Fiji", dialCode: "+679" },
    { code: "PH", name: "Philippines", dialCode: "+63" },
    { code: "FI", name: "Finland", dialCode: "+358" },
    { code: "FR", name: "France", dialCode: "+33" },
    { code: "GA", name: "Gabon", dialCode: "+241" },
    { code: "GM", name: "Gambia", dialCode: "+220" },
    { code: "GH", name: "Ghana", dialCode: "+233" },
    { code: "GE", name: "Georgia", dialCode: "+995" },
    { code: "GI", name: "Gibraltar", dialCode: "+350" },
    { code: "GD", name: "Grenada", dialCode: "+1" },
    { code: "GR", name: "Greece", dialCode: "+30" },
    { code: "GL", name: "Greenland", dialCode: "+299" },
    { code: "GP", name: "Guadeloupe", dialCode: "+590" },
    { code: "GU", name: "Guam", dialCode: "+1" },
    { code: "GT", name: "Guatemala", dialCode: "+502" },
    { code: "GY", name: "Guyana", dialCode: "+592" },
    { code: "GF", name: "French Guiana", dialCode: "+594" },
    { code: "GN", name: "Guinea", dialCode: "+224" },
    { code: "GW", name: "Guinea-Bissau", dialCode: "+245" },
    { code: "GQ", name: "Equatorial Guinea", dialCode: "+240" },
    { code: "HT", name: "Haiti", dialCode: "+509" },
    { code: "HN", name: "Honduras", dialCode: "+504" },
    { code: "HK", name: "Hong Kong", dialCode: "+852" },
    { code: "HU", name: "Hungary", dialCode: "+36" },
    { code: "YE", name: "Yemen", dialCode: "+967" },
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "ID", name: "Indonesia", dialCode: "+62" },
    { code: "IQ", name: "Iraq", dialCode: "+964" },
    { code: "IE", name: "Ireland", dialCode: "+353" },
    { code: "IS", name: "Iceland", dialCode: "+354" },
    { code: "IL", name: "Israel", dialCode: "+972" },
    { code: "IT", name: "Italy", dialCode: "+39" },
    { code: "JM", name: "Jamaica", dialCode: "+1" },
    { code: "JP", name: "Japan", dialCode: "+81" },
    { code: "JO", name: "Jordan", dialCode: "+962" },
    { code: "KW", name: "Kuwait", dialCode: "+965" },
    { code: "LA", name: "Laos", dialCode: "+856" },
    { code: "LV", name: "Latvia", dialCode: "+371" },
    { code: "LB", name: "Lebanon", dialCode: "+961" },
    { code: "LS", name: "Lesotho", dialCode: "+266" },
    { code: "LR", name: "Liberia", dialCode: "+231" },
    { code: "LY", name: "Libya", dialCode: "+218" },
    { code: "LI", name: "Liechtenstein", dialCode: "+423" },
    { code: "LT", name: "Lithuania", dialCode: "+370" },
    { code: "LU", name: "Luxembourg", dialCode: "+352" },
    { code: "MO", name: "Macau", dialCode: "+853" },
    { code: "MG", name: "Madagascar", dialCode: "+261" },
    { code: "MY", name: "Malaysia", dialCode: "+60" },
    { code: "MW", name: "Malawi", dialCode: "+265" },
    { code: "MV", name: "Maldives", dialCode: "+960" },
    { code: "ML", name: "Mali", dialCode: "+223" },
    { code: "MT", name: "Malta", dialCode: "+356" },
    { code: "MA", name: "Morocco", dialCode: "+212" },
    { code: "MQ", name: "Martinique", dialCode: "+596" },
    { code: "MU", name: "Mauritius", dialCode: "+230" },
    { code: "MR", name: "Mauritania", dialCode: "+222" },
    { code: "YT", name: "Mayotte", dialCode: "+262" },
    { code: "MX", name: "Mexico", dialCode: "+52" },
    { code: "FM", name: "Micronesia", dialCode: "+691" },
    { code: "MZ", name: "Mozambique", dialCode: "+258" },
    { code: "MD", name: "Moldova", dialCode: "+373" },
    { code: "MC", name: "Monaco", dialCode: "+377" },
    { code: "MN", name: "Mongolia", dialCode: "+976" },
    { code: "ME", name: "Montenegro", dialCode: "+382" },
    { code: "MS", name: "Montserrat", dialCode: "+1" },
    { code: "NA", name: "Namibia", dialCode: "+264" },
    { code: "NR", name: "Nauru", dialCode: "+674" },
    { code: "NP", name: "Nepal", dialCode: "+977" },
    { code: "NI", name: "Nicaragua", dialCode: "+505" },
    { code: "NE", name: "Niger", dialCode: "+227" },
    { code: "NG", name: "Nigeria", dialCode: "+234" },
    { code: "NU", name: "Niue", dialCode: "+683" },
    { code: "NO", name: "Norway", dialCode: "+47" },
    { code: "NC", name: "New Caledonia", dialCode: "+687" },
    { code: "NZ", name: "New Zealand", dialCode: "+64" },
    { code: "OM", name: "Oman", dialCode: "+968" },
    { code: "NL", name: "Netherlands", dialCode: "+31" },
    { code: "PW", name: "Palau", dialCode: "+680" },
    { code: "PS", name: "Palestine", dialCode: "+970" },
    { code: "PA", name: "Panama", dialCode: "+507" },
    { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
    { code: "PK", name: "Pakistan", dialCode: "+92" },
    { code: "PY", name: "Paraguay", dialCode: "+595" },
    { code: "PE", name: "Peru", dialCode: "+51" },
    { code: "PF", name: "French Polynesia", dialCode: "+689" },
    { code: "PL", name: "Poland", dialCode: "+48" },
    { code: "PR", name: "Puerto Rico", dialCode: "+1" },
    { code: "PT", name: "Portugal", dialCode: "+351" },
    { code: "KE", name: "Kenya", dialCode: "+254" },
    { code: "KG", name: "Kyrgyzstan", dialCode: "+996" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "CF", name: "Central African Republic", dialCode: "+236" },
    { code: "CZ", name: "Czech Republic", dialCode: "+420" },
    { code: "DO", name: "Dominican Republic", dialCode: "+1" },
    { code: "RE", name: "Réunion", dialCode: "+262" },
    { code: "RO", name: "Romania", dialCode: "+40" },
    { code: "RW", name: "Rwanda", dialCode: "+250" },
    { code: "RU", name: "Russia", dialCode: "+7" },
    { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1" },
    { code: "LC", name: "Saint Lucia", dialCode: "+1" },
    { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1" },
    { code: "SM", name: "San Marino", dialCode: "+378" },
    { code: "ST", name: "São Tomé and Príncipe", dialCode: "+239" },
    { code: "SN", name: "Senegal", dialCode: "+221" },
    { code: "SL", name: "Sierra Leone", dialCode: "+232" },
    { code: "SC", name: "Seychelles", dialCode: "+248" },
    { code: "SG", name: "Singapore", dialCode: "+65" },
    { code: "SY", name: "Syria", dialCode: "+963" },
    { code: "SO", name: "Somalia", dialCode: "+252" },
    { code: "LK", name: "Sri Lanka", dialCode: "+94" },
    { code: "SD", name: "Sudan", dialCode: "+249" },
    { code: "SS", name: "South Sudan", dialCode: "+211" },
    { code: "SE", name: "Sweden", dialCode: "+46" },
    { code: "CH", name: "Switzerland", dialCode: "+41" },
    { code: "SR", name: "Suriname", dialCode: "+597" },
    { code: "TJ", name: "Tajikistan", dialCode: "+992" },
    { code: "TH", name: "Thailand", dialCode: "+66" },
    { code: "TW", name: "Taiwan", dialCode: "+886" },
    { code: "TZ", name: "Tanzania", dialCode: "+255" },
    { code: "TL", name: "Timor-Leste", dialCode: "+670" },
    { code: "TG", name: "Togo", dialCode: "+228" },
    { code: "TO", name: "Tonga", dialCode: "+676" },
    { code: "TT", name: "Trinidad and Tobago", dialCode: "+1" },
    { code: "TN", name: "Tunisia", dialCode: "+216" },
    { code: "TR", name: "Turkey", dialCode: "+90" },
    { code: "TM", name: "Turkmenistan", dialCode: "+993" },
    { code: "TC", name: "Turks and Caicos Islands", dialCode: "+1" },
    { code: "TV", name: "Tuvalu", dialCode: "+688" },
    { code: "UG", name: "Uganda", dialCode: "+256" },
    { code: "UA", name: "Ukraine", dialCode: "+380" },
    { code: "UY", name: "Uruguay", dialCode: "+598" },
    { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
    { code: "VU", name: "Vanuatu", dialCode: "+678" },
    { code: "VA", name: "Vatican City", dialCode: "+39" },
    { code: "VE", name: "Venezuela", dialCode: "+58" },
    { code: "VN", name: "Vietnam", dialCode: "+84" },
    { code: "VG", name: "British Virgin Islands", dialCode: "+1" },
    { code: "VI", name: "U.S. Virgin Islands", dialCode: "+1" },
    { code: "WF", name: "Wallis and Futuna", dialCode: "+681" },
    { code: "ZM", name: "Zambia", dialCode: "+260" },
    { code: "ZW", name: "Zimbabwe", dialCode: "+263" },
]