const data: { code: string; name: string; currencyCode: string }[] = [
	{ code: 'ae', name: 'United Arab Emirates', currencyCode: 'AED' },
	{ code: 'al', name: 'Albania', currencyCode: 'ALL' },
	{ code: 'am', name: 'Armenia', currencyCode: 'AMD' },
	{ code: 'ao', name: 'Angola', currencyCode: 'AOA' },
	{ code: 'ar', name: 'Argentina', currencyCode: 'ARS' },
	{ code: 'au', name: 'Australia', currencyCode: 'AUD' },
	{ code: 'aw', name: 'Aruba', currencyCode: 'AWG' },
	{ code: 'az', name: 'Azerbaijan', currencyCode: 'AZN' },
	{ code: 'ba', name: 'Bosnia and Herzegovina', currencyCode: 'BAM' },
	{ code: 'bb', name: 'Barbados', currencyCode: 'BBD' },
	{ code: 'bd', name: 'Bangladesh', currencyCode: 'BDT' },
	{ code: 'bg', name: 'Bulgaria', currencyCode: 'BGN' },
	{ code: 'bh', name: 'Bahrain', currencyCode: 'BHD' },
	{ code: 'bi', name: 'Burundi', currencyCode: 'BIF' },
	{ code: 'bm', name: 'Bermuda', currencyCode: 'BMD' },
	{ code: 'bn', name: 'Brunei Darussalam', currencyCode: 'BND' },
	{ code: 'bo', name: 'Bolivia (Plurinational State of)', currencyCode: 'BOB' },
	{ code: 'br', name: 'Brazil', currencyCode: 'BRL' },
	{ code: 'bs', name: 'Bahamas', currencyCode: 'BSD' },
	{ code: 'bt', name: 'Bhutan', currencyCode: 'BTN' },
	{ code: 'bv', name: 'Bouvet Island', currencyCode: 'NOK' },
	{ code: 'bw', name: 'Botswana', currencyCode: 'BWP' },
	{ code: 'by', name: 'Belarus', currencyCode: 'BYR' },
	{ code: 'bz', name: 'Belize', currencyCode: 'BZD' },
	{ code: 'ca', name: 'Canada', currencyCode: 'CAD' },
	{ code: 'cd', name: 'Democratic Republic of the Congo', currencyCode: 'CDF' },
	{ code: 'cg', name: 'Republic of the Congo', currencyCode: 'CDF' },
	{ code: 'ch', name: 'Switzerland', currencyCode: 'CHF' },
	{ code: 'cl', name: 'Chile', currencyCode: 'CLP' },
	{ code: 'cn', name: 'China', currencyCode: 'CNY' },
	{ code: 'co', name: 'Colombia', currencyCode: 'COP' },
	{ code: 'cr', name: 'Costa Rica', currencyCode: 'CRC' },
	{ code: 'cu', name: 'Cuba', currencyCode: 'CUP' },
	{ code: 'cv', name: 'Cabo Verde', currencyCode: 'CVE' },
	{ code: 'cz', name: 'Czech Republic', currencyCode: 'CZK' },
	{ code: 'dj', name: 'Djibouti', currencyCode: 'DJF' },
	{ code: 'dk', name: 'Denmark', currencyCode: 'DKK' },
	{ code: 'do', name: 'Dominican Republic', currencyCode: 'DOP' },
	{ code: 'dz', name: 'Algeria', currencyCode: 'DZD' },
	{ code: 'eg', name: 'Egypt', currencyCode: 'EGP' },
	{ code: 'eh', name: 'Western Sahara', currencyCode: 'MAD' },
	{ code: 'er', name: 'Eritrea', currencyCode: 'ERN' },
	{ code: 'et', name: 'Ethiopia', currencyCode: 'ETB' },
	{ code: 'eu', name: 'Europe', currencyCode: 'EUR' },
	{ code: 'fj', name: 'Fiji', currencyCode: 'FJD' },
	{ code: 'fk', name: 'Falkland Islands', currencyCode: 'FKP' },
	{ code: 'gb', name: 'United Kingdom', currencyCode: 'GBP' },
	{ code: 'ge', name: 'Georgia', currencyCode: 'GEL' },
	{ code: 'gg', name: 'Guernsey', currencyCode: 'GGP' },
	{ code: 'gh', name: 'Ghana', currencyCode: 'GHS' },
	{ code: 'gi', name: 'Gibraltar', currencyCode: 'GIP' },
	{ code: 'gl', name: 'Greenland', currencyCode: 'DKK' },
	{ code: 'gm', name: 'Gambia', currencyCode: 'GMD' },
	{ code: 'gn', name: 'Guinea', currencyCode: 'GNF' },
	{ code: 'gt', name: 'Guatemala', currencyCode: 'GTQ' },
	{ code: 'gy', name: 'Guyana', currencyCode: 'GYD' },
	{ code: 'hk', name: 'Hong Kong', currencyCode: 'HKD' },
	{ code: 'hn', name: 'Honduras', currencyCode: 'HNL' },
	{ code: 'ht', name: 'Haiti', currencyCode: 'HTG' },
	{ code: 'hu', name: 'Hungary', currencyCode: 'HUF' },
	{ code: 'id', name: 'Indonesia', currencyCode: 'IDR' },
	{ code: 'il', name: 'Israel', currencyCode: 'ILS' },
	{ code: 'im', name: 'Isle of Man', currencyCode: 'IMP' },
	{ code: 'in', name: 'India', currencyCode: 'INR' },
	{ code: 'iq', name: 'Iraq', currencyCode: 'IQD' },
	{ code: 'ir', name: 'Iran (Islamic Republic of)', currencyCode: 'IRR' },
	{ code: 'is', name: 'Iceland', currencyCode: 'ISK' },
	{ code: 'je', name: 'Jersey', currencyCode: 'JEP' },
	{ code: 'jm', name: 'Jamaica', currencyCode: 'JMD' },
	{ code: 'jo', name: 'Jordan', currencyCode: 'JOD' },
	{ code: 'jp', name: 'Japan', currencyCode: 'JPY' },
	{ code: 'ke', name: 'Kenya', currencyCode: 'KES' },
	{ code: 'kg', name: 'Kyrgyzstan', currencyCode: 'KGS' },
	{ code: 'kh', name: 'Cambodia', currencyCode: 'KHR' },
	{ code: 'km', name: 'Comoros', currencyCode: 'KMF' },
	{ code: 'kp', name: 'North Korea', currencyCode: 'KPW' },
	{ code: 'kr', name: 'South Korea', currencyCode: 'KRW' },
	{ code: 'kw', name: 'Kuwait', currencyCode: 'KWD' },
	{ code: 'ky', name: 'Cayman Islands', currencyCode: 'KYD' },
	{ code: 'kz', name: 'Kazakhstan', currencyCode: 'KZT' },
	{ code: 'la', name: 'Laos', currencyCode: 'LAK' },
	{ code: 'lb', name: 'Lebanon', currencyCode: 'LBP' },
	{ code: 'li', name: 'Liechtenstein', currencyCode: 'CHF' },
	{ code: 'lk', name: 'Sri Lanka', currencyCode: 'LKR' },
	{ code: 'lr', name: 'Liberia', currencyCode: 'LRD' },
	{ code: 'ls', name: 'Lesotho', currencyCode: 'LSL' },
	{ code: 'ly', name: 'Libya', currencyCode: 'LYD' },
	{ code: 'ma', name: 'Morocco', currencyCode: 'MAD' },
	{ code: 'md', name: 'Moldova', currencyCode: 'MDL' },
	{ code: 'mg', name: 'Madagascar', currencyCode: 'MGA' },
	{ code: 'mk', name: 'North Macedonia', currencyCode: 'MKD' },
	{ code: 'mn', name: 'Mongolia', currencyCode: 'MNT' },
	{ code: 'mo', name: 'Macau', currencyCode: 'MOP' },
	{ code: 'mr', name: 'Mauritania', currencyCode: 'MRO' },
	{ code: 'mu', name: 'Mauritius', currencyCode: 'MUR' },
	{ code: 'mv', name: 'Maldives', currencyCode: 'MVR' },
	{ code: 'mw', name: 'Malawi', currencyCode: 'MWK' },
	{ code: 'mx', name: 'Mexico', currencyCode: 'MXN' },
	{ code: 'my', name: 'Malaysia', currencyCode: 'MYR' },
	{ code: 'mz', name: 'Mozambique', currencyCode: 'MZN' },
	{ code: 'na', name: 'Namibia', currencyCode: 'NAD' },
	{ code: 'ng', name: 'Nigeria', currencyCode: 'NGN' },
	{ code: 'ni', name: 'Nicaragua', currencyCode: 'NIO' },
	{ code: 'no', name: 'Norway', currencyCode: 'NOK' },
	{ code: 'np', name: 'Nepal', currencyCode: 'NPR' },
	{ code: 'nu', name: 'Niue', currencyCode: 'NZD' },
	{ code: 'nz', name: 'New Zealand', currencyCode: 'NZD' },
	{ code: 'om', name: 'Oman', currencyCode: 'OMR' },
	{ code: 'pa', name: 'Panama', currencyCode: 'PAB' },
	{ code: 'pe', name: 'Peru', currencyCode: 'PEN' },
	{ code: 'pg', name: 'Papua New Guinea', currencyCode: 'PGK' },
	{ code: 'ph', name: 'Philippines', currencyCode: 'PHP' },
	{ code: 'pk', name: 'Pakistan', currencyCode: 'PKR' },
	{ code: 'pl', name: 'Poland', currencyCode: 'PLN' },
	{ code: 'pn', name: 'Pitcairn', currencyCode: 'NZD' },
	{ code: 'ps', name: 'State of Palestine', currencyCode: 'ILS' },
	{ code: 'py', name: 'Paraguay', currencyCode: 'PYG' },
	{ code: 'qa', name: 'Qatar', currencyCode: 'QAR' },
	{ code: 'ro', name: 'Romania', currencyCode: 'RON' },
	{ code: 'rs', name: 'Serbia', currencyCode: 'RSD' },
	{ code: 'ru', name: 'Russia', currencyCode: 'RUB' },
	{ code: 'rw', name: 'Rwanda', currencyCode: 'RWF' },
	{ code: 'sa', name: 'Saudi Arabia', currencyCode: 'SAR' },
	{ code: 'sb', name: 'Solomon Islands', currencyCode: 'SBD' },
	{ code: 'sc', name: 'Seychelles', currencyCode: 'SCR' },
	{ code: 'sd', name: 'Sudan', currencyCode: 'SDG' },
	{ code: 'se', name: 'Sweden', currencyCode: 'SEK' },
	{ code: 'sg', name: 'Singapore', currencyCode: 'SGD' },
	{
		code: 'sh',
		name: 'Saint Helena, Ascension and Tristan da Cunha',
		currencyCode: 'SHP',
	},
	{ code: 'sj', name: 'Svalbard and Jan Mayen', currencyCode: 'NOK' },
	{ code: 'sl', name: 'Sierra Leone', currencyCode: 'SLL' },
	{ code: 'so', name: 'Somalia', currencyCode: 'SOS' },
	{ code: 'sr', name: 'Suriname', currencyCode: 'SRD' },
	{ code: 'st', name: 'Sao Tome and Principe', currencyCode: 'STD' },
	{ code: 'sx', name: 'Sint Maarten', currencyCode: 'ANG' },
	{ code: 'sy', name: 'Syrian Arab Republic', currencyCode: 'SYP' },
	{ code: 'th', name: 'Thailand', currencyCode: 'THB' },
	{ code: 'tj', name: 'Tajikistan', currencyCode: 'TJS' },
	{ code: 'tk', name: 'Tokelau', currencyCode: 'NZD' },
	{ code: 'tm', name: 'Turkmenistan', currencyCode: 'TMT' },
	{ code: 'tn', name: 'Tunisia', currencyCode: 'TND' },
	{ code: 'to', name: 'Tonga', currencyCode: 'TOP' },
	{ code: 'tr', name: 'Turkey', currencyCode: 'TRY' },
	{ code: 'tt', name: 'Trinidad and Tobago', currencyCode: 'TTD' },
	{ code: 'tw', name: 'Taiwan', currencyCode: 'TWD' },
	{ code: 'tz', name: 'Tanzania', currencyCode: 'TZS' },
	{ code: 'ua', name: 'Ukraine', currencyCode: 'UAH' },
	{ code: 'ug', name: 'Uganda', currencyCode: 'UGX' },
	{ code: 'us', name: 'United States of America', currencyCode: 'USD' },
	{ code: 'uy', name: 'Uruguay', currencyCode: 'UYU' },
	{ code: 'uz', name: 'Uzbekistan', currencyCode: 'UZS' },
	{ code: 'vn', name: 'Vietnam', currencyCode: 'VND' },
	{ code: 'vu', name: 'Vanuatu', currencyCode: 'VUV' },
	{ code: 'ws', name: 'Samoa', currencyCode: 'WST' },
	{ code: 'ye', name: 'Yemen', currencyCode: 'YER' },
	{ code: 'za', name: 'South Africa', currencyCode: 'ZAR' },
	{ code: 'zm', name: 'Zambia', currencyCode: 'ZMW' },
	{ code: 'zw', name: 'Zimbabwe', currencyCode: 'ZWL' },
	{ code: '_none_country__btc', name: 'BITCOIN', currencyCode: 'BTC' },
];

export const countries = data;

export const currencyMap = data.reduce((acc, item) => {
	acc[item.currencyCode] = item.code;

	return acc;
}, {} as Record<string, string>);
