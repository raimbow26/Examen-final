class Servicios {
    static async obtenerRecetas() {
        try {
            const response = await fetch('app/json/ingredientes.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching filtered data:', error);
            throw error;
        }
    }
}

export default Servicios;