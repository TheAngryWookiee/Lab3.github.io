"use strict";

(function (core) {
    class Router {
        // constructors
        constructor() 
        {
            this.ActiveLink = "";

            this.m_callbacks = [];
        }

        // Public Properties (getters and setters)
        get ActiveLink() 
        {
            return this.m_activeLink;
        }

        set ActiveLink(link) 
        {
            this.m_activeLink = link;
        }

        // Public methods

        /**
         * Adds a new route to the Routing Table
         *
         * @param {string} route
         * @param {function} callback
         * @returns {void}
         */

        AddCallBack(route, callback) {
            this.m_callbacks.push({route, callback});
        }

        Add(route) 
        {
            this.m_routingTable.push(route);
        }

        /**
         * This replaces the current Routing Table with a new one
         * Routes should begin with / character
         *
         * @param {string} routingTable
         * @returns {void}
         */
        AddTable(routingTable) 
        {
            this.m_routingTable = routingTable;
        }

        /**
         * This method finds the index of the route in the routing table
         * otherwise it returns -1 if the route is not found
         *
         * @param {string} route
         * @returns {number}
         */
        Find(route) 
        {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route was successfully removed,
         * otherwise it returns false
         * 
         * @param {string} route
         * @returns {boolean}
         */
        Remove(route) 
        {
            if (this.Find(route) > -1) {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table as a comma-separated string 
         *
         * @returns {string}
         */
        ToString() 
        {
            return this.m_routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}));

let router = new core.Router();
router.AddTable(["/", 
                 "/home", 
                 "/about", 
                 "/services", 
                 "/contact", 
                 "/contact-list", 
                 "/projects", 
                 "/register", 
                 "/login", 
                 "/edit",
                 "/task-list"]);
                
let route = location.pathname; // alias for location.pathname

if(router.Find(route) > -1)
{
    router.ActiveLink = (route == "/") ? "home" : route.substring(1)
}
else
{
    router.ActiveLink = "404";
}

router.Add("/task-list")

function ensureLoggedIn(req, res, next) {
    if (isLoggedIn) {
        return next();
    } else {
        res.redirect('./OldContent/login.html')
    }
}


function toggleTaskListLink(){
    const taskListLink = document.getElementById('taskListLink');

    if (isLoggedIn || router.ActiveLink === "task-list") {
        taskListLink.style.display = 'block';
    } else {
        taskListLink.style.display = 'none';
    }
}

toggleTaskListLink();

const navBar = document.querySelector('.navbar-nav');

const taskListNavItem = document.createElement('li');
taskListNavItem.id = 'taskListLink';
taskListNavItem.className = 'nav-item';
taskListNavItem.style.display = 'none';

const taskListLink = document.createElement('a');
taskListLink.className = 'nav-link';
taskListLink.href = '/task-list';

taskListLink.innerHTML = '<i class="fas fa-tasks"></i> Task List';

taskListNavItem.appendChild(taskListLink);

navBar.appendChild(taskListNavItem);

function DisplayTaskList(){

    const taskListContainer = document.getElementById('taskListContainer');

    const tasks = [
        {id: 1, text: 'Task 1: Make a Cake'},
        {id: 2, text: 'Task 2: Run some Tests'},
        {id: 3, text: 'Task 3: Declare the cake is a lie'}
    ];

    taskListContainer.innerHTML = '';

    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = '<span>${task.text</span>';
        ul.appendChild(li);
    });

    taskListContainer.appendChild(ul);
    
}

router.AddCallBack("/task-list", DisplayTaskList);


