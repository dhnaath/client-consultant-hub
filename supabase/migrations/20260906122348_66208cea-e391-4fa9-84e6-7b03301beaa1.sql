CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  industri text NOT NULL DEFAULT 'Umum',
  kbli text,
  pic text,
  email text,
  telepon text,
  kota text,
  status text NOT NULL DEFAULT 'aktif',
  nilai_kontrak numeric NOT NULL DEFAULT 0,
  catatan text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  nama text NOT NULL,
  ringkasan text,
  status text NOT NULL DEFAULT 'berjalan',
  prioritas text NOT NULL DEFAULT 'sedang',
  tanggal_mulai date,
  tanggal_selesai date,
  progres int NOT NULL DEFAULT 0,
  nilai numeric NOT NULL DEFAULT 0,
  konsultan text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  judul text NOT NULL,
  deskripsi text,
  status text NOT NULL DEFAULT 'todo',
  prioritas text NOT NULL DEFAULT 'sedang',
  tenggat date,
  penanggung_jawab text,
  estimasi_jam numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  judul text NOT NULL,
  jenis text NOT NULL DEFAULT 'dokumen',
  status text NOT NULL DEFAULT 'draft',
  jatuh_tempo date,
  versi text DEFAULT 'v1.0',
  tautan text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  judul text NOT NULL,
  isi text,
  kategori text NOT NULL DEFAULT 'umum',
  tags text[] NOT NULL DEFAULT '{}',
  dipin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  jenis text NOT NULL DEFAULT 'catatan',
  judul text NOT NULL,
  deskripsi text,
  waktu timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deliverables TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.activities TO anon, authenticated;
GRANT ALL ON public.clients, public.projects, public.tasks, public.deliverables, public.notes, public.activities TO service_role;

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "akses publik clients" ON public.clients FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "akses publik projects" ON public.projects FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "akses publik tasks" ON public.tasks FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "akses publik deliverables" ON public.deliverables FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "akses publik notes" ON public.notes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "akses publik activities" ON public.activities FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER t_clients_updated BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_tasks_updated BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_deliverables_updated BEFORE UPDATE ON public.deliverables FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_notes_updated BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.clients (id, nama, industri, kbli, pic, email, telepon, kota, status, nilai_kontrak, catatan) VALUES
('11111111-1111-1111-1111-111111111111','PT Nusantara Agro Lestari','Agribisnis','01111','Bapak Wirawan','wirawan@nusantaraagro.co.id','+62 811-2345-6789','Surabaya','aktif',480000000,'Ekspansi kebun dan restrukturisasi organisasi.'),
('22222222-2222-2222-2222-222222222222','CV Bahari Logistik','Logistik','52291','Ibu Rina Puspita','rina@baharilog.id','+62 812-9988-7766','Makassar','aktif',265000000,'Fokus efisiensi biaya operasional armada.'),
('33333333-3333-3333-3333-333333333333','PT Sentra Medika Prima','Kesehatan','86101','dr. Anindya','anindya@sentramedika.co.id','+62 813-5566-1122','Bandung','aktif',720000000,'Penyusunan SOP layanan dan akreditasi.'),
('44444444-4444-4444-4444-444444444444','Koperasi Mitra Sejahtera','Keuangan Mikro','64141','Bapak Hasan','hasan@mitrasejahtera.or.id','+62 815-2211-3344','Yogyakarta','prospek',95000000,'Butuh pendampingan tata kelola dan digitalisasi.'),
('55555555-5555-5555-5555-555555555555','PT Kriya Tekstil Indonesia','Manufaktur','13112','Ibu Laras','laras@kriyatekstil.com','+62 816-7788-9900','Semarang','selesai',350000000,'Program lean manufacturing telah rampung.');

INSERT INTO public.projects (id, client_id, nama, ringkasan, status, prioritas, tanggal_mulai, tanggal_selesai, progres, nilai, konsultan) VALUES
('a1111111-0000-4000-8000-000000000001','11111111-1111-1111-1111-111111111111','Restrukturisasi Organisasi & KPI','Perancangan struktur organisasi baru, job grading, dan sistem KPI berbasis balanced scorecard.','berjalan','tinggi','2026-07-01','2026-10-31',62,320000000,'Dhia Najmi'),
('a1111111-0000-4000-8000-000000000002','11111111-1111-1111-1111-111111111111','Studi Kelayakan Ekspansi Kebun','Analisis kelayakan finansial dan operasional pembukaan lahan 250 ha.','berjalan','sedang','2026-08-15','2026-12-15',28,160000000,'Rangga Prasetyo'),
('a1111111-0000-4000-8000-000000000003','22222222-2222-2222-2222-222222222222','Efisiensi Biaya Operasional Armada','Pemetaan cost driver dan program penghematan bahan bakar serta rute.','berjalan','tinggi','2026-06-10','2026-09-30',78,145000000,'Dhia Najmi'),
('a1111111-0000-4000-8000-000000000004','33333333-3333-3333-3333-333333333333','Penyusunan SOP & Persiapan Akreditasi','Dokumentasi 42 SOP layanan klinis dan non-klinis serta simulasi survei akreditasi.','berjalan','tinggi','2026-05-02','2026-11-28',45,420000000,'Salsabila Rahma'),
('a1111111-0000-4000-8000-000000000005','44444444-4444-4444-4444-444444444444','Diagnostik Tata Kelola Koperasi','Asesmen awal tata kelola, kepatuhan, dan peta jalan digitalisasi.','perencanaan','sedang','2026-09-14',NULL,5,95000000,'Rangga Prasetyo'),
('a1111111-0000-4000-8000-000000000006','55555555-5555-5555-5555-555555555555','Program Lean Manufacturing','Implementasi 5S, value stream mapping, dan pelatihan kaizen.','selesai','rendah','2026-01-12','2026-06-20',100,350000000,'Salsabila Rahma');

INSERT INTO public.tasks (project_id, judul, deskripsi, status, prioritas, tenggat, penanggung_jawab, estimasi_jam) VALUES
('a1111111-0000-4000-8000-000000000001','Workshop validasi struktur organisasi','Fasilitasi workshop bersama direksi untuk validasi desain struktur.','berjalan','tinggi','2026-09-10','Dhia Najmi',8),
('a1111111-0000-4000-8000-000000000001','Finalisasi matriks job grading','Penyelarasan bobot jabatan dengan skala upah internal.','todo','tinggi','2026-09-18','Salsabila Rahma',12),
('a1111111-0000-4000-8000-000000000001','Draft kamus KPI direktorat','Menyusun definisi, formula, dan target KPI.','review','sedang','2026-09-25','Rangga Prasetyo',16),
('a1111111-0000-4000-8000-000000000001','Wawancara pemangku kepentingan','Wawancara 12 kepala bagian.','selesai','sedang','2026-08-22','Dhia Najmi',20),
('a1111111-0000-4000-8000-000000000002','Pengumpulan data harga komoditas','Riset harga 5 tahun terakhir untuk proyeksi pendapatan.','berjalan','sedang','2026-09-12','Rangga Prasetyo',10),
('a1111111-0000-4000-8000-000000000002','Model finansial 10 tahun','Membangun model DCF dan analisis sensitivitas.','todo','tinggi','2026-09-30','Rangga Prasetyo',24),
('a1111111-0000-4000-8000-000000000003','Analisis konsumsi BBM per rute','Olah data telematika 6 bulan.','selesai','tinggi','2026-08-28','Dhia Najmi',14),
('a1111111-0000-4000-8000-000000000003','Rancang skema insentif pengemudi','Skema insentif berbasis efisiensi dan keselamatan.','review','sedang','2026-09-08','Salsabila Rahma',9),
('a1111111-0000-4000-8000-000000000003','Presentasi hasil kuartal ke manajemen','Penyusunan deck dan sesi pemaparan.','todo','tinggi','2026-09-15','Dhia Najmi',6),
('a1111111-0000-4000-8000-000000000004','Penulisan SOP unit rawat jalan','12 SOP layanan rawat jalan.','berjalan','tinggi','2026-09-20','Salsabila Rahma',30),
('a1111111-0000-4000-8000-000000000004','Pelatihan internal auditor mutu','Pelatihan 2 hari untuk 15 peserta.','todo','sedang','2026-10-05','Dhia Najmi',16),
('a1111111-0000-4000-8000-000000000004','Simulasi survei akreditasi','Mock survey dan penyusunan temuan.','todo','tinggi','2026-11-02','Salsabila Rahma',20),
('a1111111-0000-4000-8000-000000000004','Gap analysis standar akreditasi','Pemetaan kesenjangan terhadap standar terbaru.','selesai','tinggi','2026-06-30','Rangga Prasetyo',18),
('a1111111-0000-4000-8000-000000000005','Kickoff meeting dengan pengurus','Penyelarasan ruang lingkup dan jadwal.','todo','sedang','2026-09-09','Rangga Prasetyo',3),
('a1111111-0000-4000-8000-000000000005','Kuesioner asesmen tata kelola','Distribusi dan rekap kuesioner pengurus & anggota.','todo','rendah','2026-09-26','Rangga Prasetyo',8),
('a1111111-0000-4000-8000-000000000006','Laporan penutupan proyek','Dokumentasi hasil dan rekomendasi keberlanjutan.','selesai','rendah','2026-06-18','Salsabila Rahma',10);

INSERT INTO public.deliverables (project_id, judul, jenis, status, jatuh_tempo, versi) VALUES
('a1111111-0000-4000-8000-000000000001','Laporan Desain Organisasi','laporan','review','2026-09-22','v0.9'),
('a1111111-0000-4000-8000-000000000001','Kamus KPI Korporat','dokumen','draft','2026-10-10','v0.4'),
('a1111111-0000-4000-8000-000000000002','Laporan Studi Kelayakan','laporan','draft','2026-12-05','v0.2'),
('a1111111-0000-4000-8000-000000000003','Roadmap Efisiensi Biaya','presentasi','disetujui','2026-09-05','v1.2'),
('a1111111-0000-4000-8000-000000000004','Paket 42 SOP Layanan','dokumen','review','2026-10-25','v0.7'),
('a1111111-0000-4000-8000-000000000004','Laporan Mock Survey','laporan','draft','2026-11-15','v0.1'),
('a1111111-0000-4000-8000-000000000006','Laporan Akhir Lean Manufacturing','laporan','disetujui','2026-06-20','v1.0');

INSERT INTO public.notes (client_id, project_id, judul, isi, kategori, tags, dipin) VALUES
('11111111-1111-1111-1111-111111111111','a1111111-0000-4000-8000-000000000001','Notulen Rapat Direksi 28 Agu 2026','Direksi menyetujui pengurangan satu layer manajemen menengah. Tindak lanjut: simulasi dampak biaya SDM dan rencana komunikasi perubahan sebelum 15 September.','notulen','{"organisasi","direksi"}',true),
('22222222-2222-2222-2222-222222222222','a1111111-0000-4000-8000-000000000003','Temuan Awal Efisiensi Armada','Tiga rute utama menyumbang 61% konsumsi BBM. Potensi penghematan 12-15% melalui optimasi muatan balik dan pembatasan idle time.','temuan','{"logistik","efisiensi"}',true),
('33333333-3333-3333-3333-333333333333','a1111111-0000-4000-8000-000000000004','Checklist Kesiapan Akreditasi','Daftar 8 kelompok standar beserta status dokumen, penanggung jawab, dan bukti implementasi yang masih perlu dilengkapi.','checklist','{"kesehatan","akreditasi"}',false),
(NULL,NULL,'Template Proposal Konsultansi','Kerangka standar proposal: latar belakang, ruang lingkup, metodologi, jadwal, tim, dan investasi. Gunakan untuk semua penawaran baru.','template','{"internal","proposal"}',true),
(NULL,NULL,'Metodologi Balanced Scorecard','Panduan ringkas empat perspektif, cascading KPI, serta kesalahan umum saat menurunkan target ke level unit.','metodologi','{"knowledge","kpi"}',false),
('44444444-4444-4444-4444-444444444444',NULL,'Catatan Pertemuan Awal Koperasi','Pengurus menginginkan pendampingan 6 bulan, termasuk pelatihan pembukuan digital untuk 4 staf.','notulen','{"koperasi","prospek"}',false);

INSERT INTO public.activities (client_id, project_id, jenis, judul, deskripsi, waktu) VALUES
('11111111-1111-1111-1111-111111111111','a1111111-0000-4000-8000-000000000001','rapat','Workshop struktur organisasi sesi 2','Dihadiri direksi dan 6 kepala divisi.','2026-09-04 09:00+07'),
('22222222-2222-2222-2222-222222222222','a1111111-0000-4000-8000-000000000003','deliverable','Roadmap efisiensi disetujui klien','Disetujui tanpa revisi mayor.','2026-09-05 14:30+07'),
('33333333-3333-3333-3333-333333333333','a1111111-0000-4000-8000-000000000004','tugas','12 SOP rawat jalan masuk tahap review','Review oleh komite mutu internal.','2026-09-03 11:15+07'),
('44444444-4444-4444-4444-444444444444','a1111111-0000-4000-8000-000000000005','klien','Proposal diagnostik dikirim','Menunggu keputusan rapat pengurus.','2026-09-02 16:00+07'),
('11111111-1111-1111-1111-111111111111','a1111111-0000-4000-8000-000000000002','catatan','Data harga komoditas terkumpul 70%','Sumber: BPS dan asosiasi industri.','2026-09-01 10:00+07'),
('55555555-5555-5555-5555-555555555555','a1111111-0000-4000-8000-000000000006','deliverable','Laporan akhir lean manufacturing diserahkan','Proyek resmi ditutup.','2026-06-20 15:00+07');