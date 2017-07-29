window.onload = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('canvas');

    const COLOR_BLACK = "0x000000";
    const COLOR_WHITE = "0xffffff";
    const COLOR_MATRIX = "0x00ff00";

    const SPHERE_DIAMETER = 50;

    const SIZE = 10;

    var controlSphereArray = new Array(SIZE);
    for(var i = 0; i < SIZE; i++)
        controlSphereArray[i] = {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            positionX: 0,
            positionY: 0,
            positionZ: 0
        };

    var folderArray = new Array(SIZE);
    var gui = new dat.GUI();
    for(var i = 0; i < SIZE; i++) {
        folderArray[i] = gui.addFolder("Sphere " + i);
        folderArray[i].add(controlSphereArray[i], "positionX").min(-5).max(5).step(0.01).listen();
        folderArray[i].add(controlSphereArray[i], "positionY").min(-5).max(5).step(0.01).listen();
        folderArray[i].add(controlSphereArray[i], "positionZ").min(-5).max(5).step(0.01).listen();
        folderArray[i].add(controlSphereArray[i], "rotationX").min(-0.2).max(0.2).step(0.001);
        folderArray[i].add(controlSphereArray[i], "rotationY").min(-0.2).max(0.2).step(0.001);
        folderArray[i].add(controlSphereArray[i], "rotationZ").min(-0.2).max(0.2).step(0.001);
    }


    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(COLOR_BLACK);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
    camera.position.set(0, 0, 1000);

    var light = new THREE.AmbientLight(COLOR_WHITE);
    scene.add(light);

    var geometry = new THREE.SphereGeometry(SPHERE_DIAMETER,24,24);
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors});

    for(var i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setRGB(Math.random(),Math.random(),Math.random());
    }

    var meshArray = new Array(SIZE + 1);
    for(var i = 0; i < SIZE; i++) {
        meshArray[i] = new THREE.Mesh(geometry, material);
        meshArray[i].position.x = Math.random() * (width/2 - (-width/2)) - width/2;
        meshArray[i].position.y = Math.random() * (height/2 - (-height/2)) - height/2;
        meshArray[i].position.z = 0;
        scene.add(meshArray[i]);
    }

    renderer.render(scene, camera);

    var randomDirection = function (){
        for(var i = 0; i < SIZE; i++)
            controlSphereArray[i] = {
                positionX: 2,
                positionY: 2
            };
    };
    //randomDirection();
    //gui.add(text, "randomDirection");

    function rendering() {
        for(var i = 0; i < SIZE; i++) {
            // Mesh Position //
            meshArray[i].position.x += controlSphereArray[i].positionX;
            if ((meshArray[i].position.x > width / 2 - SPHERE_DIAMETER) || (meshArray[i].position.x < -width / 2 + SPHERE_DIAMETER))
                controlSphereArray[i].positionX = -controlSphereArray[i].positionX;
            meshArray[i].position.y += controlSphereArray[i].positionY;
            if ((meshArray[i].position.y > height / 2 - SPHERE_DIAMETER) || (meshArray[i].position.y < -height / 2 + SPHERE_DIAMETER))
                controlSphereArray[i].positionY = -controlSphereArray[i].positionY;
            meshArray[i].position.z += controlSphereArray[i].positionZ;
            // Mesh Rotation //
            meshArray[i].rotation.x += controlSphereArray[i].rotationX;
            meshArray[i].rotation.y += controlSphereArray[i].rotationY;
            meshArray[i].rotation.z += controlSphereArray[i].rotationZ;
            renderer.render(scene, camera);
        }
        requestAnimationFrame(function () {
            rendering();
        });
    }

    rendering();
}