import { ITermsFacetParam } from '@collections/repositories/types';

export const DATE_FORMAT = 'DD MMMM YYYY';

export const DEFAULT_FACET: { [field: string]: ITermsFacetParam } = {
  title: { field: 'title', type: 'terms', limit: 0 },
};
export const DEFAULT_QF =
  'title^100 author_names_tg^120 description^10 keywords_tg^10 tag_list_tg^10';

export const PROVIDER_QF = 'title^100 description^10 scientific_domains^10';

export const HORIZONTAL_TOOLTIP_TEXT =
  'Horizontal Services’ are services potentially useful for all researchers' +
  ', no matter their affiliation nor scientific discipline. Usually provided' +
  ' by computing centers and e-Infrastructures. They bring an additional value' +
  ' to service providers and developers, who want to enhance their services with' +
  ' new capabilities like computing or storage.';

export const DATASOURCE_FILTER_TOOLTIP_TEXT =
  'The list provided in this filter does not include of all the data sources published in EOSC, ' +
  'only those harvested in OpenAIRE Research Graph. Such data sources make their research products ' +
  'discoverable and available in EOSC.';

export const SDG_TOOLTIP_TEXT =
  'The Sustainable Development Goals Are a collection of seventeen interlinked ' +
  'objectives designed to achieve a better and more sustainable future for all.' +
  ' They address the global challenges we face, including poverty, inequality, ' +
  'climate change, environmental degradation, peace, and justice.';

export const RECOMMENDATIONS_TOOLTIP_TEXT_NOTLOGGED =
  'Not Logged In? Discover Trending Picks: Recommended ' +
  "resources reflect what's popular among other users " +
  'right now. Log in to access personalized suggestions ' +
  'curated just for you, influenced by your interests ' +
  'and actions on the EOSC Platform';

export const RECOMMENDATIONS_TOOLTIP_TEXT_LOGGED =
  'A recommender system suggests resources - like data sets, ' +
  'publications, software, trainings, and more. ' +
  'It looks at your past orders, views, and interactions. ' +
  'It also considers what others with similar interests ' +
  'have engaged with. The more you explore, the smarter ' +
  'the suggestions get. Your journey shapes your suggestions!';

export const CITATIONS_NOT_AVAILABLE_TOOLTIP_TEXT =
  'Due to the lack of data, bibliography record’s generation is not possible. ' +
  'Please check the other sources of this file ' +
  'or a source website to check if the link is valid.';

export const BIBLIOGRAPHY_TOOLTIP_TEXT =
  ' If some links or buttons are not active, it means that this source ' +
  'does not provide us with the required information to generate the required format. ' +
  'Please also check other sources If possible.';

export const INTEROPERABILITY_PATTERNS_TOOLTIP_TEXT =
  'With interoperability patterns you are able to discover research products ' +
  'along with processing tools dedicated for them.';

// Source: http://country.io/data/
export const COUNTRY_CODE_TO_NAME: Record<string, string> = {
  BD: 'Bangladesh',
  BE: 'Belgium',
  BF: 'Burkina Faso',
  BG: 'Bulgaria',
  BA: 'Bosnia and Herzegovina',
  BB: 'Barbados',
  WF: 'Wallis and Futuna',
  BL: 'Saint Barthelemy',
  BM: 'Bermuda',
  BN: 'Brunei',
  BO: 'Bolivia',
  BH: 'Bahrain',
  BI: 'Burundi',
  BJ: 'Benin',
  BT: 'Bhutan',
  JM: 'Jamaica',
  BV: 'Bouvet Island',
  BW: 'Botswana',
  WS: 'Samoa',
  BQ: 'Bonaire, Saint Eustatius and Saba ',
  BR: 'Brazil',
  BS: 'Bahamas',
  JE: 'Jersey',
  BY: 'Belarus',
  BZ: 'Belize',
  RU: 'Russia',
  RW: 'Rwanda',
  RS: 'Serbia',
  TL: 'East Timor',
  RE: 'Reunion',
  TM: 'Turkmenistan',
  TJ: 'Tajikistan',
  RO: 'Romania',
  TK: 'Tokelau',
  GW: 'Guinea-Bissau',
  GU: 'Guam',
  GT: 'Guatemala',
  GS: 'South Georgia and the South Sandwich Islands',
  GR: 'Greece',
  GQ: 'Equatorial Guinea',
  GP: 'Guadeloupe',
  JP: 'Japan',
  GY: 'Guyana',
  GG: 'Guernsey',
  GF: 'French Guiana',
  GE: 'Georgia',
  GD: 'Grenada',
  GB: 'United Kingdom',
  GA: 'Gabon',
  SV: 'El Salvador',
  GN: 'Guinea',
  GM: 'Gambia',
  GL: 'Greenland',
  GI: 'Gibraltar',
  GH: 'Ghana',
  OM: 'Oman',
  TN: 'Tunisia',
  JO: 'Jordan',
  HR: 'Croatia',
  HT: 'Haiti',
  HU: 'Hungary',
  HK: 'Hong Kong',
  HN: 'Honduras',
  HM: 'Heard Island and McDonald Islands',
  VE: 'Venezuela',
  PR: 'Puerto Rico',
  PS: 'Palestinian Territory',
  PW: 'Palau',
  PT: 'Portugal',
  SJ: 'Svalbard and Jan Mayen',
  PY: 'Paraguay',
  IQ: 'Iraq',
  PA: 'Panama',
  PF: 'French Polynesia',
  PG: 'Papua New Guinea',
  PE: 'Peru',
  PK: 'Pakistan',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PM: 'Saint Pierre and Miquelon',
  ZM: 'Zambia',
  EH: 'Western Sahara',
  EE: 'Estonia',
  EG: 'Egypt',
  ZA: 'South Africa',
  EC: 'Ecuador',
  IT: 'Italy',
  VN: 'Vietnam',
  SB: 'Solomon Islands',
  ET: 'Ethiopia',
  SO: 'Somalia',
  ZW: 'Zimbabwe',
  SA: 'Saudi Arabia',
  ES: 'Spain',
  ER: 'Eritrea',
  ME: 'Montenegro',
  MD: 'Moldova',
  MG: 'Madagascar',
  MF: 'Saint Martin',
  MA: 'Morocco',
  MC: 'Monaco',
  UZ: 'Uzbekistan',
  MM: 'Myanmar',
  ML: 'Mali',
  MO: 'Macao',
  MN: 'Mongolia',
  MH: 'Marshall Islands',
  MK: 'Macedonia',
  MU: 'Mauritius',
  MT: 'Malta',
  MW: 'Malawi',
  MV: 'Maldives',
  MQ: 'Martinique',
  MP: 'Northern Mariana Islands',
  MS: 'Montserrat',
  MR: 'Mauritania',
  IM: 'Isle of Man',
  UG: 'Uganda',
  TZ: 'Tanzania',
  MY: 'Malaysia',
  MX: 'Mexico',
  IL: 'Israel',
  FR: 'France',
  IO: 'British Indian Ocean Territory',
  SH: 'Saint Helena',
  FI: 'Finland',
  FJ: 'Fiji',
  FK: 'Falkland Islands',
  FM: 'Micronesia',
  FO: 'Faroe Islands',
  NI: 'Nicaragua',
  NL: 'Netherlands',
  NO: 'Norway',
  NA: 'Namibia',
  VU: 'Vanuatu',
  NC: 'New Caledonia',
  NE: 'Niger',
  NF: 'Norfolk Island',
  NG: 'Nigeria',
  NZ: 'New Zealand',
  NP: 'Nepal',
  NR: 'Nauru',
  NU: 'Niue',
  CK: 'Cook Islands',
  XK: 'Kosovo',
  CI: 'Ivory Coast',
  CH: 'Switzerland',
  CO: 'Colombia',
  CN: 'China',
  CM: 'Cameroon',
  CL: 'Chile',
  CC: 'Cocos Islands',
  CA: 'Canada',
  CG: 'Republic of the Congo',
  CF: 'Central African Republic',
  CD: 'Democratic Republic of the Congo',
  CZ: 'Czech Republic',
  CY: 'Cyprus',
  CX: 'Christmas Island',
  CR: 'Costa Rica',
  CW: 'Curacao',
  CV: 'Cape Verde',
  CU: 'Cuba',
  SZ: 'Swaziland',
  SY: 'Syria',
  SX: 'Sint Maarten',
  KG: 'Kyrgyzstan',
  KE: 'Kenya',
  SS: 'South Sudan',
  SR: 'Suriname',
  KI: 'Kiribati',
  KH: 'Cambodia',
  KN: 'Saint Kitts and Nevis',
  KM: 'Comoros',
  ST: 'Sao Tome and Principe',
  SK: 'Slovakia',
  KR: 'South Korea',
  SI: 'Slovenia',
  KP: 'North Korea',
  KW: 'Kuwait',
  SN: 'Senegal',
  SM: 'San Marino',
  SL: 'Sierra Leone',
  SC: 'Seychelles',
  KZ: 'Kazakhstan',
  KY: 'Cayman Islands',
  SG: 'Singapore',
  SE: 'Sweden',
  SD: 'Sudan',
  DO: 'Dominican Republic',
  DM: 'Dominica',
  DJ: 'Djibouti',
  DK: 'Denmark',
  VG: 'British Virgin Islands',
  DE: 'Germany',
  YE: 'Yemen',
  DZ: 'Algeria',
  US: 'United States',
  UY: 'Uruguay',
  YT: 'Mayotte',
  UM: 'United States Minor Outlying Islands',
  LB: 'Lebanon',
  LC: 'Saint Lucia',
  LA: 'Laos',
  TV: 'Tuvalu',
  TW: 'Taiwan',
  TT: 'Trinidad and Tobago',
  TR: 'Turkey',
  LK: 'Sri Lanka',
  LI: 'Liechtenstein',
  LV: 'Latvia',
  TO: 'Tonga',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LR: 'Liberia',
  LS: 'Lesotho',
  TH: 'Thailand',
  TF: 'French Southern Territories',
  TG: 'Togo',
  TD: 'Chad',
  TC: 'Turks and Caicos Islands',
  LY: 'Libya',
  VA: 'Vatican',
  VC: 'Saint Vincent and the Grenadines',
  AE: 'United Arab Emirates',
  AD: 'Andorra',
  AG: 'Antigua and Barbuda',
  AF: 'Afghanistan',
  AI: 'Anguilla',
  VI: 'U.S. Virgin Islands',
  IS: 'Iceland',
  IR: 'Iran',
  AM: 'Armenia',
  AL: 'Albania',
  AO: 'Angola',
  AQ: 'Antarctica',
  AS: 'American Samoa',
  AR: 'Argentina',
  AU: 'Australia',
  AT: 'Austria',
  AW: 'Aruba',
  IN: 'India',
  AX: 'Aland Islands',
  AZ: 'Azerbaijan',
  IE: 'Ireland',
  ID: 'Indonesia',
  UA: 'Ukraine',
  QA: 'Qatar',
  MZ: 'Mozambique',
};
export const NOT_SPECIFIED_LANG = 'Not specified';
export const DATASOURCE_PID_MAPPING: Record<string, string> = {
  'eosc.arronax.e954a15eb0982edb9aa861de2cb42017': '4sf',
  'eosc.provider_24102023_-1-_1100.dba241e212807b4664099143fea3e24e':
    'Datasource 24.10.2023-#1-11.00',
  'eosc.jyfl-acclab.8be8860193749bce2cbec133568ca23e': 'dt999',
  'eosc.wenmr.d288225c333b07fc9d001da5c5392741': 'Madomsi3sobm',
  'eosc.provider_beta_1705.adbdb437461cfdd8e20358e8d408f54b':
    'Datasource 23.06 - from PP',
  'eosc.provider_beta_1705.5e29728667fa11cd180926e1f0d03606':
    'datasource 26.06',
  'eosc.athena_rc_2.5b76240cc27a58c6f7ceef7d8c36660e': 'NARCIS',
  'eosc.srce-2.f9c8ecf6b231c2bda88e8805e26d09ec': 'SRCE-repo',
  'eosc.provider_beta_1705.e6709aedbf5ccdab2fb3c88d36b09f25':
    'Datasource 26.06 - 2',
  'eosc.scipedia.0063745e5964b19c3e9ceeb2bd6632f5': 'SpaOSP',
  'eosc.rli.661cdfdc74561b8eb69583b8137799d2': 'Open Energy Platform',
  'eosc.provider_212.214acf55bf932dba3d81822a7debcad0':
    'Provider 2.12 datasource',
  'eosc.provider_2309_3.f3515f45d785564574f116a88751750c':
    'new datasource 24.10',
  'eosc.astrid2.acf3f31f0a2aa9bfc63178d3213e5775': 'testdatasource1',
  'eosc.provider_2309.cd4e09545a4effd5ff115376f47a089a': 'test d',
  'eosc.astrid2.20d1ad0b1a5b7656f819de5c60d80abd': 'testdatasourceid',
  'eosc.hn.02e4d980399d7142506e8aadb2b8e865': 'ISIDORE',
  'eosc.provider_711.d79ba3019b4e3b023a68b9210a11c87b':
    'Datasource Provider 7.11',
  'eosc.provider_test.098f6bcd4621d373cade4e832627b4f6': 'test',
  'eosc.provider_1205.9bc11ecf6597341bb9a3d2a2f6f3dc08': 'dataspurce 2 12.05',
  'eosc.provider_1705.f96e94253fed6ae65d15a0616bcb8ed9': 'datasources',
  'eosc.provider_beta_1705.0d9334ddfcd05e61981c07256aa7cff9':
    'datasources beta 17.05',
  'eosc.testprovider.d9354e27460c48a4aeefa411983812de': 'testDatasource',
  'eosc.vamdc.c967f669aa354e584e6786ee1d0c823e': 'VAMDC Portal',
  'eosc.test-pg.44d7eab1a7769bbd7d34c777d75af81b': '00-test-pg',
  'eosc.esrf.ecc74ab09791c52aa238ee77ae988874': 'TESRFDP',
  'eosc.elixir-uk.5126ffcc8e23f65bbbe219d36128f2c8': 'WorkflowHub',
  'eosc.testprovider.bf8487b63c703ccc704fdf358d01fa94': 'testDatasource1',
  'eosc.provider_beta_1705.59edaf6d8b62b249dfd27217f5f34fee':
    'datasource 25.05.2023 ',
  'eosc.riga_stradins_university.4ea61809e753e65a459bbe4a492c773b':
    'RSU Dataverse',
  'eosc.provider_10102023.1c7f4a472719f2b7fa77a92fde11cffa':
    'Datasource 10.10.2023',
  'eosc.provider_beta_1705.b5050d46d65ec54a68f2db78440538d1':
    'datasource 27.06 - 2',
  'eosc.provider_test.6fed12194c29f4abeb9ad547edfbbaa3': 'Datasource',
  'eosc.ill.d422cba59746f39d10bdfea5c9cf8511': 'ILL Data Portal',
  'eosc.clarin-eric.2aad8ade139792a49b130b539e1bb144':
    'Virtual Language Observatory',
  'eosc.provider_21082023.e4233fec64c6197e2aa498ba5335c966':
    'datasource 21.08.2023',
  'eosc.cessda-eric.7e17e8817404ce7a8013be373723b2be': 'CDC',
  'eosc.provider_2309_3.605e79544a68819ce664c088aba92658': 'Test 2',
  'eosc.tpm.d9b7ce2b314d4feb0a49f0cee0467436': 'DTS1',
  'eosc.openaire.0a02f13310296033694acead588a773b': 'Zenodo',
  'eosc.provider_1705.1b3d84aa49d5d78b9693d22c41004f3b': 'DATASOURCE 10.11',
  'eosc.provider_1205.82544372c4d7f574944c451839c0b521': 'Datasource 12.05',
  'eosc.eudat.17bb7bb8ef1af0f9bdb55a7db30cfa8a': 'B2SHARE',
  'eosc.embl-ebi.e29a4e098afa05818957179f05d8e21d': 'ICR',
  'eosc.psi.f1a79f572f95bc2fbea5cdc40ef4eb22': 'PSI Public Data Repository',
  'eosc.provider_beta_1705.1ba189fb1240b5af8564107f721ad9f4':
    'Datasource live update 24.05',
  'eosc.psnc.6f0470e3bb9203ec3a7553f3a72a7a1f': 'ROHub',
  'eosc.openaire.2bb8710e1870170a175110615698e677': 'OpenAIRE ScholeXplorer',
  'eosc.gbif.14ac40283813a624bd74ae82605ded23': 'GBIF Species Occurrence Data',
  'eosc.oxford_e-research_centre.21697de1a5b10b8eb5fad857edecf5c9':
    'FAIRsharing',
  'eosc.inria.5923d0f31f0acda46cf4b592972284a2': 'Software Heritage archive',
  'eosc.vilnius-university.1ec069c1620d49d460e4cbcec0af57f6': 'MIDAS',
  'eosc.ror-org.24ef0000cfbf3ce7f3a40ba6b87e76ce': 'ROR',
  'eosc.uit.49e8d4cef23bda3b66dd417e6675727d': 'TROLLing',
  'eosc.ccsd.06cdd3ff4700bb4c8e7bf22c14f23f5b': 'Episciences',
  'eosc.lindatclariah-cz.6dc98fcb5294282acf3d92f3ab3376b2':
    'LINDAT/CLARIAH-CZ Repository',
  'eosc.gwdg.d6521479ffa922bbccc839606b8ec7c5': 'TextGrid Repository',
  'eosc.sobigdata.f859d895179ba3f735df705574690948': 'SBDServicesAndProducts',
  'eosc.eudat.b2find': 'B2FIND',
  'ni4os.fcub.cherry': 'CHERRY',
  'eosc.sobigdata.e883e6d248d628c510ac687e9992830c': 'SBDLiteracy',
  'eosc.obsparis.9e98089baaf6af32fab3154873dfdfeb': 'PADC',
  'eosc.lindatclariah-cz.f7341ffdba1f786e5d06dede5cc4dc77':
    'LINDAT/CLARIAH-CZ repository',
  'eosc.cern.8025243fa3c887159fc9b3930ae147c2': 'COD',
  'eosc.gdansk_tech.1434de11c83986b5be5592677f28d171': 'MOST',
  'eosc.ceric-eric.e9354332fd75190b935b80c1ba30b837': 'ceric-data-portal',
  'ni4os.sanu.dais': 'DAIS',
  'eosc.acdh-ch.3b0149bee976d6db7eef053159e97a87': 'ARCHE',
  'eosc.seadatanet.e95e2e16b32dda2b8f31f0aab2f23f29': 'SeaDataNet CDI OGC WFS',
  'eosc.unibi-ub.a61d9ea844bdf43e6feabd6b14dfe3c5': 'PUB',
  'eosc.seadatanet.a98e1dce663cd6476d20621ad05c8a38': 'SeaDataNet CDI SPARQL',
  'eosc.seadatanet.94ecdcf3104fb6327345ccdac3eebbee': 'EDMO',
  'eosc.seadatanet.fd95e4468241f26fdd1f80f2337528cd': 'webODV',
  'eosc.unibi-ub.bielefeld_academic_search_engine_base': 'BASE',
  'eosc.eudat.9168f179ffab97584bf99a2729837545': 'B2SAFE',
  'eosc.blue-cloud.44fa8dba8ad3ed19445227940032f31c': 'GRSF',
  'eosc.seadatanet.f1a460f9883404338586ac4ba921221a': 'SeaDataNet CDI GUI',
  'eosc.unipd.12d35bb1f56d4b91bb4644faf76d9486': 'RDU',
  'eosc.lapp.ef0bb7d889d0cced364444495f7a1e67': 'OSSR',
  'eosc.bbmri-eric.8206c9aa93eb9513383218704570feb2': 'BBMRI-ERIC CRC-Cohort',
  'eosc.seadatanet.096bb08cfb2dbaf3cee5aed4784198b0': 'EDMERP',
  'eosc.seadatanet.7e463cd89456132d798300ce6ed91779': 'CSR',
  'eosc.vliz.61c6dae33d794d477e6a68ed43f52eb3': 'WoRMS',
  'eosc.cnr_-_isti.dbe89d2b83f3e29caab7923a51c1d151': 'ISTI Open Portal',
  'eosc.csuc.135887d3dea4b6723095d13c28dd52a3': 'CORA.RDR',
  'eosc.hits.901e9baaa76d72017ebd7dfd93436caf': 'FAIRDOMHub',
  'eosc.lida.26c1ee137e7510fd1d7e44eb87cdb4af': 'LiDA Survey Data',
  'eosc.seadatanet.f5196d5ced64ec82555f6397deb21e6b': 'EDMED',
  'eosc.awi_bremerhaven.2882af227241cb956c28fe321a70dfb2': 'PANGAEA',
  'eosc.ku_leuven.1cb0937dc41e70d8126d7b259ad470af': 'KU Leuven RDR',
  'eosc.dkrz.9ffffb05aaf22e7f9138dca4560a8c8b': 'WDCC',
  'ni4os.ibiss.ibiss_radar': 'IBISS_RADAR',
  'eosc.cyfronet.b59c2171d05ed9fb9e70a86d544f42a3': 'RODBUK',
  'eosc.seadatanet.c04c367e5f2560a2e1ba9fa8e149443c': 'EDIOS',
  'eosc.seadatanet.f5b8d36ae496bbf86acbb7028086f454': 'SeaDataNet CDI OGC WMS',
  'eosc.zpid.b96341f00ca4c3a314abcc07fc0084b2': 'PsychArchives',
  'eosc.bbmri-eric.314cee7546a7489c2cc3ab79d34e2640': 'BBMRI-ERIC Directory',
  'eosc.ku_leuven.68bf19ae7ee1bc7e3872255e96550c04': 'Lirias',
  'ni4os.ichtm.cer': 'CER',
  'eosc.icos_eric.25c5f3f0674fb287e05e697263e211e2': 'ICOS Carbon Portal',
  'eosc.seadatanet.77514684f861f9bc796b15aa985a699f': 'Marine Data Viewer',
  'eosc.obsparis.d7a94a59937dd6d762c1f1cdb9c7af89': 'VESPA query portal',
  'eosc.fris.8f42bfccf70de38b01763b704300f882': 'FRIS',
  'eosc.uniwersytet_opolski.19b44a96f7a776774de3939d9820d00c': 'BK UniOpole',
};
export const CATALOGUE_NAME_MAPPING: Record<string, string> = {
  eosc: 'EOSC',
  escape_ossr: 'ESCAPE OSSR',
  ni4os:
    'National Initiatives for Open Science in Europe – NI4OS Europe  Catalogue',
  'eosc-nordic': 'EOSC Nordic Service Gateway',
};
