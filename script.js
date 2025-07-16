const courses = [
    { name: "Política Educativa", semester: 1, prerequisites: [] },
    { name: "Fundamentos Sociológicos de la Educación", semester: 1, prerequisites: [] },
    { name: "Introducción a la Fonética", semester: 1, prerequisites: [] },
    { name: "Lingüística General I", semester: 2, prerequisites: [] },
    { name: "Fonética y Fonología", semester: 3, prerequisites: ["Introducción a la Fonética"] },
    { name: "Lingüística General II", semester: 4, prerequisites: ["Lingüística General I"] },
    { name: "Gramática Comparada", semester: 6, prerequisites: ["Lingüística General II"] },
    { name: "Lingüística Aplicada a la Enseñanza del Idioma Inglés", semester: 7, prerequisites: ["Gramática Comparada"] }
    // Puedes agregar más ramos siguiendo el mismo formato
];

let completed = JSON.parse(localStorage.getItem('completedCourses') || "[]");

function renderMalla() {
    const container = document.getElementById('malla');
    container.innerHTML = '';

    for (let sem = 1; sem <= 10; sem++) {
        const semestreDiv = document.createElement('div');
        semestreDiv.className = 'semestre';
        semestreDiv.innerHTML = `<h2>Semestre ${sem}</h2>`;

        courses.filter(c => c.semester === sem).forEach(course => {
            const div = document.createElement('div');
            div.className = 'curso';
            if (completed.includes(course.name)) div.classList.add('completed');
            if (!isUnlocked(course)) div.classList.add('locked');
            div.textContent = course.name;
            div.title = !isUnlocked(course) ? 'Requiere: ' + course.prerequisites.join(', ') : 'Clic para marcar/desmarcar';
            div.onclick = () => toggleCourse(course);
            semestreDiv.appendChild(div);
        });

        container.appendChild(semestreDiv);
    }
}

function isUnlocked(course) {
    return course.prerequisites.every(p => completed.includes(p));
}

function toggleCourse(course) {
    if (!isUnlocked(course)) return;
    if (completed.includes(course.name)) {
        completed = completed.filter(c => c !== course.name);
    } else {
        completed.push(course.name);
    }
    localStorage.setItem('completedCourses', JSON.stringify(completed));
    renderMalla();
}

document.getElementById('resetButton').onclick = () => {
    if (confirm("¿Estás seguro de reiniciar la malla?")) {
        completed = [];
        localStorage.removeItem('completedCourses');
        renderMalla();
    }
};

renderMalla();

