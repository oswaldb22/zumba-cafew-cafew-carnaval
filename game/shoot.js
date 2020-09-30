var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: false,
});

function shoot() {
  if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime()) {
    bullet = new THREE.Mesh(
      new THREE.SphereGeometry(2),
      bullet_player1_material
    );
    scene.add(bullet);
    bullet.position.x =
      player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
    bullet.position.y =
      player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
    bullet.angle = player1.direction;
    player1.bullets.push(bullet);
    bulletTime1 = clock.getElapsedTime();
  }

  // move bullets
  var moveDistance = 5;

  for (var i = 0; i < player1.bullets.length; i++) {
    player1.bullets[i].position.x +=
      moveDistance * Math.cos(player1.bullets[i].angle);
    player1.bullets[i].position.y +=
      moveDistance * Math.sin(player1.bullets[i].angle);
  }
}

function collisions() {
  bullet_collision();
  player_collision();
  player_falling();
  bullet_ennemy_collision();
}

function bullet_collision() {
  //collision between bullet and walls
  for (var i = 0; i < player1.bullets.length; i++) {
    if (
      Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
      Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2
    ) {
      scene.remove(player1.bullets[i]);
      player1.bullets.splice(i, 1);
      i--;
    }
  }
}

function bullet_ennemy_collision() {
  //collision between bullet and walls
  for (var i = 0; i < player1.bullets.length; i++) {
    const playerPos = {
      x: player1.bullets[i].position.x,
      y: player1.bullets[i].position.y,
      width: 25,
      height: 25,
    };
    const ennemyPos = {
      x: player2.position.x,
      y: player2.position.y,
      width: 2,
      height: 2,
    };

    if (
      playerPos.x < ennemyPos.x + ennemyPos.width &&
      playerPos.x + playerPos.width > ennemyPos.x &&
      playerPos.y < ennemyPos.y + ennemyPos.height &&
      playerPos.y + playerPos.height > ennemyPos.y
    ) {
      player2.dead();
    }
  }
}

function player_collision() {
  //collision between player and walls
  var x = player1.graphic.position.x + WIDTH / 2;
  var y = player1.graphic.position.y + HEIGHT / 2;

  if (x > WIDTH) {
    player1.graphic.position.x -= x - WIDTH;
    player1.turnLeft(Math.PI);
  }
  if (y < 0) {
    player1.graphic.position.y -= y;
    player1.turnRight(Math.PI);
  }
  if (y > HEIGHT) {
    player1.graphic.position.y -= y - HEIGHT;
    player1.turnRight(Math.PI);
  }
  if (x < 0) {
    player1.graphic.position.x -= x;
    player1.turnRight(Math.PI);
  }
}

function player_falling() {
  var nb_tile = 10;
  var sizeOfTileX = WIDTH / nb_tile;
  var sizeOfTileY = HEIGHT / nb_tile;
  var x = player1.graphic.position.x | 0;
  var y = player1.graphic.position.y | 0;
  var length = noGround.length;
  var element = null;

  for (var i = 0; i < length; i++) {
    element = noGround[i];
    if (element) {
      var tileX = element[0] | 0;
      var tileY = element[1] | 0;
      var mtileX = (element[0] + sizeOfTileX) | 0;
      var mtileY = (element[1] + sizeOfTileY) | 0;

      if (x > tileX && x < mtileX && y > tileY && y < mtileY) {
        player1.dead();
      }
    }
  }
}
