import Servicios from '../services/api.js';

export default {
    data() {
        return {
            todosLosIngredientes: ["pollo", "arroz", "papas", "tomate", "zanahoria","fideos", "alberja"],
            ingredientesSeleccionados: [],
            recetaResultado: null,
            mensajeError: ''
        };
    },
    methods: {
        async cocinar() {
            try {
                const recetas = await Servicios.obtenerRecetas();
                this.recetaResultado = null;
                this.mensajeError = '';
                for (const receta of recetas) {
                    if (receta.ingredientes.every(ing => this.ingredientesSeleccionados.includes(ing))) {
                        this.recetaResultado = receta;
                        return;
                    }
                }
                this.mensajeError = 'No hay resultados';
            } catch (error) {
                this.mensajeError = 'Error al obtener las recetas';
            }
        }
    },
    template: `
        <div class="container">
            <h2>Selecciona tus ingredientes</h2>
            <div class="row">
                <div class="column">
                    <div v-for="ingrediente in todosLosIngredientes" :key="ingrediente" class="ingrediente">
                        <input type="checkbox" :value="ingrediente" v-model="ingredientesSeleccionados">
                        <label>{{ ingrediente }}</label>
                    </div>
                    <button @click="cocinar" class="cocinar-btn">Cocinar</button>
                </div>
                <div class="column">
                    <div v-if="recetaResultado" class="resultado">
                        <h3>Felicidades has conseguido cocinar una {{ recetaResultado.nombre }}</h3>
                        <img :src="recetaResultado.imagen" alt="Imagen del platillo">
                    </div>
                    <div v-if="mensajeError" class="error">{{ mensajeError }}</div>
                </div>
            </div>
        </div>
    `
};