let students = [
    {
        roll: "101",
        name: "Rahul Sharma",
        status: "Present"
    },
    {
        roll: "102",
        name: "Aman Kumar",
        status: "Absent"
    },
    {
        roll: "103",
        name: "Simran Kaur",
        status: "Present"
    }
];


// Display current date

const today = new Date();

document.getElementById("currentDate").innerText =
    today.toDateString();


// Display students

function displayStudents(list = students) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    list.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td class="${student.status === "Present"
                ? "present"
                : "absent"}">

                ${student.status}

            </td>

            <td>

                <button
                    class="present-btn"
                    onclick="setAttendance(${index}, 'Present')">

                    Present

                </button>

                <button
                    class="absent-btn"
                    onclick="setAttendance(${index}, 'Absent')">

                    Absent

                </button>

            </td>
        `;

        table.appendChild(row);

    });

    updateDashboard();
}


// Set attendance

function setAttendance(index, status) {

    students[index].status = status;

    displayStudents();

}


// Mark everyone present

function markAllPresent() {

    students.forEach(student => {

        student.status = "Present";

    });

    displayStudents();

}


// Add new student

function addStudent() {

    const name =
        document.getElementById("studentName").value;

    const roll =
        document.getElementById("studentRoll").value;

    if (name === "" || roll === "") {

        alert("Please enter student name and roll number");

        return;
    }

    students.push({

        roll: roll,
        name: name,
        status: "Absent"

    });

    document.getElementById("studentName").value = "";

    document.getElementById("studentRoll").value = "";

    displayStudents();

}


// Dashboard statistics

function updateDashboard() {

    const total = students.length;

    const present =
        students.filter(
            student => student.status === "Present"
        ).length;

    const absent = total - present;

    const percentage =
        total === 0
            ? 0
            : Math.round((present / total) * 100);

    document.getElementById("totalStudents").innerText =
        total;

    document.getElementById("presentStudents").innerText =
        present;

    document.getElementById("absentStudents").innerText =
        absent;

    document.getElementById("attendancePercentage").innerText =
        percentage + "%";

}


// Search students

function searchStudent() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filteredStudents =
        students.filter(student =>
            student.name.toLowerCase().includes(search) ||
            student.roll.includes(search)
        );

    displayStudents(filteredStudents);

}


displayStudents();