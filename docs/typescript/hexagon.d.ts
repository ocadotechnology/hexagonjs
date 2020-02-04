
export = hx;
export as namespace hx;

declare namespace hx {
  function animate(node: Element, ease?: (value: number) => number): Animation;
  function morph(node: Element): Morph;
  namespace morph {
    function register(name: string, action: (node: Element, duration: number) => any);
  }
  class AutocompletePicker {
    constructor(selector: string | HTMLElement | Selection, items: Function | Array<any>, options?: AutocompletePickerOptions);
    clearCache(): AutocompletePicker;
    disabled(): boolean;
    disabled(disabled: boolean): AutocompletePicker;
    hide(): AutocompletePicker;
    items(): Function | Array<any>;
    items(items: Function | Array<any>): AutocompletePicker;
    renderer(): Function;
    renderer(renderer: (element: HTMLElement, item: {}) => any): AutocompletePicker;
    value(): any;
    value(value: any, callback?: (item: any) => any): AutocompletePicker;
  }
  function autocompletePicker(items: Function | Array<any>, options?: AutocompletePickerOptions): Selection;
  class AutoComplete {
    constructor(selector: string | HTMLElement | Selection, items: Function | Array<any>, options?: AutoCompleteOptions);
    clearCache(): AutoComplete;
    hide(): AutoComplete;
    value(): string;
    value(value: string): AutoComplete;
  }
  function autoComplete(items: Function | Array<any>, options?: AutoCompleteOptions): Selection;
  class ButtonGroup {
    constructor(selector: string | HTMLElement | Selection, options?: ButtonGroupOptions);
    disabled(): boolean;
    disabled(value: boolean): ButtonGroup;
    items(): Array<any>;
    items(items: Array<any>): ButtonGroup;
    renderer(): Function;
    renderer(render: (node: HTMLElement, data: string | {}, current: boolean) => any): ButtonGroup;
    value(): any;
    value(value: any): ButtonGroup;
  }
  function buttonGroup(options?: ButtonGroupOptions): Selection;
  class ClickDetector {
    addException(element: Element): ClickDetector;
    cleanUp(): ClickDetector;
    removeAllExceptions(): ClickDetector;
    removeException(element: Element): ClickDetector;
  }
  class Collapsible {
    constructor(selector: string, options?: CollapsibleOptions);
    hide(animate?: boolean, callback?: Function): Collapsible;
    isOpen(): boolean;
    show(animate?: boolean): Collapsible;
    toggle(animate?: boolean): Collapsible;
  }
  function initializeCollapsibles(selector: string);
  class ColorPicker {
    constructor(selector: string | HTMLElement | Selection, options?: ColorPickerOptions);
    disabled(): boolean;
    disabled(value: boolean): ColorPicker;
    value(): string;
    value(value: string | Color): ColorPicker;
  }
  function colorPicker(options?: ColorPickerOptions): Selection;
  class ColorScale {
    constructor(start: number, end: number, range: Array<{}>);
    apply(v: number): string;
    domain(start: number, end: number): ColorScale;
    range(range: Array<{}>): ColorScale;
  }
  function color(): Color;
  function color(str: string): Color;
  function color(array: Array<number>): Color;
  function color(r: number, g: number, b: number, a?: number): Color;
  namespace color {
    function isColor(obj: any): boolean;
  }
  namespace color {
    function isColorString(str: string): boolean;
  }
  function component(node: string | HTMLElement | Selection): {};
  function components(node: string | HTMLElement | Selection): Array<{}>;
  namespace component {
    function register(node: string | HTMLElement | Selection, component: {});
  }
  namespace components {
    function clear(selector: Element | string);
  }
  class Crumbtrail {
    constructor(selector: string | HTMLElement | Selection, options?: CrumbtrailOptions);
    items(): Array;
    items(items: Array<any>): Crumbtrail | Array;
    renderer(): Function;
    renderer(render: (element: HTMLElement, data: any) => any): Crumbtrail;
  }
  function crumbtrail(options?: CrumbtrailOptions): Selection;
  class DataTable {
    constructor(selector: string | HTMLElement | Selection, options?: DataTableOptions);
    expandedRows(): Array<string>;
    expandedRows(value: Array<string>, callback?: Function): DataTable;
    page(): number;
    page(value: number, callback?: Function): DataTable;
    render(callback?: Function): DataTable;
    renderSuppressed(): boolean;
    renderSuppressed(suppress: boolean): DataTable;
    rowsForIds(ids: Array<string>, callback: (rows: Array<{}>) => any);
    selectedRows(): Array<string>;
    selectedRows(value: Array<string>, callback?: Function): DataTable;
  }
  function dataTable(options?: DataTableOptions): Selection;
  namespace dataTable {
    const objectFeed: (data: {}) => Feed;
    const urlFeed: (url: string) => Feed;
    const getAdvancedSearchFilter: (cellValueLookup: (cell: any) => string, termLookup: (filterTerm: string, rowSearchTerm: string) => boolean) => Function;
  }
  class DatePicker {
    constructor(selector: string | HTMLElement | Selection, options?: DatePickerOptions);
    date(): Date;
    date(date: Date): DatePicker;
    day(): number;
    day(day: number): DatePicker;
    disabled(): boolean;
    disabled(value: boolean): DatePicker;
    getScreenDate(): string;
    hide(): DatePicker;
    locale(): string;
    locale(locale: string): DatePicker;
    month(): number;
    month(month: number): DatePicker;
    range(): {};
    range(range: { start: Date, end: Date }, dontSetupInput?: boolean): DatePicker;
    show(): DatePicker;
    validRange(): {};
    validRange(range: { start?: Date, end?: Date }): DatePicker;
    visibleMonth(): {};
    visibleMonth(month: number, year?: number): DatePicker;
    year(): number;
    year(year: number): DatePicker;
  }
  function datePicker(options?: DatePickerOptions): Selection;
  class DateTimePicker {
    constructor(selector: string | HTMLElement | Selection, options?: DateTimePickerOptions);
    date(): Date;
    date(date: Date, retainTime?: boolean): DateTimePicker;
    day(): number;
    day(day: number): DateTimePicker;
    disabled(): boolean;
    disabled(value: boolean): DateTimePicker;
    getScreenDate(): string;
    getScreenTime(): string;
    hour(): number;
    hour(hour: number): DateTimePicker;
    locale(): string;
    locale(locale: string): DateTimePicker;
    minute(): number;
    minute(minute: number): DateTimePicker;
    month(): number;
    month(month: number): DateTimePicker;
    second(): number;
    second(second: number): DateTimePicker;
    year(): number;
    year(year: number): DateTimePicker;
  }
  function dateTimePicker(options?: DateTimePickerOptions): Selection;
  class DragContainer {
    constructor(selector: string | HTMLElement | Selection, options?: DragContainerOptions);
    lookup(): Function;
    lookup(fn: (node: HTMLElement) => string): DragContainer;
    order(): Array<string>;
    order(order: Array<string>): DragContainer;
    setup(): DragContainer;
  }
  function dragContainer(options?: DragContainerOptions): Selection;
  class Drawing {
    camera: Camera;
    sidebar: Sidebar;
    constructor(selector: HTMLElement);
    constructor(selector: string);
    create(type: string, id?: string): DrawingObject;
    createLayer(): Layer;
    delete(obj: DrawingObject);
    enableSidebar(position: string, togglePosition?: string, populate: (elem: HTMLElement) => any);
    find(id: string): DrawingObject;
    findBy(indicator: (obj: DrawingObject) => boolean): DrawingObject;
    follow(obj: DrawingObject, zoomOut?: number, continuallyEvaluateZoom?: boolean);
    select(obj: DrawingObject);
    selected(): Array<DrawingObject>;
    show(obj: DrawingObject, zoomOut?: number);
  }
  function drawing(): Selection;
  class Dropdown {
    options: { dropdownContent: string | Function, spacing: number, matchWidth: boolean, ddClass: string };
    constructor(selector: string | HTMLElement | Selection, dropdownContent: string | Function, options?: DropdownOptions);
    addException(element: Element): Dropdown;
    cleanUp(): Dropdown;
    dropdownContent(): string | Function;
    dropdownContent(content: string | Function): Dropdown;
    hide(callback?: Function): Dropdown;
    isOpen(): boolean;
    removeException(element: Element): Dropdown;
    render(): Dropdown;
    show(callback?: Function): Dropdown;
    toggle(callback?: Function): Dropdown;
  }
  class EventEmitter {
    emit(name: string, data: {}): EventEmitter;
    has(name: string): boolean;
    off(name?: string, namespace?: string, callback?: Function): EventEmitter;
    on(name: string, namespace?: string, callback: (data: EventData) => any): EventEmitter;
    pipe(eventEmitter: EventEmitter, prefix?: string, filter?: Array<string>): EventEmitter;
    suppressed(name: string): boolean;
    suppressed(name: string, suppressed: boolean): EventEmitter;
  }
  class FileInput {
    constructor(selector: string | HTMLElement | Selection, options?: FileInputOptions);
    disabled(): boolean;
    disabled(disabled: boolean): FileInput;
    value(): Array<File>;
    value(): FileInput;
  }
  function fileInput(options?: FileInputOptions): Selection;
  namespace filter {
    function fuzzy(array: Array<any>, term: string): Array<any>;
    function exact(array: Array<any>, term: string): Array<any>;
    function startsWith(array: Array<any>, term: string): Array<any>;
    function contains(array: Array<any>, term: string): Array<any>;
    function less(array: Array<any>, term: string): Array<any>;
    function greater(array: Array<any>, term: string): Array<any>;
    function excludes(array: Array<any>, term: string): Array<any>;
    function regex(array: Array<any>, term: string): Array<any>;
    function stringTypes(): Array<string>;
    function numberTypes(): Array<string>;
    function types(): Array<string>;
  }
  function checkbox(): Selection;
  function inputGroup(): Selection;
  function notice(): Selection;
  namespace notice {
    function head(): Selection;
  }
  namespace notice {
    function body(): Selection;
  }
  function spinner(): Selection;
  namespace spinner {
    function wide(): Selection;
  }
  function button(): Selection;
  function label(): Selection;
  function icon(): Selection;
  function group(): Selection;
  namespace group {
    function vertical(): Selection;
  }
  namespace group {
    function fixed(): Selection;
  }
  namespace group {
    namespace vertical {
      function fixed(): Selection;
    }
  }
  function section(): Selection;
  namespace section {
    function fixed(): Selection;
  }
  class Form {
    constructor(selector: HTMLElement | string);
    component(property: string): {};
    data(): {};
    data(data: {}): Form;
    disabled(properties: Array<string>): Array<boolean>;
    disabled(properties: Array<string>, disabled: boolean): Form;
    disabled(property: string): boolean;
    disabled(property: string, disabled: boolean): Form;
    errorMessage(property: string): string;
    errorMessage(property: string, message: string): Form;
    hidden(properties: Array<string>): Array<boolean>;
    hidden(properties: Array<string>, hidden: boolean): Form;
    hidden(property: string): boolean;
    hidden(property: string, hidden: boolean): Form;
    node(property: string): HTMLElement;
    submit(): Form;
    value(property: string): any;
    value(property: string, value: any): Form;
  }
  function validateForm(form: string | HTMLElement | Selection): {};
  namespace format {
    function round(sf: number, strict?: boolean): Function;
    function si(sf: number, strict?: boolean): Function;
    function exp(sf: number, strict?: boolean): Function;
    function fixed(digits: number, strict?: boolean): Function;
    function zeroPad(length: number, strict?: boolean): Function;
  }
  class InlineEditable {
    constructor(selector: string | HTMLElement | Selection, options?: InlineEditableOptions);
    value(value?: string): string | InlineEditable;
  }
  function inlineEditable(options?: InlineEditableOptions): Selection;
  class InlinePicker {
    constructor(selector: string | HTMLElement | Selection, options?: InlinePickerOptions);
    items(): Array<any>;
    items(items: Array<string>): InlinePicker;
    renderer(): Function;
    renderer(render: (node: HTMLElement, data: any) => any): InlinePicker;
    value(): string;
    value(value: string): InlinePicker;
  }
  function interpolate(a: number, b: number): Function;
  function interpolate(a: string, b: string): Function;
  class List {
    size: number;
    constructor(array?: Array<any>);
    add(item: any): List;
    clear(): List;
    delete(index: number): boolean;
    entries(): Array<any>;
    forEach(f: (value: any) => any, thisArg?: {});
    get(index: number): any;
    has(value: any): boolean;
    remove(value: any): boolean;
    removeAll(value: any): number;
    values(): Array<any>;
  }
  class Map {
    size: number;
    constructor(array?: Array<any>);
    clear(): Map;
    delete(key: string): Map;
    entries(): Array<any>;
    forEach(f: (key: string, value: {}) => any, thisArg?: {}): Map;
    get(key: string): {};
    has(key: string): boolean;
    keys(): Array<any>;
    set(key: string, value: any): Map;
    values(): Array<any>;
  }
  class Menu {
    constructor(selector: string | HTMLElement | Selection, options?: MenuOptions);
    addException(element: HTMLElement): Menu;
    disabled(): boolean;
    disabled(value: boolean): Menu;
    hide(): Menu;
    items(): Function | Array<any>;
    items(data: (callback: (data: Array<string | {}>) => any) => any): Menu;
    items(items: Array<{}>): Menu;
    renderer(): Function;
    renderer(render: (element: HTMLElement, item: {}) => any): Menu;
  }
  function menu(options?: MenuOptions): Selection;
  class Meter {
    constructor(selector: string | HTMLElement | Selection, options?: MeterOptions);
    render(): Meter;
    value(): {};
    value(data: { total: number, completed: number, tracker: number, marker: number, markerText: string, unitText: string }): Meter;
  }
  function meter(options?: MeterOptions): Selection;
  class Modal {
    options: {};
    constructor(title: string, setup: (element: HTMLElement, modal: Modal) => any, options?: ModalOptions);
    hide(): Modal;
    show(): Modal;
  }
  namespace modal {
    function dialog(title: string, message: string, callback: (value: string | boolean) => any): Modal;
    function input(title: string, message: string, callback: (value: string) => any): Modal;
  }
  class MorphSection {
    constructor(selector: string | HTMLElement | Selection, options?: MorphSectionOptions);
    hide(): MorphSection;
    show(): MorphSection;
    toggle(): MorphSection;
    visible(): boolean;
    visible(show: boolean): MorphSection;
  }
  class InlineMorphSection {
    constructor(selector: string | HTMLElement | Selection, enterEditMode: Function, exitEditMode: Function);
    hide(): InlineMorphSection;
    show(): InlineMorphSection;
    toggle(): InlineMorphSection;
    visible(): boolean;
    visible(show: boolean): InlineMorphSection;
  }
  class NotificationManager {
    constructor(selector?: string | Element);
    defaultTimeout(timeout?: number): number;
    info(message: string | Selection | HTMLElement | {}, options?: NotificationManagerOptions): Notification;
    loading(message: string | Selection | HTMLElement | {}): Notification;
    negative(message: string | Selection | HTMLElement | {}, options?: NotificationManagerOptions): Notification;
    notify(message: string | Selection | HTMLElement | {}, options?: NotificationManagerOptions): Notification;
    positive(message: string | Selection | HTMLElement | {}, options?: NotificationManagerOptions): Notification;
    warning(message: string | Selection | HTMLElement | {}, options?: NotificationManagerOptions): Notification;
  }
  namespace notify {
    function defaultTimeout(timeout?: number): number;
  }
  function notify(message: string | Selection | HTMLElement | {}): Notification;
  namespace notify {
    function loading(message: string | Selection | HTMLElement | {}): Notification;
  }
  namespace notify {
    function info(message: string | Selection | HTMLElement | {}): Notification;
  }
  namespace notify {
    function warning(message: string | Selection | HTMLElement | {}): Notification;
  }
  namespace notify {
    function negative(message: string | Selection | HTMLElement | {}): Notification;
  }
  namespace notify {
    function positive(message: string | Selection | HTMLElement | {}): Notification;
  }
  class NumberPicker {
    constructor(selector: string | HTMLElement | Selection, options?: NumberPickerOptions);
    decrement(): NumberPicker;
    disabled(): boolean;
    disabled(value: boolean): NumberPicker;
    increment(): NumberPicker;
    max(): number;
    max(value: number): NumberPicker;
    min(): number;
    min(value: number): NumberPicker;
    value(): number;
    value(value: number, screenValue?: number | string): NumberPicker;
  }
  function numberPicker(options?: NumberPickerOptions): Selection;
  class Paginator {
    constructor(selector: string | HTMLElement | Selection, options?: PaginatorOptions);
    page(): number;
    page(index: number): Paginator;
    pageCount(): number;
    pageCount(count: number): Paginator;
    visibleCount(): number;
    visibleCount(count: number): Paginator;
  }
  function paginator(options?: PaginatorOptions): Selection;
  namespace palette {
    function context(selector: Element | string, context: string);
  }
  namespace palette {
    function context(selector: Element | string): string;
  }
  namespace palette {
    function textContext(selector: Element | string, context: string);
  }
  namespace palette {
    function textContext(selector: Element | string): string;
  }
  namespace palette {
    function backgroundContext(selector: Element | string, context: string);
  }
  namespace palette {
    function backgroundContext(selector: Element | string): string;
  }
  namespace palette {
    function borderContext(selector: Element | string, context: string);
  }
  namespace palette {
    function borderContext(selector: Element | string): string;
  }
  namespace theme {
    interface palette {
      defaultCol: string;
      positiveCol: string;
      negativeCol: string;
      warningCol: string;
      infoCol: string;
      complimentCol: string;
      contrastCol: string;
      lightTextCol: string;
      darkTextCol: string;
      complementCol: string;
    }
  }
  class Picker {
    constructor(selector: string | HTMLElement | Selection, options?: PickerOptions);
    disabled(): boolean;
    disabled(value: boolean): Picker;
    items(): Function | Array<any>;
    items(dataFetcher: (callback: (data: Array<string | {}>) => any) => any): Picker;
    items(items: Function | Array<any>): Picker;
    renderer(): Function;
    renderer(render: (node: HTMLElement, data: any) => any): Picker;
    value(): Picker;
    value(): any;
  }
  function picker(options?: PickerOptions): Selection;
  class PivotTable {
    constructor(selector: string | HTMLElement | Selection, options?: PivotTableOptions);
    data(): any;
    data(data: {}): PivotTable;
  }
  function pivotTable(options?: PivotTableOptions): Selection;
  class Graph {
    constructor(selector: HTMLElement | string, options?: GraphOptions);
    addAxis(): Axis;
    addAxis(axis: Axis): Axis;
    addAxis(options?: AxisOptions): Axis;
    axes(): Array<Axis>;
    axes(axes: Array<Axis>): Graph;
    labelsEnabled(): boolean;
    labelsEnabled(value: boolean): Graph;
    legendEnabled(): boolean;
    legendEnabled(value: boolean): Graph;
    legendLocation(): string;
    legendLocation(value: string): Graph;
    redrawOnResize(): boolean;
    redrawOnResize(value: boolean): Graph;
    removeAxis(axis: Axis): Axis;
    render(): Graph;
    zoomEnabled(): boolean;
    zoomEnabled(value: boolean): Graph;
    zoomRangeEnd(): number;
    zoomRangeEnd(value: number): Graph;
    zoomRangeStart(): number;
    zoomRangeStart(value: number): Graph;
  }
  class Axis {
    x: {};
    y: {};
    constructor(options?: AxisOptions);
    addSeries(series: Series): Series;
    addSeries(type: string, options?: SeriesOptions): Series;
    removeSeries(series: Series): Series;
    series(): Array<Series>;
    series(series: Array<Series>): Axis;
  }
  class PieChart {
    constructor(selector: string | HTMLElement | Selection, options?: PieChartOptions);
    data(): {} | Array<{}>;
    data(data: {} | Array<{}>);
    fillColor(): string;
    fillColor(value: string): PieChart;
    innerPadding(): number;
    innerPadding(value: number): PieChart;
    labelFormatter(): Function;
    labelFormatter(value: (value: number | string) => number | string): PieChart;
    labelRenderer(): Function;
    labelRenderer(value: (element: HTMLElement, data: {}) => any): PieChart;
    labelValuesExtractor(): Function;
    labelValuesExtractor(value: (segment: {}, ring: {}, pie: PieChart) => Array<{}>): PieChart;
    labelsEnabled(): boolean;
    labelsEnabled(value: boolean): PieChart;
    legendEnabled(): boolean;
    legendEnabled(value: boolean): PieChart;
    ringPadding(): number;
    ringPadding(value: number): PieChart;
    segmentPadding(): number;
    segmentPadding(value: number): PieChart;
    segmentTextEnabled(): boolean;
    segmentTextEnabled(value: boolean): PieChart;
    segmentTextFormatter(): Function;
    segmentTextFormatter(value: (segment: {}, segments: Array<{}>) => string): PieChart;
    startAngle(): number;
    startAngle(value: number): PieChart;
    totalAngle(): number;
    totalAngle(value: number): PieChart;
  }
  class Sparkline {
    constructor(selector: HTMLElement | string, options?: SparklineOptions);
    data(): Array<{}>;
    data(value: Array<{}>): Sparkline;
    fillColor(): string;
    fillColor(value: string): Sparkline;
    labelRenderer(): Function;
    labelRenderer(labelRenderer: (element: HTMLElement, data: {}) => any): Sparkline;
    redrawOnResize(): boolean;
    redrawOnResize(value: boolean): Sparkline;
    render(): Sparkline;
    strokeColor(): string;
    strokeColor(value: string): Sparkline;
  }
  function pieChart(options?: PieChartOptions): Selection;
  function sparkline(options?: SparklineOptions): Selection;
  function graph(options?: GraphOptions);
  namespace theme {
    interface plot {
      colors: Array<string>;
      warmCol: string;
      ambientCol: string;
      coldCol: string;
      positiveCol: string;
      warningCol: string;
      negativeCol: string;
    }
  }
  class ProgressBar {
    constructor(selector: string | HTMLElement | Selection, options?: ProgressBarOptions);
    segments(): Array<any>;
    segments(segments: Array<any>, retainProgress?: boolean): ProgressBar;
    value(): number;
    value(value: number): ProgressBar;
  }
  function progressBar(options?: ProgressBarOptions): Selection;
  function request(url: any, data: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function request(url: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function html(url: any, data: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function html(url: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function json(url: any, data: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function json(url: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function text(url: any, data: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function text(url: any, callback: (error: {}, response: {} | any, source: any, index?: number) => any);
  function select(selector: Element | string): Selection;
  function selectAll(selector: string): Selection;
  function detached(type: string, namespace?: string): Selection;
  class Set {
    size: number;
    constructor(array?: Array<any>);
    add(value: any): Set;
    delete(item: any): boolean;
    entries(): Array<any>;
    forEach(f: (value: any) => any, thisArg?: {});
    has(item: any): boolean;
    keys(): Array<any>;
    values(): Array<any>;
  }
  class SideCollapsible {
    constructor(selector: string | HTMLElement | Selection, options?: SideCollapsibleOptions);
    hide(animate?: boolean, callback?: Function): SideCollapsible;
    show(animate?: boolean, callback?: Function): SideCollapsible;
    toggle(animate?: boolean, callback?: Function): SideCollapsible;
  }
  class Sidebar {
    constructor(selector: string | HTMLElement | Selection, options?: SidebarOptions);
    hide(): Sidebar;
    show(): Sidebar;
    toggle(): Sidebar;
  }
  class Slider {
    constructor(selector: string | HTMLElement | Selection, options?: SliderOptions);
    disabled(): boolean;
    disabled(value: boolean): Slider;
    discreteValues(): Array<any>;
    discreteValues(array: Array<any>, render?: boolean): Slider;
    max(): number;
    max(max: number): Slider;
    min(): number;
    min(min: number): Slider;
    renderer(): Function;
    renderer(render: (slider: Slider, elem: HTMLElement, value: number) => any): Slider;
    step(): number;
    step(step: number): Slider;
    value(): number | {};
    value(value: number): Slider;
    value(value: { start?: number, end?: number }): Slider;
  }
  function slider(options?: SliderOptions): Selection;
  function sort(arr: Array<any>): Array<any>;
  function sortBy(arr: Array<any>, f: (item: any) => any): Array<any>;
  namespace sort {
    const compare: (a: string | number, b: string | number) => number;
    const localeCompare: (locale: string) => Function;
    const compareNullsLast: (a: string | number, b: string | number) => number;
  }
  class StickyTableHeaders {
    constructor(selector: string | HTMLElement | Selection, options?: StickyTableHeadersOptions);
  }
  class Tabs {
    selected: number;
    constructor(selection: string | HTMLElement | Selection);
    select(index: number, force?: boolean): Tabs;
  }
  class TagInput {
    constructor(selector: string | HTMLElement | Selection, options?: TagInputOptions);
    add(name: string, className?: string): TagInput;
    add(tags: Array<string>, className?: string): TagInput;
    disabled(): boolean;
    disabled(value: boolean): TagInput;
    items(): Array<string>;
    items(items: Array<string>, className?: string): TagInput;
    remove(): Array<string>;
    remove(name: string): number;
  }
  function tagInput(options?: TagInputOptions): Selection;
  class TimePicker {
    constructor(selector: string | HTMLElement | Selection, options?: TimePickerOptions);
    date(): Date;
    date(date: Date, retainTime?: boolean): TimePicker;
    disabled(): boolean;
    disabled(value: boolean): TimePicker;
    getScreenTime(): string;
    hour(): number;
    hour(hour: number): TimePicker;
    locale(): string;
    locale(locale: string): TimePicker;
    minute(): number;
    minute(minute: number): TimePicker;
    second(): number;
    second(second: number): TimePicker;
  }
  function timePicker(options?: TimePickerOptions): Selection;
  class TimeSlider {
    end: number;
    start: number;
    constructor(selector: string | HTMLElement | Selection, options?: TimeSliderOptions);
    disabled(): boolean;
    disabled(value: boolean): TimeSlider;
    formatter(date: Date): string;
    max(): Date;
    max(max: Date): TimeSlider;
    min(): Date;
    min(min: Date): TimeSlider;
    renderer(): Function;
    renderer(render?: (slider: Slider, elem: HTMLElement, value: number) => any): TimeSlider;
    step(): number;
    step(step: number): TimeSlider;
    value(): Date | {};
    value(value: Date): TimeSlider;
    value(value: number): TimeSlider;
    value(value: { start?: number | Date, end?: number | Date }): TimeSlider;
  }
  function timeSlider(options?: TimeSliderOptions): Selection;
  class TitleBar {
    constructor(selector: string | HTMLElement | Selection);
    active(): Selection;
    active(selector: string | HTMLElement | Selection): TitleBar;
    contextClass(): string;
    contextClass(className: string): TitleBar;
  }
  function titleBar();
  class Toggle {
    constructor(selector: string | HTMLElement | Selection, options?: ToggleOptions);
    value(): boolean;
    value(value: boolean): Toggle;
  }
  function toggle(options?: ToggleOptions): Selection;
  function loop(callback: () => boolean);
  function transition(millis: number, callback: (cancelled?: boolean, progress: number) => any, ease?: (input: number) => number, endCallback?: (cancelled: boolean) => any): Function;
  namespace ease {
    const linear: (input: number) => number;
    const quad: (input: number) => number;
    const cubic: (input: number) => number;
  }
  class Tree {
    constructor(selector: string | HTMLElement | Selection, options?: TreeOptions);
    hide(animate: boolean, node: HTMLElement): Tree;
    hide(animate?: boolean): Tree;
    items(): Array<{}>;
    items(data: Array<{}>): Tree;
    renderer(): Function;
    renderer(render: (node: HTMLElement, data: {}) => any): Tree;
    show(animate: boolean, node: HTMLElement): Tree;
    show(animate?: boolean): Tree;
  }
  function initializeTrees(selector: string);
  function tree(options?: TreeOptions): Selection;
  function userFacingText(): {};
  function userFacingText(text: {});
  function userFacingText(module: string, key: string): string;
  function userFacingText(module: string, key: string, value: string);
  namespace userFacingText {
    function defaults(): {};
  }
  function hash(str: string, max?: Integer): number;
  function transpose(data: Array<Array<any>>): Array<Array<any>>;
  function deprecatedWarning(name: string, ...alternative: Array<string>);
  function consoleWarning(message: string, ...messages: Array<string>);
  function supports(name: string): boolean;
  function clamp(min: number, max: number, value: number): number;
  function clampUnit(value: number): number;
  function randomId(length?: number, alphabet?: string): number;
  function min(array: Array<any>): number;
  function max(array: Array<any>): number;
  function minBy(array: Array<any>, lookup: (value: any) => number): any;
  function maxBy(array: Array<any>, lookup: (value: any) => number): any;
  function range(length: number): Array<any>;
  function sum(array: Array<number>): number;
  function flatten(list: Array<any>): Array<any>;
  function cycle(array: Array<number>, index: number): number;
  function hashList(array: Array<any>, index: string): any;
  function find(array: Array<any>, indictor: (item: any) => boolean): any;
  function isString(value: any): boolean;
  function isFunction(value: any): boolean;
  function isArray(value: any): boolean;
  function isObject(value: any): boolean;
  function isPlainObject(value: any): boolean;
  function groupBy(array: Array<any>, classifier: (item: any) => any): Array<any>;
  function unique(list: Array<any>): Array<any>;
  function endsWith(value: string, suffix: string): boolean;
  function startsWith(value: string, prefix: string): boolean;
  function tween(start: number, end: number, alpha: number): number;
  function defined(value: any): boolean;
  function zip(arrays: Array<Array<any>>): Array<Array<any>>;
  function clone(object: {} | Array): {} | Array;
  function shallowClone(object: {} | Array): {} | Array;
  function identity(item: any): any;
  function parseHTML(html: string): DocumentFragment;
  function cleanNode(recurse?: boolean): node;
  function scrollbarSize(): number;
  function merge(...objects: Array<{}>): {};
  namespace merge {
    function defined(...objects: Array<{}>): {};
  }
  function shallowMerge(...objects: Array<{}>): {};
  namespace shallowMerge {
    function defined(...objects: Array<{}>): {};
  }
  function isBoolean(value: any): boolean;
  function checkParents(node: HTMLElement, check: (node: HTMLElement) => any, returnArray?: boolean);
  function parentZIndex(node: HTMLElement, findMax?: boolean);
  function debounce(duration: number, fn: Function);
  function argmin(array: Array<any>, lookup: (value: any) => number): number;
  function argmax(array: Array<any>, lookup: (value: any) => number): number;
  function isNumber(value: any): boolean;
}
interface TreeOptions {
  hideDisabledButtons?: boolean;
  animate?: boolean;
  renderer?: (node: HTMLElement, data: any) => any;
  items?: Array<{}>;
  lazy?: boolean;
}
interface ToggleOptions { value?: boolean; }
interface TimeSliderOptions {
  type?: string;
  min?: Date;
  max?: Date;
  step?: number;
  renderer?: (slider: Slider, elem: HTMLElement, value: number, date: Date) => string;
  disabled?: boolean;
}
interface TimePickerOptions {
  showSeconds?: boolean;
  buttonClass?: string;
  disabled?: boolean;
}
interface TagInputOptions {
  classifier?: (tag: string) => string;
  validator?: (tag: string) => string;
  disabled?: boolean;
  draggable?: boolean;
  items?: Array<string>;
  placeholder?: string;
  autocompleteData?: Function | Array<any>;
  autocompleteOptions?: {};
  excludeTags?: boolean;
  mustMatchAutocomplete?: boolean;
}
interface StickyTableHeadersOptions {
  stickTableHead?: boolean;
  stickFirstColumn?: boolean;
  useResponsive?: boolean;
  containerClass?: string;
  alwaysSticky?: boolean;
}
interface SliderOptions {
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  discreteValues?: Array<any>;
  renderer?: (slider: Slider, elem: HTMLElement, value: number) => any;
  disabled?: boolean;
}
interface SidebarOptions {
  headerSelector?: string | HTMLElement | Selection;
  contentSelector?: string | HTMLElement | Selection;
  addSidebarClass?: boolean;
}
interface SideCollapsibleOptions {
  animate?: boolean;
  position?: string;
  visible?: boolean;
  rotateHeading?: boolean;
}
interface ProgressBarOptions {
  segments?: Array<any>;
  value?: number;
  animate?: boolean;
}
interface BarSeriesOptions {
  title?: string;
  group?: string;
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  fillColor?: string;
  className?: string;
  data?: Array<{}>;
  labelValuesExtractor?: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>;
  labelFormatters?: {};
}
interface LineSeriesOptions {
  title?: string;
  group?: string;
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  labelInterpolated?: boolean;
  strokeEnabled?: boolean;
  strokeColor?: string;
  fillEnabled?: boolean;
  fillColor?: string;
  className?: string;
  markersEnabled?: boolean;
  markerFillColor?: string;
  markerRadius?: number;
  data?: Array<{}>;
  labelFormatters?: {};
  sampleThreshold?: number;
  labelValuesExtractor?: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>;
}
interface BandSeriesOptions {
  title?: string;
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  fillColor?: string;
  className?: string;
  data?: Array<{}>;
  sampleThreshold?: number;
  labelValuesExtractor?: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>;
  labelFormatters?: {};
}
interface ScatterSeriesOptions {
  title?: string;
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  fillColor?: string;
  className?: string;
  radius?: number;
  data?: Array<{}>;
  labelValuesExtractor?: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>;
  labelFormatters?: {};
}
interface StraightLineSeriesOptions {
  title?: string;
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  strokeColor?: string;
  className?: string;
  data?: Array<{}>;
  labelValuesExtractor?: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>;
  labelFormatters?: {};
}
interface GraphOptions {
  zoomRangeStart?: number;
  zoomRangeEnd?: number;
  zoomEnabled?: boolean;
  labelsEnabled?: boolean;
  legendEnabled?: boolean;
  legendLocation?: string;
  axes?: Array<{}>;
  redrawOnResize?: boolean;
}
interface AxisOptions {
  x?: { scaleType: string, visible: boolean, formatter: (value: number) => string, tickRotation: number, min: number | string, max: number | string, discretePadding: number, discreteLabels: Array<string>, tickSpacing: number, title: string, scalePaddingMin: number, scalePaddingMax: number, ticksAll: boolean, gridLines: boolean, nthTickVisible: number, axisTickLabelPosition: boolean, showTicks: boolean, doCollisionDetection: boolean };
  y?: { scaleType: string, visible: boolean, formatter: (value: number) => string, tickRotation: number, min: number | string, max: number | string, discretePadding: number, discreteLabels: Array<string>, tickSpacing: number, title: string, scalePaddingMin: number, scalePaddingMax: number, ticksAll: boolean, gridLines: boolean, nthTickVisible: number, axisTickLabelPosition: boolean, showTicks: boolean, doCollisionDetection: boolean };
  series?: Array<{}>;
}
interface PieChartOptions {
  labelsEnabled?: boolean;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  labelFormatter?: (value: number | string) => number | string;
  fillColor?: string;
  segmentPadding?: number;
  innerPadding?: number;
  ringPadding?: number;
  totalAngle?: number;
  startAngle?: number;
  legendEnabled?: boolean;
  legendLocation?: string;
  segmentTextEnabled?: boolean;
  segmentTextFormatter?: (segment: {}, segments: Array<{}>) => string;
  labelValuesExtractor?: (segment: {}, ring: {}, pie: PieChart) => Array<{}>;
}
interface SparklineOptions {
  type?: string;
  strokeColor?: string;
  fillColor?: string;
  data?: Array<any>;
  labelRenderer?: (element: HTMLElement, data: {}) => any;
  data?: {};
  redrawOnResize?: boolean;
  min?: number | string;
  max?: number | string;
}
interface PivotTableOptions {
  stickyHeaders?: boolean;
  topLeftCellRender?: (element: HTMLElement) => any;
  cellRender?: (datum: any, element: HTMLElement, isHead: boolean, column: number) => any;
  useResponsive?: boolean;
  data?: {};
  fullWidth?: boolean;
}
interface PickerOptions {
  items?: Function | Array<any>;
  renderer?: Function;
  noValueText?: string;
  dropdownOptions?: {};
  disabled?: boolean;
  value?: string;
  fullWidth?: boolean;
}
interface PaginatorOptions {
  page?: number;
  visibleCount?: number;
  pageCount?: number;
}
interface NumberPickerOptions {
  buttonClass?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  incrementOnHold?: boolean;
  incrementDelay?: number;
}
interface MorphSectionOptions { animate?: boolean; }
interface ModalOptions {
  closeWithShadeEnabled?: boolean;
  closeButtonEnabled?: boolean;
  titlebarRenderer?: (element: HTMLElement, modal: Modal) => any;
  headerRenderer?: (node: Element, titleNode: Element, closeButtonNode?: Element, modal: Modal) => any;
}
interface MeterOptions {
  useMarker?: boolean;
  useTracker?: boolean;
  trackerWidth?: number;
  progressWidth?: number;
  markerInnerExtend?: number;
  markerOuterExtend?: number;
  markerSize?: number;
  arcPadding?: number;
  markerPadding?: number;
  progressBackgroundCol?: string;
  progressCol?: string;
  trackerCol?: string;
  trackerBackgroundCol?: string;
  markerCol?: string;
  valueFormatter?: (value: number, isTotal: boolean) => string;
  redrawOnResize?: boolean;
}
interface MenuOptions {
  items?: Function | Array<{}>;
  renderer?: (element: HTMLElement, item: {}) => any;
  dropdownOptions?: DropdownOptions;
  disabled?: boolean;
}
interface InlinePickerOptions {
  contextClass?: string;
  ddClass?: string;
  value?: string;
  noValueText?: string;
  items?: Function | Array<any>;
  renderer?: (node: HTMLElement, data: any) => any;
}
interface InlineEditableOptions {
  enterValueText?: string;
  value?: string;
}
interface FileInputOptions {
  disabled?: boolean;
  fullWidth?: boolean;
  acceptedExtensions?: Array<string>;
  multiple?: boolean;
  dragEnabled?: boolean;
  buttonClass?: string;
  buttonText?: string;
  filesSelectedText?: string;
  noFilesText?: string;
}
interface DropdownOptions {
  mode?: string;
  align?: string;
  spacing?: number;
  matchWidth?: boolean;
  ddClass?: string;
}
interface DragContainerOptions {
  lookup?: (node: HTMLElement) => string;
  order?: Array<any>;
  resizeOnDrag?: boolean;
}
interface DateTimePickerOptions {
  datePickerOptions?: {};
  timePickerOptions?: {};
  disabled?: boolean;
}
interface DatePickerOptions {
  type?: string;
  closeOnSelect?: boolean;
  selectRange?: boolean;
  defaultView?: string;
  showTodayButton?: boolean;
  allowInbuiltPicker?: boolean;
  disabled?: boolean;
}
interface DataTableOptions {
  allowHeaderWrap?: boolean;
  cellRenderer?: (element: HTMLElement, cell: {}, row: {}) => any;
  collapsibleRenderer?: (element: HTMLElement, row: {}) => any;
  columns?: { allowHeaderWrap: boolean, sortEnabled: boolean, cellRenderer: (element: HTMLElement, cell: {}, row: {}) => any, headerCellRenderer: (element: HTMLElement, cell: {}, headers: {}) => any, maxWidth: number };
  compact?: string | boolean;
  displayMode?: string;
  feed?: Feed;
  filter?: string;
  filterEnabled?: boolean;
  headerCellRenderer?: (element: HTMLElement, cell: {}, headers: {}) => any;
  noDataMessage?: string;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  retainHorizontalScrollOnRender?: boolean;
  retainVerticalScrollOnRender?: boolean;
  rowCollapsibleLookup?: (row: {}) => boolean;
  rowEnabledLookup?: (row: {}) => boolean;
  rowIDLookup?: (row: {}) => string;
  rowSelectableLookup?: (row: {}) => boolean;
  selectEnabled?: boolean;
  singleSelection?: boolean;
  sort?: { column: string, direction: string };
  sortEnabled?: boolean;
  clearSelectionText?: string;
  loadingText?: string;
  noDataMessage?: string;
  noSortText?: string;
  rowsPerPageText?: string;
  searchPlaceholder?: string;
  selectedRowsText?: string;
  sortByText?: string;
  showAdvancedSearch?: boolean;
  advancedSearchEnabled?: boolean;
  advancedSearch?: Array<Array<{}>>;
  showSearchAboveTable?: boolean;
  addFilterText?: string;
  clearFiltersText?: string;
  anyColumnText?: string;
  advancedSearchText?: string;
  advancedSearchPlaceholder?: string;
  advancedSearchCriteria?: Array<string>;
  highlightOnHover?: boolean;
}
interface CrumbtrailOptions {
  renderer?: (element: HTMLElement, data: any) => any;
  items?: Array<any>;
  separator?: string;
}
interface ColorPickerOptions {
  startColor?: Color;
  showInputs?: boolean;
  align?: string;
  disabled?: boolean;
}
interface CollapsibleOptions {
  addIcon?: boolean;
  animate?: boolean;
  lazyContent?: (content: HTMLElement) => any;
  visible?: boolean;
}
interface ButtonGroupOptions {
  activeClass?: string;
  buttonClass?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  items?: Array<any>;
  renderer?: (node: HTMLElement, data: string | {}, current: boolean) => any;
}
interface AutoCompleteOptions {
  filter?: (array: Array<any>, term: string) => Array;
  filterOptions?: {};
  inputMap?: (item: any) => string;
  matchType?: string;
  minLength?: number;
  mustMatch?: boolean;
  noResultsMessage?: string;
  otherResultsMessage?: string;
  placeholder?: string;
  pleaseEnterMinCharactersMessage?: string;
  renderer?: (elem: HTMLElement, item: {}) => any;
  showAll?: boolean;
  showOtherResults?: boolean;
  trimTrailingSpaces?: boolean;
}
interface AutocompletePickerOptions {
  buttonClass?: string;
  chooseValueText?: string;
  disabled?: boolean;
  filter?: (array: Array<any>, term: string) => Array;
  filterOptions?: {};
  loadingText?: string;
  matchType?: string;
  noResultsText?: string;
  otherResultsText?: string;
  renderer?: (elem: HTMLElement, item: {}) => any;
  showOtherResults?: boolean;
  trimTrailingSpaces?: boolean;
  useCache?: boolean;
  value?: any;
  valueLookup?: (item: any) => string;
}
class Animation {
  attr(attribute: string, endValue: string | number, duration?: number): Animation;
  attr(attribute: string, startValue: string | number, endValue: string | number, duration: number): Animation;
  cancel(): Animation;
  style(property: string, endValue: string | number, duration?: number): Animation;
  style(property: string, endValue: string | number, duration?: number): Animation;
}
class Morph {
  and(fn: (done?: Function) => any): Morph;
  and(morph: string, duration?: number): Animation;
  andAttr(attribute: string, endValue: string | number, duration?: number): Morph;
  andAttr(attribute: string, startValue: string | number, endValue: string | number, duration: number): Morph;
  andStyle(property: string, endValue: string | number, duration?: number): Morph;
  andStyle(property: string, startValue: string | number, endValue: string | number, duration: number): Morph;
  go(cancelOngoing?: boolean): Morph;
  then(fn: (done?: Function) => any): Morph;
  then(morph: string, duration?: number): Morph;
  thenAttr(attribute: string, endValue: string | number, duration?: number): Morph;
  thenAttr(attribute: string, startValue: string | number, endValue: string | number, duration: number): Morph;
  thenStyle(property: string, endValue: string | number, duration?: number): Morph;
  thenStyle(property: string, property: string, startValue: string | number, endValue: string | number, duration: number): Morph;
}
class Selection {
  animate(): Animation;
  morph(): Morph;
}
class Color {
  blue(): number;
  blue(value: number): Color;
  clone(): Color;
  fade(amount: number): Color;
  green(): number;
  green(value: number): Color;
  hsl(): Array<number>;
  hsl(arr: Array<number>): Color;
  hue(): number;
  hue(value: number): Color;
  lighten(amount: number): Color;
  lightness(): number;
  lightness(value: number): Color;
  mix(col: Color, amount: number): Color;
  range(numLight: number, numDark: number, maxRange: number, outputFormat?: string): Array;
  red(): number;
  red(value: number): Color;
  rgb(): Array<number>;
  rgb(arr: Array<number>): Color;
  saturate(amount: number): Color;
  saturation(): number;
  saturation(value: number): Color;
  textCol(): string;
  toString(type: string): string;
}
class Selection {
  component(): {} | Array<{}>;
  components(): Array<{}> | Array<Array<{}>>;
}
interface Feed {
  headers: (callback: (data: Array<{}>) => any) => any;
  totalCount: (callback: (data: number) => any) => any;
  rows: (range: { start: number, end: number, sort: { column: string, direction: string }, filter: string }, callback: (data: { filteredCount: number, rows: Array<{}> }) => any) => any;
  rowsForIds: (ids: Array<string>, lookupRow: Function, callback: (data: Array<{}>) => any) => any;
}
class Camera {
  position: {};
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  zoom: number;
  zoomMax: number;
  zoomMin: number;
  setupBounds(zoomMin: number, zoomMax: number, xMin: number, yMin: number, xMax: number, yMax: number);
}
class Layer {
  alpha: number;
  visible: boolean;
  create(type: string, id?: string): DrawingObject;
  delete(obj: DrawingObject);
  find(id: string): DrawingObject;
  findBy(indicator: (obj: DrawingObject) => boolean): DrawingObject;
  setAlphaCurve(type: string, start: number, end: number);
}
class DrawingObject {
}
class Rectangle {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Circle {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Line {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Text {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Grid {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Shape {
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Composite {
  create(type: string, name: string): DrawingObject;
  delete(name: string);
  get(name: string): any;
  set(name: string, value: any, duration?: number, animationEnd?: (complete: boolean, valueAtInterrupt?: any) => any);
}
class Notification {
  close(): Notification;
  pin(): Notification;
  unpin(): Notification;
}
class BarSeries {
  constructor(options?: BarSeriesOptions);
  class(): string;
  class(className: string): BarSeries;
  data(): Array<{}>;
  data(data: Array<{}>): BarSeries;
  fillColor(): string;
  fillColor(color: string): BarSeries;
  group(): string;
  group(group: string): BarSeries;
  labelFormatter(name: string): Function;
  labelFormatter(name: string, formatter: (value: any) => string): BandSeries;
  labelRenderer(): Function;
  labelRenderer(renderer: (element: HtmlElement, data: {}) => any): BarSeries;
  labelValuesExtractor(): Function;
  labelValuesExtractor(extractor: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>): BandSeries;
  labelsEnabled(): boolean;
  labelsEnabled(enabled: boolean): BarSeries;
  title(): string;
  title(title: string): BarSeries;
}
class LineSeries {
  constructor(options?: LineSeriesOptions);
  class(): string;
  class(className: string): LineSeries;
  data(): Array<{}>;
  data(data: Array<{}>): LineSeries;
  fillColor(): string;
  fillColor(color: string): LineSeries;
  fillEnabled(): boolean;
  fillEnabled(enabled: boolean): LineSeries;
  group(): string;
  group(group: string): LineSeries;
  labelFormatter(name: string): Function;
  labelFormatter(name: string, formatter: (value: any) => string): LineSeries;
  labelRenderer(): Function;
  labelRenderer(renderer: (element: HtmlElement, data: {}) => any): LineSeries;
  labelValuesExtractor(): Function;
  labelValuesExtractor(extractor: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>): LineSeries;
  labelsEnabled(): boolean;
  labelsEnabled(enabled: boolean): LineSeries;
  markerFillColor(): string;
  markerFillColor(color: string): LineSeries;
  markerRadius(): number;
  markerRadius(radius: number): LineSeries;
  markersEnabled(): boolean;
  markersEnabled(enabled: boolean): LineSeries;
  sampleThreshold(): number;
  sampleThreshold(count: number): LineSeries;
  strokeColor(): string;
  strokeColor(color: string): LineSeries;
  strokeEnabled(): boolean;
  strokeEnabled(enabled: boolean): LineSeries;
  title(): string;
  title(title: string): LineSeries;
}
class BandSeries {
  constructor(options?: BandSeriesOptions);
  class(): string;
  class(className: string): BandSeries;
  data(): Array<{}>;
  data(data: Array<{}>): BandSeries;
  fillColor(): string;
  fillColor(color: Array<{}>): BandSeries;
  fillColor(color: string): BandSeries;
  labelFormatter(name: string): Function;
  labelFormatter(name: string, formatter: (value: any) => string): BandSeries;
  labelInterpolated(): boolean;
  labelInterpolated(interpolate: boolean): BandSeries;
  labelRenderer(): Function;
  labelRenderer(renderer: (element: HtmlElement, data: {}) => any): BandSeries;
  labelValuesExtractor(): Function;
  labelValuesExtractor(extractor: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>): BandSeries;
  labelsEnabled(): boolean;
  labelsEnabled(enabled: boolean): BandSeries;
  sampleThreshold(): number;
  sampleThreshold(count: number): BandSeries;
  title(): string;
  title(title: string): BandSeries;
}
class ScatterSeries {
  constructor(options?: ScatterSeriesOptions);
  class(): string;
  class(className: string): ScatterSeries;
  data(): Array<{}>;
  data(data: Array<{}>): ScatterSeries;
  fillColor(): string;
  fillColor(color: string): ScatterSeries;
  labelFormatter(name: string): Function;
  labelFormatter(name: string, formatter: (value: any) => string): ScatterSeries;
  labelRenderer(): Function;
  labelRenderer(renderer: (element: HtmlElement, data: {}) => any): ScatterSeries;
  labelValuesExtractor(): Function;
  labelValuesExtractor(extractor: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>): ScatterSeries;
  labelsEnabled(): boolean;
  labelsEnabled(enabled: boolean): ScatterSeries;
  radius(): number;
  radius(radius: number): ScatterSeries;
  title(): string;
  title(title: string): ScatterSeries;
}
class StraightLineSeries {
  constructor(options?: StraightLineSeriesOptions);
  class(): string;
  class(className: string): StraightLineSeries;
  data(): Array<{}>;
  data(data: Array<{}>): StraightLineSeries;
  labelFormatter(name: string): Function;
  labelFormatter(name: string, formatter: (value: any) => string): StraightLineSeries;
  labelRenderer(): Function;
  labelRenderer(renderer: (element: HtmlElement, data: {}) => any): StraightLineSeries;
  labelValuesExtractor(): Function;
  labelValuesExtractor(extractor: (series: Series, point: {}, xValueLookup?: Function, yValueLookup?: Function) => Array<{}>): StraightLineSeries;
  labelsEnabled(): boolean;
  labelsEnabled(enabled: boolean): StraightLineSeries;
  strokeColor(): string;
  strokeColor(color: string): StraightLineSeries;
  title(): string;
  title(title: string): StraightLineSeries;
}
class Selection {
}
class Preferences {
  applyTimezoneOffset(date: Date, offset?: number): Date;
  backingStore(store: { save: (encodedPreferences: string, callback: (error?: Error) => any) => any, load: (callback: (error: Error, encodedPreferences: string) => any) => any }): Preferences;
  load(callback: (error?: Error) => any): Preferences;
  locale(): string;
  locale(locale: string): Preferences;
  save(callback: (error?: Error) => any): Preferences;
  show(): Preferences;
  supportedLocales(): Array<string>;
  supportedLocales(locales: Array<string>): Preferences;
  supportedTimezones(): Array<string>;
  supportedTimezones(timezones: Array<string>): Preferences;
  timezone(): string;
  timezone(timezone: string): Preferences;
  timezoneOffsetLookup(): Function;
  timezoneOffsetLookup(fn: (timezone: string, datestamp: number) => number): Preferences;
}
class Selection {
}
class Selection {
  add(element: string | Element | Selection): Selection;
  animate(): Animation;
  append(element: string | Element | Selection): Selection;
  attr(attribute: string): string | Array<string>;
  attr(attribute: string, value: string): Selection;
  box(): ClientRect | Array<ClientRect>;
  class(): Selection;
  classed(className: string): boolean | Array<boolean>;
  classed(className: string, add: boolean): Selection;
  clear(): Selection;
  closest(selector: string): Selection;
  contains(element: Element): boolean;
  empty(): boolean;
  filter(f: Function<Element>): Selection;
  forEach(f: Function<Selection>): Selection;
  height(): number | Array<number>;
  html(): Selection;
  insertAfter(element: string | Element | Selection): Selection;
  insertBefore(element: string | Element | Selection): Selection;
  map(f: Function<Selection>): any | Array<any>;
  morph(): Morph;
  node(): Element;
  off(name?: string, namespace?: string, callback?: Function<Event>): Selection;
  prepend(element: string | Element | Selection): Selection;
  prop(property: string): any | Array<any>;
  prop(property: string, value: any): Selection;
  remove(): Array<Element>;
  replace(selection: Selection | Array<Selection> | Promise<Selection> | Promise<Array<Selection>>): Selection;
  select(selector: string): Selection;
  selectAll(selector: string): Selection;
  set(selection: Selection | Array<Selection> | Promise<Selection> | Promise<Array<Selection>>): Selection;
  shallowSelect(selector: string): Selection;
  shallowSelectAll(selector: string): Selection;
  size(): number;
  style(property: string): string | Array<string>;
  style(property: string, value: string): Selection;
  text(): Selection;
  value(): string | Array<string>;
  value(value: string): Selection;
  view(selector: string, type?: string): View;
  width(): number | Array<number>;
}
class View {
  apply(data: {} | Array<{}>, key?: Function<{}>): View;
  enter(func: Function): View;
  exit(func: Function): View;
  update(func: Function): View;
}
