
            function a_canv() {
                //define canvas and canvas context
                window.c = document.getElementById("canvas");
                window.ctx = c.getContext("2d");
            }

            //keys and keys down
            var k = {};
            var kd = {};

            //mouse info
            var m = { m: [false, false, false], md: [false, false, false], x: 0, y: 0, px: 0, py: 0, w: 0, dx: 0, dy: 0 };

            //when the mouse moves
            document.addEventListener("mousemove", function (e) {
                m.px = m.x;
                m.py = m.y;
                m.x = e.clientX * (1920 / window.innerWidth);
                m.y = e.clientY * (1920 / window.innerWidth);
                m.dx = e.movementX;
                m.dy = e.movementY;
            }, false);

            //when the mouse is clicked
            document.addEventListener("mousedown", function (e) {
                m.m[e.which - 1] = true;
                m.md[e.which - 1] = true;
            }, false);
            document.addEventListener("mouseup", function (e) {
                m.m[e.which - 1] = false;
                m.md[e.which - 1] = false;
            }, false);

            //when a key is pressed
            document.addEventListener("keydown", function(e) {
                k[e.key] = true;
                kd[e.key] = true;
            }, false);
            document.addEventListener("keyup", function(e) {
                k[e.key] = false;
                kd[e.key] = false;
            }, false);

            function a_resize() {

                //when the window is resized
                window.addEventListener("resize", function (e) {
                    c.width = window.innerWidth;
                    c.height = window.innerHeight;
                }, false);

                //set canvas size to window size
                c.width = window.innerWidth;
                c.height = window.innerHeight;
            }

            function a_plock() {

                //pointer lock stuff
                c.requestPointerLock = c.requestPointerLock || c.mozRequestPointerLock || c.webkitRequestPointerLock;
                c.requestPointerLock();

                document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
                document.exitPointerLock();

                c.onclick = function () {
                    c.requestPointerLock();
                };
            }

            //random number from 0 to x
            function rand(x) {
                return Math.random() * x;
            }

            //distance
            function dist(a, b) {
                return Math.sqrt(a * a + b * b);
            }

            //clamping
            function clamp(v, min, max) {
                if (v > max) {
                    return max;
                }
                if (v < min) {
                    return min;
                }
                return v;
            }

            //test if between
            function between(v, min, max) {
                if (v == clamp(v, min, max)) {
                    return true;
                }
                return false;
            }

            //test if inside rectangle
            function inRect(x, y, w, h, x2, y2) {
                if (between(x2, x, x + w) && between(y2, y, y + h)) {
                    return true;
                }
                return false;
            }