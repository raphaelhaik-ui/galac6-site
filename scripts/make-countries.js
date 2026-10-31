// Génère scripts/langs/countries.json : noms de pays traduits (es, it, de, he) pour la page de vote,
// à partir de la liste anglaise d'international.html (les valeurs envoyées restent en anglais).
// Usage (rarement utile, le fichier est déjà dans le dépôt) : node scripts/make-countries.js
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'international.html'), 'utf8');
const sel = html.match(/<select id="v-pays"[\s\S]*?<\/select>/)[0];
const names = [...sel.matchAll(/<option value="([^"]+)"(?![^>]*data-i18n)>/g)].map(m => m[1].replace(/&#x27;/g, "'"));
const en = new Intl.DisplayNames(['en'], { type: 'region' });
// Table nom anglais -> code ISO, construite depuis les noms anglais d'ICU, plus quelques exceptions
const byName = {};
for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
  const c = String.fromCharCode(a, b);
  try { const n = en.of(c); if (n && n !== c) byName[n] = c; } catch (e) {}
}
const fix = { 'Antigua and Barbuda': 'AG', 'Bosnia and Herzegovina': 'BA', 'Brunei': 'BN', 'Cabo Verde': 'CV', 'Congo (Republic of the)': 'CG',
  'Congo (Democratic Republic of the)': 'CD', "Côte d'Ivoire": 'CI', 'Czechia': 'CZ', 'Eswatini': 'SZ', 'Hong Kong': 'HK', 'Macao': 'MO',
  'Micronesia': 'FM', 'Myanmar': 'MM', 'Palestine': 'PS', 'Saint Kitts and Nevis': 'KN', 'Saint Lucia': 'LC',
  'Saint Vincent and the Grenadines': 'VC', 'São Tomé and Príncipe': 'ST', 'Timor-Leste': 'TL', 'Trinidad and Tobago': 'TT',
  'Türkiye': 'TR', 'United States': 'US', 'Vatican City': 'VA', 'North Korea': 'KP', 'South Korea': 'KR', 'Kosovo': 'XK',
  'Laos': 'LA', 'Russia': 'RU', 'Syria': 'SY', 'Iran': 'IR', 'Vietnam': 'VN', 'Moldova': 'MD', 'Bolivia': 'BO',
  'Venezuela': 'VE', 'Tanzania': 'TZ', 'Taiwan': 'TW', 'North Macedonia': 'MK' };
// Libellés courts et neutres (comme la liste anglaise) là où ICU donne une forme longue
const LABEL = {
  es: { 'Hong Kong': 'Hong Kong', 'Macao': 'Macao', 'Palestine': 'Palestina', 'Congo (Republic of the)': 'Congo (República del)' },
  it: { 'Hong Kong': 'Hong Kong', 'Macao': 'Macao', 'Palestine': 'Palestina', 'Congo (Republic of the)': 'Congo (Repubblica del)', 'Congo (Democratic Republic of the)': 'Congo (Repubblica Democratica del)' },
  de: { 'Hong Kong': 'Hongkong', 'Macao': 'Macau', 'Palestine': 'Palästina', 'Congo (Republic of the)': 'Kongo (Republik)', 'Congo (Democratic Republic of the)': 'Kongo (Demokratische Republik)' },
  he: { 'Hong Kong': 'הונג קונג', 'Macao': 'מקאו', 'Palestine': 'פלסטין', 'Congo (Republic of the)': 'קונגו (הרפובליקה של)', 'Congo (Democratic Republic of the)': 'קונגו (הרפובליקה הדמוקרטית של)' }
};
const out = {};
for (const lang of ['es', 'it', 'de', 'he']) {
  const dn = new Intl.DisplayNames([lang], { type: 'region' });
  const list = names.map(n => {
    const code = fix[n] || byName[n];
    if (!code) throw new Error('Pays sans code : ' + n);
    return { value: n, label: (LABEL[lang] && LABEL[lang][n]) || dn.of(code) };
  });
  list.sort((x, y) => x.label.localeCompare(y.label, lang));
  out[lang] = list;
}
fs.writeFileSync(path.join(__dirname, 'langs', 'countries.json'), JSON.stringify(out, null, 1) + '\n');
console.log('countries.json :', names.length, 'pays');
