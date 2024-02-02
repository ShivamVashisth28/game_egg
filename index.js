//variables

var chickenLeft = 45;
var chickenDirection = "right";
var eggTop = 16.5;
var score = 0;
var chickenSpeed = 50;
var eggSpeed = 100;
let moveEggInterval;
let moveChickenInterval;
var gameOn = false;


// event listener to check whether user have clicked on START OR RESTART button

$(".playBtn").on("click",()=>{
    
    $(".playBtn").css("z-index","-1");
    $(".score").css("font-size","2.5rem");
    $(".score").css("top","127px");
    $(".score").css("left","85%");

    makeThemVisible();
    gameOn = true;
    setEggInterval();
    setChickenInterval();

})


// funtion to change the opacity of all game objects , i.e. making them visible/invisible on screen

function makeThemVisible(){
    $(".egg").css("opacity","1");
    $(".basket").css("opacity","1");
    $(".chicken").css("opacity","1");
}

function makeThemInvisible(){
    $(".egg").css("opacity","0");
    $(".basket").css("opacity","0");
    $(".chicken").css("opacity","0");
}

// function to make the chicken move sideways

function moveChicken(){
    if(chickenLeft<88 && chickenDirection === "right"){
        chickenLeft+=2;
        $(".chicken").css("left",chickenLeft+"%");
    }
    else {
        chickenDirection = "left";
    }
    
    if(chickenLeft > 3 && chickenDirection === "left"){
        chickenLeft-=2;
        $(".chicken").css("left",chickenLeft+"%");
    }
    else {
        chickenDirection = "right";
    }
}

// function to make the egg move downwards and check for collision with basket to increment the score

function moveEgg(){
    
    var basket = document.querySelector(".basket");
    var egg = document.querySelector(".egg");

    if(checkCollision(basket,egg)){
        score++;
        
        $(".score").text("SCORE : "+score)
        eggTop=16.5;
        $(".egg").css("top",eggTop+"%");
        $(".egg").css("left",(chickenLeft+2)+"%");

    }

    if(eggTop<86){
        eggTop+=5;
        $(".egg").css("top",eggTop+"%");
    }

    //condtion to restart the game --> egg hits the ground

    else if(eggTop>=86){
            restart();

    }
    else{
        eggTop=16.5;
        $(".egg").css("top",eggTop+"%");
        $(".egg").css("left",(chickenLeft+2)+"%");
        
    }    
    
}


// restart 

function restart(){
    
    clearChickenInterval();
    clearEggInterval();
    chickenLeft = 45;
    chickenDirection = "right";
    eggTop = 16.5;
    $(".chicken").css("left",chickenLeft+"%");
    $(".playBtn").text("RESTART");
    $(".playBtn").css("left","40%");
    $(".playBtn").css("z-index","1");
    $(".score").css("top","75%");
    $(".score").css("left","40%");
    $(".score").css("font-size","4.5rem");
    score = 0;  
    makeThemInvisible();

}

// code to get cursor position and move the basket along with it inside the ground region only

$(".ground").on("mousemove",()=>{
    var x = event.clientX;
    var y = event.clientY;
    $(".basket").css("top",y-60);
    $(".basket").css("left",x-100);
})



// collision funtion

function checkCollision(div1, div2) {

    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);

}

//funtion to clear the set interval funtion 

function clearEggInterval(){
    clearInterval(moveEggInterval);
    moveEggInterval = null;
}

// funtion to set the eggInterval

function setEggInterval(){
    moveEggInterval = setInterval(moveEgg,eggSpeed);
}

//funtion to clear the set interval funtion for chicken

function clearChickenInterval(){
    clearInterval(moveChickenInterval);
    moveChickenInterval = null;
}

// funtion to set the eggInterval

function setChickenInterval(){
    moveChickenInterval = setInterval(moveChicken,chickenSpeed);
}








