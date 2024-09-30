// Type "Hello World" then press enter.
var robot = require("robotjs");
var screenSize = robot.getScreenSize();

async function main() {
	robot.setMouseDelay(1);

	drawWave()
	// drawInfiniteSymbol()
	// drawSpiral(screenSize.width / 2, screenSize.height / 2, screenSize.height / 2);


}

function drawWave() {
	var twoPI = Math.PI * 1.0;
	var height = (screenSize.height / 2) - 10;
	var width = screenSize.width;

	while (true) {
		for (var x = 0; x < width; x++) {
			let y = height * Math.sin((twoPI * x) / width) + height;
			robot.moveMouse(x, y);
		}
	}
}

/* Usecase:
// drawCircle(screenSize.width / 2, screenSize.height / 2, screenSize.height / 2);

robot.setMouseDelay(10);
let screenSize = robot.getScreenSize();

let radius = screenSize.height / 2;

let y0 = radius + 0;
let x0 = radius + 0;

for (let a = 0; a < 360; a++) {
	let x = Math.sin(a * (Math.PI / 180)) * radius + x0;
	let y = Math.cos(a * (Math.PI / 180)) * radius + y0;

	console.log('(' + x + ', ' + y + ')');

	robot.moveMouse(x, y);
}
*/
function drawCircle(centerX, centerY, radius) {
	let a = 0;

	while (true) {
		a = a + 1 % 360;

		let x = Math.sin(a * (Math.PI / 180)) * radius + centerX;
		let y = Math.cos(a * (Math.PI / 180)) * radius + centerY;

		console.log('(' + x + ', ' + y + ')');

		robot.moveMouse(x, y);
	}

}

function drawSpiral(centerX, centerY, radius) {
	radius /= 10;
	let a = 0;

	while (true) {
		a = a - 1 % 360;

		let x = Math.sin(a * (Math.PI / 180)) * radius + centerX;
		let y = Math.cos(a * (Math.PI / 180)) * radius + centerY;

		console.log('(' + x + ', ' + y + ')');

		robot.moveMouse(x, y);

		radius += 1
	}
}

function drawInfiniteSymbol() {

	var twoPI = Math.PI * 1.0;
	// var screenSize = robot.getScreenSize();
	var height = (screenSize.height / 2) - 10;
	var width = screenSize.width;

	while (true) {
		for (var x = 0; x < width; x++) {
			let y = height * Math.sin((twoPI * x) / width) + height;
			robot.moveMouse(x, y);
		}
		for (var x = width; x > 0; x--) {
			let y = height * Math.sin((twoPI * x * -1) / width) + height;
			robot.moveMouse(x, y);
		}
	}

	let screenSize = robot.getScreenSize();

	let radiusX = screenSize.width / 4;
	let radiusY = screenSize.height / 2;

	// Ponto central esquerdo
	let x0 = screenSize.width / 4;
	let y0 = screenSize.height / 2;

	// Ponto central direito
	let x1 = (3 * screenSize.width) / 4;
	let y1 = screenSize.height / 2;

	let a = 0;

	let inverse = 1; // ou -1

	let centerX = x0
	let centerY = y0

	for (let a = 0; a < (360 * 2); a++) {
		if (a % 90 == 0) {
			inverse = a % 180 == 0 ? -1 : 1
			centerX = x1
			centerY = y1
		}

		let x = Math.sin(inverse * a * (Math.PI / 180)) * radiusX + x0;
		let y = Math.cos(inverse * a * (Math.PI / 180)) * radiusY + y0;

		console.log('(' + x + ', ' + y + ')');

		robot.moveMouse(x, y);
	}
}


function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

main()
// drawWave()