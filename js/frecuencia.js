function verificar() {
    let frecuencia = parseFloat( document.getElementById('frecuencia').value);
    console.log('Frecuencia de la otra clase: ', frecuencia);
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let sineWave = context.createOscillator();
    let gainNode = context.createGain();
    // let filter = context.createBiquadFilter();
    
    sineWave.frequency.value = frecuencia;
    // sineWave.type = 'triangle';
    // sineWave.type = 'lowshelf';
    // sineWave.type = 'sine';
    sineWave.type = 'square';
    sineWave.connect(gainNode);
    gainNode.connect(context.destination);
    // sineWave.noteOn(0);
    sineWave.start();
    gainNode.gain.value = 0;

    barra.addEventListener('mousemove', function(ev) {
        console.log(ev.currentTarget.value);
        
        if (ev.currentTarget.value <= 0.5) {
            gainNode.gain.value = 1 - (ev.currentTarget.value * 2 );
        } else{
            gainNode.gain.value = (ev.currentTarget.value * 2 ) - 1 ;
        }

    });

}