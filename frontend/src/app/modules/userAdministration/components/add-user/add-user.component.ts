import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {userModel, userRole} from "../../store/user-Administration.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {addUser, updateUser} from "../../store/user-administration.actions";
import {getUserById} from "../../store/user-administration.selectors";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  private onInitSub!:Subscription;
  editData!:userModel;
  hide = true;

  constructor(private dialogRef:MatDialogRef<AddUserComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  userForm=this.builder.group({
    id:this.builder.control(0),
    activeProject:this.builder.control(0),
    sub:this.builder.control(''),
    lastname:this.builder.control('', Validators.required),
    firstname:this.builder.control('', Validators.required),
    acronym: this.builder.control('', Validators.required),
    email:this.builder.control('', Validators.required),
    phone:this.builder.control(''),
    username:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
    adminRole:this.builder.control(false),
    projectRole:this.builder.control(false),
    userRole:this.builder.control(false)
  })

  saveUser() {
    if (this.userForm.valid) {
      const userRole: userRole ={
        id: 0,
        adminRole:this.userForm.value.adminRole as boolean,
        projectRole:this.userForm.value.projectRole as boolean,
        userRole:this.userForm.value.userRole as boolean
      }
      const userInput: userModel = {
        id: 0,
        activeProject: this.userForm.value.activeProject as number,
        sub: this.userForm.value.sub as string,
        lastname: this.userForm.value.lastname as string,
        firstname: this.userForm.value.firstname as string,
        acronym: this.userForm.value.acronym as string,
        email: this.userForm.value.email as string,
        phone:this.userForm.value.phone as string,
        username:this.userForm.value.username as string,
        password:this.userForm.value.password as string,
        roles:userRole
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        userInput.id=this.userForm.value.id as number
        this.store.dispatch(updateUser({userInput:userInput}))
      }else{
        console.log(userInput);
        this.store.dispatch(addUser({userInput:userInput}))
      }
      this.closePopup();
    }
  }

  closePopup(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.isEdit){
      this.onInitSub = this.store.select(getUserById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.userForm.setValue({
          id:this.editData.id,
          activeProject: this.editData.activeProject,
          sub: this.editData.sub,
          lastname: this.editData.lastname,
          firstname: this.editData.firstname,
          acronym: this.editData.acronym,
          email: this.editData.email,
          phone:this.editData.phone,
          username:this.editData.username,
          password:this.editData.password,
          adminRole:this.editData.roles.adminRole,
          projectRole:this.editData.roles.projectRole,
          userRole:this.editData.roles.userRole
        })
      })
      this.onInitSub.unsubscribe();
    }
  }

}
