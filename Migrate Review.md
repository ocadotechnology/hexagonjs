Comments:
# XXX Breaking: Renderer
# XXX Breaking: Text keys (autoComplete -> autocomplete)
# XXX Breaking: Component (regression)
# XXX Breaking: Autocomplete always emit on value set
# XXX Breaking: html -> text
# XXX Breaking: Selection select error

# XXX Deprecated: alongside request
# XXX Deprecated: Filters
# XXX Deprecated: Sort
// XXX Deprecated: Fluid
# XXX: Refactor into constructor in next major
# XXX: Remove in next major in favour of hx.round etc.
// XXX: Remove in next major in favour of hx.round etc.
# XXX Deprecated: Remove in next major

# XXX: Security - innerHTML

| Main  | Tests |  CSS  | Module |
| ===== | ===== | ===== | ====== |
|  [x]  |  [-]  |  [-]  | animate |
|  [x]  |  [x]  |  [x]  | autocomplete - Renderer, userFacingText keys, Component |
|  [x]  |  [x]  |  [-]  | autocomplete-feed - filters |
|  [x]  |  [x]  |  [x]  | autocomplete-picker - renderer |
|  [x]  |  [x]  |  [x]  | badge - new |
|  [-]  |  [-]  |  [x]  | base |
|  [-]  |  [-]  |  [x]  | button |
|  [x]  |  [-]  |  [-]  | button-group |
|  [x]  |  [-]  |  [x]  | card |
|  [x]  |  [x]  |  [-]  | click-detector |
|  [x]  |  [x]  |  [x]  | collapsible |
|  [x]  |  [x]  |  [-]  | color |
|  [-]  |  [-]  |  [-]  | color-picker - deleted |
|  [x]  |  [-]  |  [-]  | color-scale |
|  [x]  |  [-]  |  [-]  | component Reinstated (inside `selection` module), no tests |
|  [x]  |  [x]  |  [x]  | crumbtrail |
|  [x]  |  [x]  |  [x]  | data-table - renderer, request |
|  [x]  |  [x]  |  [-]  | date-localizer |
|  [x]  |  [x]  |  [x]  | date-picker - check grid padding |
|  [x]  |  [x]  |  [x]  | date-time-picker |
|  [x]  |  [x]  |  [x]  | drag-container |
|  [x]  |  [x]  |  [x]  | dropdown - html |
|  [-]  |  [-]  |  [x]  | error-pages |
|  [x]  |  [x]  |  [-]  | event-emitter |
|  [x]  |  [-]  |  [-]  | fast-click |
|  [x]  |  [x]  |  [x]  | file-input - check why img.file was commented |
|  [x]  |  [x]  |  [-]  | filter - deprecation |
|  [x]  |  [x]  |  [-]  | fluid - split into multiple modules |
|  [x]  |  [x]  |  [x]  | form - changed add sig and other internals XXXXXX |
|  [-]  |  [-]  |  [-]  | form-builder - merged into form |
|  [x]  |  [x]  |  [-]  | format |
|  [-]  |  [-]  |  [x]  | icon |
|  [-]  |  [-]  |  [x]  | input-group - new JS was part of fluid |
|  [x]  |  [x]  |  [-]  | interpolate |
|  [-]  |  [-]  |  [x]  | label - new JS was part of fluid |
|  [-]  |  [-]  |  [x]  | layout - new JS was part of fluid |
|  [x]  |  [x]  |  [-]  | list |
|  [x]  |  [-]  |  [x]  | logo |
|  [x]  |  [x]  |  [-]  | map |
|  [x]  |  [-]  |  [x]  | menu |
|  [x]  |  [x]  |  [x]  | meter - migrated manually (no 'new' version to compare) |
|  [x]  |  [-]  |  [x]  | modal |
|  [x]  |  [-]  |  [x]  | morphs |
|  [-]  |  [-]  |  [x]  | notice - new JS was part of fluid |
|  [x]  |  [-]  |  [x]  | notify |
|  [x]  |  [x]  |  [x]  | number-picker |
|  [x]  |  [x]  |  [x]  | palette |
|  [x]  |  [x]  |  [x]  | picker - renderer |
|  [x]  |  [x]  |  [-]  | pivot-table |
|  [x]  |  [-]  |  [-]  | pointer-events |
|  [x]  |  [x]  |  [-]  | preferences |
|  [x]  |  [x]  |  [x]  | progress-bar |
|  [x]  |  [x]  |  [-]  | request - module was deleted, no new version to compare |
|  [x]  |  [-]  |  [-]  | resize-events |
|  [x]  |  [x]  |  [-]  | selection |
|  [x]  |  [x]  |  [-]  | set |
|  [x]  |  [-]  |  [x]  | side-collapsible |
|  [x]  |  [x]  |  [x]  | sidebar |
|  [x]  |  [x]  |  [x]  | slider |
|  [x]  |  [x]  |  [-]  | sort |
|  [-]  |  [-]  |  [x]  | spinner |
|  [x]  |  [-]  |  [x]  | sticky-table-headers |
|  [-]  |  [-]  |  [x]  | table |
|  [x]  |  [x]  |  [x]  | tabs |
|  [x]  |  [x]  |  [x]  | tag-input |
|  [x]  |  [x]  |  [x]  | time-picker |
|  [x]  |  [x]  |  [-]  | time-slider |
|  [x]  |  [x]  |  [x]  | titlebar |
|  [x]  |  [-]  |  [x]  | toggle |
|  [x]  |  [x]  |  [-]  | transition |
|  [x]  |  [-]  |  [x]  | tree |
|  [x]  |  [x]  |  [-]  | user-facing-text |
|  [x]  |  [x]  |  [-]  | util |
|  [x]  |  [x]  |  [-]  | view |
|  [x]  |  [x]  |  [x]  | paginator |
|  [-]  |  [-]  |  [-]  | drawing - migrated manually (no 'new' version to compare) |
|  [-]  |  [-]  |  [-]  | inline-editable - migrated manually (no 'new' version to compare) |
|  [-]  |  [-]  |  [-]  | inline-picker - migrated manually (no 'new' version to compare) |
|  [-]  |  [-]  |  [-]  | morph-section - migrated manually (no 'new' version to compare) |
|  [-]  |  [-]  |  [-]  | plot - assumed correct, updated exports |
