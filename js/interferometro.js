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
        switch (logitudOnda) {
            case 0.23:
                sineWave.type = 'square';
                break;
            case 0.172:
                sineWave.type = 'sine';
                break;
            case 0.1185:
                sineWave.type = 'lowshelf';
                break;
        
            default:
                break;
        }
    
        // sineWave.type = 'triangle';
        // sineWave.type = 'lowshelf';
        // sineWave.type = 'sine';
        // sineWave.type = 'square';
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

function modalOndasFase(){
    $('#modaFase').modal('show');
}

function modalOndasDesfase(){
    $('#modalDesfase').modal('show');
}

function documentacion(type) {
    $('#modalContenido').modal('show');
    let titulo = document.getElementById('modalContenidoTitle');
    let contenido = document.getElementById('contenidoModal');

    switch (type) {
        case 1:
            titulo.innerHTML = 'Materiales y equipo';
            contenido.innerHTML =`
            <ol>
                <li>Tubo de PVC, TEE de PVC y Codos 90° de PVC para el tubo. </li>
                <li>Generador de frecuencia. </li>
                <li>Cinta métrica. </li>
                <li>Pegamento para tubo PVC</li>
            </ol>
            `;
            break;
        case 2:
            titulo.innerHTML = 'Ensambaje del experimento';
            contenido.innerHTML =`
            <ol>
                <li>El tubo de 21,8 mm (1/2”) lo cortamos en ocho segmentos, dos 330 mm de longitud, dos segmentos de 310 mm de longitud y cuatro segmentos de 50 mm de longitud. El tubo de 27 mm (3/4”) lo cortamos en dos trozos iguales de 200 mm. </li>
                <li>Los codos por pareja se acoplan entre sí con los segmentos de tubo de 50 mm de longitud.</li>
                <li>A cada tubo de ½” de 330 mm de longitud se le coloca una de las TEE. </li>
                <li>Se unen los tubos de 330 mm de longitud con una de las parejas de codos armadas y a cada TEE se les coloca también un segmento de tubo de 50 mm.</li>
                <li>En los tubos cortos del ensamble anterior se colocan los tubos de ¾”, usaremos una pega o cola para unir los componentes. </li>
                <li>Se necesita que los tubos de ½” que faltan por colocar en el dispositivo deslicen dentro de los tubos de ¾” como lo hace la varilla del trombón. </li>
                <li>Para terminar con el ensamble del Tubo de Quincke, colocamos la “U” suelta dentro de los tubos de ¾”. </li>
            </ol>
            `;
            break;
        case 3:
            titulo.innerHTML = 'Proceso experimental';
            contenido.innerHTML =`
            <ol>
                <li>En uno de los extremos abiertos del tubo generamos un tono a 2000 o 3000 Hz en alto volumen y colocando el oído en el extremo libre a unos 50 centímetros de distancia. </li>
                <li>Se coloca el micrófono en el otro extremo abierto. </li>
                <li>Tomamos los datos del comportamiento de la onda en la computadora.</li>
                <li>Se comienza a mover los tubos que se colocaron dentro de los tubos de ¾” hacia arriba para aumentar la longitud total del recorrido de un lado. </li>
                <li>Tomamos lo datos del comportamiento de la onda. </li>
                <li>Posteriormente seguimos sacando el tubo lentamente y notaremos que el tono va aumentando de intensidad hasta un máximo. Con esta primera experiencia descubrimos el efecto de la interferencia destructiva y constructiva en el sonido.</li>
            </ol>
            `;
            break;
        case 4:
            titulo.innerHTML = 'Ecuaciones del cálculo';
            contenido.innerHTML =`
            <div style="display: flex;  justify-content:space-between; flex-direction: column;">
                <img src="assets/img/Ecuaciones/1.PNG" alt=""><br>
                <img src="assets/img/Ecuaciones/2.PNG" alt=""><br>
                <img src="assets/img/Ecuaciones/3.PNG" alt=""><br>
                <img src="assets/img/Ecuaciones/4.PNG" alt=""><br>
            <div/>
            `;
            break;
        default:
            break;
    }
}