import { useQueries } from "@tanstack/react-query";
import {
  activitiesQuery,
  clientsQuery,
  deliverablesQuery,
  documentsQuery,
  meetingsQuery,
  messagesQuery,
  projectsQuery,
  tasksQuery,
} from "@/lib/data";
import { useProfil } from "@/lib/profile";

export function useDataKlien() {
  const { clientId } = useProfil();
  const hasil = useQueries({
    queries: [
      clientsQuery,
      projectsQuery,
      tasksQuery,
      deliverablesQuery,
      activitiesQuery,
      messagesQuery,
      documentsQuery,
      meetingsQuery,
    ],
  });
  const [c, p, t, d, a, m, doc, mt] = hasil;

  const klien = (c.data ?? []).find((k) => k.id === clientId) ?? null;
  const proyek = (p.data ?? []).filter((x) => x.client_id === clientId);
  const idProyek = new Set(proyek.map((x) => x.id));

  return {
    memuat: hasil.some((q) => q.isLoading),
    klien,
    proyek,
    tugas: (t.data ?? []).filter((x) => x.project_id && idProyek.has(x.project_id)),
    deliverables: (d.data ?? []).filter((x) => x.project_id && idProyek.has(x.project_id)),
    aktivitas: (a.data ?? []).filter((x) => x.client_id === clientId),
    pesan: (m.data ?? []).filter((x) => x.client_id === clientId),
    dokumen: (doc.data ?? []).filter((x) => x.client_id === clientId && x.dibagikan_ke_klien),
    jadwal: (mt.data ?? []).filter((x) => x.client_id === clientId),
    namaProyek: (id: string | null) => proyek.find((x) => x.id === id)?.nama ?? "Umum",
  };
}
