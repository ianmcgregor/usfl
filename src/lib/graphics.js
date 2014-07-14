'use strict';

var Graphics = {
  init: function() {
    if(document.getElementsByTagName('canvas').length > 0) {
      this.canvas = document.getElementsByTagName('canvas')[0];
    }
    else {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
    }
    this.context = this.canvas.getContext('2d');
    this.size();

    this._textFont = 'Times';
    this._textSize = 12;
    this.context.font = this._textSize + 'px ' + this._textFont;
  },
  size: function(width, height) {
    this.width = this.canvas.width = width || window.innerWidth;
    this.height = this.canvas.height = height || window.innerHeight;
  },
  clear: function(color) {
    if(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.width, this.height);
    }
    else {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  },
  background: function(r, g, b) {
    this.clear('rgb('+r+', '+b+', '+g+')');
  },
  fill: function(r, g, b, a) {
    if(typeof r === 'string') {
      this.context.fillStyle = r;
      return;  
    }
    a = a === undefined ? 1 : a;
    this.context.fillStyle = 'rgba('+r+', '+b+', '+g+', '+a+')';
  },
  stroke: function(r, g, b, a) {
    a = a === undefined ? 1 : a;
    this.context.strokeStyle = 'rgba('+r+', '+b+', '+g+', '+a+')';
  },
  strokeWeight: function(w) {
    this.context.lineWidth = w;
  },
  move: function(x, y) {
    this.context.moveTo(x, y);
  },
  line: function(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  },
  rect: function(x, y, width, height, angle) {
    if(angle !== undefined && angle !== 0) {
      this.context.save();
      this.context.translate(x + width/2, y + height/2);
      this.context.rotate(angle);
      this.context.rect(-width/2, -height/2, width, height);
      this.context.fill();
      this.context.stroke();
      this.context.restore();
    }
    else {
      this.context.rect(x, y, width, height);
      this.context.fill();
      this.context.stroke();
    }
  },
  circle: function(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fill();
    this.context.stroke();
  },
  triangle: function(x, y, width, height, angle) {
    if(angle !== undefined && angle !== 0) {
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(angle);
      this.context.beginPath();
      this.context.moveTo(0 - width/2, 0 + height/2);
      this.context.lineTo(0, 0 - height/2);
      this.context.lineTo(0 + width/2, 0 + height/2);
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
      this.context.restore();
    }
    else {
      this.context.beginPath();
      this.context.moveTo(x - width/2, y + height/2);
      this.context.lineTo(x, y - height/2);
      this.context.lineTo(x + width/2, y + height/2);
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  },
  triangleABC: function(x1, y1, x2, y2, x3, y3) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  },
  image: function(img, x, y, angle) {
    if(angle !== undefined && angle !== 0) {
      var offsetX = img.width/2,
          offsetY = img.height/2;
      this.context.save();
      this.context.translate(x + offsetX, y + offsetY);
      this.context.rotate(angle);
      this.context.drawImage(img, -offsetX, -offsetY);
      this.context.restore();
    }
    else {
      this.context.drawImage(img, x, y);
    }
  },
  cross: function(radius) {
    this.context.beginPath();
    this.context.moveTo(-radius, -radius);
    this.context.lineTo(radius, radius);
    this.context.moveTo(-radius, radius);
    this.context.lineTo(radius, -radius);
    this.context.stroke();
  },
  text: function(str, x, y) {
    this.context.fillText(str, x, y);
  },
  textFont: function(font) {
    this._textFont = font;
    this.context.font = this._textSize + 'px ' + font;
  },
  textSize: function(size) {
    this._textSize = size;
    this.context.font = size + 'px ' + this._textFont;
  },
  openImage: function() {
    var win = window.open('', 'Canvas Image'),
        src = this.canvas.toDataURL('image/png');
    win.document.write('<img src="' + src +
                      '" width="' + this.width +
                      '" height="' + this.height + '" />');
  },
  downloadImage: function() {
    var src = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    window.location.href = src;
  }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Graphics;
}
