
/********************
  * Sound Analyser  
*********************/



/*SoundAnalyserCreate = function(){
	
	
	var audio = new cc.WebAudioEngine();
		audio.init();
		audio.playMusic(s_bgm_netuno, true);
	
	 var context = new AudioContext();
	
	// setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;
	
};*/

  	// when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    //javascriptNode.onaudioprocess = function() {
 	
 	// clear the current state
        //winSize.clearRect(0, 0, 60, 130);
 
    	// set the fill style
        //winSize.fillStyle=gradient;
 
    	// create the meters
        //WinSize.fillRect(0,130-average,25,130);	
 	
 	
 	SoundAnalyser = function(sound){
 
 		//Get canvas size
 		var winSize = cc.Director.getInstance().getWinSize();
 
 		//Instantiates the Web Audio Engine API
 		var audio = new cc.WebAudioEngine();
		audio.init();
		audio.playMusic(sound, true);
	
		var context = new AudioContext();
		
		// setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;

 		//source of the audio
 		source = context.createScriptProcessor(audio);
    	//* get the average, bincount is fftsize / 2
        var fbc_array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        var average = getAverageVolume(fbc_array);
        
    	cc.log(fbc_array);       
		cc.log(average);

        
    };
 
    function getAverageVolume(fbc_array) {
        var values = 0;
        var average;
 
        var length = fbc_array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += fbc_array[i];
        }
 
        average = values / length;
        return average;
    };