import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idiom'
})
export class IdiomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const languageMap: { [key: string]: string } = {
      'ja': 'Japón',
      'en': 'Estados Unidos',
      'es': 'España',
      'fr': 'Francia',
      'de': 'Alemania',
      'it': 'Italia',
      'pt': 'Portugal',
      'ru': 'Rusia',
      'zh': 'China',
      'ko': 'Corea del Sur',
      'ar': 'Arabia Saudita',
      'hi': 'India',
      'nl': 'Países Bajos',
      'sv': 'Suecia',
      'no': 'Noruega',
      'fi': 'Finlandia',
      'da': 'Dinamarca',
      'pl': 'Polonia',
      'tr': 'Turquía',
      'el': 'Grecia',
      'he': 'Israel',
      'th': 'Tailandia',
      'vi': 'Vietnam',
      'id': 'Indonesia',
      'ms': 'Malasia',
      'tl': 'Filipinas',
      'uk': 'Ucrania',
      'hu': 'Hungría',
      'cs': 'Chequia',
      'ro': 'Rumania',
      'bg': 'Bulgaria',
      'hr': 'Croacia',
      'sk': 'Eslovaquia',
      'sl': 'Eslovenia',
      'lt': 'Lituania',
      'lv': 'Letonia',
      'et': 'Estonia',
      'is': 'Islandia',
      'mt': 'Malta',
      'cy': 'Chipre',
      'ie': 'Irlanda',
      'za': 'Sudáfrica',
      'eg': 'Egipto',
      'ma': 'Marruecos',
      'dz': 'Argelia',
      'tn': 'Túnez',
      'ng': 'Nigeria',
      'ke': 'Kenia',
      'gh': 'Ghana',
      'sn': 'Senegal',
      'ci': 'Costa de Marfil',
      'cm': 'Camerún',
      'ug': 'Uganda',
      'tz': 'Tanzania',
      'zm': 'Zambia',
      'zw': 'Zimbabue',
      'mz': 'Mozambique',
      'ao': 'Angola',
      'na': 'Namibia',
      'bw': 'Botsuana',
      'sz': 'Esuatini',
      'ls': 'Lesoto',
      'mw': 'Malaui',
      'mg': 'Madagascar',
      'mu': 'Mauricio',
      'sc': 'Seychelles',
      'cv': 'Cabo Verde',
      'gw': 'Guinea-Bisáu',
      'gq': 'Guinea Ecuatorial',
      'ga': 'Gabón',
      'cg': 'Congo',
      'cd': 'República Democrática del Congo',
      'st': 'Santo Tomé y Príncipe',
      'bj': 'Benín',
      'bf': 'Burkina Faso',
      'ml': 'Malí',
      'ne': 'Níger',
      'td': 'Chad',
      'mr': 'Mauritania',
      'gm': 'Gambia',
      'lr': 'Liberia',
      'so': 'Somalia',
      'dj': 'Yibuti',
      'er': 'Eritrea',
      'sd': 'Sudán',
      'ss': 'Sudán del Sur',
      'cf': 'República Centroafricana',
      'rw': 'Ruanda',
      'bi': 'Burundi',
      'km': 'Comoras',
      'yt': 'Mayotte',
      're': 'Reunión',
      'tf': 'Territorios Australes Franceses',
      'pm': 'San Pedro y Miquelón',
      'gl': 'Groenlandia',
      'fo': 'Islas Feroe',
      'ax': 'Islas Åland',
      'sj': 'Svalbard y Jan Mayen',
      'bv': 'Isla Bouvet',
      'hm': 'Islas Heard y McDonald',
      'io': 'Territorio Británico del Océano Índico',
      'aq': 'Antártida',
      'gs': 'Islas Georgias del Sur y Sandwich del Sur',
      'pn': 'Islas Pitcairn',
      'tk': 'Tokelau',
      'nu': 'Niue',
      'ck': 'Islas Cook',
      'ws': 'Samoa',
      'as': 'Samoa Americana',
      'to': 'Tonga',
      'tv': 'Tuvalu',
      'fm': 'Micronesia',
      'mh': 'Islas Marshall',
      'pw': 'Palaos',
      'nr': 'Nauru',
      'ki': 'Kiribati',
      'pg': 'Papúa Nueva Guinea',
      'sb': 'Islas Salomón',
      'vu': 'Vanuatu',
      'nc': 'Nueva Caledonia',
      'pf': 'Polinesia Francesa',
      'wf': 'Wallis y Futuna',
      'fj': 'Fiyi'
    };

    return languageMap[value as string] || 'Idioma desconocido';
  }

}