window.onload = function(){
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    var size = 900;
    var max_iterations = 1000;
    var zoom = 1;
    var center_x = -0.761574;
    var center_y = -0.0847596;
    // START

    var imageData = ctx.getImageData(0, 0, size, size);


    // Pixel setting
    var setPixel = function (x, y, a) {
        var index = (x + y * size) * 4;
        imageData.data[index] =  40 - (a % 40)//(120 + (255*a)/max_iterations) % 255;
        imageData.data[index + 1] = 100 - (a % 100)//(120 + (255*a)/max_iterations) % 255;
        imageData.data[index + 2] = 140 - (a % 140)//(140 + (255*a)/max_iterations)  % 255;
        imageData.data[index + 3] = 255;

        if(a===0){
            imageData.data[index] = 0;
            imageData.data[index + 1] = 0 ;
            imageData.data[index + 2] = 0  ;
            imageData.data[index + 3] = 255 ;
        }
    }

    
        
        
    canvas.onclick = function(){
        zoom = zoom / 2;
        console.log('yeet');
        render();
    }

    
    // END

    this.console.log('loaded'); 

    class Complex{
        constructor(a, b){
            this.a = a;
            this.b = b;
            this.modulo = Math.sqrt(a*a + b*b);
        }

        get_a(){
            return this.a;
        }

        get_b(){
            return this.b;
        }

        plus(z){
            this.a = this.a + z.a;
            this.b = this.b + z.b;
            return this;
        }

        times(z){
            var temp_a = this.a * z.a - this.b * z.b;
            var temp_b = this.a * z.b + this.b * z.a;
            this.a = temp_a;
            this.b = temp_b;
            return this;
        }



        isEqual(z){
            if((this.a === z.a) && (this.b === z.b)) return true;
            return false;
        }
    }

    // this.setInterval(render, 10);


    // render fractal
    var fractal_color = '#000';
    background_color = '#FFF';
    
    render();

    
    

    function render(){
        // background
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, size, size);

        
        // fractal points
        var alpha;
        for(var x = 0; x < size; x++){
            for(var y = 0; y < size; y++){
                alpha = converges(toImaginary(x-size/2) + center_x, toImaginary(y-size/2) + center_y);
                
                    // draw point
                    
                
                    setPixel(x, y, alpha);
                
                
                
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function toImaginary(x){
        return (((4*zoom)*x)/size) ;
    }

    function converges(a, b){
        var c = new Complex(a, b);
        if(Math.abs(c.a + c.b) > 10) return 1;
        var z = new Complex(0, 0);
        for(var i = 0; i < max_iterations; i++){
            if(Math.abs(z.a + z.b) > 10) return i;
            z.times(z);
            z.plus(c);
        }
        return 0;
    }


}
    

    


