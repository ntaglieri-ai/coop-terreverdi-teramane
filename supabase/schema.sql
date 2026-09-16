-- ===========================================================================
-- Cooperativa Agricola Terre Verdi Teramane — schema Postgres (Supabase)
--
-- BOZZA: questo file NON e' ancora stato applicato al progetto Supabase.
-- Applicarlo dall'SQL Editor solo dopo revisione.
--
-- Nota: gli utenti/operatori NON vanno creati finche' il pannello admin non
-- esiste e non e' pronto da testare.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Catalogo
-- ---------------------------------------------------------------------------

CREATE TABLE prodotti (
  id SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  categoria VARCHAR NOT NULL,
  descrizione TEXT,
  unita VARCHAR NOT NULL,
  immagine VARCHAR,
  prenotabile BOOLEAN DEFAULT true,
  attivo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Un lotto e' la singola partita raccolta di un prodotto: e' il livello a cui
-- vivono prezzo, disponibilita' e tracciabilita' (campo, comune, data).
CREATE TABLE lotti (
  id SERIAL PRIMARY KEY,
  prodotto_id INTEGER REFERENCES prodotti(id),
  codice_lotto VARCHAR,
  prezzo NUMERIC(10,2),
  kg_disponibili NUMERIC(10,2),
  campo VARCHAR,
  comune VARCHAR,
  data_raccolta DATE,
  attivo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Slot e prenotazioni
-- ---------------------------------------------------------------------------

-- 'ricorrente' = finestra di ritiro della spesa; 'evento' = appuntamento a
-- calendario con titolo e prezzo.
CREATE TABLE slot (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR NOT NULL, -- 'ricorrente' | 'evento'
  data DATE NOT NULL,
  fascia_oraria VARCHAR,
  titolo VARCHAR,
  descrizione TEXT,
  prezzo NUMERIC(10,2),
  capacita_max INTEGER NOT NULL,
  capacita_occupata INTEGER DEFAULT 0,
  attivo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE prenotazioni (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR NOT NULL, -- 'spesa' | 'evento'
  slot_id INTEGER REFERENCES slot(id),
  nome VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  telefono VARCHAR NOT NULL,
  note TEXT,
  dettaglio JSONB,
  stato VARCHAR DEFAULT 'in_attesa', -- 'in_attesa' | 'confermata' | 'ritirata' | 'annullata'
  pagamento VARCHAR NOT NULL, -- 'in_loco' | 'online'
  stripe_session_id VARCHAR,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_prenotazioni_tipo_stato ON prenotazioni(tipo, stato);
CREATE INDEX idx_slot_data ON slot(data);

-- ---------------------------------------------------------------------------
-- Operatori del pannello admin, collegati a auth.users di Supabase
-- ---------------------------------------------------------------------------

CREATE TABLE operatori (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nome VARCHAR,
  ruolo VARCHAR DEFAULT 'operatore' -- 'admin' | 'operatore'
);

-- ===========================================================================
-- Row Level Security
--
-- I permessi stanno qui, non sparsi in controlli manuali dentro le API route.
-- Regola: il pubblico legge solo cio' che e' attivo; gli operatori (riga in
-- `operatori`) gestiscono tutto.
-- ===========================================================================

ALTER TABLE prodotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot ENABLE ROW LEVEL SECURITY;
ALTER TABLE prenotazioni ENABLE ROW LEVEL SECURITY;
ALTER TABLE operatori ENABLE ROW LEVEL SECURITY;

-- Helper: l'utente autenticato e' un operatore censito?
-- SECURITY DEFINER per evitare ricorsione con le policy su `operatori`.
CREATE OR REPLACE FUNCTION is_operatore()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM operatori WHERE id = auth.uid());
$$;

-- Catalogo: lettura pubblica del solo contenuto attivo.
CREATE POLICY "prodotti attivi leggibili da tutti"
  ON prodotti FOR SELECT USING (attivo = true);
CREATE POLICY "prodotti gestiti dagli operatori"
  ON prodotti FOR ALL TO authenticated
  USING (is_operatore()) WITH CHECK (is_operatore());

CREATE POLICY "lotti attivi leggibili da tutti"
  ON lotti FOR SELECT USING (attivo = true);
CREATE POLICY "lotti gestiti dagli operatori"
  ON lotti FOR ALL TO authenticated
  USING (is_operatore()) WITH CHECK (is_operatore());

CREATE POLICY "slot attivi leggibili da tutti"
  ON slot FOR SELECT USING (attivo = true);
CREATE POLICY "slot gestiti dagli operatori"
  ON slot FOR ALL TO authenticated
  USING (is_operatore()) WITH CHECK (is_operatore());

-- Prenotazioni: nessuna lettura pubblica (contengono dati personali).
-- L'inserimento dal sito passa da route server-side, non dal client anon.
CREATE POLICY "prenotazioni gestite dagli operatori"
  ON prenotazioni FOR ALL TO authenticated
  USING (is_operatore()) WITH CHECK (is_operatore());

-- Operatori: ognuno vede la propria riga; l'admin le vede tutte.
CREATE POLICY "operatore vede se stesso"
  ON operatori FOR SELECT TO authenticated
  USING (id = auth.uid());
