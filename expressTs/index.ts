type project = {
    name: string;
    status: string;
    harga?: number;
}

const projects: project[] = [
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

function addprojects(name: string, status: string, harga?: number): void {
    const newProject: project = {
        name,
        status,
        harga
    };
    projects.push(newProject);
};

addprojects("web", "online", 100);
addprojects("Personal web", "offline", 200 );
addprojects("shop", "online", 12);

console.log(projects);
