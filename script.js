// Your script here.

function populateVoices() {
  voices = speechSynthesis.getVoices();

  if (!voices.length) {
    voicesDropdown.innerHTML = `<option value="">No voices available</option>`;
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">
        ${voice.name} (${voice.lang})
      </option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  restartSpeech();
}

function setOption() {
  msg[this.name] = this.value;
  restartSpeech();
}

function speak() {
  if (!msg.text.trim()) {
    alert("Please enter some text.");
    return;
  }

  speechSynthesis.cancel(); 
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

function restartSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }
}


msg.text = document.querySelector('[name="text"]').value;
msg.rate = document.querySelector('[name="rate"]').value;
msg.pitch = document.querySelector('[name="pitch"]').value;


document.querySelector('[name="text"]').addEventListener('input', function() {
  msg.text = this.value;
});


speechSynthesis.addEventListener('voiceschanged', populateVoices);
populateVoices();

voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('input', setOption));

speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);