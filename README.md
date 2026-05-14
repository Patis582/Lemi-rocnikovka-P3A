# Lemi – Tréninkový deník

Webová aplikace (PWA) pro skoky na trampolíně, která nahrazuje papírové tréninkové deníky. Umožňuje zapisovat tréninky pomocí FIG numerického systému, automaticky počítá obtížnost sestav a zobrazuje statistiky napříč celou historií tréninků.

## Aplikace

Nasazeno na Vercelu – dostupné bez instalace v prohlížeči i jako PWA na telefonu:

👉 **[rp-2025-26-patrman-filip-lemi-treni.vercel.app](https://rp-2025-26-patrman-filip-lemi-treni.vercel.app/)**

## Co aplikace umí

- **Logování tréninku** – zápis kol přes SmartKeyboard navrženou pro FIG kódy
- **Výpočet obtížnosti** – každý prvek se dohledá ve slovníku a obtížnost se spočítá automaticky
- **Návrhy prvků** – systém sleduje historii posledních 6 měsíců a navrhuje nejpravděpodobnější další prvek
- **Dashboard** – přehled statistik s grafy: obtížnost, ToF, závodní sestavy, nejčastější prvky
- **Sekce Skills** – kompletní FIG slovník s možností označit stav zvládnutí každého prvku
- **PWA** – funguje na iOS, Android, Windows i macOS, lze přidat na domovskou obrazovku

## Spuštění lokálně

### Požadavky

- Node.js 18+
- npm
- Účet na [Supabase](https://supabase.com) s nastavenou databází

### Instalace

```bash
git clone https://github.com/pslib-cz/RP2025-26_Patrman-Filip_Lemi-Treninkovy-denik.git
cd RP2025-26_Patrman-Filip_Lemi-Treninkovy-denik
npm install
```

### env

Vytvoř soubor `.env` v kořeni projektu:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Spuštění

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

### Build pro produkci

```bash
npm run build
npm run start
```

## Autor

Filip Patrman – ročníková práce, SPŠ a VOŠ Liberec, 2025/2026
