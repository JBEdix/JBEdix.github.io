function verificar() {

    // Grafico de la onda -----------------------------------------
    let frecuencia = parseFloat( document.getElementById('frecuencia').value);
    let logitudOnda = parseFloat(document.getElementById('longitud-onda').value);

    if (document.getElementById('frecuencia').value ==  '' || document.getElementById('longitud-onda').value == '' ) {
        alert('Debe ingresar la longitud de onda y la frecuencia para poder usar el simulador.')
    }else{
        $('#simulador').modal('show');
        let velocidadAngular = frecuencia * 2; 

        console.log('frecuencia:', frecuencia);
        console.log('logitudOnda:', logitudOnda);
        console.log('velocidadAngular:', velocidadAngular);
    
        var parameters = {
            target: '#onda',
            data: [
                {
                    fn: `0.2 * sin( ${velocidadAngular} * PI + (2 * PI / ${logitudOnda}) x)`, 
                    color: 'green',
                    // range: [1,3]
                }, 
                {
                    fn: `-(0.2 * sin( ${velocidadAngular} * PI + (2 * PI / ${logitudOnda}) x))`,
                    color: 'blue'
                }
            ],
            grid: true,
            yAxis: {domain: [-0.5, 0.5]}, // A, amplitud 
            xAxis: {domain: [0, 1]} // lambda, longitud de onda
            
        };
    
        functionPlot(parameters);
    
        // Reproducir la frecuencia --------------------------------------------
    
        let context = new (window.AudioContext || window.webkitAudioContext)();
        let sineWave = context.createOscillator();
        let gainNode = context.createGain();
    
        sineWave.frequency.value = frecuencia;
        sineWave.connect(gainNode);
        gainNode.connect(context.destination);
        // sineWave.noteOn(0);
        sineWave.start();
        gainNode.gain.value = 0;
    
        barra.addEventListener('mousemove', function(ev) {
            console.log(ev.currentTarget.value);
            
            if (ev.currentTarget.value <= 0.5) {
                gainNode.gain.value = 1 - (ev.currentTarget.value * 2);
            } else{
                gainNode.gain.value = (ev.currentTarget.value * 2) - 1 ;
            }
    
        });
    }

    
}