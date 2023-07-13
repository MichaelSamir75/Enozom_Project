import React, { useState, useRef, useEffect } from 'react';

function Game(props) {
    const canvasRef = useRef();
    const [circles, setCircles] = useState([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [radius, setRadius] = useState(50);
    const [imageURL, setImageURL] = useState("https://5.imimg.com/data5/SELLER/Default/2021/2/HK/IO/BL/12304017/snakes-and-ladders-game-board-500x500.jpg");

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.src = imageURL;

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
    }, [imageURL]);

    function handleXChange(event) {
        setX(event.target.value);
    }

    function handleYChange(event) {
        setY(event.target.value);
    }

    function handleRadiusChange(event) {
        setRadius(event.target.value);
    }

    function handleAddCircle() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const newCircle = {
            centerX: parseInt(x) + parseInt(radius),
            centerY: canvas.height - parseInt(y) - parseInt(radius),
            radius: parseInt(radius),
            color: "red"
        };

        setCircles([...circles, newCircle]);

        ctx.drawImage(canvas, 0, 0);
        circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = circle.color;
            ctx.fill();
        });
    }

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
            <div>
                <label htmlFor="x-input">Enter the x coordinate of the new circle:</label>
                <input id="x-input" type="number" value={x} onChange={handleXChange} />
            </div>
            <div>
                <label htmlFor="y-input">Enter the y coordinate of the new circle:</label>
                <input id="y-input" type="number" value={y} onChange={handleYChange} />
            </div>
            <div>
                <label htmlFor="radius-input">Enter a new radius value:</label>
                <input id="radius-input" type="number" value={radius} onChange={handleRadiusChange} />
            </div>
            <button onClick={handleAddCircle}>Add Circle</button>
        </div>
    );
}

export default Game;