"use strict";
const projects = [
    {
        name: "coffe shoop",
        status: "offline",
        harga: 2000
    },
    {
        name: "absesnsi",
        status: "online"
    }
];
function addprojects(name, status, harga) {
    const newProject = {
        name,
        status,
        harga
    };
    projects.push(newProject);
}
;
addprojects("web", "online", 100);
addprojects("Personal web", "offline", 200);
addprojects("shop", "online", 12);
console.log(projects);
