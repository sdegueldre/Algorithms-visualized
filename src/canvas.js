let canvas;
export default function createCanvas(width, height) {
	if (canvas) {
		canvas.remove();
	}
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
	return {
        width, height,
		background: color => {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
        },
        fill: color => {
            ctx.fillStyle = color;
        },
        rect: (x, y, w, h) => {
            ctx.fillRect(x, y, w, h);
        },
	};
}
