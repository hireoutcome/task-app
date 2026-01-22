# ADHD Work Manager - Complete Rebuild Prompt & Launch Plan

## Executive Summary

You are tasked with building a **zero-build, CDN-powered React 18 task management application** designed specifically for ADHD users who need visual time-blocking, project organization, and friction-free task capture.

**Core Philosophy:**
- **Brain Dump First**: Instant task capture without cognitive overhead
- **Visual Time Blocking**: Google Calendar-style drag-and-drop scheduling
- **Project-Based Organization**: Group tasks by goals with progress tracking
- **Customization**: User-defined priorities and client/company tags
- **Zero Friction**: No build step, auto-save, simple deployment

---

## Technical Architecture

### Tech Stack (Zero-Build Approach)

**Frontend Framework:**
- React 18 (CDN: `https://unpkg.com/react@18/umd/react.production.min.js`)
- ReactDOM 18 (CDN: `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`)

**Transpilation:**
- Babel Standalone (CDN: `https://unpkg.com/@babel/standalone/babel.min.js`)
- JSX transpiled in browser at runtime

**Styling:**
- Tailwind CSS (CDN: `https://cdn.tailwindcss.com`)
- Dark mode theme with gradient backgrounds
- Custom markdown prose styles

**Data Persistence:**
- localStorage via custom async wrapper API
- No backend, no database
- Client-side only

**File Structure:**
```
/
├── index.html          # Entry point, CDN imports, mount script
├── app.jsx             # Complete React application (2215 lines)
├── README.md           # User documentation
└── .gitignore          # Git ignore rules
```

---

## Data Models & State Management

### Core Data Structures

#### Task Object
```javascript
{
  id: Number,              // Date.now() timestamp
  text: String,            // Task name
  priority: String,        // Reference to priority.id
  completed: Boolean,      // true/false
  createdAt: String,       // ISO 8601 timestamp
  company: String | null,  // Reference to company.id (optional)
  projectId: Number | null,// Reference to project.id (optional)
  notes: String,           // Markdown-formatted notes
  checklist: [{            // Sub-tasks array
    id: Number,
    text: String,
    completed: Boolean
  }]
}
```

#### Time Block Object
```javascript
{
  id: Number,              // Date.now() timestamp
  taskId: Number,          // Reference to task.id
  date: String,            // 'YYYY-MM-DD'
  time: String,            // 'HH:MM' (24-hour)
  duration: Number         // Minutes (15-240)
}
```

#### Project Object
```javascript
{
  id: Number,              // Date.now() timestamp
  name: String,            // Project name
  archived: Boolean,       // Archive status
  priority: String,        // Reference to priority.id
  notes: String,           // Markdown notes
  order: Number,           // Display order (for drag reordering)
  createdAt: String        // ISO 8601 timestamp
}
```

#### Priority Object (User-Customizable)
```javascript
{
  id: String,              // e.g., 'high', 'medium', 'low'
  name: String,            // Display name
  icon: String,            // 'zap' | 'target' | 'circle' | 'brain' | 'clock' | 'calendar'
  color: String            // Tailwind class: 'text-red-400', 'text-yellow-400', etc.
}
```

#### Company/Tag Object (User-Customizable)
```javascript
{
  id: String,              // e.g., 'bateman', 'hireoutcome'
  name: String,            // Display name
  color: String            // Combined Tailwind: 'bg-blue-900/30 border-blue-500 text-blue-300'
}
```

### State Management

**React Hooks (20+ useState variables):**

```javascript
// Core Data
const [tasks, setTasks] = useState([]);
const [timeBlocks, setTimeBlocks] = useState([]);
const [projects, setProjects] = useState([]);
const [priorities, setPriorities] = useState(DEFAULT_PRIORITIES);
const [companies, setCompanies] = useState(DEFAULT_COMPANIES);

// UI State
const [view, setView] = useState('today');  // 'today' | 'projects' | 'settings'
const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [calendarView, setCalendarView] = useState('day');  // 'day' | 'week'
const [selectedTask, setSelectedTask] = useState(null);
const [sidebarWidth, setSidebarWidth] = useState(400);
const [showCompleted, setShowCompleted] = useState(false);
const [filterDate, setFilterDate] = useState('all');
const [filterProject, setFilterProject] = useState('all');
const [showArchivedProjects, setShowArchivedProjects] = useState(false);

// Input State
const [newTask, setNewTask] = useState('');
const [newProjectName, setNewProjectName] = useState('');
const [newChecklistItem, setNewChecklistItem] = useState('');

// Modal State
const [showNewProjectModal, setShowNewProjectModal] = useState(false);
const [showQuickAddTask, setShowQuickAddTask] = useState(false);
const [quickAddTaskProject, setQuickAddTaskProject] = useState(null);

// Drag/Resize State
const [draggedBlock, setDraggedBlock] = useState(null);
const [resizingBlock, setResizingBlock] = useState(null);
const [dragOverY, setDragOverY] = useState(null);

// Editor State
const [editingNotes, setEditingNotes] = useState(false);
const [timeReportFilter, setTimeReportFilter] = useState('today');
```

### Default Data

**Default Priorities:**
```javascript
[
  { id: 'high', name: 'High', icon: 'zap', color: 'text-red-400' },
  { id: 'medium', name: 'Medium', icon: 'target', color: 'text-yellow-400' },
  { id: 'low', name: 'Low', icon: 'circle', color: 'text-gray-400' }
]
```

**Default Companies:**
```javascript
[
  { id: 'bateman', name: 'Bateman', color: 'bg-blue-900/30 border-blue-500 text-blue-300' },
  { id: 'hireoutcome', name: 'HireOutcome', color: 'bg-purple-900/30 border-purple-500 text-purple-300' },
  { id: 'personal', name: 'Personal', color: 'bg-green-900/30 border-green-500 text-green-300' }
]
```

---

## Core Features & User Flows

### 1. Quick Brain Dump

**User Flow:**
1. User types task in top input field ("brain dump" placeholder)
2. Presses Enter or clicks Add button
3. Task appears in unscheduled tasks list
4. Input clears, ready for next task

**Implementation:**
```javascript
const addTask = () => {
  if (!newTask.trim()) return;
  const task = {
    id: Date.now(),
    text: newTask,
    priority: priorities[0].id,  // Default to first priority
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

### 2. Time-Block Calendar (Day View)

**Visual Design:**
- Google Calendar-style timeline
- Time range: 7 AM - 9 PM (14 hours)
- Grid: 14 rows × 80px per hour = 1120px total height
- Left column: Time labels (80px wide)
- Right area: Drop zone for scheduling

**Drag-and-Drop Scheduling:**

```javascript
// Calculate time from Y position
const getTimeFromPosition = (yPosition, containerTop) => {
  const relativeY = yPosition - containerTop;
  const totalMinutesFromStart = (relativeY / 80) * 60;  // 80px per hour
  const roundedMinutes = Math.round(totalMinutesFromStart / 15) * 15;  // Snap to 15min
  const hours = Math.floor(roundedMinutes / 60) + 7;  // +7 for 7am start
  const minutes = roundedMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// Schedule task at drop position
const scheduleTask = (taskId, date, time) => {
  const block = {
    id: Date.now(),
    taskId,
    date,
    time,
    duration: 60  // Default 1 hour
  };
  setTimeBlocks([...timeBlocks, block]);
};
```

**Block Rendering:**
```javascript
// Calculate top position and height
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - 7) * 60 + minutes;  // Relative to 7am
};

const blockStyle = {
  position: 'absolute',
  top: `${(timeToMinutes(block.time) / 60) * 80}px`,
  height: `${(block.duration / 60) * 80}px`,
  left: 0,
  right: 0
};
```

**Resize Functionality:**
```javascript
const handleResizeMove = (e) => {
  const deltaY = e.clientY - resizeStartY;
  const deltaMinutes = Math.round((deltaY / 80) * 60 / 5) * 5;  // Snap to 5min
  const newDuration = Math.max(15, Math.min(240, resizeStartDuration + deltaMinutes));

  setTimeBlocks(timeBlocks.map(b =>
    b.id === resizingBlock ? { ...b, duration: newDuration } : b
  ));
};
```

**Snap Indicators:**
```javascript
// Show blue line with dots at 15-minute intervals
{dragOverY && (
  <div className="absolute left-0 right-0 flex items-center"
       style={{ top: `${dragOverY}px` }}>
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <div className="flex-1 h-0.5 bg-blue-500"></div>
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
  </div>
)}
```

### 3. Time-Block Calendar (Week View)

**Layout:**
- 5 columns: Monday - Friday
- Compressed: 60px per hour (vs 80px in day view)
- Mini blocks showing task name + icon
- Click block to view details in sidebar

**Week Date Calculation:**
```javascript
const getWeekDates = (dateStr) => {
  const date = new Date(dateStr);
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

### 4. Project Organization

**Features:**
- Create unlimited projects
- Drag to reorder (numbered priority)
- Progress visualization (completed/total tasks)
- Time tracking per project
- Archive/unarchive
- Quick add tasks directly to project

**Project Statistics:**
```javascript
const getProjectStats = (projectId) => {
  const projectTasks = tasks.filter(t => t.projectId === projectId);
  const completed = projectTasks.filter(t => t.completed).length;
  const total = projectTasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Calculate total scheduled time
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

**Drag Reordering:**
```javascript
const handleProjectDrop = (draggedId, targetId) => {
  const draggedProject = projects.find(p => p.id === draggedId);
  const targetProject = projects.find(p => p.id === targetId);

  // Swap order values
  setProjects(projects.map(p => {
    if (p.id === draggedId) return { ...p, order: targetProject.order };
    if (p.id === targetId) return { ...p, order: draggedProject.order };
    return p;
  }));
};
```

### 5. Time Tracking & Reporting

**Company Time Aggregation:**
```javascript
const getCompanyTimeStats = (filter) => {
  // Filter blocks by date range
  let filteredBlocks = [...timeBlocks];
  const now = new Date();

  if (filter === 'today') {
    const today = now.toISOString().split('T')[0];
    filteredBlocks = filteredBlocks.filter(b => b.date === today);
  } else if (filter === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filteredBlocks = filteredBlocks.filter(b => new Date(b.date) >= weekAgo);
  } else if (filter === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    filteredBlocks = filteredBlocks.filter(b => new Date(b.date) >= monthAgo);
  }

  // Group by company
  const stats = {};
  filteredBlocks.forEach(block => {
    const task = tasks.find(t => t.id === block.taskId);
    const company = task?.company || 'none';
    stats[company] = (stats[company] || 0) + block.duration;
  });

  // Convert to array with hours/minutes
  return Object.entries(stats).map(([companyId, minutes]) => ({
    company: companies.find(c => c.id === companyId) || { id: 'none', name: 'None', color: 'bg-gray-900/30 border-gray-500 text-gray-300' },
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60
  }));
};
```

### 6. Markdown Notes with Keyboard Shortcuts

**Editor Features:**
- Edit/Preview toggle
- Keyboard shortcuts for formatting
- Support: bold, italic, links, lists

**Keyboard Shortcuts Handler:**
```javascript
const handleNotesKeydown = (e) => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const cmdKey = isMac ? e.metaKey : e.ctrlKey;

  if (!cmdKey) return;

  const { selectionStart, selectionEnd, value } = e.target;
  const selectedText = value.substring(selectionStart, selectionEnd);
  let newText, cursorOffset;

  if (e.key === 'b') {  // Bold
    e.preventDefault();
    newText = value.substring(0, selectionStart) +
              `**${selectedText || 'bold text'}**` +
              value.substring(selectionEnd);
    cursorOffset = selectedText ? 0 : 2;
  } else if (e.key === 'i') {  // Italic
    e.preventDefault();
    newText = value.substring(0, selectionStart) +
              `*${selectedText || 'italic text'}*` +
              value.substring(selectionEnd);
    cursorOffset = selectedText ? 0 : 1;
  } else if (e.key === 'k') {  // Link
    e.preventDefault();
    newText = value.substring(0, selectionStart) +
              `[${selectedText || 'link text'}](url)` +
              value.substring(selectionEnd);
    cursorOffset = selectedText ? 0 : 1;
  }
  // ... handle lists (Shift+7, Shift+8)

  if (newText !== undefined) {
    updateTaskNotes(newText);
    setTimeout(() => {
      e.target.setSelectionRange(
        selectionStart + cursorOffset,
        selectionStart + cursorOffset
      );
    }, 0);
  }
};
```

**Markdown Renderer:**
```javascript
const renderMarkdown = (text) => {
  if (!text) return '';

  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let listType = '';

  lines.forEach(line => {
    // Detect ordered list
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

    // Detect unordered list
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

    // Close list if needed
    if (inList) {
      html += `</${listType}>`;
      inList = false;
    }

    // Process inline formatting
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

### 7. Custom Priorities & Companies

**Priority Management:**
- Add/edit/delete custom priorities
- Choose icon (6 options) and color (9 options)
- Minimum 1 priority required
- When priority deleted, reassign tasks to first available priority

**Company/Tag Management:**
- Add/edit/delete company tags
- Choose from 9 color themes
- Used for time tracking categorization
- Optional (tasks can have null company)

**Color Options:**
```javascript
const colorOptions = [
  { value: 'text-red-400', label: 'Red', bg: 'bg-red-400' },
  { value: 'text-orange-400', label: 'Orange', bg: 'bg-orange-400' },
  { value: 'text-yellow-400', label: 'Yellow', bg: 'bg-yellow-400' },
  { value: 'text-green-400', label: 'Green', bg: 'bg-green-400' },
  { value: 'text-blue-400', label: 'Blue', bg: 'bg-blue-400' },
  { value: 'text-indigo-400', label: 'Indigo', bg: 'bg-indigo-400' },
  { value: 'text-purple-400', label: 'Purple', bg: 'bg-purple-400' },
  { value: 'text-pink-400', label: 'Pink', bg: 'bg-pink-400' },
  { value: 'text-gray-400', label: 'Gray', bg: 'bg-gray-400' }
];

const iconOptions = ['zap', 'target', 'circle', 'brain', 'clock', 'calendar'];
```

### 8. Resizable Detail Sidebar

**Implementation:**
```javascript
const [isResizingSidebar, setIsResizingSidebar] = useState(false);

const handleSidebarResizeStart = () => {
  setIsResizingSidebar(true);
};

useEffect(() => {
  if (!isResizingSidebar) return;

  const handleMouseMove = (e) => {
    const newWidth = window.innerWidth - e.clientX;
    setSidebarWidth(Math.max(300, Math.min(800, newWidth)));
  };

  const handleMouseUp = () => {
    setIsResizingSidebar(false);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}, [isResizingSidebar]);
```

### 9. Auto-Save to localStorage

**Save Logic:**
```javascript
useEffect(() => {
  const saveData = async () => {
    await window.storage.set('adhd-tasks', JSON.stringify(tasks));
    await window.storage.set('adhd-timeblocks', JSON.stringify(timeBlocks));
    await window.storage.set('adhd-projects', JSON.stringify(projects));
    await window.storage.set('adhd-priorities', JSON.stringify(priorities));
    await window.storage.set('adhd-companies', JSON.stringify(companies));
  };

  saveData();
}, [tasks, timeBlocks, projects, priorities, companies]);
```

**Load Logic:**
```javascript
useEffect(() => {
  const loadData = async () => {
    const savedTasks = await window.storage.get('adhd-tasks');
    const savedBlocks = await window.storage.get('adhd-timeblocks');
    const savedProjects = await window.storage.get('adhd-projects');
    const savedPriorities = await window.storage.get('adhd-priorities');
    const savedCompanies = await window.storage.get('adhd-companies');

    if (savedTasks?.value) setTasks(JSON.parse(savedTasks.value));
    if (savedBlocks?.value) setTimeBlocks(JSON.parse(savedBlocks.value));
    if (savedProjects?.value) {
      const parsed = JSON.parse(savedProjects.value);
      // Data migration: add missing fields
      const migrated = parsed.map(p => ({
        ...p,
        order: p.order ?? p.id,
        createdAt: p.createdAt ?? new Date().toISOString()
      }));
      setProjects(migrated);
    }
    if (savedPriorities?.value) setPriorities(JSON.parse(savedPriorities.value));
    if (savedCompanies?.value) setCompanies(JSON.parse(savedCompanies.value));
  };

  loadData();
}, []);
```

---

## SVG Icon Components

You need to implement 16 icon components. Here are the key ones:

```javascript
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

// Also need: ChevronLeft, ChevronRight, Settings, X, Check, GripVertical, Edit2, Archive
```

---

## UI Layout & Styling

### Color Scheme (Dark Mode)

**Backgrounds:**
- Primary: `bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800`
- Cards: `bg-gray-800`, `bg-gray-900`
- Borders: `border-gray-700`, `border-gray-600`

**Text:**
- Primary: `text-white`
- Secondary: `text-gray-400`, `text-gray-300`
- Accent: `text-indigo-400`, `text-blue-400`

**Interactive:**
- Buttons: `bg-indigo-600 hover:bg-indigo-700`
- Inputs: `bg-gray-700 border-gray-600 focus:border-indigo-500`
- Delete: `text-red-400 hover:bg-red-600`

### Layout Structure

```jsx
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white p-6">
  {/* Header */}
  <div className="max-w-[1800px] mx-auto mb-6">
    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-6 border border-indigo-500/20">
      {/* Title + View Switcher */}
    </div>
  </div>

  {/* Quick Add */}
  <div className="max-w-[1800px] mx-auto mb-6">
    <input className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-4" />
  </div>

  {/* Main Content Area */}
  <div className="max-w-[1800px] mx-auto flex gap-6">
    {/* Left: Unscheduled Tasks or Projects */}
    <div className="w-96">
      {/* Content */}
    </div>

    {/* Center: Calendar or Settings */}
    <div className="flex-1">
      {/* Content */}
    </div>
  </div>

  {/* Detail Sidebar (right edge, fixed) */}
  {selectedTask && (
    <div className="fixed right-0 top-0 h-screen bg-gray-900 border-l border-gray-700"
         style={{ width: `${sidebarWidth}px` }}>
      {/* Resize Handle */}
      <div className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-indigo-500" />
      {/* Content */}
    </div>
  )}

  {/* Modals */}
  {showNewProjectModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl w-96">
        {/* Modal Content */}
      </div>
    </div>
  )}
</div>
```

### Custom Markdown CSS

Add to `<style>` in `index.html`:

```css
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
```

---

## HTML Entry Point Structure

### index.html Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADHD Work Manager</title>

  <!-- React 18 -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Custom Markdown Styles -->
  <style>
    .prose a { color: #60a5fa; text-decoration: underline; }
    .prose strong { font-weight: 700; }
    .prose em { font-style: italic; }
    .prose ul { list-style-type: disc; padding-left: 1.5em; }
    .prose ol { list-style-type: decimal; padding-left: 1.5em; }
    .prose li { margin: 0.25em 0; }
  </style>

  <!-- localStorage Wrapper -->
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

---

## Complete Implementation Checklist

### Phase 1: Foundation (app.jsx structure)

- [ ] Create all 16 SVG icon components
- [ ] Set up main `ADHDWorkManager` component
- [ ] Initialize all 20+ useState hooks
- [ ] Define default priorities and companies
- [ ] Create icon mapping object

### Phase 2: Data Persistence

- [ ] Implement `loadData()` function in useEffect
- [ ] Implement `saveData()` function in useEffect
- [ ] Add data migration logic for backward compatibility
- [ ] Test localStorage save/load cycle

### Phase 3: Task Management

- [ ] `addTask()` - Create task with defaults
- [ ] `deleteTask()` - Remove task and associated blocks
- [ ] `updateTask()` - Update task properties
- [ ] `toggleTask()` - Toggle completion
- [ ] Quick add input + Enter key handler
- [ ] Task card UI component

### Phase 4: Time-Block Calendar (Day View)

- [ ] Calendar grid layout (14 rows × 80px)
- [ ] Time labels (7 AM - 9 PM)
- [ ] `getTimeFromPosition()` - Y coord to time
- [ ] `scheduleTask()` - Create time block
- [ ] Drag-and-drop from unscheduled to calendar
- [ ] Block rendering with dynamic positioning
- [ ] Drag block to reschedule
- [ ] Resize handle + resize logic
- [ ] Snap indicators (blue line with dots)
- [ ] Unschedule button on blocks

### Phase 5: Week View

- [ ] `getWeekDates()` - Generate Mon-Fri dates
- [ ] 5-column grid layout
- [ ] Mini block rendering (60px per hour)
- [ ] Click to view task details
- [ ] Week navigation

### Phase 6: Projects

- [ ] `addProject()` - Create with order number
- [ ] `updateProject()` - Edit properties
- [ ] `deleteProject()` - Remove (keep tasks)
- [ ] `getProjectStats()` - Calculate metrics
- [ ] Project card UI with progress bar
- [ ] Drag to reorder projects
- [ ] Archive/unarchive toggle
- [ ] Quick add task to project modal
- [ ] Time tracking display per project

### Phase 7: Time Tracking

- [ ] `getCompanyTimeStats()` - Aggregate by company
- [ ] Filter: Today/Week/Month/All
- [ ] Time report card UI
- [ ] Display hours + minutes per company

### Phase 8: Markdown Editor

- [ ] `handleNotesKeydown()` - Keyboard shortcuts
- [ ] `renderMarkdown()` - Convert to HTML
- [ ] Edit/Preview mode toggle
- [ ] Shortcuts help text
- [ ] Apply to task and project notes

### Phase 9: Checklists

- [ ] `addChecklistItem()` - Add to task
- [ ] `toggleChecklistItem()` - Mark complete
- [ ] `deleteChecklistItem()` - Remove
- [ ] Checklist UI in detail sidebar

### Phase 10: Customization (Settings)

- [ ] Priority CRUD operations
- [ ] Icon dropdown (6 icons)
- [ ] Color dropdown (9 colors)
- [ ] Minimum 1 priority validation
- [ ] Company CRUD operations
- [ ] Company color schemes
- [ ] Task reassignment when priority/company deleted

### Phase 11: Filtering

- [ ] `getFilteredTasks()` - Apply all filters
- [ ] Show/hide completed toggle
- [ ] Project filter dropdown
- [ ] Date filter (all/unscheduled/today/tomorrow/week/custom)
- [ ] Archive filter for projects

### Phase 12: Detail Sidebar

- [ ] Fixed right positioning
- [ ] Resizable with mouse drag
- [ ] Resize handle UI
- [ ] Task detail form
- [ ] Project detail form
- [ ] Close sidebar logic

### Phase 13: Modals

- [ ] New project modal
- [ ] Quick add task modal
- [ ] Overlay background (bg-black/50)
- [ ] Focus management
- [ ] Enter key to submit
- [ ] Escape key to close

### Phase 14: UI Polish

- [ ] View switcher (Today/Projects/Settings)
- [ ] Date navigation (prev/next/today/picker)
- [ ] Calendar view toggle (Day/Week)
- [ ] Hover effects on interactive elements
- [ ] Smooth transitions
- [ ] Responsive layout
- [ ] Loading states (if needed)

### Phase 15: Testing & Deployment

- [ ] Test all CRUD operations
- [ ] Test drag-and-drop functionality
- [ ] Test resize operations
- [ ] Test markdown rendering
- [ ] Test keyboard shortcuts
- [ ] Test filters
- [ ] Test data persistence
- [ ] Deploy to hosting platform

---

## Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. Create new GitHub repository
2. Add files:
   ```
   index.html
   app.jsx
   README.md
   .gitignore
   ```
3. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```
4. Enable GitHub Pages:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
5. Access at: `https://username.github.io/repo-name`

**Cache-Busting Strategy:**
- If updates don't appear, rename `app.jsx` to `app-v2.jsx`
- Update `index.html` script src accordingly
- Increment version with each deploy

### Option 2: Netlify

1. Create account at netlify.com
2. Connect GitHub repository
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Deploy
5. Custom domain (optional)

### Option 3: Vercel

1. Create account at vercel.com
2. Import GitHub repository
3. Framework preset: Other
4. Build command: (none)
5. Output directory: (none)
6. Deploy

### Local Development

**Python:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Node.js:**
```bash
npx serve
# Open http://localhost:3000
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## Testing Checklist

### Manual Testing Flow

**Task Management:**
1. [ ] Add task via quick input (Enter key)
2. [ ] Add task via quick input (Add button)
3. [ ] Edit task name in sidebar
4. [ ] Change task priority
5. [ ] Assign task to project
6. [ ] Add company tag
7. [ ] Toggle completion
8. [ ] Delete task
9. [ ] Verify unscheduled tasks auto-save

**Time-Block Calendar:**
10. [ ] Drag task from unscheduled to calendar
11. [ ] Verify block appears at correct time
12. [ ] Drag block to different time
13. [ ] Resize block longer
14. [ ] Resize block shorter
15. [ ] Verify 15-minute snap on drop
16. [ ] Verify 5-minute snap on resize
17. [ ] Unschedule block (returns to unscheduled)
18. [ ] Toggle task completion from block
19. [ ] Switch to week view
20. [ ] Click week view block to open sidebar

**Projects:**
21. [ ] Create new project
22. [ ] Rename project
23. [ ] Change project priority
24. [ ] Add task directly to project (quick add)
25. [ ] Verify progress bar updates
26. [ ] Verify time tracking updates
27. [ ] Drag to reorder projects
28. [ ] Archive project
29. [ ] Show/hide archived projects
30. [ ] Delete project (tasks remain)

**Time Tracking:**
31. [ ] View today's time by company
32. [ ] Switch to week filter
33. [ ] Switch to month filter
34. [ ] Switch to all time filter
35. [ ] Verify hours/minutes correct

**Markdown Notes:**
36. [ ] Type markdown in task notes
37. [ ] Use Cmd/Ctrl+B for bold
38. [ ] Use Cmd/Ctrl+I for italic
39. [ ] Use Cmd/Ctrl+K for link
40. [ ] Use Cmd/Ctrl+Shift+8 for bullet list
41. [ ] Switch to preview mode
42. [ ] Verify formatting renders correctly
43. [ ] Test on project notes

**Checklists:**
44. [ ] Add checklist item to task
45. [ ] Toggle checklist item complete
46. [ ] Delete checklist item

**Customization:**
47. [ ] Add new priority
48. [ ] Change priority icon
49. [ ] Change priority color
50. [ ] Delete priority (verify task reassignment)
51. [ ] Add new company
52. [ ] Change company color
53. [ ] Delete company (verify tasks set to null)

**Filtering:**
54. [ ] Toggle show/hide completed tasks
55. [ ] Filter by project
56. [ ] Filter by unscheduled
57. [ ] Filter by today
58. [ ] Filter by tomorrow
59. [ ] Filter by this week
60. [ ] Filter by specific date (date picker)

**Sidebar:**
61. [ ] Resize sidebar wider
62. [ ] Resize sidebar narrower
63. [ ] Verify min width (300px)
64. [ ] Verify max width (800px)
65. [ ] Close sidebar (click outside or X)

**Persistence:**
66. [ ] Make changes
67. [ ] Refresh page
68. [ ] Verify all changes persisted

**Date Navigation:**
69. [ ] Click "Today" button
70. [ ] Click "Previous Day"
71. [ ] Click "Next Day"
72. [ ] Select date from picker
73. [ ] Verify calendar updates

**Edge Cases:**
74. [ ] Try to delete last priority (should prevent)
75. [ ] Create task with very long name
76. [ ] Create 100+ tasks (performance)
77. [ ] Resize block to minimum (15min)
78. [ ] Resize block to maximum (240min)
79. [ ] Schedule overlapping blocks
80. [ ] Clear all localStorage and reload (fresh start)

---

## Known Limitations & Future Enhancements

### Current Limitations

**Performance:**
- No virtualization (may slow with 1000+ tasks)
- Full re-renders on state changes
- localStorage 5-10 MB limit

**Browser Support:**
- Requires modern browser (ES6+)
- No IE11 support
- Requires internet for CDN libraries

**Functionality:**
- No multi-user support
- No cloud sync
- No mobile app
- No offline mode (needs CDN on first load)
- No recurring tasks
- No reminders/notifications

### Potential Enhancements

**Phase 1 (Easy):**
- [ ] Task search/filter by text
- [ ] Keyboard shortcuts for navigation
- [ ] Export data (JSON download)
- [ ] Import data (JSON upload)
- [ ] Dark/light mode toggle
- [ ] Custom color themes

**Phase 2 (Medium):**
- [ ] Recurring tasks
- [ ] Task dependencies
- [ ] Bulk actions (multi-select)
- [ ] Undo/redo functionality
- [ ] Task templates
- [ ] Project templates
- [ ] Calendar sync (Google Calendar API)

**Phase 3 (Complex):**
- [ ] Backend + authentication
- [ ] Multi-user/team support
- [ ] Real-time collaboration
- [ ] Mobile apps (React Native)
- [ ] Browser notifications
- [ ] Email reminders
- [ ] AI task suggestions
- [ ] Analytics dashboard

---

## Architecture Decisions & Rationale

### Why Zero-Build?

**Pros:**
- Instant deployment (no build step)
- No Node.js required
- Simple mental model
- Easy for beginners
- Works on any static host
- No bundler complexity

**Cons:**
- Slower initial load (browser transpilation)
- Larger file sizes (no tree-shaking)
- No TypeScript
- No advanced optimizations
- CDN dependency

**Verdict:** Perfect for solo developer, small teams, prototypes, and ADHD users who want to modify code without setup friction.

### Why Single Component?

**Pros:**
- Everything in one place
- No prop drilling
- Easy to search/navigate
- Fast initial development

**Cons:**
- Harder to test individual pieces
- Large file size (2215 lines)
- Performance could be better with memoization
- Not scalable to large teams

**Verdict:** Acceptable for this use case. If team grows, refactor into components.

### Why localStorage?

**Pros:**
- Zero setup
- Works offline
- No backend costs
- Privacy-first (data never leaves device)
- Simple API

**Cons:**
- No sync across devices
- Size limits (5-10 MB)
- No backup
- Browser-specific

**Verdict:** Great for MVP. Add backend when multi-device sync needed.

---

## Development Tips

### Debugging

**View localStorage:**
```javascript
// In browser console
Object.keys(localStorage).filter(k => k.startsWith('adhd')).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});
```

**Clear all data:**
```javascript
Object.keys(localStorage).filter(k => k.startsWith('adhd')).forEach(key => {
  localStorage.removeItem(key);
});
location.reload();
```

**React DevTools:**
- Install React DevTools browser extension
- Inspect component state in real-time
- Track re-renders

### Code Organization Tips

**If refactoring to multi-file:**
1. Extract icon components to `icons.jsx`
2. Extract data functions to `dataService.js`
3. Extract calendar logic to `CalendarView.jsx`
4. Extract project logic to `ProjectsView.jsx`
5. Extract settings to `SettingsView.jsx`
6. Extract sidebar to `DetailSidebar.jsx`

**Recommended file structure:**
```
src/
├── components/
│   ├── icons/
│   ├── CalendarView.jsx
│   ├── ProjectsView.jsx
│   ├── SettingsView.jsx
│   ├── DetailSidebar.jsx
│   └── QuickAdd.jsx
├── services/
│   ├── storage.js
│   ├── taskService.js
│   └── markdown.js
└── App.jsx
```

### Performance Optimization

**If app slows down:**
1. Use `React.memo()` on list items
2. Use `useMemo()` for filtered task lists
3. Use `useCallback()` for event handlers
4. Implement virtual scrolling (react-window)
5. Debounce auto-save (currently saves on every change)

**Example memoization:**
```javascript
const filteredTasks = useMemo(() => {
  return getFilteredTasks();
}, [tasks, showCompleted, filterProject, filterDate]);

const handleTaskClick = useCallback((task) => {
  setSelectedTask(task);
}, []);
```

---

## Success Criteria

Your rebuild is complete when:

1. ✅ All files created (`index.html`, `app.jsx`, `README.md`, `.gitignore`)
2. ✅ App loads without errors in browser console
3. ✅ All 80 test cases pass
4. ✅ Data persists after page refresh
5. ✅ Deployed to public URL
6. ✅ Drag-and-drop works smoothly
7. ✅ Resize operations work correctly
8. ✅ Markdown renders properly
9. ✅ Time tracking calculates correctly
10. ✅ No visual glitches or layout issues

---

## Final Notes

**This is a production-ready application.** While simple in architecture, it's fully functional and has been used successfully. The zero-build approach is intentional and appropriate for this use case.

**Target user:** Individual with ADHD who needs:
- Fast task capture (no cognitive load)
- Visual scheduling (time-blocking)
- Project organization (big-picture view)
- Time tracking (accountability)
- Customization (personal workflow)

**Core principle:** Remove friction. Every feature should reduce cognitive load, not add it.

**Development philosophy:** Start simple, add complexity only when needed. This app proves you don't need a complex build system to create something useful.

Good luck with the rebuild! 🚀
