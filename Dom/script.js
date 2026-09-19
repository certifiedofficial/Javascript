const profileCard = document.getElementById("profileCard")
const profileImage = document.getElementById("profileImage")
const userName = document.getElementById("userName")
const description = document.getElementById("description")
const changeName = document.getElementById("changeName")
const changeDescription = document.getElementById("changeDescription")
const changeImage = document.getElementById("changeImage")
const toggleTheme = document.getElementById("toggleTheme")
const toggleDescription = document.getElementById("toggleDescription")
const resetButton =document.getElementById("resetButton")

changeName.addEventListener("click", function(){
    userName.textContent ='Official'
});

changeDescription.addEventListener("click", function(){
    description.textContent = 'I am a full-stack developer building mordern web applictaion'
});

changeImage.addEventListener("click", function(){
  profileImage.setAttribute("src", "savage.jpeg"
  );  
});

toggleTheme.addEventListener("click", function(){
    profileCard.classList.toggle("dark")
});

toggleDescription.addEventListener("click", function(){
    description.classList.toggle("hidden")
});

resetButton.addEventListener("click", function(){
    userName.textContent = "John Doe"
    description.textContent = "I am a web developer learning javascript"
    profileImage.setAttribute(
        "src", "bridging-technology-and-human-needs.jpg"
        )
        profileCard.classList.remove("dark")
        description.classList.remove("hidden")
});

const box = document.querySelector("#box")
box.classList.add("pen")
