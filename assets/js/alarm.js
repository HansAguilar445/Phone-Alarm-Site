'use strict';

let timeFilter = /[01][0-9]:[0-5][0-9]/;
const time = document.querySelector('h2');
const alarmTime = document.querySelector('p');
const timeInput = document.forms['alarm']['time'];
const setAlarm = document.forms['alarm']['set'];

const currentTime = new Date();
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
const aTime = new Date();

const alarm = new Audio('assets/media/police.mp3');
alarm.type = 'audio/mp3';

document.addEventListener('keypress', function(event) {
	if (timeInput.value.trim().length === 2 && event.key != ':')
		timeInput.value += ':';
	
});

document.addEventListener('keyup', function(event) {
	if (timeInput.value.length > 5)
			timeInput.value = timeInput.value.substring(0, 5);
	else {
		if (timeInput.value.length === 1 && timeInput.value[0] === 2)
			timeFilter = /2[0-3]:[0-5][0-9]/;
		else timeFilter = /[01][0-9]:[0-5][0-9]/;
	}
});

setAlarm.addEventListener('click', function() {
	const timeCheck = timeInput.value.split(':');
	
	if (timeInput.value.match(timeFilter)) {
		aTime.setHours(timeCheck[0], timeCheck[1], 0);
		alarmTime.innerHTML = `<i class="fa-solid fa-bell"></i> ${timeCheck[0]}:${timeCheck[1]}`
	}

	timeInput.value = '';
});

setInterval(() => {
	let hour = (new Date()).getHours();
	let minute = (new Date()).getMinutes();
	let second = (new Date()).getSeconds();
	currentTime.setHours(hour, minute, second);
	if (currentTime.getTime() === aTime.getTime()) {
		setTimeout(function() {
			alarm.play();
			time.classList.add('alarm');
			setTimeout(function() { time.classList.remove('alarm')}, 25000);
		}, 1000);
	}
	time.innerText = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}, 1000);