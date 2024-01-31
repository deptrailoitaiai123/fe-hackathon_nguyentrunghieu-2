let projects = [];

function add() {
    let nameValue = document.getElementById("name").value;
    let imageValue = document.getElementById("image").value;
    let linkValue = document.getElementById("link").value;
    let tagValue = document.getElementById("tag").value;

    if(nameValue == "" || imageValue == "" || linkValue == "" || tagValue == ""){
        alert("Phải nhập đầy đủ thông tin");
    }else{
        let newProject = {
            name: nameValue,
            image: imageValue,
            link: linkValue,
            tags: tagValue.split(","),
        };

        projects.push(newProject);

        localStorage.setItem("projects", JSON.stringify(projects));

        document.getElementById("name").value = "";
        document.getElementById("image").value = "";
        document.getElementById("link").value = "";
        document.getElementById("tag").value = "";

        updateTable();
    }
}

function updateProject(index) {
    let projectName = projects[index].name;

    let updatedName = prompt("Update tên:", projectName);
    if (updatedName !== null) {
        projects[index].name = updatedName;
    }

    let updatedImage = prompt("Update image URL:");
    if (updatedImage !== null) {
        projects[index].image = updatedImage;
    }

    let updatedLink = prompt("Update link:");
    if (updatedLink !== null) {
        projects[index].link = updatedLink;
    }

    let updatedTags = prompt("Update tags:");
    if (updatedTags !== null) {
        projects[index].tags = updatedTags.split(",");
    }

    localStorage.setItem("projects", JSON.stringify(projects));

    updateTable();
}

function deleteProject(index) {
    projects.splice(index, 1);

    localStorage.setItem("projects", JSON.stringify(projects));

    updateTable();
}

function updateTable() {
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    projects.forEach((project, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${project.name}</td>
            <td>${project.image}</td>
            <td>${project.link}</td>
            <td>${project.tags.join(",")}</td>
            <td>
                <button id="updateProject" onclick="updateProject(${index})">Update</button>
                <button id="deleteProject" onclick="deleteProject(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}

updateTable();