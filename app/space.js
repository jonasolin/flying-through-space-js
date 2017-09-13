var space = {
    numStars: 0,
    field: {
        width: 0,
        height: 0
    },
    colors: ["#9bb0ff", "#aabfff","#cad7ff","#f8f7ff","#fff4ea","#ffd2a1","#ffcc6f", "#ffffff"],
    context: null,
    stars: {}
};
var starIndex = 0;
var acceleration = 1;
var starsToDraw;

space.Star = function() {
    this.X = space.field.width / 2;
    this.Y = space.field.height / 2;

    this.SX = Math.random() * 10 - 5;
    this.SY = Math.random() * 10 - 5;

    var start = 0;

    if (space.field.width > space.field.height) {
        start = space.field.width;
    }
    else {
        start = space.field.height;
    }

    this.X += this.SX * start / 10;
    this.Y += this.SY * start / 10;

    this.color = space.colors[Math.floor(Math.random()*space.colors.length)];

    this.radius = 1;

    this.age = 0;
    this.dies = 500;

    starIndex++;
    space.stars[starIndex] = this;
    space.numStars++;

    this.id = starIndex;
}

space.DeleteStar = function(x, y, r, id){
    if (x + r < 0 | x > space.field.width | y > space.field.height){
        delete space.stars[id];
        space.numStars--;
    }
}

space.Star.prototype.Draw = function () {
    this.X += this.SX;
    this.Y += this.SY

    this.SX += this.SX / (50 / acceleration);
    this.SY += this.SY / (50 / acceleration);

    this.age++;

    this.radius = this.radius + 0.001

    space.DeleteStar(this.X, this.Y, this.radius, this.id);

    space.context.fillStyle = this.color;
    space.context.beginPath();
    space.context.arc(this.X, this.Y, this.radius, 0, 2*Math.PI);
    space.context.shadowBlur = 9;
    space.context.shadowColor = this.color;
    space.context.fill();
    space.context.shadowColor= null;
    space.context.shadowBlur = null;
}

space.draw = function() {
    if (space.field.width != window.innerWidth)
        space.field.width = window.innerWidth;
    if (space.field.height != window.innerHeight)
        space.field.height = window.innerHeight;

    space.context.fillStyle = "rgba(0, 0, 0, 0.9)";
    space.context.fillRect(0, 0, space.field.width, space.field.height);

    for (var i = space.numStars; i < starsToDraw; i++) {
        new space.Star();
    }

    for (var star in space.stars) {
        space.stars[star].Draw();
    }
}

space.init = function(f, c) {
    space.field = f;
    space.context = c;
    starsToDraw = (space.field.width * space.field.height) / 100;
    setInterval(space.draw, 40);
}

module.exports = space;