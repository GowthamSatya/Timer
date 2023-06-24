const timerEl = document.getElementById("timer");
const stopWatchEl = document.getElementById("stopwatch");
const timerBtn = document.getElementsByClassName("timer_btn")[0];
const stopWatchBtn = document.getElementsByClassName("stw_btn")[0];
const timerTime = document.getElementById("timerTime");
const pauseBtn = document.getElementsByClassName("play_btn")[0];
const resetBtn = document.getElementsByClassName("reset_btn")[0];

const thr = document.getElementById("thr");
const tmin = document.getElementById("tmin");
const tsec = document.getElementById("tsec");

let isPaused = false;
let temp = false;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

const changeBtn = (mode, btn) => {
	if (mode === "Timer") {
		if (btn === "Pause") {
			pauseBtn.classList.remove("resume");
			pauseBtn.innerText = "Pause";
			pauseBtn.classList.add("paused");
		} else {
			pauseBtn.innerText = "Resume";
			pauseBtn.classList.add("resume");
			pauseBtn.classList.remove("paused");
		}
	} else {
		if (btn === "Start") {
			pauseBtn.innerText = "Start";
			pauseBtn.classList.remove("paused");
			pauseBtn.classList.add("resume");
		} else {
			pauseBtn.classList.remove("resume");
			pauseBtn.innerText = "Stop";
			pauseBtn.classList.add("paused");
		}
	}
};

function validateStr(str) {
	let arr = str.split(":");

	for (let i = 0; i < arr.length; i++) {
		if (isNaN(parseInt(arr[i]))) {
			return false;
		}
	}

	return true;
}

timerBtn.addEventListener("click", () => {
	stopWatchEl.classList.add("dnone");
	timerBtn.classList.add("active");
	stopWatchBtn.classList.remove("active");
	timerEl.classList.remove("dnone");
	changeBtn("Timer", "Resume");
	temp = false;
});

stopWatchBtn.addEventListener("click", () => {
	stopWatchEl.classList.remove("dnone");
	timerBtn.classList.remove("active");
	stopWatchBtn.classList.add("active");
	timerEl.classList.add("dnone");
	changeBtn("Stopwatch", "Start");

	isPaused = true;
});

// timerEl

function startTimer() {
	if (!isPaused) {
		let hours = parseInt(thr.innerText);
		let minutes = parseInt(tmin.innerText);
		let seconds = parseInt(tsec.innerText);
		let x;

		if (hours == 0 && minutes == 0 && seconds == 0) {
			clearTimeout(x);
			alert("Timer Timed Out...");
			thr.innerText = "00";
			tmin.innerText = "00";
			tsec.innerText = "00";
		} else {
			if (seconds == 0) {
				if (minutes == 0) {
					if (hours == 0) {
						clearTimeout(x);
						alert("Timer Timed Out...");
					} else hours--;

					minutes = 59;
				} else minutes--;

				seconds = 59;
			} else seconds--;

			let updatedHrs = hours < 10 ? "0" + hours.toString() : hours.toString();
			let updatedMins =
				minutes < 10 ? "0" + minutes.toString() : minutes.toString();
			let updatedSecs =
				seconds < 10 ? "0" + seconds.toString() : seconds.toString();

			thr.innerText = updatedHrs;
			tmin.innerText = updatedMins;
			tsec.innerText = updatedSecs;
			x = setTimeout(startTimer, 1000);
		}
	}
}

resetBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (!timerEl.classList.contains("dnone")) {
		let timeStr = prompt("Enter Time in format -> hh:mm:ss");
		let op = validateStr(timeStr);

		if (op) {
			let [a, b, c] = timeStr.split(":");
			thr.innerText = a;
			tmin.innerText = b;
			tsec.innerText = c;

			if (!isPaused) startTimer();
		} else {
			alert("Input Error");
		}
	} else {
		temp = false;
		hour = 0;
		minute = 0;
		second = 0;
		count = 0;
		document.getElementById("hr").innerHTML = "00";
		document.getElementById("min").innerHTML = "00";
		document.getElementById("sec").innerHTML = "00";
		document.getElementById("count").innerHTML = "00";

		changeBtn("Stopwatch", "Start");
	}
});

startTimer();

pauseBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (timerEl.classList.contains("dnone")) {
		temp = !temp;
		if (temp) {
			stopWatch();
		}
		if (!temp) {
			changeBtn("Stopwatch", "Start");
		} else {
			changeBtn("Stopwatch", "Stop");
		}
	} else {
		isPaused = !isPaused;

		if (isPaused) {
			changeBtn("Timer", "Resume");
		} else {
			changeBtn("Timer", "Pause");
			startTimer();
		}
	}
});

// stopwatch
function stopWatch() {
	if (temp) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			hour++;
			minute = 0;
			second = 0;
		}

		let hrString = hour;
		let minString = minute;
		let secString = second;
		let countString = count;

		if (hour < 10) {
			hrString = "0" + hrString;
		}

		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}

		document.getElementById("hr").innerHTML = hrString;
		document.getElementById("min").innerHTML = minString;
		document.getElementById("sec").innerHTML = secString;
		document.getElementById("count").innerHTML = countString;
		setTimeout(stopWatch, 10);
	}
}
