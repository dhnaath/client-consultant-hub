import { queryOptions } from "@tanstack/react-query";

export type Client = {
  id: string;
  nama: string;
  industri: string;
  kbli: string | null;
  pic: string | null;
  email: string | null;
  telepon: string | null;
  kota: string | null;
  status: string;
  nilai_kontrak: number;
  catatan: string | null;
};

export type Project = {
  id: string;
  client_id: string | null;
  nama: string;
  ringkasan: string | null;
  status: string;
  prioritas: string;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
  progres: number;
  nilai: number;
  konsultan: string | null;
};

export type Task = {
  id: string;
  project_id: string | null;
  judul: string;
  deskripsi: string | null;
  status: string;
  prioritas: string;
  tenggat: string | null;
  penanggung_jawab: string | null;
  estimasi_jam: number;
};

export type Deliverable = {
  id: string;
  project_id: string | null;
  judul: string;
  jenis: string;
  status: string;
  jatuh_tempo: string | null;
  versi: string | null;
};

export type Note = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  judul: string;
  isi: string | null;
  kategori: string;
  tags: string[];
  dipin: boolean;
  updated_at: string;
};

export type Activity = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  jenis: string;
  judul: string;
  deskripsi: string | null;
  waktu: string;
};

// --- STATIC MOCK DATA ---
const MOCK_CLIENTS: Client[] = [
  {
    id: "c1",
    nama: "PT Makmur Jaya",
    industri: "Manufaktur",
    kbli: "10110",
    pic: "Budi Santoso",
    email: "budi@makmur.com",
    telepon: "08123456789",
    kota: "Jakarta",
    status: "aktif",
    nilai_kontrak: 150000000,
    catatan: "",
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    client_id: "c1",
    nama: "Audit Keuangan Tahunan",
    ringkasan: "Audit laporan keuangan 2025",
    status: "berjalan",
    prioritas: "tinggi",
    tanggal_mulai: "2026-01-10",
    tanggal_selesai: "2026-03-15",
    progres: 45,
    nilai: 75000000,
    konsultan: "Andi",
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    project_id: "p1",
    judul: "Review dokumen Q1",
    deskripsi: "",
    status: "selesai",
    prioritas: "sedang",
    tenggat: "2026-02-01",
    penanggung_jawab: "Andi",
    estimasi_jam: 10,
  },
  {
    id: "t2",
    project_id: "p1",
    judul: "Wawancara tim finance",
    deskripsi: "",
    status: "berjalan",
    prioritas: "tinggi",
    tenggat: "2026-02-15",
    penanggung_jawab: "Andi",
    estimasi_jam: 5,
  },
];

const MOCK_DELIVERABLES: Deliverable[] = [
  {
    id: "d1",
    project_id: "p1",
    judul: "Laporan Interim",
    jenis: "Dokumen",
    status: "selesai",
    jatuh_tempo: "2026-02-28",
    versi: "v1.0",
  },
];

const MOCK_NOTES: Note[] = [];
const MOCK_ACTIVITIES: Activity[] = [];

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    client_id: "c1",
    project_id: "p1",
    pengirim: "konsultan",
    nama_pengirim: "Andi",
    isi: "Halo Pak Budi, dokumen Q1 sudah kami review.",
    dibaca: true,
    created_at: "2026-02-01T10:00:00Z",
  },
];

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc1",
    client_id: "c1",
    project_id: "p1",
    nama: "Laporan Interim Q1.pdf",
    jenis: "PDF",
    ukuran: "2.4 MB",
    versi: "v1.0",
    tautan: "#",
    diunggah_oleh: "Andi",
    dibagikan_ke_klien: true,
    created_at: "2026-02-28T09:00:00Z",
  },
];

const MOCK_MEETINGS: Meeting[] = [
  {
    id: "mt1",
    client_id: "c1",
    project_id: "p1",
    judul: "Kickoff Audit",
    agenda: "Pembahasan scope kerja",
    mulai: "2026-01-10T14:00:00Z",
    durasi_menit: 60,
    lokasi: "Zoom",
    tipe: "online",
    status: "selesai",
    created_at: "2026-01-05T09:00:00Z",
  },
];

async function fetchAll<T>(table: string, order: string, asc = true): Promise<T[]> {
  switch (table) {
    case "clients":
      return MOCK_CLIENTS as unknown as T[];
    case "projects":
      return MOCK_PROJECTS as unknown as T[];
    case "tasks":
      return MOCK_TASKS as unknown as T[];
    case "deliverables":
      return MOCK_DELIVERABLES as unknown as T[];
    case "notes":
      return MOCK_NOTES as unknown as T[];
    case "activities":
      return MOCK_ACTIVITIES as unknown as T[];
    case "messages":
      return MOCK_MESSAGES as unknown as T[];
    case "documents":
      return MOCK_DOCUMENTS as unknown as T[];
    case "meetings":
      return MOCK_MEETINGS as unknown as T[];
    default:
      return [];
  }
}

export const clientsQuery = queryOptions({
  queryKey: ["clients"],
  queryFn: () => fetchAll<Client>("clients", "nama"),
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: () => fetchAll<Project>("projects", "tanggal_selesai"),
});

export const tasksQuery = queryOptions({
  queryKey: ["tasks"],
  queryFn: () => fetchAll<Task>("tasks", "tenggat"),
});

export const deliverablesQuery = queryOptions({
  queryKey: ["deliverables"],
  queryFn: () => fetchAll<Deliverable>("deliverables", "jatuh_tempo"),
});

export const notesQuery = queryOptions({
  queryKey: ["notes"],
  queryFn: () => fetchAll<Note>("notes", "updated_at", false),
});

export const activitiesQuery = queryOptions({
  queryKey: ["activities"],
  queryFn: () => fetchAll<Activity>("activities", "waktu", false),
});

export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

export const rupiahRingkas = (n: number) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} jt`;
  return rupiah(n);
};

export const tanggal = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "—";

export const tanggalPendek = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "—";

export const waktuRelatif = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  const hari = Math.floor(diff / 86400000);
  if (hari <= 0) return "hari ini";
  if (hari === 1) return "kemarin";
  if (hari < 30) return `${hari} hari lalu`;
  return tanggal(d);
};

export const statusTugas: Record<string, string> = {
  todo: "Belum mulai",
  berjalan: "Dikerjakan",
  review: "Review",
  selesai: "Selesai",
};

export const statusProyek: Record<string, string> = {
  perencanaan: "Perencanaan",
  berjalan: "Berjalan",
  tertahan: "Tertahan",
  selesai: "Selesai",
};

export const sisaHari = (d: string | null) => {
  if (!d) return null;
  const target = new Date(d + "T23:59:59");
  return Math.ceil((target.getTime() - Date.now()) / 86400000);
};

/* ---------------- Sisi klien ---------------- */

export type Message = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  pengirim: string;
  nama_pengirim: string;
  isi: string;
  dibaca: boolean;
  created_at: string;
};

export type Document = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  nama: string;
  jenis: string;
  ukuran: string | null;
  versi: string | null;
  tautan: string | null;
  diunggah_oleh: string | null;
  dibagikan_ke_klien: boolean;
  created_at: string;
};

export type Meeting = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  judul: string;
  agenda: string | null;
  mulai: string;
  durasi_menit: number;
  lokasi: string | null;
  tipe: string;
  status: string;
  created_at: string;
};

export const messagesQuery = queryOptions({
  queryKey: ["messages"],
  queryFn: () => fetchAll<Message>("messages", "created_at"),
});

export const documentsQuery = queryOptions({
  queryKey: ["documents"],
  queryFn: () => fetchAll<Document>("documents", "created_at", false),
});

export const meetingsQuery = queryOptions({
  queryKey: ["meetings"],
  queryFn: () => fetchAll<Meeting>("meetings", "mulai"),
});

export const jamMenit = (d: string) =>
  new Date(d).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

export const tanggalJam = (d: string) => `${tanggal(d)} · ${jamMenit(d)}`;

export const hariPendek = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { weekday: "short" });
