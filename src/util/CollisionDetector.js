function CollisionDetector() {
	var canvas = cc.Director.getInstance().getWinSize();
	this.width = canvas.width;
	this.height = canvas.height;
	this.rt = cc.RenderTexture.create(this.width, this.height);
	this.rt.setVisible(false);
	this.gl = cc.renderContext;
};

CollisionDetector.prototype = {
	areTheSpritesColliding : function(sprite1, sprite2, pixelPerfect) {
		pixelPerfect = pixelPerfect || false;

		var intersectionRect = cc.rectIntersection(sprite1.getBoundingBox(), sprite2.getBoundingBox());
		if (intersectionRect && intersectionRect.getWidth() > 0 && intersectionRect.getHeight() > 0) {
			if (!pixelPerfect) {
				return true;
			}

			//Limpa o TextureRender
			this.rt.beginWithClear(0, 0, 0, 0);
			//Colocar a mascara vermelha e pinta no TextureRender
			this.gl.colorMask(true, false, false, true);
			sprite1.visit();
			//Colocar a mascara azul e pinta no TextureRender
			this.gl.colorMask(false, false, true, true);
			sprite2.visit();

			//Ler os pixels da interseção
			this.gl.colorMask(true, true, true, true);
			var intersectPixels = new Uint8Array(intersectionRect.getWidth() * intersectionRect.getHeight() * 4);
			this.gl.readPixels(intersectionRect.getX(), intersectionRect.getY(), intersectionRect.getWidth(), intersectionRect.getHeight(), this.gl.RGBA, this.gl.UNSIGNED_BYTE, intersectPixels);
			this.rt.end();

			// Lê cada pixel da interseção
			for (var i = 0; i < intersectPixels.length; i += 4) {
				var pixelRed = intersectPixels[i];
				var pixelBlue = intersectPixels[i + 2];
				// Checa se o pixel está com RED e Blue ligado
				if (pixelRed > 0 && pixelBlue > 0) {
					return true;
				}

			}
			return false;
		}
	}
};
