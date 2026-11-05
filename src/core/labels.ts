/** Pure label matching. No DOM access. */

const EDGE_PUNCT = /^[\p{P}\s]+|[\p{P}\s]+$/gu;

/** NFKC, lowercase, trim, collapse whitespace, strip surrounding punctuation. */
export function normalizeLabel(s: string): string {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .replace(EDGE_PUNCT, '')
    .replace(/\s+/g, ' ');
}

const EXACT_CLOSE = new Set<string>([
  '×', '✕', '✖', '✗', 'x', 'close', 'dismiss', 'close ad',
  'cerrar', // es
  'schließen', 'schliessen', // de
  'fermer', // fr
  'fechar', // pt
  'chiudi', // it
  '閉じる', // ja
  '关闭', '關閉', // zh
  '닫기', // ko
  'sluiten', // nl
  'закрыть', // ru
]);

const ADAPTER_EXTRA = new Set<string>([
  'skip ad', 'skip ads', 'skip', 'no thanks', 'not now', 'maybe later',
  'omitir anuncio', 'omitir anuncios', 'omitir', 'no gracias', 'ahora no', // es
  'werbung überspringen', 'werbung ueberspringen', 'überspringen', 'nein danke', 'nicht jetzt', // de
  'passer la publicité', 'passer', 'non merci', 'pas maintenant', // fr
  'pular anúncio', 'pular anuncio', 'pular', 'não obrigado', 'nao obrigado', 'agora não', // pt
  'salta annuncio', 'salta', 'no grazie', 'non ora', // it
  '広告をスキップ', 'スキップ', // ja
  '跳过广告', '跳過廣告', '跳过', // zh
  '광고 건너뛰기', '건너뛰기', // ko
  'advertentie overslaan', 'overslaan', 'nee bedankt', // nl
  'пропустить рекламу', 'пропустить', // ru
]);

export function isExactCloseLabel(label: string): boolean {
  return EXACT_CLOSE.has(normalizeLabel(label));
}

export function isAdapterCloseLabel(label: string): boolean {
  const n = normalizeLabel(label);
  return EXACT_CLOSE.has(n) || ADAPTER_EXTRA.has(n);
}

const NEGATIVE_WORDS: string[] = [
  // en
  'accept', 'agree', 'allow', 'subscribe', 'buy', 'purchase', 'sign in', 'sign up', 'signin', 'signup',
  'log in', 'login', 'continue', 'confirm', 'yes', 'ok', 'okay', 'pay', 'upgrade', 'try', 'get', 'start',
  'install', 'download', 'reject',
  // es
  'aceptar', 'acepto', 'permitir', 'suscribirse', 'suscríbete', 'comprar', 'continuar', 'confirmar', 'sí',
  'iniciar sesión', 'registrarse', 'rechazar', 'descargar', 'instalar', 'probar', 'empezar',
  // de
  'akzeptieren', 'zustimmen', 'erlauben', 'abonnieren', 'kaufen', 'weiter', 'bestätigen', 'ja', 'anmelden',
  'registrieren', 'ablehnen', 'herunterladen', 'installieren', 'testen', 'starten',
  // fr
  'accepter', "j'accepte", 'autoriser', "s'abonner", 'acheter', 'continuer', 'confirmer', 'oui', 'connexion',
  'se connecter', "s'inscrire", 'refuser', 'télécharger', 'installer', 'essayer', 'commencer',
  // pt
  'aceitar', 'concordar', 'assinar', 'sim', 'entrar', 'cadastrar', 'recusar', 'baixar', 'experimentar', 'começar',
  // it
  'accetto', 'accetta', 'consenti', 'iscriviti', 'acquista', 'compra', 'continua', 'conferma', 'sì', 'accedi',
  'registrati', 'rifiuta', 'scarica', 'installa', 'prova', 'inizia',
  // nl
  'accepteren', 'akkoord', 'toestaan', 'abonneren', 'kopen', 'doorgaan', 'bevestigen', 'inloggen', 'aanmelden',
  'weigeren', 'downloaden', 'installeren', 'proberen',
  // ru
  'принять', 'согласен', 'разрешить', 'подписаться', 'купить', 'продолжить', 'подтвердить', 'да', 'войти',
  'регистрация', 'отклонить', 'скачать', 'установить', 'попробовать', 'начать',
  // ko (space-delimited: whole-word)
  '동의', '허용', '구독', '구매', '계속', '확인', '예', '로그인', '가입', '거부', '다운로드', '설치', '시작',
];

/** Han/kana scripts have no word spacing: substring match. */
const NEGATIVE_SUBSTRINGS: string[] = [
  '同意', '許可', '购买', '購買', '購読', '購入', '続ける', '確認', 'はい', 'ログイン', '登録', '拒否',
  'ダウンロード', 'インストール', '試す', '開始',
  '接受', '允许', '訂閱', '订阅', '继续', '繼續', '确认', '登录', '注册', '拒绝', '下载', '安装', '试用', '开始',
];

function tokenize(s: string): string[] {
  return s
    .split(/[^\p{L}\p{N}\p{M}']+/u)
    .map((t) => t.replace(/^'+|'+$/g, ''))
    .filter(Boolean);
}

const NEGATIVE_PHRASES: string[][] = NEGATIVE_WORDS.map(tokenize);

/** Whole-word (token-sequence) match against the negative list. */
export function hasNegativeToken(label: string): boolean {
  const n = normalizeLabel(label);
  if (!n) return false;
  if (NEGATIVE_SUBSTRINGS.some((w) => n.includes(w))) return true;
  const tokens = tokenize(n);
  return NEGATIVE_PHRASES.some((p) => {
    if (p.length === 0) return false;
    for (let i = 0; i + p.length <= tokens.length; i++) {
      if (p.every((w, j) => tokens[i + j] === w)) return true;
    }
    return false;
  });
}
