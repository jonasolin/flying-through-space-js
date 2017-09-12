var test = require("simple-test-framework");
var space = require("../app/space.js");

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

test("A new Star is created with correct age radius and dies values", function(t) {
   var star = new space.Star();
   t.check(star.age === 0,"age equals 1");
   t.check(star.radius === 1,"radius equals 1");
   t.check(star.dies === 500,"dies equals 500");
   t.finish();
});

test("Foreach new star the number of stars are increased by one", function(t) {
	space.stars = {};
	space.numStars = 0;
	for (var i = 1; i <= 2; i++) {
		var star = new space.Star();
		t.check(ObjectLength(space.stars) === i);
		t.check(space.numStars === i);
	}
	t.finish();
});

test("If a star is outside the window it should be deleted", function(t) {
	space.stars = {};
	space.numStars = 0;
	var star = new space.Star();
	t.check(space.numStars === 1);
	space.field.width = 10;
	space.field.heigth = 10;
	space.DeleteStar(11, 9, star);
	t.check(space.numStars === 0);
	t.finish();
});