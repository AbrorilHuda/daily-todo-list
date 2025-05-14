interface Tugas {
	teks: string;
	selesai: boolean;
}
const dapatkanKunciHariIni = () => {
	const tanggal = new Date();
	return `tugas-${tanggal.toISOString().split('T')[0]}`; // Format: tugas-2025-05-10
};
export const stateData = $state({
	tugasBaru: '',
	tugas: [] as Tugas[],
	kunci: dapatkanKunciHariIni()
});
export function tambahTugas() {
	const teks = stateData.tugasBaru.trim().toUpperCase();
	if (teks) {
		stateData.tugas = [...stateData.tugas, { teks, selesai: false }];
		stateData.tugasBaru = '';
	}
}

// Ubah status selesai tugas
export function ubahSelesai(indeks: number) {
	stateData.tugas[indeks].selesai = !stateData.tugas[indeks].selesai;
	stateData.tugas = [...stateData.tugas]; // Picu reaktivitas
}

// Hapus tugas
export function hapusTugas(indeks: number) {
	stateData.tugas.splice(indeks, 1);
	stateData.tugas = [...stateData.tugas]; // Picu reaktivitas
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

export const ambilSemuaStorage = () => {
	const semuaStorage = Object.keys(localStorage).filter((kunci) => kunci.startsWith('tugas-'));
	const semuaTugas = semuaStorage.map((kunci) => {
		return {
			kunci,
			tugas: JSON.parse(localStorage.getItem(kunci) || '[]')
		};
	});
	return semuaTugas;
};
