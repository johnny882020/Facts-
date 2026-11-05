import { describe, expect, it } from 'vitest';
import { hasNegativeToken, isAdapterCloseLabel, isExactCloseLabel, normalizeLabel } from '../../src/core/labels';

describe('normalizeLabel', () => {
  it.each([
    ['  Close  ', 'close'],
    ['CLOSE!', 'close'],
    ['Close.', 'close'],
    ['  Close   ad ', 'close ad'],
    ['(x)', 'x'],
    ['ｃｌｏｓｅ', 'close'], // fullwidth NFKC
    ['×', '×'],
    ['Schließen…', 'schließen'],
    ['', ''],
    ['!!!', ''],
    ["J’accepte", "j'accepte"],
  ])('%j -> %j', (input, out) => expect(normalizeLabel(input)).toBe(out));
});

const CLOSE = [
  '×', '✕', '✖', 'x', 'X', 'close', 'Close', 'Dismiss', 'close ad', 'Close.', ' Close! ',
  'Cerrar', 'Schließen', 'schliessen', 'Fermer', 'Fechar', 'Chiudi', '閉じる', '关闭', '關閉', '닫기', 'Sluiten', 'Закрыть',
];
const ADAPTER_ONLY = [
  'Skip Ad', 'Skip Ads', 'skip', 'No thanks', 'Not now', 'Maybe later',
  'Omitir anuncio', 'No gracias', 'Werbung überspringen', 'Nein danke', 'Passer la publicité', 'Non merci',
  'Pular anúncio', 'Salta annuncio', 'No grazie', '広告をスキップ', '跳过广告', '광고 건너뛰기',
  'Advertentie overslaan', 'Пропустить рекламу',
];
const NOT_CLOSE = ['', 'closet', 'close and subscribe', 'Accept', 'xx', 'closes', 'open', 'menu'];

describe('isExactCloseLabel', () => {
  it.each(CLOSE)('accepts %j', (l) => expect(isExactCloseLabel(l)).toBe(true));
  it.each([...ADAPTER_ONLY, ...NOT_CLOSE])('rejects %j', (l) => {
    // 'dismiss'/'close' variants are in CLOSE; adapter-only labels must not be generic
    expect(isExactCloseLabel(l)).toBe(false);
  });
});

describe('isAdapterCloseLabel', () => {
  it.each([...CLOSE, ...ADAPTER_ONLY])('accepts %j', (l) => expect(isAdapterCloseLabel(l)).toBe(true));
  it.each(NOT_CLOSE)('rejects %j', (l) => expect(isAdapterCloseLabel(l)).toBe(false));
});

describe('hasNegativeToken', () => {
  const NEG = [
    'Accept', 'I agree', 'Allow all', 'Subscribe', 'Buy now', 'Purchase', 'Sign in', 'Sign up', 'Log in', 'Login',
    'Continue', 'Confirm', 'Yes', 'OK', 'Pay $5', 'Upgrade', 'Try free', 'Get started', 'Start', 'Install', 'Download', 'Reject all',
    'Aceptar', 'Iniciar sesión', 'Comprar', 'Rechazar', 'Akzeptieren', 'Weiter', 'Anmelden', 'Ablehnen',
    "J'accepte", 'Accepter', "S'abonner", 'Continuer', 'Aceitar', 'Assinar', 'Accetta', 'Iscriviti', 'Rifiuta',
    '同意する', '登录', '下载', '拒绝', '확인', '동의', 'Accepteren', 'Inloggen', 'Принять', 'Подписаться', 'Купить',
    'Close and subscribe', 'Download app',
  ];
  const NOT_NEG = [
    'Close', '×', 'Dismiss', 'No thanks', 'Not now', 'Skip', 'Skip ad', 'Maybe later', 'Cerrar', 'Schließen',
    '閉じる', '关闭', '닫기', '', 'Gethsemane', 'Okay-ish'.slice(0, 0), 'Paypal', 'Starter', 'Trying',
  ];
  it.each(NEG)('negative: %j', (l) => expect(hasNegativeToken(l)).toBe(true));
  it.each(NOT_NEG)('not negative: %j', (l) => expect(hasNegativeToken(l)).toBe(false));
});
