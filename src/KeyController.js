import { Player } from "./Player";

export class KeyController {
	constructor(player) {
		// 생성자
		this.keys = [];
		this.player=player;
		window.addEventListener('keydown', e => {
			// console.log(e.code + ' 누름');
			this.keys[e.code] = true;
			this.player.moving=true;
		});

		window.addEventListener('keyup', e => {
			// console.log(e.code + ' 뗌');
			delete this.keys[e.code];
			this.player.moving=false;
		});
	}
}
