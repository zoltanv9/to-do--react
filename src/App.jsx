import Menu from "./components/Menu.jsx";
import StartPage from "./components/StartPage.jsx";
import {useState} from "react";
import ProjectForm from "./components/ProjectForm.jsx";
import EditProjectPage from "./components/EditProjectPage.jsx";


const pages = ['start', 'new', 'edit']
const pageComponents = {
    start: StartPage,
    new: ProjectForm,
    edit: EditProjectPage
}

function App() {
    const [activePage, setActivePage] = useState('start')
    const [projects, setProjects] = useState([])
    const [activeProjectIndex, setActiveProjectIndex] = useState({});
    console.log('App rendered')

    const handleOnSave = (project) => {
        setProjects((prevState) => {
            const copiedArray = JSON.parse(JSON.stringify(prevState));
            copiedArray.push(project);
            return copiedArray;
        })
        loadPage('start')
    }
    
    const handleOnEdit = (index) => {
        setActiveProjectIndex(index);
        loadPage('edit')
    }
    
    const loadPage = ((pageIndex) => {
        setActivePage(pageIndex);
    })

    const handleOnClickAddTask = (taskName) => {
        setProjects((prevState) => {
            return prevState.map((project, index) => {
                if (index === activeProjectIndex) {
                    return {
                        ...project,
                        tasks: project.tasks ? [...project.tasks, taskName] : [taskName],
                    };
                }
                return project;
            });
        });
    };

    const handleOnClickClearTask = (taskIndex) => {
        setProjects((prevState) => {
            return prevState.map((project, index) => {
                if (index === activeProjectIndex) {
                    return {
                        ...project,
                        tasks: project.tasks.filter((task, i) => i !== taskIndex),
                    };
                }
                return project;
            });
        });
    }

    const handleOnDelete = () => {
        setProjects((prevState) => {
            return prevState.filter((project, index) => index !== activeProjectIndex);
        });
        loadPage('start');
    }
    
    const renderComponent = () => {
        if (activePage === 'edit') {
            return <EditProjectPage 
                project={projects[activeProjectIndex]}
                onDelete={handleOnDelete}
                onClickAddTask={handleOnClickAddTask}
                onClickClearTask={handleOnClickClearTask}
            />;
        } else if (activePage === 'new') {
            return <ProjectForm 
                onNavigateBack={() => loadPage('start')}
                onSave={handleOnSave}
            />;
        } else {
            return <StartPage onButtonClick={() => loadPage('new')} />
        }
    };
    const DynamicComponent = pageComponents[activePage];
    return (
        <div className="h-screen flex flex-col">
            <header className="p-5">
            </header>
            <main className="flex-grow flex">
                <div className="hidden md:block md:min-w-[380px]">
                    <Menu 
                        projects={projects}
                        onButtonClick={() => loadPage('new')}
                        onProjectClick={handleOnEdit}
                    />
                </div>
                <div className="w-full">
                    {renderComponent()}
                </div>
            </main>
        </div>
    );
}

export default App;