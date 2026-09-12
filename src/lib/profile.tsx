import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Peran = "konsultan" | "klien";

const KUNCI = "clientos-profil";
const KLIEN_BAWAAN = "11111111-1111-1111-1111-111111111111";

type Profil = {
  peran: Peran;
  clientId: string;
  siap: boolean;
  gantiPeran: (p: Peran) => void;
  gantiKlien: (id: string) => void;
};

const KonteksProfil = createContext<Profil | null>(null);

export function PenyediaProfil({ children }: { children: ReactNode }) {
  const [peran, setPeran] = useState<Peran>("konsultan");
  const [clientId, setClientId] = useState<string>(KLIEN_BAWAAN);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const mentah = window.localStorage.getItem(KUNCI);
      if (mentah) {
        const tersimpan = JSON.parse(mentah) as Partial<{ peran: Peran; clientId: string }>;
        if (tersimpan.peran === "klien" || tersimpan.peran === "konsultan")
          setPeran(tersimpan.peran);
        if (typeof tersimpan.clientId === "string" && tersimpan.clientId) {
          setClientId(tersimpan.clientId);
        }
      }
    } catch {
      /* abaikan penyimpanan yang rusak */
    }
    setSiap(true);
  }, []);

  const simpan = useCallback((next: { peran: Peran; clientId: string }) => {
    try {
      window.localStorage.setItem(KUNCI, JSON.stringify(next));
    } catch {
      /* abaikan */
    }
  }, []);

  const gantiPeran = useCallback(
    (p: Peran) => {
      setPeran(p);
      simpan({ peran: p, clientId });
    },
    [clientId, simpan],
  );

  const gantiKlien = useCallback(
    (id: string) => {
      setClientId(id);
      simpan({ peran, clientId: id });
    },
    [peran, simpan],
  );

  const nilai = useMemo(
    () => ({ peran, clientId, siap, gantiPeran, gantiKlien }),
    [peran, clientId, siap, gantiPeran, gantiKlien],
  );

  return <KonteksProfil.Provider value={nilai}>{children}</KonteksProfil.Provider>;
}

export function useProfil() {
  const konteks = useContext(KonteksProfil);
  if (!konteks) throw new Error("useProfil harus dipakai di dalam PenyediaProfil");
  return konteks;
}
