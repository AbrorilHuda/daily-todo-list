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

// experimental
export const ambilSemuaStorage = () => {
	const semuaStorage = Object.keys(localStorage).filter((kunci) => kunci.startsWith('tugas-'));
	const semuaTugas: any[] = [];

	semuaStorage.forEach((kunci) => {
		// Ambil data, pastikan default-nya adalah string kosong '[]' agar JSON.parse tidak error
		const dataString = localStorage.getItem(kunci);
		let dataTugas = [];

		try {
			// Coba parse data. Jika ada masalah (data rusak), anggap sebagai array kosong.
			dataTugas = JSON.parse(dataString || '[]');
		} catch (e) {
			console.error(`Gagal parsing data untuk kunci '${kunci}':`, e);
			dataTugas = []; // Jika gagal parse, anggap kosong agar bisa dihapus
		}

		// Periksa apakah dataTugas adalah array dan apakah isinya kosong
		if (Array.isArray(dataTugas) && dataTugas.length === 0) {
			// Jika kosong, hapus dari localStorage
			localStorage.removeItem(kunci);
			console.log(`Data dengan kunci '${kunci}' telah dihapus karena kosong.`);
		} else {
			// Jika tidak kosong, tambahkan ke hasil yang akan dikembalikan
			semuaTugas.push({
				kunci,
				tugas: dataTugas
			});
		}
	});

	return semuaTugas;
	// const semuaTugas = semuaStorage.map((kunci) => {
	// 	return {
	// 		kunci,
	// 		tugas: JSON.parse(localStorage.getItem(kunci) || '[]')
	// 	};
	// });
	// return semuaTugas;
};
