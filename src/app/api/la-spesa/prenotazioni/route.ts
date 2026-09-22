import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type VoceRichiesta = {
  id: string;
  nome: string;
  quantita: number;
};

type CorpoRichiesta = {
  nome?: string;
  email?: string;
  telefono?: string;
  note?: string;
  voci?: VoceRichiesta[];
};

/**
 * Inserisce una prenotazione "spesa" in Supabase.
 *
 * La RLS su `prenotazioni` (vedi supabase/schema.sql) non consente inserimenti
 * al client anonimo: solo agli operatori autenticati. Questa route, server
 * side con la service role key, è il varco previsto per il sito pubblico —
 * ospite o cliente registrato, la scrittura passa sempre da qui.
 */
export async function POST(richiesta: Request) {
  let corpo: CorpoRichiesta;
  try {
    corpo = await richiesta.json();
  } catch {
    return NextResponse.json({ errore: "Corpo non valido." }, { status: 400 });
  }

  const nome = corpo.nome?.trim();
  const email = corpo.email?.trim();
  const telefono = corpo.telefono?.trim();
  const voci = corpo.voci;

  if (!nome || !email || !telefono || !voci?.length) {
    return NextResponse.json(
      { errore: "Nome, email, telefono e almeno un prodotto sono obbligatori." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { errore: "Servizio non disponibile al momento. Riprova più tardi." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("prenotazioni").insert({
    tipo: "spesa",
    nome,
    email,
    telefono,
    note: corpo.note?.trim() || null,
    dettaglio: { voci },
    stato: "in_attesa",
    pagamento: "in_loco",
  });

  if (error) {
    return NextResponse.json(
      { errore: "Non siamo riusciti a registrare la prenotazione. Riprova più tardi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
