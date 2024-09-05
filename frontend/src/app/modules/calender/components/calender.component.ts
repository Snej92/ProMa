import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {map, Observable, Subscription, tap} from "rxjs";
import {loadUser} from "../../userAdministration/store/user-administration.actions";
import {getUserInfo} from "../../userAdministration/store/user-administration.selectors";
import {user} from "../../userAdministration/store/user-Administration.model";
import {projectView} from "../../project-administration/store/project-administration.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectView} from "../../project-administration/store/project-administration.actions";
import {getProjectViewInfo} from "../../project-administration/store/project-administration.selectors";
import {assignment, assignmentModel, selectedMonth} from "../store/calender.model";
import {FormBuilder, Validators} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {loadAssignment, updateAssignment} from "../store/calender.actions";
import {getAssignment, getAssignmentByUserIdAndDate, getAssignmentInfo} from "../store/calender.selectors";


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent implements OnInit, OnDestroy{

  @ViewChild('inputYear') inputYear!: ElementRef
  @ViewChild('matTable') matTable!: MatTable<any>;

  constructor(private store:Store<AppStateModel>,
              private builder:FormBuilder) {
  }

  calenderForm=this.builder.group({
    month:this.builder.control(0),
    year:this.builder.control(0, Validators.pattern('^202[4-9]|20[3-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3}$')),
  })

  private subscriptions: Subscription[] = [];
  selectedMonth:selectedMonth[]=[
    {month:'Januar', value:1},
    {month:'Februar', value:2},
    {month:'März', value:3},
    {month:'April', value:4},
    {month:'Mai', value:5},
    {month:'Juni', value:6},
    {month:'Juli', value:7},
    {month:'August', value:8},
    {month:'September', value:9},
    {month:'Oktober', value:10},
    {month:'November', value:11},
    {month:'Dezember', value:12},
  ]

  assignmentsMap: { [userId: number]: { [date: string]: assignmentModel } } = {};
  editAssignment:assignmentModel = {
    id:0,
    projectId:0,
    projectAcronym:'',
    userId:0,
    userAcronym:'',
    date:'',
    color:''
  }

  projectView!:projectView;

  user!:user;

  displayedColumns: string[] = ['user'];
  weekdayColumns: string[] = [];
  weekNumberColumns: string [] = [];

  daysInMonth: number[] = [];
  daysInMonthStr: string[] = [];
  currentMonth: string = "";
  currentYear: number= 0;
  currentMonthYear : string = "";

  selectedProject:any;
  validProject:boolean = false;

  todayDate:string="";

  ngOnInit(): void {
    const date = new Date();

    this.todayDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    this.todayDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    console.log("today: ", this.todayDate)

    this.calenderForm.setValue({
      month: date.getMonth() + 1,
      year: date.getFullYear()
    })
    // Aktueller Monat (0-11) und aktuelles Jahr deswegen wird oft +1 oder -1 bei month hinzugefügt,
    // da SelectedMonth mit 1-12 arbeitet und ein normales datum auch
    this.generateDaysInMonthFromCurrentMonth(date.getMonth(), date.getFullYear());


    //User
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadUser())
    this.subscriptions.push(
      this.store.select(getUserInfo).pipe()
        .subscribe(data =>{
          this.user=data;
        })
    )

    //Projects
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadProjectView({archive:false, all:true}))
    this.subscriptions.push(
      this.store.select(getProjectViewInfo).pipe()
        .subscribe(data =>{
          this.projectView=data;
        })
    )

    //Assignments
    this.store.dispatch(loadAssignment({date:this.currentMonthYear}))
    //AssignmentsMap
    this.store.select(getAssignment).subscribe(assignments => {
      assignments.forEach(assignment => {
        const dateKey = assignment.date;
        if (!this.assignmentsMap[assignment.userId]) {
          this.assignmentsMap[assignment.userId] = {};
        }
        this.assignmentsMap[assignment.userId][dateKey] = assignment;
      });
    });
  }

  changeProject(){
    if (typeof this.selectedProject === 'number') {
      console.log('Selected project is a number:', this.selectedProject);
      this.validProject = true;
    } else if (['F', 'U', 'K', '-'].includes(this.selectedProject)) {
      console.log('Selected project is a valid letter:', this.selectedProject);
      this.validProject = true;
    } else {
      console.log('Selected project is invalid:', this.selectedProject);
      this.validProject = false;
    }
  }

  updateAssignment(assignment:assignmentModel){
    if(this.validProject){
      if(assignment){
        // console.log("valid")
        // console.log(assignment)
        this.editAssignment = {...assignment};
        if(typeof this.selectedProject === 'number'){
          this.editAssignment.projectId = this.selectedProject;
        } else{
          this.editAssignment.projectId = 0;
          this.editAssignment.projectAcronym = this.selectedProject
          switch (this.selectedProject){
            case 'F':
              this.editAssignment.color = '#00B050'
              break;
            case 'U':
              this.editAssignment.color = '#92D050'
              break;
            case 'K':
              this.editAssignment.color = '#E26B0A'
              break;
            default:
              this.editAssignment.color = '#FFFFFF00'
              console.log('Unknown project')
          }
        }
        // console.log(this.editAssignment);
        console.log("update assignment")
        this.store.dispatch(updateAssignment({assignmentInput:this.editAssignment}))
      }
    } else {
      console.log("not valid")
    }
  }

  removeFocus(){
    //Blur inputYear -> executes blur() of input -> changeCalender()
    if(this.calenderForm.valid){
      this.inputYear.nativeElement.blur();
    }
  }

  changeCalender(){
    if(this.calenderForm.valid){
      const month = this.calenderForm.get('month')?.value as number;
      const year = this.calenderForm.get('year')?.value as number;
      console.log("month: ", month)
      console.log("year: ", year)
      console.log("current month: ", this.currentMonth)
      if(year != this.currentYear || month != parseInt(this.currentMonth,10)){
        console.log("generate days in month")
        this.generateDaysInMonthFromCurrentMonth(month - 1, year)

        //Assignments
        this.store.dispatch(loadAssignment({date:this.currentMonthYear}))
        //AssignmentsMap
        this.store.select(getAssignment).subscribe(assignments => {
          assignments.forEach(assignment => {
            const dateKey = assignment.date;
            if (!this.assignmentsMap[assignment.userId]) {
              this.assignmentsMap[assignment.userId] = {};
            }
            this.assignmentsMap[assignment.userId][dateKey] = assignment;
          });
        });
      }
    }
  }

  generateDaysInMonthFromCurrentMonth(month:number, year:number): void {
    const correctMonth = month + 1;
    this.currentMonth = correctMonth.toString().padStart(2, '0');
    this.currentYear = year;
    this.currentMonthYear = this.currentMonth + "." + this.currentYear;
    console.log("monthYear: ", this.currentMonthYear)
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    //Array with days as number
    this.daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

    // Array with days as string with leading 0 if not 2 digit
    this.daysInMonthStr = this.daysInMonth.map(day => day.toString().padStart(2, '0'));

    this.displayedColumns = ['user'];
    this.weekdayColumns = ['day'];
    this.weekNumberColumns = ['weeknumber'];

    this.daysInMonthStr.forEach(day => {
      this.displayedColumns.push('day-' + day);
      this.weekdayColumns.push('weekday-' + day);
      this.weekNumberColumns.push('week-' + day);
    });
  }

  getWeekday(day: number, month: number, year: number): string {
    const date = new Date(year, month-1, day);
    return date.toLocaleDateString('de-DE', { weekday: 'short' });
  }

  getAssignmentForUserAndDay(userId: number, day:string): assignmentModel {
    const assignmentDate = `${day}.${this.currentMonth}.${this.currentYear}`;
    return this.assignmentsMap[userId]?.[assignmentDate] || '';
  }

  getWeekNumber(day: number, month: number, year: number): number {
    const date = new Date(year, month - 1, day);
    // ISO week starts on Monday
    const thursday = new Date(date.getTime());
    thursday.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const firstJanuary = new Date(thursday.getFullYear(), 0, 1);
    return Math.floor(((thursday.getTime() - firstJanuary.getTime()) / (86400000)) / 7) + 1;
  }

  isLastRow(index: number): boolean {
    return index === this.user.userList.length - 1;
  }

  checkEvenOrOdd(number: number): string {
    return number % 2 === 0 ? 'even' : 'odd';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly parseInt = parseInt;
}
