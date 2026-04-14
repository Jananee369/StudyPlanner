const addbtn = document.getElementById("addbtn")
const clearbtn = document.getElementById("clearbtn")
const task = document.getElementById("task")
const date = document.getElementById("date")
const tasklist = document.getElementById("tasklist")

let tasks = []

addbtn.addEventListener("click", function()
    {
        const taskvalue = task.value
        const datevalue = date.value

        if ( taskvalue === " ")
        return ;

        const taskfinal  = {
            text : taskvalue,
            date : formatDate(datevalue),
            rawDate : datevalue,
            completed : false,
        }
        tasks.push(taskfinal)
        rendertasks();

        task.value = " ";
    
    })

        function formatDate(dateString) {
            if (!dateString) return '';
            const dateObj = new Date(dateString);
            if (Number.isNaN(dateObj.getTime())) return dateString;
            return dateObj.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }

        function getRemainingTime(dateString) {
            if (!dateString) return 'No deadline set';
            const due = new Date(dateString);
            if (Number.isNaN(due.getTime())) return 'Invalid deadline';

            const now = new Date();
            const diff = due.getTime() - now.getTime();
            if (diff < 0) return 'Deadline passed';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
            if (parts.length === 0) return 'Less than 1 minute left';

            return `Time left: ${parts.join(' ')}`;
        }

        function rendertasks(){

            tasklist.innerHTML ="";
            tasks.forEach((task, index) => {

                const li = document.createElement("li")

                const remaining = getRemainingTime(task.rawDate);
                li.innerHTML = `
                <div class="task-info">
                    <div class="task-text">${task.text}</div>
                    <div class="task-date">${task.date}</div>
                    <div class="task-remaining">${remaining}</div>
                </div>
                <div class="task-actions">
                    <button id="done" onclick="toggleTask(${index})">done</button>
                    <button id="delete" onclick="deleteTask(${index})">delete</button>
                </div>
                `
                if(task.completed){
                    li.classList.add("completed")
                }

                tasklist.appendChild(li)
            });
        }

        clearbtn.addEventListener("click", function() {
            tasks = []
            rendertasks();
        })

        function toggleTask(index){
            tasks[index].completed = !tasks[index].completed
            rendertasks();
        }
        
        function deleteTask(index){
            tasks.splice(index,1)
            rendertasks();
        }


    