/**
 * RFC 5321 / RFC 5322 / RFC 6531 (EAI) syntax validation for email addresses.
 *
 * Scope: pure syntax validation only. DNS/MX existence checks are impossible
 * from browser JavaScript (no DNS access) and are intentionally out of scope.
 *
 * Intentionally NOT supported (obsolete/rare RFC 5322 syntax):
 * - Quoted-string local-parts, e.g. "john doe"@example.com
 * - Comments, e.g. john(comment)@example.com
 * - Full "mailbox" grammar (display-name <addr-spec>) — only addr-spec is validated
 *
 * IPv6 literal validation covers the common cases (RFC 4291 text
 * representation, at most one "::" compression, optional trailing embedded
 * IPv4) but is a pragmatic approximation, not the full formal grammar.
 *
 * Domain internationalization (EAI) is approximated as
 * "Letter / Mark / Number / Connector-Punctuation" Unicode categories per
 * label — this is not full IDNA2008 context-rule compliance.
 */

export interface EmailValidationRule {
  id: string;
  description: string;
  test: (email: string) => boolean;
}

interface ParsedAddress {
  localPart: string;
  domain: string;
}

const byteLength = (value: string): number => new TextEncoder().encode(value).length;

const CONTROL_CHARS = /[\x00-\x1F\x7F]/;
const ASCII_LOCAL_CHARS = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
const NON_ASCII = /[^\x00-\x7F]/;
const DISALLOWED_EAI_LOCAL_CATEGORIES = /[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Zs}\p{Zl}\p{Zp}]/u;
const ASCII_LABEL_CHARS = /^[A-Za-z0-9-]+$/;
const UNICODE_LABEL_CHARS = /^[\p{L}\p{M}\p{N}\p{Pc}-]+$/u;
const HEX_GROUP = /^[0-9a-fA-F]{1,4}$/;

function splitAtSign(email: string): ParsedAddress | null {
  const atCount = (email.match(/@/g) ?? []).length;
  if (atCount !== 1) {
    return null;
  }
  const index = email.indexOf('@');
  return { localPart: email.slice(0, index), domain: email.slice(index + 1) };
}

function isAddressLiteral(domain: string): boolean {
  return domain.startsWith('[') && domain.endsWith(']') && domain.length >= 2;
}

function literalContent(domain: string): string {
  return domain.slice(1, -1);
}

function domainLabels(domain: string): string[] {
  return domain.split('.');
}

function getIPv4Octets(text: string): string[] | null {
  const parts = text.split('.');
  return parts.length === 4 ? parts : null;
}

function isValidOctet(octet: string | undefined): boolean {
  if (octet === undefined || !/^\d{1,3}$/.test(octet)) return false;
  if (octet.length > 1 && octet.startsWith('0')) return false;
  return Number(octet) <= 255;
}

function validateIPv4(text: string): boolean {
  const octets = getIPv4Octets(text);
  return octets !== null && octets.every(isValidOctet);
}

/** Everything after the "IPv6:" tag, or null if the tag is missing/empty. */
function ipv6Body(text: string): string | null {
  const lower = text.toLowerCase();
  if (!lower.startsWith('ipv6:')) return null;
  const body = text.slice(5);
  return body.length > 0 ? body : null;
}

function ipv6TrailingIPv4(body: string): { hexPart: string; ipv4Slots: number } {
  if (/(\d{1,3}\.){3}\d{1,3}$/.test(body)) {
    const lastColon = body.lastIndexOf(':');
    if (lastColon !== -1 && validateIPv4(body.slice(lastColon + 1))) {
      return { hexPart: body.slice(0, lastColon), ipv4Slots: 2 };
    }
  }
  return { hexPart: body, ipv4Slots: 0 };
}

function ipv6Groups(body: string): string[] {
  const { hexPart, ipv4Slots } = ipv6TrailingIPv4(body);
  if (hexPart.includes('::')) {
    const [left, right] = hexPart.split('::');
    const leftGroups = left.length ? left.split(':') : [];
    const rightGroups = right.length ? right.split(':') : [];
    return [...leftGroups, ...rightGroups, ...Array(ipv4Slots).fill('0')];
  }
  return [...hexPart.split(':'), ...Array(ipv4Slots).fill('0')];
}

function isValidAsciiLabel(label: string): boolean {
  return label.length >= 1 && label.length <= 63 && ASCII_LABEL_CHARS.test(label);
}

function isValidUnicodeLabel(label: string): boolean {
  return label.length >= 1 && label.length <= 63 && UNICODE_LABEL_CHARS.test(label);
}

/**
 * Domain labels for hostname-only rules. Returns null when the rule doesn't
 * apply at all (no domain, or it's an IP address-literal) — callers must
 * treat null as "rule passes", not as an empty domain.
 */
function domainLabelsOrNull(email: string): string[] | null {
  const domain = splitAtSign(email)?.domain;
  if (domain === undefined || isAddressLiteral(domain)) return null;
  return domainLabels(domain);
}

/**
 * Every rule is a small, independently checkable, named assertion. Grouped
 * by RFC section for traceability. `test` returns true when the email
 * PASSES the rule.
 */
export const EMAIL_RULES: EmailValidationRule[] = [
  // ---- Whole-address structure (RFC 5321 §4.1.2, RFC 5322 §3.4.1) ----
  { id: 'ADDR-01', description: 'Adresse darf nicht leer sein', test: (e) => e.trim().length > 0 },
  { id: 'ADDR-02', description: 'Keine führenden/abschliessenden Leerzeichen', test: (e) => e === e.trim() },
  { id: 'ADDR-03', description: 'Gesamtlänge max. 254 Oktette (RFC 3696 Erratum 1690)', test: (e) => byteLength(e) <= 254 },
  { id: 'ADDR-04', description: 'Genau ein unescaptes "@"', test: (e) => splitAtSign(e) !== null },
  { id: 'ADDR-05', description: 'Keine ASCII-Steuerzeichen enthalten', test: (e) => !CONTROL_CHARS.test(e) },
  { id: 'ADDR-06', description: 'Kein "(" (Kommentare nicht unterstützt)', test: (e) => !e.includes('(') },
  { id: 'ADDR-07', description: 'Kein ")" (Kommentare nicht unterstützt)', test: (e) => !e.includes(')') },
  { id: 'ADDR-08', description: 'Kein "<" (nur addr-spec, kein Display-Name)', test: (e) => !e.includes('<') },
  { id: 'ADDR-09', description: 'Kein ">" (nur addr-spec, kein Display-Name)', test: (e) => !e.includes('>') },
  { id: 'ADDR-10', description: 'Keine Anführungszeichen (quoted-string local-part nicht unterstützt)', test: (e) => !e.includes('"') },
  { id: 'ADDR-11', description: 'Kein Backslash (Escape-Sequenzen nicht unterstützt)', test: (e) => !e.includes('\\') },
  { id: 'ADDR-12', description: 'Keine Leerzeichen/Tabs innerhalb der Adresse', test: (e) => !/[ \t]/.test(e) },

  // ---- Local-part (RFC 5321 §4.5.3.1.1, RFC 5322 §3.4.1 dot-atom, RFC 6531) ----
  { id: 'LOCAL-01', description: 'Local-Part vorhanden', test: (e) => (splitAtSign(e)?.localPart.length ?? 0) > 0 },
  { id: 'LOCAL-02', description: 'Local-Part max. 64 Oktette', test: (e) => byteLength(splitAtSign(e)?.localPart ?? '') <= 64 },
  { id: 'LOCAL-03', description: 'Local-Part beginnt nicht mit "."', test: (e) => !(splitAtSign(e)?.localPart.startsWith('.') ?? true) },
  { id: 'LOCAL-04', description: 'Local-Part endet nicht mit "."', test: (e) => !(splitAtSign(e)?.localPart.endsWith('.') ?? true) },
  { id: 'LOCAL-05', description: 'Local-Part enthält keine zwei aufeinanderfolgenden Punkte', test: (e) => !(splitAtSign(e)?.localPart.includes('..') ?? true) },
  {
    id: 'LOCAL-06',
    description: 'ASCII-Local-Part: nur erlaubte dot-atom-Zeichen (RFC 5322 §3.2.3)',
    test: (e) => {
      const local = splitAtSign(e)?.localPart;
      if (local === undefined || local.length === 0 || NON_ASCII.test(local)) return true;
      return ASCII_LOCAL_CHARS.test(local);
    },
  },
  {
    id: 'LOCAL-07',
    description: 'EAI-Local-Part: keine Control-/Format-/Surrogate-/Separator-Zeichen (RFC 6531)',
    test: (e) => {
      const local = splitAtSign(e)?.localPart;
      if (local === undefined || !NON_ASCII.test(local)) return true;
      return ![...local].some((ch) => DISALLOWED_EAI_LOCAL_CATEGORIES.test(ch));
    },
  },

  // ---- Domain (RFC 1035 §3.1/§3.5, RFC 5321 §4.1.2, EAI) ----
  { id: 'DOM-01', description: 'Domain vorhanden', test: (e) => (splitAtSign(e)?.domain.length ?? 0) > 0 },
  { id: 'DOM-02', description: 'Domain max. 253 Oktette (DNS-Hostname-Grenze)', test: (e) => byteLength(splitAtSign(e)?.domain ?? '') <= 253 },
  { id: 'DOM-03', description: 'Domain beginnt nicht mit "."', test: (e) => !(splitAtSign(e)?.domain.startsWith('.') ?? true) },
  { id: 'DOM-04', description: 'Domain endet nicht mit "."', test: (e) => !(splitAtSign(e)?.domain.endsWith('.') ?? true) },
  {
    id: 'DOM-05',
    description: 'Domain enthält keine zwei aufeinanderfolgenden Punkte',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || isAddressLiteral(domain)) return true;
      return !domain.includes('..');
    },
  },
  {
    id: 'DOM-06',
    description: 'Address-Literal ("[...]") ist korrekt geklammert',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined) return false;
      if (!domain.includes('[') && !domain.includes(']')) return true;
      return isAddressLiteral(domain);
    },
  },
  {
    id: 'DOM-07',
    description: 'Address-Literal ist nicht leer ("[]")',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      return literalContent(domain).length > 0;
    },
  },
  {
    id: 'DOM-08',
    description: 'Hostname enthält mindestens einen Punkt (Host + TLD)',
    test: (e) => {
      const labels = domainLabelsOrNull(e);
      return labels === null || labels.length >= 2;
    },
  },
  { id: 'DOM-09', description: 'Jedes Label ist mindestens 1 Zeichen lang', test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => l.length >= 1) },
  { id: 'DOM-10', description: 'Jedes Label ist höchstens 63 Zeichen lang', test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => l.length <= 63) },
  { id: 'DOM-11', description: 'Kein Label beginnt mit "-" (LDH-Regel, RFC 1035 §3.5)', test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => !l.startsWith('-')) },
  { id: 'DOM-12', description: 'Kein Label endet mit "-" (LDH-Regel, RFC 1035 §3.5)', test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => !l.endsWith('-')) },
  {
    id: 'DOM-13',
    description: 'ASCII-Label: nur LDH-Zeichen (Buchstaben, Ziffern, Bindestrich)',
    test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => NON_ASCII.test(l) || isValidAsciiLabel(l)),
  },
  {
    id: 'DOM-14',
    description: 'EAI-Label (U-Label): nur Letter/Mark/Number/Connector-Punctuation (RFC 6531)',
    test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => !NON_ASCII.test(l) || isValidUnicodeLabel(l)),
  },
  {
    id: 'DOM-15',
    description: 'EAI-Label max. 63 Oktette UTF-8-kodiert',
    test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => byteLength(l) <= 63),
  },
  {
    id: 'DOM-16',
    description: 'TLD (letztes Label) ist mindestens 2 Zeichen lang',
    test: (e) => {
      const labels = domainLabelsOrNull(e);
      if (labels === null) return true;
      return (labels[labels.length - 1]?.length ?? 2) >= 2;
    },
  },
  {
    id: 'DOM-17',
    description: 'TLD ist nicht rein numerisch (RFC 3696 §2)',
    test: (e) => {
      const labels = domainLabelsOrNull(e);
      if (labels === null) return true;
      const tld = labels[labels.length - 1];
      return tld === undefined || !/^\d+$/.test(tld);
    },
  },
  {
    id: 'DOM-18',
    description: 'TLD beginnt mit einem Buchstaben',
    test: (e) => {
      const labels = domainLabelsOrNull(e);
      if (labels === null) return true;
      const tld = labels[labels.length - 1];
      return tld === undefined || /^\p{L}/u.test(tld);
    },
  },
  {
    id: 'DOM-19',
    description: 'A-Label-Präfix "xn--" hat mindestens ein Zeichen Inhalt (RFC 5890)',
    test: (e) => (domainLabelsOrNull(e) ?? []).every((l) => !l.toLowerCase().startsWith('xn--') || l.length > 4),
  },
  {
    id: 'DOM-20',
    description: 'Nackte IP-Adresse ohne eckige Klammern wird nicht als Hostname akzeptiert (RFC 5321 §4.1.3)',
    test: (e) => {
      const labels = domainLabelsOrNull(e);
      return labels === null || !labels.every((l) => /^\d+$/.test(l));
    },
  },

  // ---- Address-Literal: IPv4 (RFC 5321 §4.1.3) ----
  {
    id: 'LIT-IPV4-01',
    description: 'IPv4-Literal besteht aus genau 4 Oktetten',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const content = literalContent(domain);
      if (ipv6Body(content) !== null) return true;
      return getIPv4Octets(content) !== null;
    },
  },
  ...[0, 1, 2, 3].map((index) => ({
    id: `LIT-IPV4-0${index + 2}`,
    description: `IPv4-Oktett ${index + 1} ist numerisch, 0–255, ohne führende Nullen`,
    test: (e: string) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const content = literalContent(domain);
      if (ipv6Body(content) !== null) return true;
      const octets = getIPv4Octets(content);
      return octets === null || isValidOctet(octets[index]);
    },
  })),

  // ---- Address-Literal: IPv6 (RFC 4291 Textdarstellung, RFC 5321 §4.1.3) ----
  {
    id: 'LIT-IPV6-01',
    description: 'IPv6-Literal beginnt mit dem Tag "IPv6:"',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const content = literalContent(domain);
      if (validateIPv4(content)) return true;
      return content.toLowerCase().startsWith('ipv6:');
    },
  },
  {
    id: 'LIT-IPV6-02',
    description: 'IPv6-Literal: höchstens eine "::"-Kompression (RFC 4291 §2.2)',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const body = ipv6Body(literalContent(domain));
      if (body === null) return true;
      return body.split('::').length - 1 <= 1;
    },
  },
  {
    id: 'LIT-IPV6-03',
    description: 'IPv6-Literal: nur Hex-Ziffern, ":" und optional eingebettetes IPv4 erlaubt',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const body = ipv6Body(literalContent(domain));
      return body === null || /^[0-9a-fA-F:.]+$/.test(body);
    },
  },
  {
    id: 'LIT-IPV6-04',
    description: 'IPv6-Literal: jede Hex-Gruppe ist 1–4 Hex-Ziffern lang',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const body = ipv6Body(literalContent(domain));
      if (body === null || body.split('::').length - 1 > 1) return true;
      return ipv6Groups(body).every((g) => HEX_GROUP.test(g));
    },
  },
  {
    id: 'LIT-IPV6-05',
    description: 'IPv6-Literal: Gruppenanzahl passt zur "::"-Kompression (RFC 4291 §2.2)',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const body = ipv6Body(literalContent(domain));
      if (body === null || body.split('::').length - 1 > 1) return true;
      const groups = ipv6Groups(body);
      return body.includes('::') ? groups.length < 8 : groups.length === 8;
    },
  },
  {
    id: 'LIT-IPV6-06',
    description: 'IPv6-Literal: eingebettete IPv4-Adresse am Ende (falls vorhanden) ist gültig',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const body = ipv6Body(literalContent(domain));
      if (body === null || !/(\d{1,3}\.){3}\d{1,3}$/.test(body)) return true;
      const lastColon = body.lastIndexOf(':');
      return lastColon !== -1 && validateIPv4(body.slice(lastColon + 1));
    },
  },
  {
    id: 'LIT-GEN-01',
    description: 'Address-Literal ist entweder gültiges IPv4 oder gültiges IPv6 (General-address-literal nicht unterstützt, RFC 5321 §4.1.3)',
    test: (e) => {
      const domain = splitAtSign(e)?.domain;
      if (domain === undefined || !isAddressLiteral(domain)) return true;
      const content = literalContent(domain);
      return validateIPv4(content) || ipv6Body(content) !== null;
    },
  },
];

export interface EmailValidationResult {
  valid: boolean;
  failedRules: EmailValidationRule[];
}

export function validateEmailSyntax(email: string): EmailValidationResult {
  const failedRules = EMAIL_RULES.filter((rule) => !rule.test(email));
  return { valid: failedRules.length === 0, failedRules };
}
