//logic for javascript code
var playing= false
var score;
var action;
var timeremaining;     // var for reducing time by one once the game starts
var correctAns;
//if we click on the start/reset
document.getElementById("startreset").onclick= function(){
     // if we are playing
if(playing == true){
    location.reload();  //for reloading the page

}else{                  //  if we are not playing 
                        

    //change to playing mode
   
    playing  = true;    //after clicking reset button sore change to zero as it reload the page
    
    //set the score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    
    //show countdowm box
    show("timeremaining");
    timeremaining=60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;


    //hide the game over after clicking the start game
    hide("gameOver");




    //change button to reset
    document.getElementById("startreset").innerHTML="Reset Game";

    //start the countdown
    startCountdown();

    //generate ques and multiple ans
    generateQA();


}

}

//clicking on the answer box
for(i=1; i<5;i++){
    document.getElementById("box"+i).onclick= function(){

        //check if we are playing 
        //corret?-> increase score by 1
         if(playing== true){
            if(this.innerHTML==correctAns){
                 score++;
    
                 document.getElementById("scorevalue").innerHTML= score;
    
                 //hide wrong box and show correct box
    
                 hide("wrong");
                 show("correct");    //show correct box for 1 sec
    
                 setTimeout(function() {
                    hide("correct");
                 }, 1000);
            
            //generate new question if the answe is correct
             generateQA();
             }
            
            else{
                show("wrong");              //show try again box for 1 sec
                hide("correct");
    
                setTimeout(function() {
                    hide("wrong");
                 }, 1000);
    
            }
         }
    
    }
}
     


    //reduce time by one sec in loops   
       function startCountdown(){      
        action= setInterval(function(){

            //time left?
              //if yes?=>  reduce time by one sec in loops
            timeremaining-= 1;
             document.getElementById("timeremainingvalue").innerHTML = timeremaining;

         //check when time reaches to 0  stop countdown and showgameover with valid score 
            if(timeremaining == 0){
                stopCountdown();


            //if time not left //if no->gaveover with valid score
                show("gameOver");
                document.getElementById("gameOver").innerHTML= "<p>Game Over!</p><p>Your score is :"+ score +"</p>";
             
            //also hide timeremaining after gameover
                hide("timeremaining");
                hide("correct");
                hide("wrong");

                playing=false;
                document.getElementById("startreset").innerHTML= "Start Game";
                

                
            }
            
        }, 1000);

       }
       function stopCountdown(){
        clearInterval(action)
       }
 
    //hide function to hide the div
        function hide(Id){
            document.getElementById(Id).style.display= "none";

        }

        //show function to show the div
        function show(Id){
            document.getElementById(Id).style.display= "block";

        }

    //function for generate new ques and multiple answer

    function generateQA(){
        
        // var x=  1+ Math.round(9*Math.random());
        // var y=  1+ Math.round(9*Math.random());
        var x=Math.floor(Math.random() * 100);
        var y= Math.floor(Math.random() * 100);
         correctAns= x*y;

         document.getElementById("question").innerHTML= x + "x" + y;

         var correctPosition= 1+ Math.round(3*Math.random());   //any one random position for storing correct answer
         document.getElementById("box"+correctPosition).innerHTML= correctAns;    //fillone box with correct answer;

         //fill other box with wrong answer
         var answer= [correctAns] ;  //initially store all answer in an array and then chcek similtaniously that more than one wrong answer is present or not
        for( i=1; i<5; i++){
            if (i!=correctPosition){
                do{
                    wrongAnswer = (1+ Math.round(99*Math.random()))*(1+ Math.round(99*Math.random()));

                }
                 while(answer.indexOf(wrongAnswer)>-1)     //-1 represet not present inside the array
                 
                 document.getElementById("box"+i).innerHTML= wrongAnswer;
            }
        }
        
    }

       


