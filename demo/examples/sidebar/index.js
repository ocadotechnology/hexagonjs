import { TitleBar, Sidebar, div, select } from 'hexagon-js'

export default () => {
  const html = `
    <div class="hx-heading example-heading">
      <div class="hx-titlebar">
        <div class="hx-titlebar-container">
          <div class="hx-titlebar-header example-titlebar">
            <a class="hx-titlebar-icon" href="#"><img class="hx-logo"></img></a>
            <div class="hx-titlebar-title">Title</div>
            <div class="hx-titlebar-subtitle">Subtitle</div>
            <div class="hx-titlebar-menu-icon-mobile"><i class="fa fa-reorder"></i></div>
          </div>
          <div class="hx-titlebar-menu-icons">
            <div class="hx-titlebar-menu-icons-container">
              <a class="hx-titlebar-menu-icon"><i class="fa fa-tags"></i><span class="hx-titlebar-menu-text">Tags</span></a>
              <a class="hx-titlebar-menu-icon"><i class="fa fa-life-ring"></i><span class="hx-titlebar-menu-text">Help</span></a>
              <a class="hx-titlebar-menu-icon"><i class="fa fa-cog"></i><span class="hx-titlebar-menu-text">Settings</span></a>
              <a class="hx-titlebar-menu-icon"><i class="fa fa-power-off"></i><span class="hx-titlebar-menu-text">Sign out</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hx-sidebar">
      <div class="hx-sidebar-title">Docs</div>
      <div id="collapsible1" class="hx-collapsible">
        <div class="hx-collapsible-heading"><i class="fa fa-book"></i> Intro</div>
        <div class="hx-collapsible-content">
          <div class="hx-sidebar-section">Getting Started</div>
          <div class="hx-sidebar-section">FAQs</div>
        </div>
      </div>
      <div id="collapsible2" class="hx-collapsible">
        <div class="hx-collapsible-heading"><i class="fa fa-book"></i> Components</div>
        <div class="hx-collapsible-content">
          <div class="hx-sidebar-section">Titlebar</div>
          <div class="hx-sidebar-section">Buttons</div>
          <div class="hx-sidebar-section">Collapsible</div>
          <div class="hx-sidebar-section">Sidebar</div>
          <div class="hx-sidebar-section">Notifications</div>
        </div>
      </div>
      <div id="collapsible3" class="hx-collapsible">
        <div class="hx-collapsible-heading"><i class="fa fa-chart"></i> Drawing & Graphs</div>
        <div class="hx-collapsible-content">
          <a href="#" class="hx-positive"><i class="fa fa-fw fa-users"></i>&nbsp; Users</a>
          <div class="hx-sidebar-section">Drawing</div>
          <div class="hx-sidebar-section">Plot</div>
        </div>
      </div>
      <div id="collapsible4" class="hx-collapsible">
        <div class="hx-collapsible-heading"><i class="fa fa-spanner"></i> Utils</div>
        <div class="hx-collapsible-content">
          <div class="hx-sidebar-section">Color</div>
          <div class="hx-sidebar-section">Util</div>
          <div class="hx-sidebar-section">Request</div>
          <div class="hx-sidebar-section">Map</div>
          <div class="hx-sidebar-section">Set</div>
          <div class="hx-sidebar-section">List</div>
        </div>
      </div>
      <div class="hx-sidebar-title">Examples</div>
      <div class="hx-sidebar-section">Components</div>
      <div class="hx-sidebar-section hx-selected">Dashboard</div>
      <div class="hx-sidebar-section">Graphs</div>
      <div class="hx-sidebar-title">Links</div>
      <a href="#" class="hx-positive"><i class="fa fa-fw fa-users"></i>&nbsp; Users</a>
      <a href="#" class="hx-warning"><i class="fa fa-fw fa-key"></i>&nbsp; Keys</a>
      <a href="#" class="hx-negative"><i class="fa fa-fw fa-book"></i>&nbsp; Docs</a>
      <a href="#" class="hx-info"><i class="fa fa-fw fa-heartbeat"></i>&nbsp; Health</a>
      <div class="hx-sidebar-title">Dashboard states</div>
      <button id="default-btn" class="hx-btn">Default State</button>
      <button id="positive-btn" class="hx-btn hx-positive">Positive State</button>
      <button id="warning-btn" class="hx-btn hx-warning">Warning State</button>
      <button id="negative-btn" class="hx-btn hx-negative">Negative State</button>
      <button id="info-btn" class="hx-btn hx-info">Info State</button>
    </div>
    <div class="hx-content example-content"></div>
    `

  // XXX: Append to the body so the code actually works correctly
  // As we are returning the selection, a lot of the logic won't work
  // We can safely append to the body and return the attached div as it will
  // be relocated in the DOM by the parent `add`
  const sidebar = div('hx-sidebar-page sidebar-example')
  sidebar.node().innerHTML = html

  new TitleBar(sidebar.select('.example-heading'))
  new Sidebar(sidebar.select('.hx-sidebar'), {
    headerSelector: sidebar.select('.example-titlebar').node(),
    contentSelector: sidebar.select('.example-content').node(),
    autoAddSidebarClass: false,
  })

  return [
    sidebar
  ]
}
