interface Tugas {
	teks: string;
	selesai: boolean;
}
const dapatkanKunciHariIni = () => {
	const tanggal = new Date();
	return `tugas-${tanggal.toISOString().split('T')[0]}`; // Format: tugas-2025-05-10
};
export const state = $state({
	tugasBaru: '',
	tugas: [] as Tugas[],
	kunci: dapatkanKunciHariIni()
});
export function tambahTugas() {
	const teks = state.tugasBaru.trim().toUpperCase();
	if (teks) {
		state.tugas = [...state.tugas, { teks, selesai: false }];
		state.tugasBaru = '';
	}
}

// Ubah status selesai tugas
export function ubahSelesai(indeks: number) {
	state.tugas[indeks].selesai = !state.tugas[indeks].selesai;
	state.tugas = [...state.tugas]; // Picu reaktivitas
}

// Hapus tugas
export function hapusTugas(indeks: number) {
	state.tugas.splice(indeks, 1);
	state.tugas = [...state.tugas]; // Picu reaktivitas
}

// Format tanggal untuk tampilan
export const formatTanggal = (kunci: string) => {
	const tanggalStr = kunci.replace('tugas-', '');
	return new Date(tanggalStr).toLocaleDateString('id-ID', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
