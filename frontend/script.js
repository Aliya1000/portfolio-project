console.log("Script Loaded");
fetch("http://localhost:5000/api/projects")
.then(response => response.json())
.then(data => {
    console.log(data);
    const container =
    document.getElementById(
      "projectContainer"
    );

    data.forEach(project => {

        container.innerHTML += `
        <div class="project-card">

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <p>${project.technology}</p>

        </div>
        `;
    });
});
document
.getElementById("contactForm")
.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

message:
document.getElementById("message").value

};

await fetch(
"http://localhost:5000/api/contact",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

}
);

alert("Message Sent");

});