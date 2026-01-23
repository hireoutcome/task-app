// Icon SVG paths - manually defined to avoid React DOM conflicts
const ICON_PATHS = {
  'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'circle': '<circle cx="12" cy="12" r="10"/>',
  'brain': '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>',
  'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'grip-vertical': '<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
  'edit-2': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  'archive': '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  'rocket': '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'lightbulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  'briefcase': '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
};

// Parse SVG string into React elements
const parseSVGPath = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${svgString}</svg>`, 'image/svg+xml');
  const elements = [];

  // Filter only element nodes (nodeType === 1), skip text nodes
  Array.from(doc.documentElement.childNodes).forEach((child, index) => {
    if (child.nodeType === 1) { // Element node
      const tagName = child.tagName.toLowerCase();
      const attrs = {};

      Array.from(child.attributes).forEach(attr => {
        // Convert hyphenated attributes to camelCase for React
        let name = attr.name;
        if (name.includes('-')) {
          name = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        }
        // Handle special SVG attributes
        if (name === 'class') name = 'className';
        attrs[name] = attr.value;
      });

      elements.push(React.createElement(tagName, { key: index, ...attrs }));
    }
  });

  return elements;
};

// Lucide Icon Wrapper - renders SVG directly without DOM mutation
const LucideIcon = ({ name, className = '', ...props }) => {
  const pathData = ICON_PATHS[name] || ICON_PATHS['circle'];
  const children = parseSVGPath(pathData);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};

// Icon Components using Lucide
const Calendar = (props) => <LucideIcon name="calendar" {...props} />;
const Plus = (props) => <LucideIcon name="plus" {...props} />;
const Trash2 = (props) => <LucideIcon name="trash-2" {...props} />;
const Clock = (props) => <LucideIcon name="clock" {...props} />;
const CheckCircle2 = (props) => <LucideIcon name="check-circle-2" {...props} />;
const Circle = (props) => <LucideIcon name="circle" {...props} />;
const Brain = (props) => <LucideIcon name="brain" {...props} />;
const Target = (props) => <LucideIcon name="target" {...props} />;
const Zap = (props) => <LucideIcon name="zap" {...props} />;
const ChevronLeft = (props) => <LucideIcon name="chevron-left" {...props} />;
const ChevronRight = (props) => <LucideIcon name="chevron-right" {...props} />;
const Settings = (props) => <LucideIcon name="settings" {...props} />;
const X = (props) => <LucideIcon name="x" {...props} />;
const Check = (props) => <LucideIcon name="check" {...props} />;
const GripVertical = (props) => <LucideIcon name="grip-vertical" {...props} />;
const Edit2 = (props) => <LucideIcon name="edit-2" {...props} />;
const Archive = (props) => <LucideIcon name="archive" {...props} />;

// Main App Component
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

  // Icon mapping - expanded with more Lucide icons
  const Star = (props) => <LucideIcon name="star" {...props} />;
  const Flame = (props) => <LucideIcon name="flame" {...props} />;
  const Rocket = (props) => <LucideIcon name="rocket" {...props} />;
  const Sparkles = (props) => <LucideIcon name="sparkles" {...props} />;
  const Award = (props) => <LucideIcon name="award" {...props} />;
  const TrendingUp = (props) => <LucideIcon name="trending-up" {...props} />;
  const Lightbulb = (props) => <LucideIcon name="lightbulb" {...props} />;
  const Heart = (props) => <LucideIcon name="heart" {...props} />;
  const Briefcase = (props) => <LucideIcon name="briefcase" {...props} />;
  const BookOpen = (props) => <LucideIcon name="book-open" {...props} />;

  const priorityIcons = {
    zap: Zap,
    target: Target,
    circle: Circle,
    brain: Brain,
    clock: Clock,
    calendar: Calendar,
    star: Star,
    flame: Flame,
    rocket: Rocket,
    sparkles: Sparkles,
    award: Award,
    trendingUp: TrendingUp,
    lightbulb: Lightbulb,
    heart: Heart,
    briefcase: Briefcase,
    bookOpen: BookOpen
  };

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
  const [resizeSidebarStartX, setResizeSidebarStartX] = React.useState(0);
  const [resizeSidebarStartWidth, setResizeSidebarStartWidth] = React.useState(0);
  const [draggedProject, setDraggedProject] = React.useState(null);
  const [dragOverProject, setDragOverProject] = React.useState(null);

  // Editor state
  const [editingNotes, setEditingNotes] = React.useState(false);
  const [editingProjectNotes, setEditingProjectNotes] = React.useState(false);
  const [timeReportFilter, setTimeReportFilter] = React.useState('today');

  // Settings state
  const [newPriorityName, setNewPriorityName] = React.useState('');
  const [newPriorityColor, setNewPriorityColor] = React.useState('text-blue-400');
  const [newPriorityIcon, setNewPriorityIcon] = React.useState('circle');
  const [newCompanyName, setNewCompanyName] = React.useState('');
  const [newCompanyColor, setNewCompanyColor] = React.useState('bg-blue-900/30 border-blue-500 text-blue-300');

  // App customization
  const [appName, setAppName] = React.useState('ADHD Work Manager');
  const [appIcon, setAppIcon] = React.useState('brain');

  // Load data from localStorage on mount
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
            priority: p.priority ?? 'medium',
            company: p.company ?? null
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

        // Load app customization
        const savedAppName = await window.storage.get('adhd-app-name');
        if (savedAppName?.value) {
          setAppName(savedAppName.value);
        }

        const savedAppIcon = await window.storage.get('adhd-app-icon');
        if (savedAppIcon?.value) {
          setAppIcon(savedAppIcon.value);
        }

        console.log('Data loaded successfully');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  React.useEffect(() => {
    const saveData = async () => {
      try {
        await window.storage.set('adhd-tasks', JSON.stringify(tasks));
        await window.storage.set('adhd-timeblocks', JSON.stringify(timeBlocks));
        await window.storage.set('adhd-projects', JSON.stringify(projects));
        await window.storage.set('adhd-priorities', JSON.stringify(priorities));
        await window.storage.set('adhd-companies', JSON.stringify(companies));
        await window.storage.set('adhd-app-name', appName);
        await window.storage.set('adhd-app-icon', appIcon);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [tasks, timeBlocks, projects, priorities, companies, appName, appIcon]);

  // Task Management Functions
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

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setTimeBlocks(timeBlocks.filter(b => b.taskId !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, ...updates } : t
    ));

    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, ...updates });
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const updatePriority = (taskId, priorityId) => {
    updateTask(taskId, { priority: priorityId });
  };

  // Calendar Functions
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

  // Drag & Drop Handlers
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

  const handleDragOver = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const snapY = Math.round(y / 20) * 20;
    setDragOverY(snapY);
  };

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

  // Project Functions
  const addProject = () => {
    if (!newProjectName.trim()) return;

    const project = {
      id: Date.now(),
      name: newProjectName,
      archived: false,
      priority: priorities[0].id,
      company: null,
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

  // Time Tracking Functions
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

  // Markdown Editor Functions
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

  // Additional Helper Functions
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Filter by completion status
    if (!showCompleted) {
      filtered = filtered.filter(t => !t.completed);
    }

    // Filter by project
    if (filterProject !== 'all') {
      if (filterProject === 'none') {
        filtered = filtered.filter(t => !t.projectId);
      } else {
        filtered = filtered.filter(t => t.projectId === parseInt(filterProject));
      }
    }

    // Filter by date
    if (filterDate !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

      const scheduledTaskIds = timeBlocks.map(b => b.taskId);

      if (filterDate === 'unscheduled') {
        filtered = filtered.filter(t => !scheduledTaskIds.includes(t.id));
      } else if (filterDate === 'today') {
        const todayBlocks = timeBlocks.filter(b => b.date === today);
        const todayTaskIds = todayBlocks.map(b => b.taskId);
        filtered = filtered.filter(t => todayTaskIds.includes(t.id));
      } else if (filterDate === 'tomorrow') {
        const tomorrowBlocks = timeBlocks.filter(b => b.date === tomorrow);
        const tomorrowTaskIds = tomorrowBlocks.map(b => b.taskId);
        filtered = filtered.filter(t => tomorrowTaskIds.includes(t.id));
      } else if (filterDate === 'week') {
        const weekBlocks = timeBlocks.filter(b => b.date >= today && b.date <= weekEnd);
        const weekTaskIds = weekBlocks.map(b => b.taskId);
        filtered = filtered.filter(t => weekTaskIds.includes(t.id));
      }
    }

    return filtered;
  };

  const addChecklistItem = (taskId) => {
    if (!newChecklistItem.trim()) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const item = {
      id: Date.now(),
      text: newChecklistItem,
      completed: false
    };

    updateTask(taskId, {
      checklist: [...(task.checklist || []), item]
    });

    setNewChecklistItem('');
  };

  const toggleChecklistItem = (taskId, itemId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const checklist = task.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    updateTask(taskId, { checklist });
  };

  const deleteChecklistItem = (taskId, itemId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const checklist = task.checklist.filter(item => item.id !== itemId);
    updateTask(taskId, { checklist });
  };

  const unscheduledTasks = getFilteredTasks().filter(t =>
    !timeBlocks.some(b => b.taskId === t.id)
  );

  const dayBlocks = timeBlocks.filter(b => b.date === selectedDate);

  // Priority Management Functions
  const addPriority = () => {
    if (!newPriorityName.trim()) return;

    const priority = {
      id: Date.now().toString(),
      name: newPriorityName,
      icon: newPriorityIcon,
      color: newPriorityColor
    };

    setPriorities([...priorities, priority]);
    setNewPriorityName('');
    setNewPriorityColor('text-blue-400');
    setNewPriorityIcon('circle');
  };

  const deletePriority = (priorityId) => {
    if (priorities.length <= 1) {
      alert('You must have at least one priority');
      return;
    }

    setPriorities(priorities.filter(p => p.id !== priorityId));

    // Update tasks with this priority to use the first remaining priority
    const remainingPriority = priorities.find(p => p.id !== priorityId);
    setTasks(tasks.map(t =>
      t.priority === priorityId ? { ...t, priority: remainingPriority.id } : t
    ));
    setProjects(projects.map(p =>
      p.priority === priorityId ? { ...p, priority: remainingPriority.id } : p
    ));
  };

  const updatePrioritySettings = (priorityId, updates) => {
    setPriorities(priorities.map(p =>
      p.id === priorityId ? { ...p, ...updates } : p
    ));
  };

  // Company Management Functions
  const addCompany = () => {
    if (!newCompanyName.trim()) return;

    const company = {
      id: Date.now().toString(),
      name: newCompanyName,
      color: newCompanyColor
    };

    setCompanies([...companies, company]);
    setNewCompanyName('');
    setNewCompanyColor('bg-blue-900/30 border-blue-500 text-blue-300');
  };

  const deleteCompany = (companyId) => {
    setCompanies(companies.filter(c => c.id !== companyId));

    // Remove company from tasks
    setTasks(tasks.map(t =>
      t.company === companyId ? { ...t, company: null } : t
    ));
  };

  const updateCompanySettings = (companyId, updates) => {
    setCompanies(companies.map(c =>
      c.id === companyId ? { ...c, ...updates } : c
    ));
  };

  // Sidebar Resize Handlers
  const handleSidebarResizeStart = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
    setResizeSidebarStartX(e.clientX);
    setResizeSidebarStartWidth(sidebarWidth);
  };

  const handleSidebarResizeMove = (e) => {
    if (!isResizingSidebar) return;

    const deltaX = resizeSidebarStartX - e.clientX;
    const newWidth = Math.max(300, Math.min(800, resizeSidebarStartWidth + deltaX));
    setSidebarWidth(newWidth);
  };

  const handleSidebarResizeEnd = () => {
    setIsResizingSidebar(false);
  };

  React.useEffect(() => {
    if (isResizingSidebar) {
      document.addEventListener('mousemove', handleSidebarResizeMove);
      document.addEventListener('mouseup', handleSidebarResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleSidebarResizeMove);
        document.removeEventListener('mouseup', handleSidebarResizeEnd);
      };
    }
  }, [isResizingSidebar, resizeSidebarStartX, resizeSidebarStartWidth]);

  // Project Drag and Drop Handlers
  const handleProjectDragStart = (e, project) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleProjectDragOver = (e, project) => {
    e.preventDefault();
    if (draggedProject && draggedProject.id !== project.id) {
      setDragOverProject(project);
    }
  };

  const handleProjectDrop = (e, targetProject) => {
    e.preventDefault();

    if (!draggedProject || draggedProject.id === targetProject.id) {
      setDraggedProject(null);
      setDragOverProject(null);
      return;
    }

    // Reorder projects
    const updatedProjects = [...projects];
    const draggedIndex = updatedProjects.findIndex(p => p.id === draggedProject.id);
    const targetIndex = updatedProjects.findIndex(p => p.id === targetProject.id);

    // Remove dragged project and insert at target position
    const [removed] = updatedProjects.splice(draggedIndex, 1);
    updatedProjects.splice(targetIndex, 0, removed);

    // Update order property for all projects
    const reorderedProjects = updatedProjects.map((p, index) => ({
      ...p,
      order: index
    }));

    setProjects(reorderedProjects);
    setDraggedProject(null);
    setDragOverProject(null);
  };

  const handleProjectDragEnd = () => {
    setDraggedProject(null);
    setDragOverProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto mb-6">
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-indigo-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50 text-white">
                {React.createElement(priorityIcons[appIcon] || Brain, { className: "w-7 h-7" })}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {appName}
              </h1>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setView('today')}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  view === 'today'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4"><Calendar /></div>
                  <span className="hidden sm:inline">Today</span>
                </div>
              </button>
              <button
                onClick={() => setView('projects')}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  view === 'projects'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4"><Target /></div>
                  <span className="hidden sm:inline">Projects</span>
                </div>
              </button>
              <button
                onClick={() => setView('settings')}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  view === 'settings'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4"><Settings /></div>
                  <span className="hidden sm:inline">Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Input */}
      <div className="max-w-[1800px] mx-auto mb-6">
        <div className="relative group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Brain dump: What's on your mind?"
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 pr-14 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 shadow-lg"
          />
          <button
            onClick={addTask}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-indigo-500/50 group-hover:scale-110"
          >
            <div className="w-5 h-5"><Plus /></div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto flex gap-6">
        {/* Left Sidebar - Unscheduled Tasks or Projects */}
        <div className="w-96 flex-shrink-0">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {view === 'today' ? 'Unscheduled Tasks' : 'All Tasks'}
              </h2>
              <div className="px-2.5 py-1 bg-indigo-500/20 rounded-lg text-sm text-indigo-300 font-medium border border-indigo-500/30">
                {unscheduledTasks.length}
              </div>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
              {unscheduledTasks.map(task => {
                const priority = priorities.find(p => p.id === task.priority);
                const PriorityIcon = priorityIcons[priority?.icon] || Circle;

                return (
                  <div
                    key={task.id}
                    draggable={view === 'today'}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('taskId', task.id.toString());
                    }}
                    onClick={() => setSelectedTask({ ...task, type: 'task' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      task.completed
                        ? 'bg-white/5 border-white/5 opacity-50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'
                    } ${selectedTask?.id === task.id ? 'ring-2 ring-indigo-500/50 bg-indigo-500/10 border-indigo-500/50' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        className="mt-0.5 flex-shrink-0"
                      >
                        <div className={`w-5 h-5 ${task.completed ? 'text-green-400' : 'text-gray-400'}`}>
                          {task.completed ? <CheckCircle2 /> : <Circle />}
                        </div>
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`${task.completed ? 'line-through' : ''}`}>
                          {task.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-3 h-3 ${priority?.color}`}>
                            <PriorityIcon />
                          </div>
                          {task.company && (
                            <span className={`text-xs px-2 py-0.5 rounded border ${
                              companies.find(c => c.id === task.company)?.color
                            }`}>
                              {companies.find(c => c.id === task.company)?.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1">
          {view === 'today' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl">
              {/* Date Navigation */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between backdrop-blur">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (calendarView === 'day') {
                        const date = new Date(selectedDate + 'T12:00:00');
                        date.setDate(date.getDate() - 1);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      } else {
                        const date = new Date(selectedDate + 'T12:00:00');
                        date.setDate(date.getDate() - 7);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }
                    }}
                    className="w-9 h-9 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-indigo-500/50"
                  >
                    <div className="w-5 h-5"><ChevronLeft /></div>
                  </button>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {calendarView === 'day'
                      ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })
                      : `Week of ${getWeekDates(selectedDate)[0].fullDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}`
                    }
                  </h3>
                  <button
                    onClick={() => {
                      if (calendarView === 'day') {
                        const date = new Date(selectedDate + 'T12:00:00');
                        date.setDate(date.getDate() + 1);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      } else {
                        const date = new Date(selectedDate + 'T12:00:00');
                        date.setDate(date.getDate() + 7);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }
                    }}
                    className="w-9 h-9 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-indigo-500/50"
                  >
                    <div className="w-5 h-5"><ChevronRight /></div>
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                    className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/50"
                  >
                    Today
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                      onClick={() => setCalendarView('day')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        calendarView === 'day' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Day
                    </button>
                    <button
                      onClick={() => setCalendarView('week')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        calendarView === 'week' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Week
                    </button>
                  </div>
                  {calendarView === 'day' && (
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    />
                  )}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                {calendarView === 'day' ? (
                <div className="relative" style={{ height: '1120px' }}>
                  {/* Time labels */}
                  <div className="absolute left-0 top-0 bottom-0 w-20">
                    {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
                      <div key={hour} className="h-20 flex items-start justify-end pr-2 text-sm text-gray-400">
                        {formatTime12Hour(`${hour}:00`)}
                      </div>
                    ))}
                  </div>

                  {/* Drop zone */}
                  <div
                    className="absolute left-24 right-0 top-0 bottom-0"
                    onDragOver={handleDragOver}
                    onDragLeave={() => setDragOverY(null)}
                    onDrop={handleDrop}
                  >
                    {/* Hour lines */}
                    {Array.from({ length: 14 }, (_, i) => i).map(i => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 border-t border-gray-700"
                        style={{ top: `${i * 80}px` }}
                      />
                    ))}

                    {/* Drag over indicator */}
                    {dragOverY !== null && (
                      <div
                        className="absolute left-0 right-0 flex items-center pointer-events-none"
                        style={{ top: `${dragOverY}px` }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="flex-1 h-0.5 bg-blue-500" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      </div>
                    )}

                    {/* Time blocks */}
                    {dayBlocks.map(block => {
                      const task = tasks.find(t => t.id === block.taskId);
                      if (!task) return null;

                      const priority = priorities.find(p => p.id === task.priority);
                      const PriorityIcon = priorityIcons[priority?.icon] || Circle;

                      return (
                        <div
                          key={block.id}
                          className={`absolute left-0 right-0 rounded-lg p-2 border-l-4 cursor-pointer transition-all ${
                            companies.find(c => c.id === task.company)?.color || 'bg-gray-700/50 border-gray-500'
                          }`}
                          style={{
                            top: `${(timeToMinutes(block.time) / 60) * 80}px`,
                            height: `${(block.duration / 60) * 80}px`
                          }}
                          onClick={() => setSelectedTask({ ...task, type: 'task' })}
                        >
                          <div className="flex items-start justify-between h-full">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-1">
                                <div className={`w-3 h-3 ${priority?.color}`}>
                                  <PriorityIcon />
                                </div>
                                <span className="text-sm font-semibold truncate">{task.text}</span>
                              </div>
                              <div className="text-xs text-gray-300">
                                {formatTime12Hour(block.time)} ({block.duration}m)
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeBlock(block.id);
                              }}
                              className="w-5 h-5 text-gray-400 hover:text-red-400 flex-shrink-0"
                            >
                              <X />
                            </button>
                          </div>
                          <div
                            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-indigo-500/50"
                            onMouseDown={(e) => handleResizeStart(e, block.id, block.duration)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                ) : (
                  // Week View
                  <div className="relative overflow-x-auto">
                    <div className="inline-flex gap-1 min-w-full">
                      {/* Time labels column */}
                      <div className="w-16 flex-shrink-0">
                        <div className="h-12"></div>
                        {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
                          <div key={hour} className="h-20 flex items-start justify-end pr-2 text-xs text-gray-400">
                            {formatTime12Hour(`${hour}:00`)}
                          </div>
                        ))}
                      </div>

                      {/* Week days columns */}
                      {getWeekDates(selectedDate).map(({ date, dayName, fullDate }) => {
                        const isToday = date === new Date().toISOString().split('T')[0];
                        const dayBlocks = timeBlocks.filter(b => b.date === date);

                        return (
                          <div key={date} className="flex-1 min-w-[180px]">
                            {/* Day header */}
                            <div className={`h-12 flex flex-col items-center justify-center border-b border-gray-700 ${
                              isToday ? 'bg-indigo-900/20' : ''
                            }`}>
                              <div className="text-xs text-gray-400">{dayName}</div>
                              <div className={`text-sm font-semibold ${isToday ? 'text-indigo-400' : ''}`}>
                                {fullDate.getDate()}
                              </div>
                            </div>

                            {/* Time grid */}
                            <div
                              className="relative"
                              style={{ height: '1120px' }}
                              onDragOver={handleDragOver}
                              onDragLeave={() => setDragOverY(null)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragOverY(null);

                                const container = e.currentTarget;
                                const rect = container.getBoundingClientRect();
                                const time = getTimeFromPosition(e.clientY, rect.top);

                                if (!time) return;

                                const taskId = parseInt(e.dataTransfer.getData('taskId'));
                                if (taskId) {
                                  scheduleTask(taskId, date, time);
                                }
                              }}
                            >
                              {/* Hour lines */}
                              {Array.from({ length: 14 }, (_, i) => i).map(i => (
                                <div
                                  key={i}
                                  className="absolute left-0 right-0 border-t border-gray-700"
                                  style={{ top: `${i * 80}px` }}
                                />
                              ))}

                              {/* Time blocks */}
                              {dayBlocks.map(block => {
                                const task = tasks.find(t => t.id === block.taskId);
                                if (!task) return null;

                                const priority = priorities.find(p => p.id === task.priority);
                                const PriorityIcon = priorityIcons[priority?.icon] || Circle;

                                return (
                                  <div
                                    key={block.id}
                                    className={`absolute left-0 right-0 rounded-lg p-2 border-l-4 cursor-pointer transition-all ${
                                      companies.find(c => c.id === task.company)?.color || 'bg-gray-700/50 border-gray-500'
                                    }`}
                                    style={{
                                      top: `${(timeToMinutes(block.time) / 60) * 80}px`,
                                      height: `${(block.duration / 60) * 80}px`
                                    }}
                                    onClick={() => setSelectedTask({ ...task, type: 'task' })}
                                  >
                                    <div className="flex items-start justify-between h-full">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 mb-1">
                                          <div className={`w-3 h-3 ${priority?.color}`}>
                                            <PriorityIcon />
                                          </div>
                                          <span className="text-xs font-semibold truncate">{task.text}</span>
                                        </div>
                                        <div className="text-xs text-gray-300">
                                          {formatTime12Hour(block.time)}
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeBlock(block.id);
                                        }}
                                        className="w-4 h-4 text-gray-400 hover:text-red-400 flex-shrink-0"
                                      >
                                        <X />
                                      </button>
                                    </div>
                                    <div
                                      className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-indigo-500/50"
                                      onMouseDown={(e) => handleResizeStart(e, block.id, block.duration)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Projects</h2>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg shadow-indigo-500/50 font-medium"
                >
                  <div className="w-4 h-4"><Plus /></div>
                  New Project
                </button>
              </div>

              <div className="space-y-3">
                {projects
                  .filter(p => showArchivedProjects || !p.archived)
                  .sort((a, b) => a.order - b.order)
                  .map(project => {
                    const stats = getProjectStats(project.id);
                    const priority = priorities.find(p => p.id === project.priority);
                    const PriorityIcon = priorityIcons[priority?.icon] || Circle;
                    const company = companies.find(c => c.id === project.company);

                    return (
                      <div
                        key={project.id}
                        draggable={!project.archived}
                        onDragStart={(e) => handleProjectDragStart(e, project)}
                        onDragOver={(e) => handleProjectDragOver(e, project)}
                        onDrop={(e) => handleProjectDrop(e, project)}
                        onDragEnd={handleProjectDragEnd}
                        onClick={() => setSelectedTask({ ...project, type: 'project' })}
                        className={`rounded-xl p-4 border cursor-move transition-all duration-200 backdrop-blur-xl shadow-xl ${
                          company ? company.color : 'bg-white/5 border-white/10'
                        } ${
                          project.archived ? 'opacity-50 cursor-pointer' : 'hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10'
                        } ${selectedTask?.id === project.id ? 'ring-2 ring-indigo-500/50 shadow-indigo-500/20' : ''} ${
                          dragOverProject?.id === project.id ? 'border-t-4 border-t-indigo-500' : ''
                        } ${draggedProject?.id === project.id ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing">
                              <GripVertical />
                            </div>
                            <div className={`w-5 h-5 ${priority?.color}`}>
                              <PriorityIcon />
                            </div>
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            {company && (
                              <span className="text-xs px-2 py-0.5 bg-gray-900/50 rounded border border-current">
                                {company.name}
                              </span>
                            )}
                            {project.archived && (
                              <span className="text-xs px-2 py-0.5 bg-gray-700 rounded">Archived</span>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{stats.completed} / {stats.total} tasks</span>
                            <span>{stats.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 transition-all"
                              style={{ width: `${stats.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4"><Clock /></div>
                            {stats.timeTracked}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4"><Calendar /></div>
                            {stats.scheduled} scheduled
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <button
                onClick={() => setShowArchivedProjects(!showArchivedProjects)}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                {showArchivedProjects ? 'Hide' : 'Show'} Archived Projects
              </button>
            </div>
          )}

          {view === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Settings</h2>

              {/* App Customization */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>App Customization</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">App Name</label>
                    <input
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      placeholder="My Awesome App"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">App Icon</label>
                    <div className="grid grid-cols-8 gap-2">
                      {Object.keys(priorityIcons).map(iconKey => {
                        const IconComponent = priorityIcons[iconKey];
                        return (
                          <button
                            key={iconKey}
                            onClick={() => setAppIcon(iconKey)}
                            className={`p-3 rounded-lg border transition-all duration-200 ${
                              appIcon === iconKey
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/50 scale-110'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50'
                            }`}
                            title={iconKey}
                          >
                            <div className="w-6 h-6">
                              <IconComponent />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        {React.createElement(priorityIcons[appIcon] || Brain, { className: "w-6 h-6" })}
                      </div>
                      <span className="text-lg font-semibold">{appName}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Time Tracking Report</h3>

                <div className="flex gap-2 mb-4">
                  {['today', 'week', 'month', 'all'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setTimeReportFilter(filter)}
                      className={`px-3 py-1 rounded capitalize ${
                        timeReportFilter === filter
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {getCompanyTimeStats(timeReportFilter).map(stat => (
                    <div
                      key={stat.company.id}
                      className={`p-3 rounded-lg border ${stat.company.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{stat.company.name}</span>
                        <span className="font-semibold">
                          {stat.hours}h {stat.minutes}m
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Priorities</h3>

                <div className="space-y-3 mb-4">
                  {priorities.map(priority => {
                    const PriorityIcon = priorityIcons[priority.icon];
                    return (
                      <div key={priority.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                        <div className={`w-5 h-5 ${priority.color}`}>
                          <PriorityIcon />
                        </div>
                        <input
                          type="text"
                          value={priority.name}
                          onChange={(e) => updatePrioritySettings(priority.id, { name: e.target.value })}
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                        <select
                          value={priority.icon}
                          onChange={(e) => updatePrioritySettings(priority.id, { icon: e.target.value })}
                          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          <option value="zap">⚡ Zap</option>
                          <option value="flame">🔥 Flame</option>
                          <option value="rocket">🚀 Rocket</option>
                          <option value="star">⭐ Star</option>
                          <option value="sparkles">✨ Sparkles</option>
                          <option value="target">🎯 Target</option>
                          <option value="award">🏆 Award</option>
                          <option value="trendingUp">📈 Trending Up</option>
                          <option value="brain">🧠 Brain</option>
                          <option value="lightbulb">💡 Lightbulb</option>
                          <option value="heart">❤️ Heart</option>
                          <option value="clock">🕐 Clock</option>
                          <option value="calendar">📅 Calendar</option>
                          <option value="briefcase">💼 Briefcase</option>
                          <option value="bookOpen">📖 Book</option>
                          <option value="circle">⭕ Circle</option>
                        </select>
                        <select
                          value={priority.color}
                          onChange={(e) => updatePrioritySettings(priority.id, { color: e.target.value })}
                          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          <option value="text-red-400">🔴 Red</option>
                          <option value="text-orange-400">🟠 Orange</option>
                          <option value="text-yellow-400">🟡 Yellow</option>
                          <option value="text-green-400">🟢 Green</option>
                          <option value="text-blue-400">🔵 Blue</option>
                          <option value="text-indigo-400">🟣 Indigo</option>
                          <option value="text-purple-400">🟣 Purple</option>
                          <option value="text-pink-400">💗 Pink</option>
                          <option value="text-gray-400">⚪ Gray</option>
                        </select>
                        <button
                          onClick={() => deletePriority(priority.id)}
                          className="w-8 h-8 text-red-400 hover:text-red-300 flex items-center justify-center"
                        >
                          <div className="w-4 h-4"><Trash2 /></div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-semibold mb-3">Add New Priority</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPriorityName}
                      onChange={(e) => setNewPriorityName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addPriority()}
                      placeholder="Priority name"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                    />
                    <select
                      value={newPriorityIcon}
                      onChange={(e) => setNewPriorityIcon(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-2 text-sm"
                    >
                      <option value="zap">⚡ Zap</option>
                      <option value="flame">🔥 Flame</option>
                      <option value="rocket">🚀 Rocket</option>
                      <option value="star">⭐ Star</option>
                      <option value="sparkles">✨ Sparkles</option>
                      <option value="target">🎯 Target</option>
                      <option value="award">🏆 Award</option>
                      <option value="trendingUp">📈 Trending Up</option>
                      <option value="brain">🧠 Brain</option>
                      <option value="lightbulb">💡 Lightbulb</option>
                      <option value="heart">❤️ Heart</option>
                      <option value="clock">🕐 Clock</option>
                      <option value="calendar">📅 Calendar</option>
                      <option value="briefcase">💼 Briefcase</option>
                      <option value="bookOpen">📖 Book</option>
                      <option value="circle">⭕ Circle</option>
                    </select>
                    <select
                      value={newPriorityColor}
                      onChange={(e) => setNewPriorityColor(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-2 text-sm"
                    >
                      <option value="text-red-400">🔴 Red</option>
                      <option value="text-orange-400">🟠 Orange</option>
                      <option value="text-yellow-400">🟡 Yellow</option>
                      <option value="text-green-400">🟢 Green</option>
                      <option value="text-blue-400">🔵 Blue</option>
                      <option value="text-indigo-400">🟣 Indigo</option>
                      <option value="text-purple-400">🟣 Purple</option>
                      <option value="text-pink-400">💗 Pink</option>
                      <option value="text-gray-400">⚪ Gray</option>
                    </select>
                    <button
                      onClick={addPriority}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded flex items-center gap-2"
                    >
                      <div className="w-4 h-4"><Plus /></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Companies</h3>

                <div className="space-y-3 mb-4">
                  {companies.map(company => (
                    <div key={company.id} className={`flex items-center gap-3 p-3 rounded-lg border ${company.color}`}>
                      <input
                        type="text"
                        value={company.name}
                        onChange={(e) => updateCompanySettings(company.id, { name: e.target.value })}
                        className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                      />
                      <select
                        value={company.color}
                        onChange={(e) => updateCompanySettings(company.id, { color: e.target.value })}
                        className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                      >
                        <option value="bg-red-900/30 border-red-500 text-red-300">🔴 Red</option>
                        <option value="bg-orange-900/30 border-orange-500 text-orange-300">🟠 Orange</option>
                        <option value="bg-yellow-900/30 border-yellow-500 text-yellow-300">🟡 Yellow</option>
                        <option value="bg-green-900/30 border-green-500 text-green-300">🟢 Green</option>
                        <option value="bg-blue-900/30 border-blue-500 text-blue-300">🔵 Blue</option>
                        <option value="bg-indigo-900/30 border-indigo-500 text-indigo-300">🟣 Indigo</option>
                        <option value="bg-purple-900/30 border-purple-500 text-purple-300">🟣 Purple</option>
                        <option value="bg-pink-900/30 border-pink-500 text-pink-300">💗 Pink</option>
                        <option value="bg-gray-900/30 border-gray-500 text-gray-300">⚪ Gray</option>
                      </select>
                      <button
                        onClick={() => deleteCompany(company.id)}
                        className="w-8 h-8 text-red-400 hover:text-red-300 flex items-center justify-center"
                      >
                        <div className="w-4 h-4"><Trash2 /></div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-semibold mb-3">Add New Company</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCompany()}
                      placeholder="Company name"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                    />
                    <select
                      value={newCompanyColor}
                      onChange={(e) => setNewCompanyColor(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-2 text-sm"
                    >
                      <option value="bg-red-900/30 border-red-500 text-red-300">🔴 Red</option>
                      <option value="bg-orange-900/30 border-orange-500 text-orange-300">🟠 Orange</option>
                      <option value="bg-yellow-900/30 border-yellow-500 text-yellow-300">🟡 Yellow</option>
                      <option value="bg-green-900/30 border-green-500 text-green-300">🟢 Green</option>
                      <option value="bg-blue-900/30 border-blue-500 text-blue-300">🔵 Blue</option>
                      <option value="bg-indigo-900/30 border-indigo-500 text-indigo-300">🟣 Indigo</option>
                      <option value="bg-purple-900/30 border-purple-500 text-purple-300">🟣 Purple</option>
                      <option value="bg-pink-900/30 border-pink-500 text-pink-300">💗 Pink</option>
                      <option value="bg-gray-900/30 border-gray-500 text-gray-300">⚪ Gray</option>
                    </select>
                    <button
                      onClick={addCompany}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded flex items-center gap-2"
                    >
                      <div className="w-4 h-4"><Plus /></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Sidebar */}
      {selectedTask && (
        <div
          className="fixed right-0 top-0 h-screen bg-gray-900 border-l border-gray-700 overflow-y-auto z-50"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Resize Handle */}
          <div
            onMouseDown={handleSidebarResizeStart}
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-indigo-500 transition-colors group"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gray-600 group-hover:bg-indigo-500 transition-colors" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {selectedTask.type === 'project' ? 'Project Details' : 'Task Details'}
              </h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="w-8 h-8 hover:bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <div className="w-5 h-5"><X /></div>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={selectedTask.name || selectedTask.text}
                  onChange={(e) => {
                    if (selectedTask.type === 'project') {
                      updateProject(selectedTask.id, { name: e.target.value });
                    } else {
                      updateTask(selectedTask.id, { text: e.target.value });
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Priority</label>
                <select
                  value={selectedTask.priority}
                  onChange={(e) => {
                    if (selectedTask.type === 'project') {
                      updateProject(selectedTask.id, { priority: e.target.value });
                    } else {
                      updateTask(selectedTask.id, { priority: e.target.value });
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                >
                  {priorities.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Company</label>
                <select
                  value={selectedTask.company || ''}
                  onChange={(e) => {
                    if (selectedTask.type === 'project') {
                      updateProject(selectedTask.id, { company: e.target.value || null });
                    } else {
                      updateTask(selectedTask.id, { company: e.target.value || null });
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                >
                  <option value="">None</option>
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {selectedTask.type === 'task' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project</label>
                  <select
                    value={selectedTask.projectId || ''}
                    onChange={(e) => updateTask(selectedTask.id, {
                      projectId: e.target.value ? parseInt(e.target.value) : null
                    })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                  >
                    <option value="">No Project</option>
                    {projects.filter(p => !p.archived).map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Notes</label>
                  <button
                    onClick={() => setEditingNotes(!editingNotes)}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    {editingNotes ? 'Preview' : 'Edit'}
                  </button>
                </div>
                {editingNotes ? (
                  <textarea
                    value={selectedTask.notes || ''}
                    onChange={(e) => {
                      if (selectedTask.type === 'project') {
                        updateProject(selectedTask.id, { notes: e.target.value });
                      } else {
                        updateTask(selectedTask.id, { notes: e.target.value });
                      }
                    }}
                    onKeyDown={handleNotesKeydown}
                    className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-2 font-mono text-sm"
                    placeholder="Use Cmd/Ctrl+B for bold, Cmd/Ctrl+I for italic, Cmd/Ctrl+K for link"
                  />
                ) : (
                  <div
                    className="prose prose-invert max-w-none bg-gray-800 border border-gray-700 rounded-lg p-2 min-h-[160px]"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedTask.notes || '') }}
                  />
                )}
              </div>

              {selectedTask.type === 'task' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Checklist</label>
                  <div className="space-y-2 mb-2">
                    {(selectedTask.checklist || []).map(item => (
                      <div key={item.id} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                        <button
                          onClick={() => toggleChecklistItem(selectedTask.id, item.id)}
                          className="flex-shrink-0"
                        >
                          <div className={`w-4 h-4 ${item.completed ? 'text-green-400' : 'text-gray-400'}`}>
                            {item.completed ? <CheckCircle2 /> : <Circle />}
                          </div>
                        </button>
                        <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          {item.text}
                        </span>
                        <button
                          onClick={() => deleteChecklistItem(selectedTask.id, item.id)}
                          className="w-4 h-4 text-red-400 hover:text-red-300"
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addChecklistItem(selectedTask.id)}
                      placeholder="Add checklist item"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
                    />
                    <button
                      onClick={() => addChecklistItem(selectedTask.id)}
                      className="px-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      <div className="w-4 h-4"><Plus /></div>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-700">
                {selectedTask.type === 'project' ? (
                  <button
                    onClick={() => {
                      if (confirm('Delete this project? Tasks will be unassigned but not deleted.')) {
                        deleteProject(selectedTask.id);
                      }
                    }}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
                  >
                    <div className="w-4 h-4"><Trash2 /></div>
                    Delete Project
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (confirm('Delete this task?')) {
                        deleteTask(selectedTask.id);
                      }
                    }}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
                  >
                    <div className="w-4 h-4"><Trash2 /></div>
                    Delete Task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-96 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">New Project</h3>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addProject()}
              placeholder="Project name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addProject}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewProjectModal(false);
                  setNewProjectName('');
                }}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
