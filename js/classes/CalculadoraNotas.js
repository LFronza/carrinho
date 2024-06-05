export default class CalculadoraNotas {
    calcularNotas(valor) {
        const notas = [100, 50, 20, 10, 5, 2, 1];
        let restante = valor;
        let notasResumo = '';
        notas.forEach(nota => {
            let quantidade = Math.floor(restante / nota);
            if (quantidade > 0) {
                notasResumo += `${quantidade} ${quantidade > 1 ? 'notas' : 'nota'} de ${nota} ${nota > 1 ? 'reais' : 'real'}<br>`;
                restante %= nota;
            }
        });
        return notasResumo;
    }
}
