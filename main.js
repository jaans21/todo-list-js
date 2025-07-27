// Simple Responsive To-Do List with Dark Mode and Folders
// HTML structure
document.body.innerHTML = `
  <style>
    :root {
      --bg-color: #f4f6fb;
      --container-bg: #fff;
      --text-color: #2d3748;
      --text-muted: #a0aec0;
      --border-color: #e2e8f0;
      --item-bg: #f7fafc;
      --item-completed-bg: #e2e8f0;
      --primary-color: #3182ce;
      --primary-hover: #2563eb;
      --delete-color: #e53e3e;
      --delete-hover-bg: #ffe5e5;
      --folder-color: #805ad5;
      --folder-hover: #6b46c1;
      --folder-bg: #e9d8fd;
    }

    [data-theme="dark"] {
      --bg-color: #1a202c;
      --container-bg: #2d3748;
      --text-color: #f7fafc;
      --text-muted: #718096;
      --border-color: #4a5568;
      --item-bg: #4a5568;
      --item-completed-bg: #2d3748;
      --primary-color: #63b3ed;
      --primary-hover: #4299e1;
      --delete-color: #fc8181;
      --delete-hover-bg: #553c3c;
      --folder-color: #b794f6;
      --folder-hover: #9f7aea;
      --folder-bg: #553c9a;
    }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--bg-color);
      color: var(--text-color);
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
    }

    .app-container {
      display: flex;
      width: 100%;
      min-height: 100vh;
    }

    .sidebar {
      width: 280px;
      background: var(--container-bg);
      border-right: 1px solid var(--border-color);
      transition: background-color 0.3s ease;
      position: relative;
      box-shadow: 2px 0 8px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sidebar-title {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--text-color);
      text-align: center;
    }

    .folder-form {
      display: flex;
      gap: 6px;
    }

    .folder-input {
      flex: 1;
      padding: 8px 10px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 0.9rem;
      outline: none;
      background: var(--container-bg);
      color: var(--text-color);
      transition: all 0.3s ease;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    .folder-input:focus {
      border: 1.5px solid var(--folder-color);
    }

    .folder-add-btn {
      background: var(--folder-color);
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 0 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .folder-add-btn:hover {
      background: var(--folder-hover);
    }

    .recycle-bin {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--item-bg);
      border-radius: 6px;
      margin-top: 8px;
      font-size: 0.9rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .recycle-bin:hover {
      background: var(--border-color);
    }

    .recycle-bin-icon {
      margin-right: 8px;
    }

    .recycle-bin-count {
      background: var(--text-muted);
      color: var(--container-bg);
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 0.75rem;
      min-width: 16px;
      text-align: center;
    }

    .folder-tree {
      padding: 10px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    .tree-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;
      margin-bottom: 2px;
      transition: all 0.3s ease;
      position: relative;
      group: tree-item;
    }

    .tree-item:hover {
      background: var(--item-bg);
    }

    .tree-item:hover .tree-delete {
      opacity: 1;
      visibility: visible;
    }

    .tree-item.active {
      background: var(--folder-color);
      color: #fff;
    }

    .tree-item.active .tree-count {
      background: rgba(255,255,255,0.2);
      color: #fff;
    }

    .tree-delete {
      opacity: 0;
      visibility: hidden;
      background: none;
      border: none;
      color: var(--delete-color);
      font-size: 1rem;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 3px;
      transition: all 0.3s ease;
      margin-left: 4px;
    }

    .tree-delete:hover {
      background: var(--delete-hover-bg);
      transform: scale(1.1);
    }

    .tree-item.active .tree-delete {
      color: rgba(255,255,255,0.8);
    }

    .tree-item.active .tree-delete:hover {
      color: #fff;
      background: rgba(255,255,255,0.1);
    }

    .tree-icon {
      margin-right: 8px;
      font-size: 1rem;
    }

    .tree-name {
      flex: 1;
      font-size: 0.9rem;
    }

    .tree-count {
      background: var(--border-color);
      color: var(--text-muted);
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 0.75rem;
      margin-left: 4px;
    }

    .tree-children {
      margin-left: 20px;
    }

    .main-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .todo-container {
      background: var(--container-bg);
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 32px 24px 24px 24px;
      width: 100%;
      max-width: 500px;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      box-sizing: border-box;
    }
    
    [data-theme="dark"] .todo-container {
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    }

    .todo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .todo-title {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
      transition: color 0.3s ease;
    }

    .theme-toggle {
      background: none;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 1rem;
      color: var(--text-color);
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      background: var(--item-bg);
      transform: scale(1.05);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 15px;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .breadcrumb-item {
      cursor: pointer;
      color: var(--folder-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .breadcrumb-item:hover {
      color: var(--folder-hover);
    }

    .breadcrumb-separator {
      color: var(--text-muted);
    }

    .folder-item {
      display: flex;
      align-items: center;
      background: var(--folder-bg);
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .folder-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .folder-icon {
      font-size: 1.2rem;
      margin-right: 12px;
    }

    .folder-name {
      flex: 1;
      font-weight: 500;
      color: var(--text-color);
    }

    .folder-count {
      background: var(--folder-color);
      color: #fff;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 0.8rem;
      margin-right: 8px;
    }
    .todo-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .todo-form-main {
      display: flex;
      gap: 8px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .todo-form-datetime {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 0.9rem;
      color: var(--text-muted);
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      flex-wrap: wrap;
    }

    .datetime-input {
      padding: 6px 8px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 0.85rem;
      background: var(--container-bg);
      color: var(--text-color);
      transition: all 0.3s ease;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    .datetime-input:focus {
      border: 1.5px solid var(--primary-color);
      outline: none;
    }

    .clear-datetime {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }

    .clear-datetime:hover {
      background: var(--item-bg);
      color: var(--text-color);
    }
    .todo-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      background: var(--container-bg);
      color: var(--text-color);
      transition: all 0.3s ease;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .todo-input:focus {
      border: 1.5px solid var(--primary-color);
    }
    .todo-add-btn {
      background: var(--primary-color);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0 18px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .todo-add-btn:hover {
      background: var(--primary-hover);
    }
    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .todo-item {
      display: flex;
      align-items: center;
      background: var(--item-bg);
      border-radius: 6px;
      padding: 10px 12px;
      transition: all 0.3s ease;
    }

    .todo-item.overdue {
      background: var(--delete-hover-bg);
      border-left: 4px solid var(--delete-color);
      animation: pulse 2s infinite;
    }

    .todo-item.due-soon {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
    }

    [data-theme="dark"] .todo-item.due-soon {
      background: #332701;
      border-left: 4px solid #ffca28;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.8; }
      100% { opacity: 1; }
    }

    .todo-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .todo-text {
      font-weight: 500;
    }

    .todo-due-date {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .todo-due-date.overdue {
      color: var(--delete-color);
      font-weight: 600;
    }

    .todo-due-date.due-soon {
      color: #e65100;
      font-weight: 500;
    }

    [data-theme="dark"] .todo-due-date.due-soon {
      color: #ffb74d;
    }

    .reminders-section {
      margin-bottom: 20px;
    }

    .reminders-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--delete-color);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .reminder-count {
      background: var(--delete-color);
      color: #fff;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 0.8rem;
    }
    .todo-item.completed {
      text-decoration: line-through;
      color: var(--text-muted);
      background: var(--item-completed-bg);
    }
    .todo-checkbox {
      margin-right: 12px;
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .todo-delete-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--delete-color);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    .todo-delete-btn:hover {
      background: var(--delete-hover-bg);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: var(--container-bg);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
    }

    .modal-close:hover {
      color: var(--text-color);
    }

    .recycle-item {
      display: flex;
      align-items: center;
      background: var(--item-bg);
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      border-left: 3px solid var(--delete-color);
    }

    .recycle-item-content {
      flex: 1;
      margin-right: 12px;
    }

    .recycle-item-task {
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 4px;
    }

    .recycle-item-info {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .recycle-item-actions {
      display: flex;
      gap: 8px;
    }

    .restore-btn {
      background: var(--primary-color);
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .restore-btn:hover {
      background: var(--primary-hover);
    }

    .permanent-delete-btn {
      background: var(--delete-color);
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .permanent-delete-btn:hover {
      background: #c53030;
    }

    .empty-recycle {
      text-align: center;
      color: var(--text-muted);
      padding: 40px 20px;
      font-size: 1.1rem;
    }

    .modal-footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .auto-empty-info {
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .empty-all-btn {
      background: var(--delete-color);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .empty-all-btn:hover {
      background: #c53030;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      position: fixed;
      top: 15px;
      left: 15px;
      z-index: 1001;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .mobile-menu-toggle:hover {
      background: var(--primary-hover);
      transform: scale(1.05);
    }

    .mobile-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
      .sidebar {
        width: 260px;
      }
      
      .todo-container {
        max-width: 600px;
      }
    }

    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }

      .sidebar {
        position: fixed;
        top: 0;
        left: -280px;
        height: 100vh;
        width: 280px;
        z-index: 1000;
        transition: left 0.3s ease;
        overflow-y: auto;
      }

      .sidebar.open {
        left: 0;
      }

      .sidebar.open ~ .mobile-overlay {
        display: block;
      }

      .main-content {
        width: 100%;
        padding: 70px 15px 20px 15px;
        margin-left: 0;
      }

      .todo-container {
        max-width: none;
        padding: 24px 20px;
        margin: 0;
      }

      .todo-header {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
      }

      .todo-title {
        text-align: center;
        font-size: 1.8rem;
      }

      .theme-toggle {
        align-self: center;
      }

      .folder-form {
        flex-direction: column;
        gap: 8px;
      }

      .folder-input {
        width: 100%;
      }

      .todo-form-main {
        flex-direction: column;
        gap: 10px;
      }

      .todo-input {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
      }

      .todo-add-btn {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
      }

      .todo-form-datetime {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      .datetime-input {
        min-width: 140px;
        padding: 8px;
      }
    }

    @media (max-width: 640px) {
      .main-content {
        padding: 70px 10px 20px 10px;
      }

      .todo-container {
        padding: 20px 16px;
        border-radius: 8px;
      }

      .todo-title {
        font-size: 1.6rem;
      }

      .todo-item {
        padding: 12px;
        border-radius: 8px;
      }

      .todo-checkbox {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      .todo-text {
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .todo-delete-btn {
        padding: 8px;
        font-size: 1.1rem;
        min-width: 36px;
        min-height: 36px;
      }

      .folder-item {
        padding: 14px 12px;
        margin-bottom: 10px;
      }

      .modal {
        width: 95%;
        padding: 20px;
        margin: 10px;
      }

      .modal-title {
        font-size: 1.2rem;
      }

      .breadcrumb {
        flex-wrap: wrap;
        gap: 6px;
      }
    }

    @media (max-width: 480px) {
      .main-content {
        padding: 70px 8px 15px 8px;
      }

      .todo-container {
        padding: 18px 12px;
        gap: 16px;
      }

      .todo-title {
        font-size: 1.4rem;
      }

      .sidebar-header {
        padding: 16px;
      }

      .sidebar-title {
        font-size: 1rem;
      }

      .todo-form-datetime {
        flex-direction: column;
        align-items: stretch;
      }

      .datetime-input {
        min-width: auto;
        width: 100%;
      }

      .tree-item {
        padding: 10px;
        margin-bottom: 4px;
      }

      .tree-name {
        font-size: 0.85rem;
      }

      .recycle-bin {
        padding: 10px;
        font-size: 0.85rem;
      }
    }

    @media (max-width: 360px) {
      .todo-container {
        padding: 16px 10px;
        gap: 14px;
      }

      .todo-title {
        font-size: 1.3rem;
      }

      .todo-input {
        padding: 10px;
        font-size: 0.95rem;
      }

      .todo-add-btn {
        padding: 10px;
        font-size: 0.95rem;
      }

      .todo-item {
        padding: 10px;
      }

      .todo-text {
        font-size: 0.9rem;
      }

      .folder-item {
        padding: 12px 10px;
      }

      .folder-name {
        font-size: 0.9rem;
      }
    }

    /* Touch improvements */
    @media (hover: none) and (pointer: coarse) {
      .todo-delete-btn,
      .tree-delete,
      .theme-toggle,
      .folder-add-btn,
      .todo-add-btn {
        min-height: 44px;
        min-width: 44px;
      }

      .todo-checkbox {
        min-width: 24px;
        min-height: 24px;
      }

      .tree-item,
      .folder-item,
      .todo-item,
      .recycle-bin {
        min-height: 48px;
      }
    }

    /* Landscape orientation adjustments */
    @media screen and (max-height: 500px) and (orientation: landscape) {
      .main-content {
        padding: 50px 15px 15px 15px;
      }

      .mobile-menu-toggle {
        top: 8px;
        left: 8px;
        padding: 8px;
        font-size: 1rem;
        z-index: 1002;
      }

      .sidebar-header {
        padding: 12px;
      }

      .todo-container {
        padding: 16px;
        gap: 12px;
      }

      .todo-title {
        font-size: 1.4rem;
      }
    }

    /* Very short screens (like landscape phones) */
    @media screen and (max-height: 400px) {
      .main-content {
        padding: 45px 10px 10px 10px;
      }

      .mobile-menu-toggle {
        top: 5px;
        left: 5px;
        padding: 6px;
        font-size: 0.9rem;
        border-radius: 4px;
      }

      .todo-container {
        padding: 12px;
        gap: 10px;
        border-radius: 8px;
      }

      .todo-title {
        font-size: 1.2rem;
      }

      .todo-header {
        margin-bottom: 4px;
      }

      .breadcrumb {
        margin-bottom: 8px;
      }
    }

    /* High-resolution displays */
    @media screen and (min-resolution: 2dppx) {
      .todo-container {
        box-shadow: 0 4px 32px rgba(0,0,0,0.1);
      }

      .mobile-menu-toggle {
        box-shadow: 0 2px 12px rgba(0,0,0,0.25);
      }
    }

    /* Extra large screens */
    @media (min-width: 1440px) {
      .main-content {
        padding: 40px;
      }

      .todo-container {
        max-width: 700px;
        padding: 40px 32px;
      }

      .todo-title {
        font-size: 2.2rem;
      }

      .sidebar {
        width: 320px;
      }
    }

    /* Ultra-wide screens */
    @media (min-width: 1920px) {
      .app-container {
        max-width: 1400px;
        margin: 0 auto;
        box-shadow: 0 0 40px rgba(0,0,0,0.1);
      }

      .todo-checkbox {
        min-width: 24px;
        min-height: 24px;
      }

      .tree-item,
      .folder-item,

      .main-content {
        padding: 60px;
      }

      .todo-container {
        max-width: 800px;
        padding: 48px 40px;
      }
    }

    /* Improved focus styles for accessibility */
    .todo-input:focus,
    .folder-input:focus,
    .datetime-input:focus {
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }

    .mobile-menu-toggle:focus {
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
      outline: none;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    .app-footer {
      text-align: center;
      padding: 16px 0;
      margin-top: 24px;
      border-top: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .app-footer a {
      color: var(--primary-color);
      text-decoration: none;
    }

    .app-footer a:hover {
      text-decoration: underline;
    }
  </style>
  <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu">☰</button>
  <div class="mobile-overlay" id="mobile-overlay"></div>
  <div class="app-container">
    <div class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-title">📁 Folders</span>
        <form class="folder-form" id="folder-form">
          <input class="folder-input" id="folder-input" type="text" placeholder="New folder..." maxlength="30" />
          <button class="folder-add-btn" type="submit">+</button>
        </form>
        <div class="recycle-bin" id="recycle-bin" title="Recycle Bin - Auto-empties every 24 hours">
          <div>
            <span class="recycle-bin-icon">🗑️</span>
            <span>Recycle Bin</span>
          </div>
          <span class="recycle-bin-count" id="recycle-bin-count">0</span>
        </div>
      </div>
      <div class="folder-tree" id="folder-tree"></div>
    </div>

    <div class="main-content">
      <div class="todo-container">
        <div class="todo-header">
          <div class="todo-title">To-Do List</div>
          <button class="theme-toggle" title="Toggle Dark Mode">🌙</button>
        </div>

        <div class="breadcrumb" id="breadcrumb"></div>

        <form class="todo-form" id="todo-form">
          <div class="todo-form-main">
            <input class="todo-input" id="todo-input" type="text" placeholder="Add a new task..." maxlength="60" required />
            <button class="todo-add-btn" type="submit">+</button>
          </div>
          <div class="todo-form-datetime">
            <label>📅 Due:</label>
            <input class="datetime-input" id="due-date" type="date" />
            <input class="datetime-input" id="due-time" type="time" />
            <button class="clear-datetime" type="button" id="clear-datetime">Clear</button>
          </div>
        </form>

        <div id="content-area">
          <div id="reminders-container"></div>
          <ul class="todo-list" id="todo-list"></ul>
        </div>
        
        <div class="app-footer">
          Made by <a href="https://github.com/jaans21" target="_blank">jaans21</a>
        </div>
      </div>
    </div>
  </div>
`;

// JS logic
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const dueDateInput = document.querySelector('#due-date');
const dueTimeInput = document.querySelector('#due-time');
const clearDateTimeBtn = document.querySelector('#clear-datetime');
const list = document.querySelector('#todo-list');
const remindersContainer = document.querySelector('#reminders-container');
const themeToggle = document.querySelector('.theme-toggle');
const breadcrumb = document.querySelector('#breadcrumb');
const contentArea = document.querySelector('#content-area');
const sidebar = document.querySelector('#sidebar');
const folderTree = document.querySelector('#folder-tree');
const folderForm = document.querySelector('#folder-form');
const folderInput = document.querySelector('#folder-input');
const recycleBinElement = document.querySelector('#recycle-bin');
const mobileMenuToggle = document.querySelector('#mobile-menu-toggle');
const mobileOverlay = document.querySelector('#mobile-overlay');

// App state
let currentPath = []; // Array of folder names representing current location
let data = {
  folders: {},
  tasks: []
};

// Recycle bin configuration and storage
const RECYCLE_BIN_AUTO_EMPTY_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let recycleBin = [];
let recycleBinTimer = null;


// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile menu functionality
function toggleMobileMenu() {
  sidebar.classList.toggle('open');
  const isOpen = sidebar.classList.contains('open');
  mobileMenuToggle.setAttribute('aria-expanded', isOpen);
  
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    mobileOverlay.style.display = 'block';
  } else {
    document.body.style.overflow = '';
    mobileOverlay.style.display = 'none';
  }
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  mobileOverlay.style.display = 'none';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when window is resized to desktop size
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 100);
});

// Close mobile menu when navigating (for better UX)
function closeMobileMenuOnNavigation() {
  if (window.innerWidth <= 768) {
    closeMobileMenu();
  }
}

// Touch swipe functionality for mobile menu
let touchStartX = 0;
let touchEndX = 0;

function handleSwipeGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  // Swipe right to open menu (only if touching from left edge)
  if (swipeDistance > swipeThreshold && touchStartX < 30 && !sidebar.classList.contains('open')) {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  }
  
  // Swipe left to close menu
  if (swipeDistance < -swipeThreshold && sidebar.classList.contains('open')) {
    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  }
}

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
}, { passive: true });

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  // Close menu with Escape key
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    closeMobileMenu();
    mobileMenuToggle.focus();
  }
  
  // Toggle menu with Enter/Space on mobile menu button
  if ((e.key === 'Enter' || e.key === ' ') && e.target === mobileMenuToggle) {
    e.preventDefault();
    toggleMobileMenu();
  }
});

// Clear date/time inputs
clearDateTimeBtn.addEventListener('click', () => {
  dueDateInput.value = '';
  dueTimeInput.value = '';
});

// Data management
function loadData() {
  const saved = localStorage.getItem('todoData');
  if (saved) {
    data = JSON.parse(saved);
  } else {
    // Migrate old todos if they exist
    const oldTodos = localStorage.getItem('todos');
    if (oldTodos) {
      data.tasks = JSON.parse(oldTodos);
      localStorage.removeItem('todos');
    }
  }
  
  // Load recycle bin
  const savedRecycleBin = localStorage.getItem('recycleBin');
  if (savedRecycleBin) {
    recycleBin = JSON.parse(savedRecycleBin);
  }
  
  // Start auto-empty timer
  startRecycleBinTimer();
  
  // Start reminder checking
  startReminderTimer();
}

function startReminderTimer() {
  // Check for reminders every minute
  setInterval(() => {
    render(); // Re-render to update reminder status
  }, 60000); // 60 seconds
}

function saveData() {
  localStorage.setItem('todoData', JSON.stringify(data));
  localStorage.setItem('recycleBin', JSON.stringify(recycleBin));
}

// Navigation
function getCurrentContainer() {
  let current = data;
  for (const folderName of currentPath) {
    if (!current.folders[folderName]) {
      current.folders[folderName] = { folders: {}, tasks: [] };
    }
    current = current.folders[folderName];
  }
  return current;
}

function updateBreadcrumb() {
  breadcrumb.innerHTML = '';
  
  // Home link
  const homeLink = document.createElement('span');
  homeLink.textContent = '🏠 Home';
  homeLink.className = 'breadcrumb-item';
  homeLink.addEventListener('click', () => navigateToPath([]));
  breadcrumb.appendChild(homeLink);
  
  // Path links
  for (let i = 0; i < currentPath.length; i++) {
    const separator = document.createElement('span');
    separator.textContent = '>';
    separator.className = 'breadcrumb-separator';
    breadcrumb.appendChild(separator);
    
    const link = document.createElement('span');
    link.textContent = currentPath[i];
    link.className = 'breadcrumb-item';
    const pathToHere = currentPath.slice(0, i + 1);
    link.addEventListener('click', () => navigateToPath(pathToHere));
    breadcrumb.appendChild(link);
  }
}

function navigateToPath(path) {
  currentPath = [...path];
  updateBreadcrumb();
  updateFolderTree();
  render();
  closeMobileMenuOnNavigation();
}

// Folder tree rendering
function renderFolderTree() {
  function renderTreeNode(container, path = [], level = 0) {
    let html = '';
    
    // Add home item at root level
    if (level === 0) {
      const isActive = currentPath.length === 0;
      const totalTasks = countAllTasks(data);
      html += `
        <div class="tree-item ${isActive ? 'active' : ''}" onclick="navigateToTreePath([])">
          <span class="tree-icon">🏠</span>
          <span class="tree-name">Home</span>
          <span class="tree-count">${totalTasks}</span>
        </div>
      `;
    }
    
    // Render folders
    const folderNames = Object.keys(container.folders).sort();
    for (const folderName of folderNames) {
      const folder = container.folders[folderName];
      const folderPath = [...path, folderName];
      const isActive = JSON.stringify(currentPath) === JSON.stringify(folderPath);
      const taskCount = countAllTasks(folder);
      const pathString = JSON.stringify(folderPath).replace(/"/g, '&quot;');
      
      html += `
        <div class="tree-item ${isActive ? 'active' : ''}" onclick="navigateToTreePath(${pathString})">
          <span class="tree-icon">📁</span>
          <span class="tree-name">${folderName}</span>
          <span class="tree-count">${taskCount}</span>
          <button class="tree-delete" onclick="event.stopPropagation(); deleteTreeFolder(${pathString})" title="Delete folder">×</button>
        </div>
      `;
      
      // Render children if folder has subfolders
      const childrenHtml = renderTreeNode(folder, folderPath, level + 1);
      if (childrenHtml) {
        html += `<div class="tree-children">${childrenHtml}</div>`;
      }
    }
    
    return html;
  }
  
  return renderTreeNode(data);
}

function updateFolderTree() {
  folderTree.innerHTML = renderFolderTree();
}

// Global function for tree navigation
window.navigateToTreePath = function(path) {
  navigateToPath(path);
};

// Global function for deleting folders from tree
window.deleteTreeFolder = function(folderPath) {
  const folderName = folderPath[folderPath.length - 1];
  if (confirm(`Are you sure you want to delete the folder "${folderName}" and all its contents?`)) {
    // Navigate to parent container
    let container = data;
    for (let i = 0; i < folderPath.length - 1; i++) {
      container = container.folders[folderPath[i]];
    }
    
    // Delete the folder
    delete container.folders[folderName];
    
    // If we're currently inside the deleted folder or its children, navigate to parent
    if (currentPath.length >= folderPath.length) {
      const isInDeletedPath = folderPath.every((folder, index) => currentPath[index] === folder);
      if (isInDeletedPath) {
        navigateToPath(folderPath.slice(0, -1));
      }
    }
    
    saveData();
    render();
  }
};

// Folder creation from sidebar
folderForm.addEventListener('submit', e => {
  e.preventDefault();
  const folderName = folderInput.value.trim();
  if (!folderName) return;
  
  const container = getCurrentContainer();
  
  if (container.folders[folderName]) {
    alert('A folder with that name already exists');
    return;
  }
  
  container.folders[folderName] = { folders: {}, tasks: [] };
  saveData();
  folderInput.value = '';
  render();
});

// Recycle bin click handler
if (recycleBinElement) {
  recycleBinElement.addEventListener('click', () => {
    showRecycleBinModal();
  });
} else {
  console.error('Recycle bin element not found');
}

// Rendering
function renderFolders() {
  const container = getCurrentContainer();
  const folderNames = Object.keys(container.folders);
  
  if (folderNames.length === 0) return '';
  
  return folderNames.map(folderName => {
    const folder = container.folders[folderName];
    const taskCount = countAllTasks(folder);
    
    return `
      <div class="folder-item" onclick="navigateToFolder('${folderName}')">
        <span class="folder-icon">📁</span>
        <span class="folder-name">${folderName}</span>
        <span class="folder-count">${taskCount}</span>
        <button class="todo-delete-btn" onclick="event.stopPropagation(); deleteFolder('${folderName}')" title="Delete folder">×</button>
      </div>
    `;
  }).join('');
}

function countAllTasks(container) {
  let count = container.tasks.length;
  for (const folderName in container.folders) {
    count += countAllTasks(container.folders[folderName]);
  }
  return count;
}

function renderTasks() {
  const container = getCurrentContainer();
  const todos = container.tasks;
  
  return todos.map((todo, idx) => {
    const completedClass = todo.completed ? ' completed' : '';
    const checked = todo.completed ? 'checked' : '';
    
    // Check if task is overdue or due soon
    let statusClass = '';
    let dueDateHtml = '';
    
    if (todo.dueDate && todo.dueTime) {
      const dueDateTime = new Date(`${todo.dueDate}T${todo.dueTime}`);
      const now = new Date();
      const timeUntilDue = dueDateTime.getTime() - now.getTime();
      const hoursUntilDue = timeUntilDue / (1000 * 60 * 60);
      
      if (timeUntilDue < 0 && !todo.completed) {
        statusClass = ' overdue';
        dueDateHtml = `<div class="todo-due-date overdue">⚠️ Overdue: ${formatDueDate(dueDateTime)}</div>`;
      } else if (hoursUntilDue <= 24 && hoursUntilDue > 0 && !todo.completed) {
        statusClass = ' due-soon';
        dueDateHtml = `<div class="todo-due-date due-soon">⏰ Due: ${formatDueDate(dueDateTime)}</div>`;
      } else if (!todo.completed) {
        dueDateHtml = `<div class="todo-due-date">📅 Due: ${formatDueDate(dueDateTime)}</div>`;
      }
    }
    
    return `
      <li class="todo-item${completedClass}${statusClass}">
        <input type="checkbox" class="todo-checkbox" ${checked} onchange="toggleTask(${idx})">
        <div class="todo-content">
          <div class="todo-text">${todo.text}</div>
          ${dueDateHtml}
        </div>
        <button class="todo-delete-btn" onclick="deleteTask(${idx})" title="Delete">×</button>
      </li>
    `;
  }).join('');
}

function renderReminders() {
  const container = getCurrentContainer();
  const now = new Date();
  
  // Get all overdue and due-soon tasks from all folders
  const allOverdueTasks = [];
  
  function collectOverdueTasks(container, path = []) {
    container.tasks.forEach((task, index) => {
      if (task.dueDate && task.dueTime && !task.completed) {
        const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
        const timeUntilDue = dueDateTime.getTime() - now.getTime();
        
        if (timeUntilDue < 0) {
          allOverdueTasks.push({
            task,
            path: path.length > 0 ? path.join(' > ') : 'Home',
            dueDateTime,
            index
          });
        }
      }
    });
    
    // Recursively check subfolders
    Object.keys(container.folders).forEach(folderName => {
      collectOverdueTasks(container.folders[folderName], [...path, folderName]);
    });
  }
  
  collectOverdueTasks(data);
  
  if (allOverdueTasks.length === 0) {
    return '';
  }
  
  // Sort by how overdue they are (most overdue first)
  allOverdueTasks.sort((a, b) => a.dueDateTime.getTime() - b.dueDateTime.getTime());
  
  const overdueHtml = allOverdueTasks.map(item => {
    const timeOverdue = now.getTime() - item.dueDateTime.getTime();
    const hoursOverdue = Math.floor(timeOverdue / (1000 * 60 * 60));
    const daysOverdue = Math.floor(hoursOverdue / 24);
    
    let overdueText = '';
    if (daysOverdue > 0) {
      overdueText = `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`;
    } else {
      overdueText = `${hoursOverdue} hour${hoursOverdue > 1 ? 's' : ''} overdue`;
    }
    
    return `
      <div class="todo-item overdue" style="margin-bottom: 8px;">
        <div class="todo-content">
          <div class="todo-text">${item.task.text}</div>
          <div class="todo-due-date overdue">⚠️ ${overdueText} • From: ${item.path}</div>
        </div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="reminders-section">
      <div class="reminders-title">
        ⚠️ Overdue Tasks
        <span class="reminder-count">${allOverdueTasks.length}</span>
      </div>
      ${overdueHtml}
    </div>
  `;
}

function formatDueDate(date) {
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  return date.toLocaleDateString('en-US', options);
}

function render() {
  const foldersHtml = renderFolders();
  const tasksHtml = renderTasks();
  const remindersHtml = renderReminders();
  
  list.innerHTML = foldersHtml + tasksHtml;
  remindersContainer.innerHTML = remindersHtml;
  updateFolderTree();
  updateRecycleBinUI();
}

function updateRecycleBinUI() {
  const recycleBinCount = document.getElementById('recycle-bin-count');
  const recycleBinElement = document.getElementById('recycle-bin');
  
  if (recycleBinCount && recycleBinElement) {
    recycleBinCount.textContent = recycleBin.length;
    
    // Add visual indicator when recycle bin has items
    if (recycleBin.length > 0) {
      recycleBinElement.style.background = 'var(--delete-hover-bg)';
      recycleBinElement.style.border = '1px solid var(--delete-color)';
    } else {
      recycleBinElement.style.background = 'var(--item-bg)';
      recycleBinElement.style.border = 'none';
    }
  } else {
    console.warn('Recycle bin UI elements not found');
  }
}

// Global functions for event handlers
window.navigateToFolder = function(folderName) {
  currentPath.push(folderName);
  updateBreadcrumb();
  render();
};

window.deleteFolder = function(folderName) {
  if (confirm(`Are you sure you want to delete the folder "${folderName}" and all its contents?`)) {
    const container = getCurrentContainer();
    delete container.folders[folderName];
    saveData();
    render();
  }
};

// Recycle Bin Management
function startRecycleBinTimer() {
  // Clear existing timer
  if (recycleBinTimer) {
    clearInterval(recycleBinTimer);
  }
  
  // Auto-empty recycle bin every configured interval
  recycleBinTimer = setInterval(() => {
    emptyRecycleBin();
  }, RECYCLE_BIN_AUTO_EMPTY_INTERVAL);
  
  // Also check on startup for expired items
  cleanExpiredItems();
}

function cleanExpiredItems() {
  const now = Date.now();
  const initialCount = recycleBin.length;
  
  recycleBin = recycleBin.filter(item => {
    return (now - item.deletedAt) < RECYCLE_BIN_AUTO_EMPTY_INTERVAL;
  });
  
  if (recycleBin.length !== initialCount) {
    saveData();
    console.log(`Cleaned ${initialCount - recycleBin.length} expired items from recycle bin`);
  }
}

function emptyRecycleBin() {
  if (recycleBin.length > 0) {
    const count = recycleBin.length;
    recycleBin = [];
    saveData();
    console.log(`Auto-emptied recycle bin: ${count} items permanently deleted`);
  }
}

function moveTaskToRecycleBin(task, folderPath) {
  const recycleBinItem = {
    task: { ...task },
    folderPath: [...folderPath],
    deletedAt: Date.now()
  };
  
  recycleBin.push(recycleBinItem);
  console.log(`Task "${task.text}" moved to recycle bin. Will be permanently deleted in ${RECYCLE_BIN_AUTO_EMPTY_INTERVAL / (60 * 60 * 1000)} hours.`);
  saveData();
}

function showRecycleBinModal() {
  if (recycleBin.length === 0) {
    alert('Recycle bin is empty');
    return;
  }

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeRecycleBinModal();
    }
  });

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Modal header
  const header = document.createElement('div');
  header.className = 'modal-header';
  header.innerHTML = `
    <div class="modal-title">🗑️ Recycle Bin (${recycleBin.length} items)</div>
    <button class="modal-close" onclick="closeRecycleBinModal()">×</button>
  `;

  // Modal content
  const content = document.createElement('div');
  content.innerHTML = recycleBin.map((item, index) => {
    const timeAgo = formatTimeAgo(item.deletedAt);
    const folderPath = item.folderPath.length > 0 ? item.folderPath.join(' > ') : 'Home';
    const completedText = item.task.completed ? ' (completed)' : '';
    
    return `
      <div class="recycle-item">
        <div class="recycle-item-content">
          <div class="recycle-item-task">${item.task.text}${completedText}</div>
          <div class="recycle-item-info">From: ${folderPath} • Deleted: ${timeAgo}</div>
        </div>
        <div class="recycle-item-actions">
          <button class="restore-btn" onclick="restoreTask(${index})">Restore</button>
          <button class="permanent-delete-btn" onclick="permanentlyDeleteTask(${index})">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  // Modal footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';
  const nextEmptyTime = RECYCLE_BIN_AUTO_EMPTY_INTERVAL - (Date.now() - Math.min(...recycleBin.map(item => item.deletedAt)));
  const hoursLeft = Math.max(0, Math.ceil(nextEmptyTime / (60 * 60 * 1000)));
  footer.innerHTML = `
    <div class="auto-empty-info">Auto-empties in ${hoursLeft} hours</div>
    <button class="empty-all-btn" onclick="emptyAllRecycleBin()">Empty All</button>
  `;

  modal.appendChild(header);
  modal.appendChild(content);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeRecycleBinModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.remove();
  }
}

function restoreTask(index) {
  const item = recycleBin[index];
  if (!item) return;

  // Navigate to the original folder
  navigateToPath(item.folderPath);
  
  // Add the task back to its original location
  const container = getCurrentContainer();
  container.tasks.push(item.task);
  
  // Remove from recycle bin
  recycleBin.splice(index, 1);
  
  saveData();
  render();
  closeRecycleBinModal();
  
  console.log(`Task "${item.task.text}" restored to ${item.folderPath.length > 0 ? item.folderPath.join(' > ') : 'Home'}`);
}

function permanentlyDeleteTask(index) {
  const item = recycleBin[index];
  if (!item) return;
  
  if (confirm(`Permanently delete "${item.task.text}"? This cannot be undone.`)) {
    recycleBin.splice(index, 1);
    saveData();
    
    // Refresh the modal content
    closeRecycleBinModal();
    if (recycleBin.length > 0) {
      showRecycleBinModal();
    }
    
    render();
    console.log(`Task "${item.task.text}" permanently deleted`);
  }
}

function emptyAllRecycleBin() {
  if (confirm(`Permanently delete all ${recycleBin.length} items from recycle bin? This cannot be undone.`)) {
    const count = recycleBin.length;
    recycleBin = [];
    saveData();
    render();
    closeRecycleBinModal();
    console.log(`${count} tasks permanently deleted from recycle bin`);
  }
}

function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Make functions globally available
window.closeRecycleBinModal = closeRecycleBinModal;
window.restoreTask = restoreTask;
window.permanentlyDeleteTask = permanentlyDeleteTask;
window.emptyAllRecycleBin = emptyAllRecycleBin;

window.toggleTask = function(index) {
  const container = getCurrentContainer();
  container.tasks[index].completed = !container.tasks[index].completed;
  saveData();
  render();
};

window.deleteTask = function(index) {
  const container = getCurrentContainer();
  const task = container.tasks[index];
  
  // Move task to recycle bin instead of permanently deleting
  moveTaskToRecycleBin(task, currentPath);
  
  // Remove from current container
  container.tasks.splice(index, 1);
  saveData();
  render();
};

// Form submission for tasks
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  
  const container = getCurrentContainer();
  
  // Create task object with optional due date/time
  const task = {
    text,
    completed: false
  };
  
  // Add due date/time if provided
  if (dueDateInput.value) {
    task.dueDate = dueDateInput.value;
    if (dueTimeInput.value) {
      task.dueTime = dueTimeInput.value;
    } else {
      task.dueTime = '23:59'; // Default to end of day if no time specified
    }
  }
  
  container.tasks.push(task);
  
  saveData();
  
  // Clear form
  input.value = '';
  dueDateInput.value = '';
  dueTimeInput.value = '';
  
  render();
});

// Initialize app
loadData();
initTheme();
updateBreadcrumb();
render();
