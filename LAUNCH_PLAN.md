# ADHD Work Manager - Step-by-Step Launch Plan

## Overview

This launch plan provides a detailed, step-by-step guide to rebuild the ADHD Work Manager from scratch. Follow these phases in order for the smoothest development experience.

**Estimated total implementation:** 15-20 hours for an experienced React developer

**Recommended approach:** Build incrementally, test after each phase

---

## Phase 0: Environment Setup (15 minutes)

### Step 1: Create Project Directory
```bash
mkdir adhd-work-manager
cd adhd-work-manager
```

### Step 2: Initialize Git
```bash
git init
echo "node_modules/
dist/
build/
.vscode/
.idea/
*.swp
*.swo
.DS_Store
Thumbs.db
*.log
.env
.env.local" > .gitignore
```

### Step 3: Create File Structure
```bash
touch index.html
touch app.jsx
touch README.md
```

### Step 4: Set Up Local Development Server

**Option A - Python:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Option B - Node.js:**
```bash
npx serve
# Follow URL shown in terminal
```

**Option C - VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Step 5: Open Browser DevTools
- Open Chrome/Firefox DevTools (F12)
- Keep Console open to catch errors
- Install React DevTools extension (recommended)

---

## Phase 1: HTML Foundation (30 minutes)

### Step 1: Create index.html Structure

Create the complete `index.html` file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADHD Work Manager</title>

  <!-- React 18 CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- Babel Standalone -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Custom Markdown Styles -->
  <style>
    .prose a {
      color: #60a5fa;
      text-decoration: underline;
    }
    .prose strong {
      font-weight: 700;
    }
    .prose em {
      font-style: italic;
    }
    .prose ul {
      list-style-type: disc;
      padding-left: 1.5em;
    }
    .prose ol {
      list-style-type: decimal;
      padding-left: 1.5em;
    }
    .prose li {
      margin: 0.25em 0;
    }
  </style>

  <!-- localStorage Wrapper API -->
  <script>
    window.storage = {
      async get(key) {
        try {
          const value = localStorage.getItem(key);
          return value ? { value } : null;
        } catch (error) {
          console.error('Storage get error:', error);
          return null;
        }
      },
      async set(key, value) {
        try {
          localStorage.setItem(key, value);
          return { success: true };
        } catch (error) {
          console.error('Storage set error:', error);
          return { success: false, error };
        }
      }
    };
  </script>
</head>
<body>
  <div id="root"></div>

  <!-- Load Main App -->
  <script type="text/babel" src="app.jsx"></script>

  <!-- Mount React App -->
  <script type="text/babel">
    const { StrictMode } = React;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <StrictMode>
        <ADHDWorkManager />
      </StrictMode>
    );
  </script>
</body>
</html>
```

### Step 2: Test HTML
- Open in browser
- Check Console for CDN load errors
- Should see blank page (no errors)

---

## Phase 2: React Foundation & Icons (1 hour)

### Step 1: Create Basic Component Structure

In `app.jsx`:

```jsx
const ADHDWorkManager = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white p-6">
      <h1>ADHD Work Manager</h1>
    </div>
  );
};
```

### Step 2: Test React Rendering
- Reload browser
- Should see "ADHD Work Manager" text on dark background
- Check React DevTools to verify component mounted

### Step 3: Create All Icon Components

Add these before the `ADHDWorkManager` component:

```jsx
// Icon Components
const Calendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Trash2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CheckCircle2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Circle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const Brain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4.52c-1.7 0-3.2.85-4.1 2.15C6.8 6.25 5.6 6 4.5 6 2.6 6 1 7.6 1 9.5c0 1.3.7 2.4 1.8 3 0 .1 0 .2 0 .3 0 1.5.8 2.8 2 3.5-.5.5-.8 1.2-.8 2 0 1.5 1.2 2.7 2.7 2.7.6 0 1.1-.2 1.6-.5.6.9 1.6 1.5 2.7 1.5s2.1-.6 2.7-1.5c.5.3 1 .5 1.6.5 1.5 0 2.7-1.2 2.7-2.7 0-.8-.3-1.5-.8-2 1.2-.7 2-2 2-3.5 0-.1 0-.2 0-.3 1.1-.6 1.8-1.7 1.8-3C23 7.6 21.4 6 19.5 6c-1.1 0-2.2.25-3.4.67C15.2 5.37 13.7 4.52 12 4.52z"></path>
  </svg>
);

const Target = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const Zap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Settings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
  </svg>
);

const X = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const GripVertical = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="12" r="1"></circle>
    <circle cx="9" cy="5" r="1"></circle>
    <circle cx="9" cy="19" r="1"></circle>
    <circle cx="15" cy="12" r="1"></circle>
    <circle cx="15" cy="5" r="1"></circle>
    <circle cx="15" cy="19" r="1"></circle>
  </svg>
);

const Edit2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const Archive = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="21 8 21 21 3 21 3 8"></polyline>
    <rect x="1" y="3" width="22" height="5"></rect>
    <line x1="10" y1="12" x2="14" y2="12"></line>
  </svg>
);
```

### Step 4: Test Icons
Update your component to display a test icon:
```jsx
<div className="w-6 h-6 text-blue-400">
  <Brain />
</div>
```

---

## Phase 3: State Management & Constants (30 minutes)

### Step 1: Add Constants

At the top of `ADHDWorkManager`, before any JSX:

```jsx
const ADHDWorkManager = () => {
  // Default priorities
  const DEFAULT_PRIORITIES = [
    { id: 'high', name: 'High', icon: 'zap', color: 'text-red-400' },
    { id: 'medium', name: 'Medium', icon: 'target', color: 'text-yellow-400' },
    { id: 'low', name: 'Low', icon: 'circle', color: 'text-gray-400' }
  ];

  // Default companies
  const DEFAULT_COMPANIES = [
    { id: 'bateman', name: 'Bateman', color: 'bg-blue-900/30 border-blue-500 text-blue-300' },
    { id: 'hireoutcome', name: 'HireOutcome', color: 'bg-purple-900/30 border-purple-500 text-purple-300' },
    { id: 'personal', name: 'Personal', color: 'bg-green-900/30 border-green-500 text-green-300' }
  ];

  // Icon mapping
  const priorityIcons = {
    zap: Zap,
    target: Target,
    circle: Circle,
    brain: Brain,
    clock: Clock,
    calendar: Calendar
  };

  // ... rest of component
};
```

### Step 2: Add All State Hooks

```jsx
// Core data
const [tasks, setTasks] = React.useState([]);
const [timeBlocks, setTimeBlocks] = React.useState([]);
const [projects, setProjects] = React.useState([]);
const [priorities, setPriorities] = React.useState(DEFAULT_PRIORITIES);
const [companies, setCompanies] = React.useState(DEFAULT_COMPANIES);

// UI state
const [view, setView] = React.useState('today');
const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
const [calendarView, setCalendarView] = React.useState('day');
const [selectedTask, setSelectedTask] = React.useState(null);
const [sidebarWidth, setSidebarWidth] = React.useState(400);
const [showCompleted, setShowCompleted] = React.useState(false);
const [filterDate, setFilterDate] = React.useState('all');
const [filterProject, setFilterProject] = React.useState('all');
const [showArchivedProjects, setShowArchivedProjects] = React.useState(false);

// Input state
const [newTask, setNewTask] = React.useState('');
const [newProjectName, setNewProjectName] = React.useState('');
const [newChecklistItem, setNewChecklistItem] = React.useState('');

// Modal state
const [showNewProjectModal, setShowNewProjectModal] = React.useState(false);
const [showQuickAddTask, setShowQuickAddTask] = React.useState(false);
const [quickAddTaskProject, setQuickAddTaskProject] = React.useState(null);
const [quickAddTaskName, setQuickAddTaskName] = React.useState('');

// Drag/resize state
const [draggedBlock, setDraggedBlock] = React.useState(null);
const [resizingBlock, setResizingBlock] = React.useState(null);
const [resizeStartY, setResizeStartY] = React.useState(0);
const [resizeStartDuration, setResizeStartDuration] = React.useState(0);
const [dragOverY, setDragOverY] = React.useState(null);
const [isResizingSidebar, setIsResizingSidebar] = React.useState(false);

// Editor state
const [editingNotes, setEditingNotes] = React.useState(false);
const [editingProjectNotes, setEditingProjectNotes] = React.useState(false);
const [timeReportFilter, setTimeReportFilter] = React.useState('today');
```

### Step 3: Test State
Add to component to verify state works:
```jsx
<p>Tasks: {tasks.length}</p>
<p>Current view: {view}</p>
```

---

## Phase 4: Data Persistence (45 minutes)

### Step 1: Create Load Data Function

```jsx
React.useEffect(() => {
  const loadData = async () => {
    try {
      // Load tasks
      const savedTasks = await window.storage.get('adhd-tasks');
      if (savedTasks?.value) {
        setTasks(JSON.parse(savedTasks.value));
      }

      // Load time blocks
      const savedBlocks = await window.storage.get('adhd-timeblocks');
      if (savedBlocks?.value) {
        setTimeBlocks(JSON.parse(savedBlocks.value));
      }

      // Load projects with migration
      const savedProjects = await window.storage.get('adhd-projects');
      if (savedProjects?.value) {
        const parsed = JSON.parse(savedProjects.value);
        // Migrate old data
        const migrated = parsed.map(p => ({
          ...p,
          order: p.order ?? p.id,
          createdAt: p.createdAt ?? new Date().toISOString(),
          notes: p.notes ?? '',
          priority: p.priority ?? 'medium'
        }));
        setProjects(migrated);
      }

      // Load priorities
      const savedPriorities = await window.storage.get('adhd-priorities');
      if (savedPriorities?.value) {
        setPriorities(JSON.parse(savedPriorities.value));
      }

      // Load companies
      const savedCompanies = await window.storage.get('adhd-companies');
      if (savedCompanies?.value) {
        setCompanies(JSON.parse(savedCompanies.value));
      }

      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  loadData();
}, []);
```

### Step 2: Create Save Data Function

```jsx
React.useEffect(() => {
  const saveData = async () => {
    try {
      await window.storage.set('adhd-tasks', JSON.stringify(tasks));
      await window.storage.set('adhd-timeblocks', JSON.stringify(timeBlocks));
      await window.storage.set('adhd-projects', JSON.stringify(projects));
      await window.storage.set('adhd-priorities', JSON.stringify(priorities));
      await window.storage.set('adhd-companies', JSON.stringify(companies));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  saveData();
}, [tasks, timeBlocks, projects, priorities, companies]);
```

### Step 3: Test Persistence
- Open browser console
- Run: `localStorage.setItem('adhd-tasks', JSON.stringify([{id: 1, text: 'Test'}]))`
- Reload page
- Check if task appears in state (via React DevTools)

---

## Phase 5: Core Task Functions (1 hour)

### Step 1: Add Task Function

```jsx
const addTask = () => {
  if (!newTask.trim()) return;

  const task = {
    id: Date.now(),
    text: newTask,
    priority: priorities[0].id,
    completed: false,
    createdAt: new Date().toISOString(),
    company: null,
    projectId: null,
    notes: '',
    checklist: []
  };

  setTasks([...tasks, task]);
  setNewTask('');
};
```

### Step 2: Delete Task Function

```jsx
const deleteTask = (taskId) => {
  setTasks(tasks.filter(t => t.id !== taskId));
  setTimeBlocks(timeBlocks.filter(b => b.taskId !== taskId));
  if (selectedTask?.id === taskId) {
    setSelectedTask(null);
  }
};
```

### Step 3: Update Task Function

```jsx
const updateTask = (taskId, updates) => {
  setTasks(tasks.map(t =>
    t.id === taskId ? { ...t, ...updates } : t
  ));

  if (selectedTask?.id === taskId) {
    setSelectedTask({ ...selectedTask, ...updates });
  }
};
```

### Step 4: Toggle Task Completion

```jsx
const toggleTask = (taskId) => {
  setTasks(tasks.map(t =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  ));
};
```

### Step 5: Update Priority

```jsx
const updatePriority = (taskId, priorityId) => {
  updateTask(taskId, { priority: priorityId });
};
```

### Step 6: Test Functions
Add a test button to your UI:
```jsx
<button onClick={() => addTask()}>Add Test Task</button>
```
Check React DevTools to see task added to state.

---

## Phase 6: Calendar Functions (1.5 hours)

### Step 1: Time Conversion Functions

```jsx
const getTimeFromPosition = (yPosition, containerTop) => {
  const relativeY = yPosition - containerTop;
  const totalMinutesFromStart = (relativeY / 80) * 60;
  const roundedMinutes = Math.round(totalMinutesFromStart / 15) * 15;
  const hours = Math.floor(roundedMinutes / 60) + 7;
  const minutes = roundedMinutes % 60;

  if (hours < 7 || hours >= 21) return null;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const formatTime12Hour = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - 7) * 60 + minutes;
};
```

### Step 2: Schedule Task Function

```jsx
const scheduleTask = (taskId, date, time) => {
  const block = {
    id: Date.now(),
    taskId,
    date,
    time,
    duration: 60
  };
  setTimeBlocks([...timeBlocks, block]);
};
```

### Step 3: Time Block Management

```jsx
const removeBlock = (blockId) => {
  setTimeBlocks(timeBlocks.filter(b => b.id !== blockId));
};

const updateBlockDuration = (blockId, duration) => {
  const constrained = Math.max(15, Math.min(240, duration));
  setTimeBlocks(timeBlocks.map(b =>
    b.id === blockId ? { ...b, duration: constrained } : b
  ));
};

const moveBlockToTime = (blockId, newTime) => {
  setTimeBlocks(timeBlocks.map(b =>
    b.id === blockId ? { ...b, time: newTime } : b
  ));
};

const moveBlockToDate = (blockId, newDate) => {
  setTimeBlocks(timeBlocks.map(b =>
    b.id === blockId ? { ...b, date: newDate } : b
  ));
};
```

### Step 4: Week Date Generation

```jsx
const getWeekDates = (dateStr) => {
  const date = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
      fullDate: d
    };
  });
};
```

---

## Phase 7: Drag & Drop (2 hours)

### Step 1: Resize Handlers

```jsx
const handleResizeStart = (e, blockId, duration) => {
  e.stopPropagation();
  setResizingBlock(blockId);
  setResizeStartY(e.clientY);
  setResizeStartDuration(duration);
};

const handleResizeMove = (e) => {
  if (!resizingBlock) return;

  const deltaY = e.clientY - resizeStartY;
  const deltaMinutes = Math.round((deltaY / 80) * 60 / 5) * 5;
  const newDuration = Math.max(15, Math.min(240, resizeStartDuration + deltaMinutes));

  updateBlockDuration(resizingBlock, newDuration);
};

const handleResizeEnd = () => {
  setResizingBlock(null);
};

React.useEffect(() => {
  if (resizingBlock) {
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }
}, [resizingBlock, resizeStartY, resizeStartDuration]);
```

### Step 2: Drag Over Handler (for snap indicators)

```jsx
const handleDragOver = (e) => {
  e.preventDefault();
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const snapY = Math.round(y / 20) * 20; // Snap to 15-min intervals (20px = 15min at 80px/hour)
  setDragOverY(snapY);
};
```

### Step 3: Drop Handler

```jsx
const handleDrop = (e) => {
  e.preventDefault();
  setDragOverY(null);

  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  const time = getTimeFromPosition(e.clientY, rect.top);

  if (!time) return;

  const taskId = parseInt(e.dataTransfer.getData('taskId'));
  if (taskId) {
    scheduleTask(taskId, selectedDate, time);
  }
};
```

---

## Phase 8: Project Functions (1 hour)

```jsx
const addProject = () => {
  if (!newProjectName.trim()) return;

  const project = {
    id: Date.now(),
    name: newProjectName,
    archived: false,
    priority: priorities[0].id,
    notes: '',
    order: Date.now(),
    createdAt: new Date().toISOString()
  };

  setProjects([...projects, project]);
  setNewProjectName('');
  setShowNewProjectModal(false);
};

const updateProject = (projectId, updates) => {
  setProjects(projects.map(p =>
    p.id === projectId ? { ...p, ...updates } : p
  ));

  if (selectedTask?.id === projectId && selectedTask.type === 'project') {
    setSelectedTask({ ...selectedTask, ...updates });
  }
};

const deleteProject = (projectId) => {
  setProjects(projects.filter(p => p.id !== projectId));
  setTasks(tasks.map(t =>
    t.projectId === projectId ? { ...t, projectId: null } : t
  ));
  if (selectedTask?.id === projectId) {
    setSelectedTask(null);
  }
};

const getProjectStats = (projectId) => {
  const projectTasks = tasks.filter(t => t.projectId === projectId);
  const completed = projectTasks.filter(t => t.completed).length;
  const total = projectTasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const taskIds = projectTasks.map(t => t.id);
  const projectBlocks = timeBlocks.filter(b => taskIds.includes(b.taskId));
  const totalMinutes = projectBlocks.reduce((sum, b) => sum + b.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    total,
    completed,
    progress,
    scheduled: projectBlocks.length,
    timeTracked: `${hours}h ${minutes}m`
  };
};
```

---

## Phase 9: Time Tracking (45 minutes)

```jsx
const getCompanyTimeStats = (filter) => {
  let filteredBlocks = [...timeBlocks];
  const now = new Date();

  if (filter === 'today') {
    const today = now.toISOString().split('T')[0];
    filteredBlocks = filteredBlocks.filter(b => b.date === today);
  } else if (filter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filteredBlocks = filteredBlocks.filter(b => new Date(b.date + 'T12:00:00') >= weekAgo);
  } else if (filter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    filteredBlocks = filteredBlocks.filter(b => new Date(b.date + 'T12:00:00') >= monthAgo);
  }

  const stats = {};
  filteredBlocks.forEach(block => {
    const task = tasks.find(t => t.id === block.taskId);
    const company = task?.company || 'none';
    stats[company] = (stats[company] || 0) + block.duration;
  });

  return Object.entries(stats).map(([companyId, minutes]) => ({
    company: companies.find(c => c.id === companyId) || {
      id: 'none',
      name: 'None',
      color: 'bg-gray-900/30 border-gray-500 text-gray-300'
    },
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60
  }));
};
```

---

## Phase 10: Markdown Editor (1 hour)

```jsx
const handleNotesKeydown = (e) => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const cmdKey = isMac ? e.metaKey : e.ctrlKey;

  if (!cmdKey) return;

  const { selectionStart, selectionEnd, value } = e.target;
  const selectedText = value.substring(selectionStart, selectionEnd);
  let newText, newCursorPos;

  if (e.key === 'b') {
    e.preventDefault();
    const insertion = `**${selectedText || 'bold text'}**`;
    newText = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
    newCursorPos = selectedText ? selectionEnd + 4 : selectionStart + 2;
  } else if (e.key === 'i') {
    e.preventDefault();
    const insertion = `*${selectedText || 'italic text'}*`;
    newText = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
    newCursorPos = selectedText ? selectionEnd + 2 : selectionStart + 1;
  } else if (e.key === 'k') {
    e.preventDefault();
    const insertion = `[${selectedText || 'link text'}](url)`;
    newText = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
    newCursorPos = selectedText ? selectionEnd + 3 : selectionStart + 1;
  }

  if (newText !== undefined) {
    updateTask(selectedTask.id, { notes: newText });
    setTimeout(() => {
      e.target.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }
};

const renderMarkdown = (text) => {
  if (!text) return '';

  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let listType = '';

  lines.forEach((line, index) => {
    const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`;
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${orderedMatch[2]}</li>`;
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`;
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${unorderedMatch[1]}</li>`;
      return;
    }

    if (inList) {
      html += `</${listType}>`;
      inList = false;
    }

    let processed = line;
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    processed = processed.replace(/__(.+?)__/g, '<strong>$1</strong>');
    processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
    processed = processed.replace(/_(.+?)_/g, '<em>$1</em>');
    processed = processed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    html += processed + '<br />';
  });

  if (inList) html += `</${listType}>`;

  return html;
};
```

---

## Phase 11-15: UI Implementation

*Due to length, the remaining phases follow a similar pattern. The key is to implement the JSX UI section by section, testing as you go.*

**Recommended order:**
1. Header (title + view switcher)
2. Quick add input
3. Unscheduled tasks list
4. Day view calendar
5. Week view calendar
6. Projects view
7. Settings view
8. Detail sidebar
9. Modals

**For each section:**
- Copy JSX from reference implementation
- Test immediately
- Connect event handlers
- Verify state updates

---

## Testing Protocol

After each phase, run these quick tests:

**Phase 1-3:** Verify app renders, state initializes
**Phase 4:** Add localStorage data manually, reload, verify it loads
**Phase 5:** Add task via function, check state
**Phase 6:** Call `scheduleTask()` manually, verify block created
**Phase 7:** Test drag/drop in UI
**Phase 8:** Create project, verify stats calculate
**Phase 9:** Schedule tasks, check time report
**Phase 10:** Type markdown, verify preview renders

---

## Deployment Steps

### GitHub Pages

```bash
# Commit all files
git add .
git commit -m "Initial ADHD Work Manager implementation"

# Create GitHub repo (via web interface)
# Then:
git remote add origin https://github.com/username/adhd-work-manager.git
git branch -M main
git push -u origin main

# Enable Pages: Settings → Pages → Source: main branch
```

### Netlify

1. Push to GitHub (as above)
2. Go to app.netlify.com
3. "New site from Git"
4. Connect repository
5. Build settings: leave empty
6. Deploy

---

## Troubleshooting

**App doesn't load:**
- Check browser console for CDN errors
- Verify `type="text/babel"` on script tags
- Check for JavaScript syntax errors

**State doesn't persist:**
- Open DevTools → Application → localStorage
- Verify keys exist (`adhd-tasks`, etc.)
- Check browser privacy settings

**Drag-and-drop doesn't work:**
- Verify `draggable="true"` on task elements
- Check `onDragStart` sets `dataTransfer`
- Ensure `onDragOver` calls `e.preventDefault()`

**Icons don't show:**
- Check icon component definitions
- Verify `viewBox`, `stroke`, `fill` attributes
- Test with simple shapes first

---

## Success Metrics

You've successfully completed the rebuild when:

✅ App loads without console errors
✅ Tasks can be created and deleted
✅ Tasks can be dragged to calendar
✅ Time blocks can be resized
✅ Projects show correct statistics
✅ Markdown renders properly
✅ Data persists after reload
✅ Time tracking shows correct totals
✅ All settings are customizable
✅ App is deployed and publicly accessible

---

## Next Steps After Launch

1. **Share with users** and gather feedback
2. **Monitor for bugs** (check browser console logs)
3. **Iterate on UX** based on real usage
4. **Consider enhancements**:
   - Keyboard shortcuts
   - Search functionality
   - Data export/import
   - Dark/light mode toggle
   - Mobile responsiveness improvements

Good luck with your rebuild! 🚀
