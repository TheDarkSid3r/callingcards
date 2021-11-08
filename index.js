window.addEventListener("load", () => {
    const DRAWING_COLORS = ["#648fff", "#785ef0", "#dc267f", "#fe6100"];

    const Canvas = class {
        constructor(color) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = 600;
            this.canvas.height = 600;
            this.ctx = this.canvas.getContext("2d");
            this.color = color;
        }

        renderCanvas(l) {
            l.forEach(e => this.drawLine(e));
        }

        drawLine(t) {
            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
            this.ctx.lineWidth = t.thickness;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.ctx.beginPath();
            t.points.split("|").forEach((p, i) => {
                const split = p.split(",");
                const x = split[0];
                const y = split[1];
                if (!i) {
                    this.ctx.save();
                    this.ctx.arc(x, y, t.thickness / 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.restore();
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                }
                this.ctx.lineTo(x, y);
            });
            this.ctx.stroke();
        }
    };

    const random = (t, e) => Math.random() * (e - t) + t;

    const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    LETTERS.forEach(l => {
        const SETS = [
            `LETTER_${l}`,
            `LETTER_${l}_LOWER`,
            `LETTER_${l}_CURSIVE`
        ];

        const section = document.createElement("div");
        section.className = "section";
        document.querySelector(".wrapper").appendChild(section);

        SETS.forEach(d => DRAWING_DATA[d].forEach(p => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.transform = `translate(${random(-10, 10)}px, ${random(-10, 10)}px) rotate(${random(-5, 5)}deg)`;

            const canvas = new Canvas(DRAWING_COLORS[Math.floor(Math.random() * DRAWING_COLORS.length)]);
            canvas.renderCanvas(p);
            card.appendChild(canvas.canvas);

            section.appendChild(card);
        }));
    });
});